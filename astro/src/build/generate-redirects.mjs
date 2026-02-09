#!/usr/bin/env node
/**
 * Generate redirects for the Galaxy Hub Astro site
 *
 * Redirects come from two human-editable sources plus auto-generation:
 *
 * Human-editable (in content/redirects.yaml):
 *   - Simple redirects: exact path-to-path mappings
 *   - Pattern redirects: dynamic route patterns (e.g. /blog/[...slug] → /news/[...slug])
 *
 * Content-level (in individual content files):
 *   - Pages with `redirect:` frontmatter field
 *
 * Auto-generated (from slug normalization):
 *   1. Natural URL redirects: original folder name → normalized canonical URL
 *   2. Legacy Gridsome redirects: @sindresorhus/slugify style → normalized
 *   3. Case-insensitive redirects: all-lowercase folder name → normalized
 *
 * Output: generated-redirects.json with { redirects: {}, patterns: {} }
 * consumed by astro.config.mjs to generate 301 redirects.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import slugify from '@sindresorhus/slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const REDIRECTS_YAML_PATH = path.join(ASTRO_ROOT, '..', 'content', 'redirects.yaml');
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
          // Always track for natural/legacy/case-insensitive redirect generation
          contentItems.push({ slug, naturalSlug });

          // If this content has a local redirect, capture that mapping.
          // External URLs (https://...) can't be handled by Astro's redirect config,
          // so those are left for the page template to handle via meta refresh.
          if (redirect && !redirect.includes('://')) {
            const fromPath = `/${slug}/`.replace(/\/+/g, '/');
            const toPath = redirect.startsWith('/') ? redirect : `/${redirect}`;
            const normalizedTo = toPath.endsWith('/') ? toPath : `${toPath}/`;
            contentRedirects[fromPath] = normalizedTo;
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
 * Read redirect definitions from content/redirects.yaml
 */
async function getRedirectsYaml() {
  try {
    const raw = await fs.promises.readFile(REDIRECTS_YAML_PATH, 'utf-8');
    const data = parseYaml(raw);
    return {
      redirects: data?.redirects || {},
      patterns: data?.patterns || {},
    };
  } catch {
    return { redirects: {}, patterns: {} };
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

  // 3. Case-insensitive redirects: lowercase naturalSlug → canonical
  // Handles users typing URLs in all-lowercase (e.g. /events/gcc2024/ → /events/gcc-2024/)
  let caseInsensitiveCount = 0;
  for (const { slug, naturalSlug } of contentItems) {
    if (!naturalSlug) continue;
    const lowerSlug = naturalSlug.toLowerCase();
    if (lowerSlug !== slug && lowerSlug !== naturalSlug) {
      const lowerPath = `/${lowerSlug}/`;
      const canonicalPath = `/${slug}/`;
      if (!redirects[lowerPath]) {
        redirects[lowerPath] = canonicalPath;
        caseInsensitiveCount++;
      }
    }
  }

  console.log(`Generated ${naturalCount} natural URL redirects (folder case → normalized)`);
  console.log(`Generated ${legacyCount} legacy Gridsome URL redirects`);
  console.log(`Generated ${caseInsensitiveCount} case-insensitive redirects`);

  // 4. Add content-level redirects (from redirect: frontmatter)
  const contentRedirectCount = Object.keys(contentRedirects).length;
  for (const [from, to] of Object.entries(contentRedirects)) {
    redirects[from] = to;
  }

  console.log(`Added ${contentRedirectCount} content-level redirects`);

  // 5. Add redirects from content/redirects.yaml
  const yamlData = await getRedirectsYaml();
  const yamlRedirectCount = Object.keys(yamlData.redirects).length;
  const yamlPatternCount = Object.keys(yamlData.patterns).length;

  for (const [from, to] of Object.entries(yamlData.redirects)) {
    const fromPath = from.endsWith('/') ? from : `${from}/`;
    const toPath = to.endsWith('/') ? to : `${to}/`;
    redirects[fromPath] = toPath;
  }

  console.log(`Added ${yamlRedirectCount} redirects from redirects.yaml`);
  console.log(`Added ${yamlPatternCount} pattern redirects from redirects.yaml`);

  // 6. Resolve redirect chains so every source points directly to its final destination
  let chainsResolved = 0;
  for (const from of Object.keys(redirects)) {
    let target = redirects[from];
    let hops = 0;
    while (redirects[target] && hops < 10) {
      target = redirects[target];
      hops++;
    }
    if (hops > 0) {
      redirects[from] = target;
      chainsResolved++;
    }
  }

  if (chainsResolved > 0) {
    console.log(`Resolved ${chainsResolved} redirect chains`);
  }

  // Write to JSON file — includes both simple redirects and pattern redirects
  const output = {
    redirects,
    patterns: yamlData.patterns,
  };
  await fs.promises.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Total simple redirects: ${Object.keys(redirects).length}`);
  console.log(`Written to: ${OUTPUT_PATH}`);

  return output;
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
