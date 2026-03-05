#!/usr/bin/env node
/**
 * Checks that all directory names under /content/ match their normalized slug form.
 *
 * Uses the same normalizeSlugSegment algorithm (and slug-overrides.json) as the
 * build pipeline, so whatever the build accepts is also what passes here.
 *
 * If a non-normalized directory name is intentional, add its content-relative
 * path to content/.slug-bypass to suppress the error. CI will still pass, but
 * the bypass list serves as an explicit acknowledgement of the exception.
 *
 * Exits non-zero if any unacknowledged mismatches are found.
 *
 * Usage:
 *   node src/build/check-dir-names.mjs
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { normalizeSlugSegment } from './slug-utils.mjs';

const root = join(fileURLToPath(import.meta.url), '../../../../content');

const bypassFile = join(root, '.slug-bypass');
let bypassed = new Set();
try {
  bypassed = new Set(JSON.parse(readFileSync(bypassFile, 'utf8')));
} catch {
  // No bypass file is fine — all violations will be reported
}

function check(dir, depth = 0, violations = []) {
  if (depth > 8) return violations;
  let entries;
  try { entries = readdirSync(dir); } catch { return violations; }
  for (const entry of entries) {
    if (entry.startsWith('.')) continue;
    const full = join(dir, entry);
    let isDir = false;
    try { isDir = statSync(full).isDirectory(); } catch { continue; }
    if (!isDir) continue;

    const rel = relative(root, full);
    const normalized = normalizeSlugSegment(entry);
    if (normalized !== entry && !bypassed.has(rel)) {
      violations.push({ path: rel, entry, normalized });
    }
    check(full, depth + 1, violations);
  }
  return violations;
}

const violations = check(root);

if (violations.length === 0) {
  console.log('All content directory names are normalized. ✓');
  process.exit(0);
} else {
  console.error(`Found ${violations.length} directory name(s) that don't match their normalized form:\n`);
  for (const { path, entry, normalized } of violations) {
    console.error(`  ${path}`);
    console.error(`    "${entry}" should be "${normalized}"`);
  }
  console.error(`
To fix: rename with \`git mv\` and add a redirect entry to content/redirects.yaml.
To intentionally keep the name: add the path to content/.slug-bypass.`);
  process.exit(1);
}
