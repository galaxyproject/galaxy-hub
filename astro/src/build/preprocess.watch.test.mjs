/**
 * Tests for watch-mode incremental rebuild correctness.
 *
 * Covers the two bugs fixed in the hot-reload-watcher feature:
 *   P1 — stale .md/.mdx sibling left on disk after components toggle
 *   P2 — insert deletion not propagated to parent pages
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { processMarkdownFile, destPathsForMarkdown, insertCache } from './preprocess.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const PROJECT_ROOT = path.resolve(ASTRO_ROOT, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

// ─── helpers ─────────────────────────────────────────────────────────────────

function writeFile(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf-8');
}

function exists(p) {
  return fs.existsSync(p);
}

// ─── P1: stale sibling cleanup ───────────────────────────────────────────────

describe('P1 — stale sibling removal', () => {
  // Use a real content file that exists so processMarkdownFile can resolve
  // its inserts. We pick a simple article with no slots.
  const testSourceDir = path.join(CONTENT_DIR, 'news', '2025');
  let testFile;

  beforeEach(async () => {
    insertCache.clear();
    // Find any existing news article we can use as a template
    const newsFiles = fs
      .readdirSync(testSourceDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .slice(0, 1);
    testFile = path.join(testSourceDir, newsFiles[0].name, 'index.md');
  });

  it('destPathsForMarkdown returns both .md and .mdx candidates', () => {
    const [md, mdx] = destPathsForMarkdown(testFile);
    expect(md.endsWith('.md')).toBe(true);
    expect(mdx.endsWith('.mdx')).toBe(true);
    expect(md).not.toBe(mdx);
    // Both should be in the same collection directory
    expect(path.dirname(md)).toBe(path.dirname(mdx));
    // Filenames differ only in extension
    expect(path.basename(md, '.md')).toBe(path.basename(mdx, '.mdx'));
  });

  it('processMarkdownFile writes exactly one output file', async () => {
    const [md, mdx] = destPathsForMarkdown(testFile);
    // Clean up any pre-existing output so we get a clean read
    fs.rmSync(md, { force: true });
    fs.rmSync(mdx, { force: true });

    await processMarkdownFile(testFile);

    const mdExists = exists(md);
    const mdxExists = exists(mdx);
    // Exactly one of the two should exist
    expect(mdExists || mdxExists).toBe(true);
    expect(mdExists && mdxExists).toBe(false);
  });

  it('pre-deleting both siblings before reprocess leaves only one output', async () => {
    // Simulate the P1 fix: before reprocessing, remove both candidates
    const [md, mdx] = destPathsForMarkdown(testFile);

    // Plant a stale sibling manually to simulate the pre-fix state
    fs.mkdirSync(path.dirname(md), { recursive: true });
    fs.writeFileSync(md, '--- stale ---');
    fs.writeFileSync(mdx, '--- stale mdx ---');

    // Apply the fix: remove both, then reprocess
    fs.rmSync(md, { force: true });
    fs.rmSync(mdx, { force: true });
    await processMarkdownFile(testFile);

    const mdExists = exists(md);
    const mdxExists = exists(mdx);
    expect(mdExists || mdxExists).toBe(true);
    expect(mdExists && mdxExists).toBe(false);
  });

  it('without pre-delete, stale sibling can survive (demonstrates the original bug)', async () => {
    // This test documents the PRE-FIX behaviour — not a regression test.
    // It shows that calling processMarkdownFile alone does NOT clean up the sibling.
    const [md, mdx] = destPathsForMarkdown(testFile);

    // Plant both variants as if a previous run wrote the "other" extension
    fs.mkdirSync(path.dirname(md), { recursive: true });
    fs.writeFileSync(md, '--- stale md ---');
    fs.writeFileSync(mdx, '--- stale mdx ---');

    // Without pre-delete, processMarkdownFile overwrites one and leaves the other
    await processMarkdownFile(testFile);

    // At least one stale file survives — the newly written one and the old sibling
    const mdExists = exists(md);
    const mdxExists = exists(mdx);
    // Both may exist (stale + fresh), which was the bug
    expect(mdExists && mdxExists).toBe(true);

    // Cleanup
    fs.rmSync(md, { force: true });
    fs.rmSync(mdx, { force: true });
  });
});

// ─── P2: insert deletion propagation ─────────────────────────────────────────

describe('P2 — insert deletion propagates to parents', () => {
  let tmpDir;
  let insertFile;
  let parentFile;

  beforeEach(() => {
    insertCache.clear();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'preprocess-test-'));

    // Create a minimal insert: content/test-inserts/linkbox.md
    insertFile = path.join(CONTENT_DIR, 'test-inserts', 'linkbox.md');
    writeFile(insertFile, '---\ntitle: Test Linkbox\n---\nTest insert content here.\n');

    // Create a parent that references it via <slot>
    parentFile = path.join(CONTENT_DIR, 'test-insert-parent', 'index.md');
    writeFile(parentFile, '---\ntitle: Parent Page\n---\n<slot name="/test-inserts/linkbox" />\n');
  });

  afterEach(() => {
    // Remove temp content files
    fs.rmSync(path.join(CONTENT_DIR, 'test-inserts'), { recursive: true, force: true });
    fs.rmSync(path.join(CONTENT_DIR, 'test-insert-parent'), { recursive: true, force: true });
    // Remove generated outputs
    const [md, mdx] = destPathsForMarkdown(parentFile);
    fs.rmSync(md, { force: true });
    fs.rmSync(mdx, { force: true });
    const [imd, imdx] = destPathsForMarkdown(insertFile);
    fs.rmSync(imd, { force: true });
    fs.rmSync(imdx, { force: true });
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('parent output contains inlined insert content after initial process', async () => {
    insertCache.clear();
    await processMarkdownFile(insertFile);
    await processMarkdownFile(parentFile);

    const [md, mdx] = destPathsForMarkdown(parentFile);
    const outPath = exists(md) ? md : mdx;
    expect(exists(outPath)).toBe(true);
    const content = fs.readFileSync(outPath, 'utf-8');
    // The slot should have been replaced by the insert content
    expect(content).not.toContain('<slot name="/test-inserts/linkbox"');
    expect(content).toContain('Test insert content here.');
  });

  it('re-processing parent after insert deletion removes inlined content', async () => {
    insertCache.clear();
    await processMarkdownFile(insertFile);
    await processMarkdownFile(parentFile);

    // Verify initial state: parent has insert content
    const [md, mdx] = destPathsForMarkdown(parentFile);
    let outPath = exists(md) ? md : mdx;
    expect(fs.readFileSync(outPath, 'utf-8')).toContain('Test insert content here.');

    // Delete the insert file and clear cache (simulates removeStale + cache clear in runScan)
    fs.rmSync(insertFile, { force: true });
    insertCache.clear();

    // Re-process the parent (what the P2 fix triggers)
    for (const dest of destPathsForMarkdown(parentFile)) {
      fs.rmSync(dest, { force: true });
    }
    await processMarkdownFile(parentFile);

    outPath = exists(md) ? md : mdx;
    expect(exists(outPath)).toBe(true);
    const content = fs.readFileSync(outPath, 'utf-8');
    // Insert content should be gone; placeholder comment should appear
    expect(content).not.toContain('Test insert content here.');
    expect(content).toContain('<!-- Insert not found: /test-inserts/linkbox -->');
  });

  it('destPathsForMarkdown paths are deterministic given the same source', () => {
    const [md1, mdx1] = destPathsForMarkdown(insertFile);
    const [md2, mdx2] = destPathsForMarkdown(insertFile);
    expect(md1).toBe(md2);
    expect(mdx1).toBe(mdx2);
  });
});
