#!/usr/bin/env node
/**
 * Guards against filename-case problems that break case-insensitive checkouts
 * (macOS APFS/HFS+, Windows NTFS default).
 *
 * Two checks:
 *
 * 1. Case-collision (always runs, repo-wide). Fails if any two tracked paths
 *    are equal when lowercased -- e.g. `Keynote.jpg` and `keynote.jpg` in the
 *    same directory. On a case-insensitive filesystem only one of the two
 *    actually lands in the working tree, git reports a permanent phantom
 *    modification, and branch switches flip which file is present. This is the
 *    exact class of bug that this lint exists to stop; it passes cleanly on a
 *    repo with no collisions.
 *
 * 2. New-asset lowercase (runs when a base ref is resolvable). Fails if this
 *    branch *adds* an asset file (image/media/doc) whose basename contains an
 *    uppercase letter. Existing files are grandfathered -- we only look at
 *    files added relative to the base -- so no mass rename is required. This is
 *    forward-only pressure toward lowercase asset names, which is what keeps
 *    collision #1 from recurring.
 *
 * The base ref comes from LINT_BASE_REF (set to the PR base SHA in CI) or, for
 * local runs, is auto-detected against upstream/origin `main`. If no base can
 * be found the new-asset check is skipped with a notice; the collision check
 * still runs.
 *
 * Usage:
 *   node src/build/check-filename-case.mjs
 *   LINT_BASE_REF=<sha> node src/build/check-filename-case.mjs
 */

import { execFileSync } from 'child_process';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';

const repoRoot = join(fileURLToPath(import.meta.url), '../../../..');

// Binary/media asset files where a lowercase-name convention is worth enforcing.
// Source/content types (.md, .html, .yaml, .astro, ...) are deliberately left
// out -- their naming is governed by the slug rules in check-dir-names.mjs.
export const ASSET_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  'webp',
  'avif',
  'ico',
  'bmp',
  'tif',
  'tiff',
  'pdf',
  'mp4',
  'webm',
  'mov',
  'm4v',
  'mp3',
  'wav',
  'key',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'doc',
  'docx',
  'zip',
  'heic',
]);

/**
 * Groups of tracked paths that collapse to the same lowercased path. Each group
 * has two or more distinct real paths that cannot coexist on a case-insensitive
 * filesystem.
 */
export function caseCollisions(paths) {
  const byLower = new Map();
  for (const p of paths) {
    const key = p.toLowerCase();
    let group = byLower.get(key);
    if (!group) {
      group = new Set();
      byLower.set(key, group);
    }
    group.add(p);
  }
  return [...byLower.values()].filter((group) => group.size > 1).map((group) => [...group].sort());
}

export function isAssetPath(p) {
  const name = basename(p);
  const dot = name.lastIndexOf('.');
  if (dot <= 0) return false; // no extension, or dotfile with no real ext
  return ASSET_EXTENSIONS.has(name.slice(dot + 1).toLowerCase());
}

export function basenameHasUppercase(p) {
  return /[A-Z]/.test(basename(p));
}

/** Added asset paths whose basename contains an uppercase letter. */
export function uppercaseAssets(addedPaths) {
  return addedPaths.filter((p) => isAssetPath(p) && basenameHasUppercase(p)).sort();
}

function git(args) {
  return execFileSync('git', args, { cwd: repoRoot, maxBuffer: 64 * 1024 * 1024 });
}

function splitNul(buf) {
  return buf
    .toString('utf8')
    .split('\0')
    .filter((s) => s.length > 0);
}

function listTrackedFiles() {
  return splitNul(git(['ls-files', '-z']));
}

/** Resolve a base ref to diff against, or null if none is available. */
function resolveBaseRef() {
  const explicit = process.env.LINT_BASE_REF;
  if (explicit && explicit.trim()) {
    try {
      return git(['rev-parse', '--verify', '--quiet', `${explicit.trim()}^{commit}`])
        .toString()
        .trim();
    } catch {
      // fall through to auto-detection
    }
  }
  for (const ref of ['upstream/main', 'origin/main', 'main']) {
    try {
      return git(['merge-base', 'HEAD', ref]).toString().trim();
    } catch {
      // try next candidate
    }
  }
  return null;
}

/** Files added between `base` and the working tree. */
function listAddedFiles(base) {
  return splitNul(git(['diff', '--diff-filter=A', '--name-only', '-z', base]));
}

function main() {
  const problems = [];

  const collisions = caseCollisions(listTrackedFiles());
  for (const group of collisions) {
    problems.push(`Case-only collision: ${group.join('  <=>  ')}`);
  }

  const base = resolveBaseRef();
  if (base) {
    const flagged = uppercaseAssets(listAddedFiles(base));
    for (const p of flagged) {
      problems.push(`New asset must be lowercase: ${p}`);
    }
  } else {
    console.log('Note: no base ref (LINT_BASE_REF / upstream|origin|main) — skipping new-asset lowercase check.');
  }

  if (problems.length === 0) {
    console.log('Filename case check passed. ✓');
    process.exit(0);
  }

  console.error(`Found ${problems.length} filename-case problem(s):\n`);
  for (const p of problems) {
    console.error(`  ${p}`);
  }
  console.error(`
Case-only collisions break on case-insensitive filesystems (macOS, Windows):
rename one side so the paths differ by more than case, and update references.
New asset files must use lowercase names (e.g. keynote.jpg, not Keynote.jpg).`);
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
