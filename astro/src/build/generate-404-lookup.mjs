#!/usr/bin/env node
/**
 * Generate a lightweight slug-lookup file for the 404 page.
 *
 * Maps "skeleton" keys (alphanumeric + slashes only, lowercased) to
 * { path, title } so the 404 page can suggest the right destination
 * regardless of casing, hyphens, underscores, or camelCase differences.
 *
 * Output: public/404-lookup.json (~50-100KB gzipped)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const OUTPUT_PATH = path.join(ASTRO_ROOT, 'public/404-lookup.json');

/** Strip everything except lowercase letters, digits, and slashes. */
function skeleton(urlPath) {
  return urlPath
    .toLowerCase()
    .replace(/[^a-z0-9/]/g, '')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '');
}

function extractFrontmatterField(content, fieldName) {
  const singleLine = content.match(new RegExp(`^${fieldName}:\\s*([^\\n>|]+)$`, 'm'));
  if (singleLine) {
    const value = singleLine[1].trim().replace(/^['"]|['"]$/g, '');
    if (value && !value.startsWith('>') && !value.startsWith('|')) return value;
  }
  const multiLine = content.match(new RegExp(`^${fieldName}:\\s*[>|]-?\\s*\\n\\s+(.+)$`, 'm'));
  if (multiLine) return multiLine[1].trim();
  return null;
}

async function generate() {
  const lookup = {};
  const collections = ['events', 'articles', 'news', 'platforms', 'bare-articles'];

  for (const collection of collections) {
    const dir = path.join(CONTENT_DIR, collection);
    let files;
    try {
      files = await fs.promises.readdir(dir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

      const content = await fs.promises.readFile(path.join(dir, file), 'utf-8');
      const slug = extractFrontmatterField(content, 'slug');
      const title = extractFrontmatterField(content, 'title');
      const naturalSlug = extractFrontmatterField(content, 'naturalSlug');
      if (!slug) continue;

      const canonicalPath = `/${slug}/`;
      const entry = { p: canonicalPath, t: title || slug };

      // Index the canonical slug
      const key = skeleton(canonicalPath);
      if (!lookup[key]) lookup[key] = entry;

      // Also index the naturalSlug (original directory name) if different
      if (naturalSlug && naturalSlug !== slug) {
        const natKey = skeleton(`/${naturalSlug}/`);
        if (!lookup[natKey]) lookup[natKey] = entry;
      }
    }
  }

  await fs.promises.writeFile(OUTPUT_PATH, JSON.stringify(lookup));
  console.log(`404 lookup: ${Object.keys(lookup).length} entries → ${OUTPUT_PATH}`);
}

generate().catch((err) => {
  console.error('Error generating 404 lookup:', err);
  process.exit(1);
});
