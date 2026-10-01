#!/usr/bin/env node
/**
 * Checks that every content page (content/<path>/index.md) sets a non-empty
 * `title` in its front matter. Pages with a `redirect:` are skipped, as are
 * non-index markdown files (inserts) and anything preprocess ignores.
 *
 * Pages that were untitled when this check was added are listed in
 * content/.title-bypass. CI still passes for them, but the list may only
 * shrink: an entry whose page now has a title (or no longer exists) is
 * reported as stale and must be removed.
 *
 * Exits non-zero on any untitled page missing from the bypass list, or on any
 * stale bypass entry.
 *
 * Usage:
 *   node src/build/check-titles.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { CONTENT_IGNORE, deriveNewsNaturalSlug, normalizeSlug } from './preprocess.mjs';
import { contentRedirect } from './generate-redirects.mjs';

const root = join(fileURLToPath(import.meta.url), '../../../../content');

export function hasTitle(data) {
  return typeof data.title === 'string' && data.title.trim() !== '';
}

/** A page that redirects elsewhere needs no title. */
export function needsTitle(data, slug) {
  const redirect = typeof data.redirect === 'string' ? data.redirect.trim() : '';
  return !redirect || contentRedirect(slug, redirect) === null;
}

/** The normalized slug preprocess gives the page in `dir`. */
export function pageSlug(dir) {
  if (dir === '.') return 'home';
  return normalizeSlug(dir.startsWith('news/') ? deriveNewsNaturalSlug(dir) : dir);
}

/**
 * Content-relative directories of pages without a title, plus pages whose
 * front matter cannot be parsed, both sorted.
 */
export function findUntitled(contentDir) {
  const untitled = [];
  const unreadable = [];
  const files = globSync('**/index.md', {
    cwd: contentDir,
    ignore: CONTENT_IGNORE,
    nocase: false,
    posix: true,
  });
  for (const file of files) {
    let data;
    try {
      ({ data } = matter(readFileSync(join(contentDir, file), 'utf8')));
    } catch (error) {
      unreadable.push({ path: file, message: error.message });
      continue;
    }
    const dir = dirname(file);
    if (needsTitle(data, pageSlug(dir)) && !hasTitle(data)) {
      untitled.push(dir);
    }
  }
  untitled.sort();
  unreadable.sort((a, b) => a.path.localeCompare(b.path));
  return { untitled, unreadable };
}

/** Untitled pages not in the bypass list, and bypass entries that are no longer untitled. */
export function compareToBypass(untitled, bypassed) {
  const untitledSet = new Set(untitled);
  return {
    missing: untitled.filter((path) => !bypassed.has(path)),
    stale: [...bypassed].filter((path) => !untitledSet.has(path)).sort(),
  };
}

function main() {
  let bypassed = new Set();
  try {
    bypassed = new Set(JSON.parse(readFileSync(join(root, '.title-bypass'), 'utf8')));
  } catch {
    // No bypass file is fine — all untitled pages will be reported
  }

  const { untitled, unreadable } = findUntitled(root);
  const { missing, stale } = compareToBypass(untitled, bypassed);

  if (missing.length === 0 && stale.length === 0 && unreadable.length === 0) {
    const note = bypassed.size > 0 ? ` (${bypassed.size} listed in content/.title-bypass)` : '';
    console.log(`All content pages have a title${note}. ✓`);
    process.exit(0);
  }

  if (unreadable.length > 0) {
    console.error(`Found ${unreadable.length} page(s) whose front matter cannot be parsed:\n`);
    for (const { path, message } of unreadable) {
      console.error(`  ${path}`);
      console.error(`    ${message}`);
    }
    console.error('');
  }
  if (missing.length > 0) {
    console.error(`Found ${missing.length} page(s) without a title:\n`);
    for (const path of missing) {
      console.error(`  ${path}/index.md`);
    }
    console.error(`
To fix: add a \`title:\` to the page's front matter.
`);
  }
  if (stale.length > 0) {
    console.error(`Found ${stale.length} stale entr${stale.length === 1 ? 'y' : 'ies'} in content/.title-bypass:\n`);
    for (const path of stale) {
      console.error(`  ${path}`);
    }
    console.error(`
These pages now have a title or no longer exist: remove them from content/.title-bypass.
`);
  }
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
