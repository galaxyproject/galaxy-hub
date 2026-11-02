/**
 * URL paths of draft pages in the processed content (src/content), for the
 * build steps that list pages outside the content collections: the sitemap and
 * the 404 lookup. Drafts are still built; they are only left out of lists.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { globSync } from 'glob';
import { isDraft } from '../utils/publish-date.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_CONTENT_DIR = path.resolve(__dirname, '../content');

// Collections with pages of their own; inserts are only embedded in other pages.
const PAGE_COLLECTIONS = ['articles', 'news', 'events', 'platforms', 'bare-articles'];

export function collectDraftPaths(contentDir = ASTRO_CONTENT_DIR) {
  const paths = new Set();
  for (const collection of PAGE_COLLECTIONS) {
    const dir = path.join(contentDir, collection);
    if (!fs.existsSync(dir)) continue;
    for (const file of globSync('**/*.{md,mdx}', { cwd: dir, absolute: true })) {
      const { data } = matter(fs.readFileSync(file, 'utf-8'));
      if (data.slug && isDraft(data)) {
        paths.add(`/${String(data.slug).replace(/^\/+|\/+$/g, '')}/`);
      }
    }
  }
  return paths;
}

// True when a full page URL (as the sitemap integration passes it) is a draft page.
export function isDraftPageUrl(url, draftPaths) {
  const { pathname } = new URL(url);
  return draftPaths.has(pathname.endsWith('/') ? pathname : `${pathname}/`);
}
