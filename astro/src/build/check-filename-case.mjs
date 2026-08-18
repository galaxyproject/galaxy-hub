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
 * The base comes from LINT_BASE_REF (CI sets it to HEAD^1 -- the base branch
 * tip, since pull_request checkouts are the PR merge commit) or, for local
 * runs, is auto-detected against upstream/origin `main`. Either way the ref is
 * resolved through merge-base so a stale or branch-tip ref can't blame files
 * that landed on the base after this branch diverged. If no base can be found
 * the new-asset check is skipped with a notice; the collision check still
 * runs.
 *
 * Usage:
 *   node src/build/check-filename-case.mjs
 *   LINT_BASE_REF=<sha> node src/build/check-filename-case.mjs
 */

import { execFileSync } from 'child_process';
import { join, basename } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

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
  // \p{Lu} rather than [A-Z] so accented capitals (Ä.jpg) are caught too
  return /\p{Lu}/u.test(basename(p));
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

/** Resolve a base commit to diff against, or null if none is available. */
function resolveBaseRef() {
  const explicit = process.env.LINT_BASE_REF;
  const candidates = explicit && explicit.trim() ? [explicit.trim()] : ['upstream/main', 'origin/main', 'main'];
  for (const ref of candidates) {
    try {
      // merge-base, not the ref itself: a branch tip that moved after this
      // branch diverged would otherwise blame its new files on this branch
      return git(['merge-base', 'HEAD', ref]).toString().trim();
    } catch {
      // try next candidate
    }
  }
  return null;
}

/** Files added between `base` and the working tree. */
function listAddedFiles(base) {
  // --no-renames so `git mv keynote.jpg Keynote.jpg` counts as an add of the
  // new name instead of slipping through as a rename
  return splitNul(git(['diff', '--no-renames', '--diff-filter=A', '--name-only', '-z', base]));
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

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
