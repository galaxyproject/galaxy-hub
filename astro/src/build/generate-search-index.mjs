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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const OUTPUT_PATH = path.join(ASTRO_ROOT, 'public/search-index.json');

/**
 * Extract plain text from markdown content
 */
function extractText(markdown) {
  return (
    markdown
      // Remove frontmatter
      .replace(/^---[\s\S]*?---\n?/, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove markdown links, keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // Remove bold/italic
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove headers
      .replace(/#{1,6}\s+/g, '')
      // Remove blockquotes
      .replace(/^>\s+/gm, '')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Truncate text to a maximum length
 */
function truncate(text, maxLength = 300) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Process a single content file for the search index
 */
function processFile(filePath, collection) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(content);

  // Skip files without a title or slug
  if (!frontmatter.slug) return null;

  // Skip redirect-only pages
  if (frontmatter.redirect) return null;

  const plainText = extractText(body);
  const excerpt = truncate(plainText);

  return {
    title: frontmatter.title || '',
    slug: frontmatter.slug,
    path: `/${frontmatter.slug}/`,
    excerpt,
    tease: frontmatter.tease || '',
    tags: frontmatter.tags || [],
    date: frontmatter.date || null,
    collection,
  };
}

/**
 * Generate the search index
 */
export async function generateSearchIndex(options = {}) {
  const { verbose = false } = options;

  console.log('Generating search index...');

  const index = [];

  // Collections to index
  const collections = ['articles', 'vue-articles', 'events', 'platforms'];

  for (const collection of collections) {
    const collectionDir = path.join(CONTENT_DIR, collection);

    if (!fs.existsSync(collectionDir)) {
      if (verbose) console.log(`  Skipping ${collection} (not found)`);
      continue;
    }

    const files = await glob('**/*.md', {
      cwd: collectionDir,
      absolute: true,
    });

    let count = 0;
    for (const file of files) {
      try {
        const entry = processFile(file, collection);
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
