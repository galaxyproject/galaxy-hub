#!/usr/bin/env node
/**
 * Generate redirects from legacy Gridsome-style URLs to natural Astro URLs
 *
 * Gridsome normalized slugs by:
 * - Decamelizing CamelCase to hyphen-case
 * - Converting underscores to hyphens
 * - Lowercasing everything
 *
 * Astro preserves the original folder names. This script generates 301 redirects
 * from legacy URLs to the new natural URLs, ensuring backward compatibility.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from '@sindresorhus/slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const CONFIG_PATH = path.join(ASTRO_ROOT, '..', 'config.json');
const OUTPUT_PATH = path.join(ASTRO_ROOT, 'src/build/generated-redirects.json');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');

/**
 * Normalize a slug segment to match Gridsome's legacy URL style
 */
function legacyNormalizeSegment(segment) {
  return slugify(segment, {
    decamelize: true,
    lowercase: true,
    separator: '-',
  });
}

/**
 * Normalize a full slug path, processing each segment
 */
function legacyNormalize(slug) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((segment) => legacyNormalizeSegment(segment))
    .join('/');
}

/**
 * Check if two slugs differ (meaning a redirect is needed)
 */
function slugsDiffer(natural, legacy) {
  return natural !== legacy;
}

/**
 * Read slugs from preprocessed content files
 */
async function getContentSlugs() {
  const slugs = [];
  const collections = ['events', 'articles', 'platforms', 'bare-articles'];

  for (const collection of collections) {
    const collectionDir = path.join(CONTENT_DIR, collection);

    try {
      const files = await fs.promises.readdir(collectionDir);

      for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

        const filePath = path.join(collectionDir, file);
        const content = await fs.promises.readFile(filePath, 'utf-8');

        // Extract slug from frontmatter - handle both single-line and multi-line YAML
        // Single line: slug: news/some-slug
        // Multi-line: slug: >-\n  news/some-slug
        let slug = null;

        // Try single-line format first
        const singleLineMatch = content.match(/^slug:\s*([^\n>|]+)$/m);
        if (singleLineMatch) {
          slug = singleLineMatch[1].trim().replace(/^['"]|['"]$/g, '');
        }

        // Try multi-line format (>- or |-)
        if (!slug || slug === '>-' || slug === '|-' || slug === '>' || slug === '|') {
          const multiLineMatch = content.match(/^slug:\s*[>|]-?\s*\n\s+(.+)$/m);
          if (multiLineMatch) {
            slug = multiLineMatch[1].trim();
          }
        }

        if (slug && slug.length > 0 && !slug.startsWith('>') && !slug.startsWith('|')) {
          slugs.push(slug);
        }
      }
    } catch {
      // Collection directory might not exist
    }
  }

  return slugs;
}

/**
 * Read manual redirects from config.json
 */
async function getManualRedirects() {
  try {
    const config = JSON.parse(await fs.promises.readFile(CONFIG_PATH, 'utf-8'));
    return config.redirects || {};
  } catch {
    return {};
  }
}

/**
 * Main function to generate redirects
 */
async function generateRedirects() {
  console.log('Generating legacy URL redirects...');

  const redirects = {};

  // Get all content slugs
  const slugs = await getContentSlugs();
  console.log(`Found ${slugs.length} content slugs`);

  // Generate redirects for legacy URLs
  let legacyCount = 0;
  for (const slug of slugs) {
    const legacySlug = legacyNormalize(slug);

    if (slugsDiffer(slug, legacySlug)) {
      // Legacy URL -> Natural URL
      const legacyPath = `/${legacySlug}/`;
      const naturalPath = `/${slug}/`;
      redirects[legacyPath] = naturalPath;
      legacyCount++;
    }
  }

  console.log(`Generated ${legacyCount} legacy URL redirects`);

  // Add manual redirects from config.json
  const manualRedirects = await getManualRedirects();
  const manualCount = Object.keys(manualRedirects).length;

  for (const [from, to] of Object.entries(manualRedirects)) {
    // Ensure paths have trailing slashes for consistency
    const fromPath = from.endsWith('/') ? from : `${from}/`;
    const toPath = to.endsWith('/') ? to : `${to}/`;
    redirects[fromPath] = toPath;
  }

  console.log(`Added ${manualCount} manual redirects from config.json`);

  // Write to JSON file
  await fs.promises.writeFile(OUTPUT_PATH, JSON.stringify(redirects, null, 2));

  console.log(`Total redirects: ${Object.keys(redirects).length}`);
  console.log(`Written to: ${OUTPUT_PATH}`);

  return redirects;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRedirects()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error generating redirects:', error);
      process.exit(1);
    });
}

export { generateRedirects, legacyNormalize, legacyNormalizeSegment };
