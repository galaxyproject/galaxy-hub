#!/usr/bin/env node
/**
 * Generate search index for client-side search with Fuse.js
 *
 * Reads processed content from src/content/ and generates
 * a JSON index file for use with Fuse.js client-side search.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';
import {
  classifyFunding,
  communitySlug,
  extractCommunityMetadata,
  loadCommunityData,
  buildHallOfFameEntries as buildHallOfFameEntriesFromMetadata,
} from './search-index/community-metadata.mjs';
import { extractText, truncate } from './search-index/text-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const PROJECT_ROOT = path.resolve(ASTRO_ROOT, '..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const SOURCE_CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const OUTPUT_PATH = path.join(ASTRO_ROOT, 'public/search-index.json');
export { classifyFunding, extractCommunityMetadata, communitySlug };

export function buildHallOfFameEntries(communityData) {
  return buildHallOfFameEntriesFromMetadata(communityData, extractText, truncate);
}

/**
 * Process a single content file for the search index
 */
function processFile(filePath, collection, communityData) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(content);

  // Skip files without a title or slug
  if (!frontmatter.slug) return null;

  // Skip redirect-only pages
  if (frontmatter.redirect && !frontmatter.title) return null;

  const plainText = extractText(body);
  const excerpt = truncate(plainText);
  const metadata = extractCommunityMetadata(frontmatter, communityData);

  return {
    title: frontmatter.title || '',
    slug: frontmatter.slug,
    path: `/${frontmatter.slug}/`,
    external_url: frontmatter.external_url || null,
    excerpt,
    tease: frontmatter.tease || '',
    tags: metadata.tags,
    date: frontmatter.date || null,
    collection,
    contributors: metadata.contributors,
    organisations: metadata.organisations,
    grants: metadata.grants,
    search_terms: metadata.search_terms,
  };
}

/**
 * Generate the search index
 */
export async function generateSearchIndex(options = {}) {
  const { verbose = false } = options;

  console.log('Generating search index...');

  const index = [];
  const communityData = loadCommunityData(SOURCE_CONTENT_DIR);

  // Collections to index
  const collections = ['articles', 'news', 'vue-articles', 'events', 'platforms'];

  for (const collection of collections) {
    const collectionDir = path.join(CONTENT_DIR, collection);

    if (!fs.existsSync(collectionDir)) {
      if (verbose) console.log(`  Skipping ${collection} (not found)`);
      continue;
    }

    const files = await glob('**/*.{md,mdx}', {
      cwd: collectionDir,
      absolute: true,
    });

    let count = 0;
    for (const file of files) {
      try {
        const entry = processFile(file, collection, communityData);
        if (entry) {
          index.push(entry);
          count++;
        }
      } catch (error) {
        if (verbose) {
          console.error(`  Error processing ${file}:`, error.message);
        }
      }
    }

    console.log(`  ${collection}: ${count} entries`);
  }

  const hallOfFameEntries = buildHallOfFameEntries(communityData);
  index.push(...hallOfFameEntries);
  console.log(`  hall-of-fame: ${hallOfFameEntries.length} entries`);

  // Sort by date (most recent first)
  index.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Write the index
  await fs.promises.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.promises.writeFile(OUTPUT_PATH, JSON.stringify(index, null, 2));

  console.log('');
  console.log(`Search index generated: ${index.length} entries`);
  console.log(`Output: ${OUTPUT_PATH}`);

  return index;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose') || args.includes('-v'),
  };

  generateSearchIndex(options)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
