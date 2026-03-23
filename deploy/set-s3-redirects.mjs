#!/usr/bin/env node
/**
 * After `aws s3 sync`, overwrite every Astro-generated meta-refresh redirect page
 * in S3 with an empty object that has `x-amz-website-redirect-location` set.
 * S3's website endpoint then returns a native 301 for those paths instead of
 * serving HTML.
 *
 * Reads the pre-computed redirect map from astro/src/build/generated-redirects.json
 * (populated from slug normalization, YAML redirects, and frontmatter redirects).
 *
 * Usage:
 *   S3_BUCKET=astro-hub node deploy/set-s3-redirects.mjs
 */

import { readFileSync } from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const execFileAsync = promisify(execFile);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { redirects } = JSON.parse(
  readFileSync(join(root, 'astro/src/build/generated-redirects.json'), 'utf8')
);

const bucket = process.env.S3_BUCKET;
if (!bucket) {
  console.error('S3_BUCKET environment variable is required');
  process.exit(1);
}

const CONCURRENCY = 20;

async function setRedirect(fromPath, toPath) {
  // /events/gcc2026/ → events/gcc2026/index.html
  const key = fromPath.replace(/^\//, '').replace(/\/$/, '') + '/index.html';
  try {
    await execFileAsync('aws', [
      's3api', 'put-object',
      '--bucket', bucket,
      '--key', key,
      '--website-redirect-location', toPath,
      '--content-length', '0',
    ]);
  } catch (err) {
    console.error(`\nFailed to set redirect ${fromPath} → ${toPath}: ${err.stderr || err.message}`);
    throw err;
  }
}

const entries = Object.entries(redirects);
console.log(`Setting ${entries.length} S3 redirect objects in bucket "${bucket}"...`);

let done = 0;
for (let i = 0; i < entries.length; i += CONCURRENCY) {
  const batch = entries.slice(i, i + CONCURRENCY);
  await Promise.all(batch.map(([from, to]) => setRedirect(from, to)));
  done += batch.length;
  process.stdout.write(`\r  ${done}/${entries.length}`);
}

console.log('\nDone.');
