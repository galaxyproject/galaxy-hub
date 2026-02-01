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
 * Extract a frontmatter field value, handling single-line and multi-line YAML
 */
function extractFrontmatterField(content, fieldName) {
  // Try single-line format first
  const singleLineMatch = content.match(new RegExp(`^${fieldName}:\\s*([^\\n>|]+)$`, 'm'));
  if (singleLineMatch) {
    const value = singleLineMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (value && !value.startsWith('>') && !value.startsWith('|')) {
      return value;
    }
  }

  // Try multi-line format (>- or |-)
  const multiLineMatch = content.match(new RegExp(`^${fieldName}:\\s*[>|]-?\\s*\\n\\s+(.+)$`, 'm'));
  if (multiLineMatch) {
    return multiLineMatch[1].trim();
  }

  return null;
}

/**
 * Read slugs and content-level redirects from preprocessed content files
 */
async function getContentData() {
  const slugs = [];
  const contentRedirects = {};
  const collections = ['events', 'articles', 'platforms', 'bare-articles'];

  for (const collection of collections) {
    const collectionDir = path.join(CONTENT_DIR, collection);

    try {
      const files = await fs.promises.readdir(collectionDir);

      for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

        const filePath = path.join(collectionDir, file);
        const content = await fs.promises.readFile(filePath, 'utf-8');

        const slug = extractFrontmatterField(content, 'slug');
        const redirect = extractFrontmatterField(content, 'redirect');

        if (slug && slug.length > 0) {
          // If this content has a redirect, add it to content redirects
          if (redirect) {
            const fromPath = `/${slug}/`.replace(/\/+/g, '/');
            const toPath = redirect.startsWith('/') ? redirect : `/${redirect}`;
            const normalizedTo = toPath.endsWith('/') ? toPath : `${toPath}/`;
            contentRedirects[fromPath] = normalizedTo;
          } else {
            // Only add to slugs if it's not a redirect-only page
            slugs.push(slug);
          }
        }
      }
    } catch {
      // Collection directory might not exist
    }
  }

  return { slugs, contentRedirects };
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
  console.log('Generating redirects...');

  const redirects = {};

  // Get all content slugs and content-level redirects
  const { slugs, contentRedirects } = await getContentData();
  console.log(`Found ${slugs.length} content slugs`);

  // Generate redirects for legacy URLs (Gridsome-style -> natural Astro URLs)
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

  // Add content-level redirects (from redirect: frontmatter)
  const contentRedirectCount = Object.keys(contentRedirects).length;
  for (const [from, to] of Object.entries(contentRedirects)) {
    redirects[from] = to;
  }

  console.log(`Added ${contentRedirectCount} content-level redirects`);

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
