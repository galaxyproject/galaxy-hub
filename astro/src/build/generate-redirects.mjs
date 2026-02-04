#!/usr/bin/env node
/**
 * Generate redirects for the Galaxy Hub Astro site
 *
 * Redirects are generated from multiple sources:
 *
 * 1. Natural URL redirects: When content has a naturalSlug (original folder name)
 *    that differs from the normalized slug, redirect natural → normalized.
 *    Example: /events/GCC2024/ → /events/gcc-2024/
 *
 * 2. Legacy Gridsome redirects: The old Gridsome site normalized slugs using
 *    @sindresorhus/slugify. When the Gridsome-style slug differs from the new
 *    normalized slug, redirect legacy → normalized.
 *    Example: /events/gcc2024/ → /events/gcc-2024/
 *
 * 3. Content-level redirects: Pages with `redirect:` frontmatter field
 *
 * 4. Manual redirects: From config.json `redirects` object
 *
 * All redirects are output to generated-redirects.json and consumed by
 * astro.config.mjs to generate true 301 redirects via Astro's redirects config.
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
 * Normalize a full slug path to Gridsome's legacy style
 */
function legacyNormalize(slug) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((segment) => legacyNormalizeSegment(segment))
    .join('/');
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
 * Read slugs, naturalSlugs, and content-level redirects from preprocessed content files
 */
async function getContentData() {
  const contentItems = [];
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
        const naturalSlug = extractFrontmatterField(content, 'naturalSlug');
        const redirect = extractFrontmatterField(content, 'redirect');

        if (slug && slug.length > 0) {
          // If this content has a redirect, add it to content redirects
          if (redirect) {
            const fromPath = `/${slug}/`.replace(/\/+/g, '/');
            const toPath = redirect.startsWith('/') ? redirect : `/${redirect}`;
            const normalizedTo = toPath.endsWith('/') ? toPath : `${toPath}/`;
            contentRedirects[fromPath] = normalizedTo;
          } else {
            // Only add to content items if it's not a redirect-only page
            contentItems.push({ slug, naturalSlug });
          }
        }
      }
    } catch {
      // Collection directory might not exist
    }
  }

  return { contentItems, contentRedirects };
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

  // Get all content slugs, naturalSlugs, and content-level redirects
  const { contentItems, contentRedirects } = await getContentData();
  console.log(`Found ${contentItems.length} content items`);

  // Count redirects by type
  let naturalCount = 0;
  let legacyCount = 0;

  for (const { slug, naturalSlug } of contentItems) {
    const canonicalPath = `/${slug}/`;

    // 1. Natural URL redirect: naturalSlug → normalized slug
    // (when the original folder name differs from the normalized canonical URL)
    if (naturalSlug && naturalSlug !== slug) {
      const naturalPath = `/${naturalSlug}/`;
      if (!redirects[naturalPath]) {
        redirects[naturalPath] = canonicalPath;
        naturalCount++;
      }
    }

    // 2. Legacy Gridsome URL redirect: legacy → normalized slug
    // Use the naturalSlug (original folder name) for Gridsome normalization,
    // since that's what Gridsome would have seen
    const sourceForLegacy = naturalSlug || slug;
    const legacySlug = legacyNormalize(sourceForLegacy);

    // Only add if legacy differs from canonical AND differs from natural
    // (to avoid duplicate redirects)
    if (legacySlug !== slug) {
      const legacyPath = `/${legacySlug}/`;
      if (!redirects[legacyPath]) {
        redirects[legacyPath] = canonicalPath;
        legacyCount++;
      }
    }
  }

  console.log(`Generated ${naturalCount} natural URL redirects (folder case → normalized)`);
  console.log(`Generated ${legacyCount} legacy Gridsome URL redirects`);

  // 3. Add content-level redirects (from redirect: frontmatter)
  const contentRedirectCount = Object.keys(contentRedirects).length;
  for (const [from, to] of Object.entries(contentRedirects)) {
    redirects[from] = to;
  }

  console.log(`Added ${contentRedirectCount} content-level redirects`);

  // 4. Add manual redirects from config.json
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
