import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { servedImageCheck } from './publicImage';

describe('servedImageCheck', () => {
  let root: string;

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'public-image-'));
    fs.mkdirSync(path.join(root, 'images/news/a'), { recursive: true });
    fs.writeFileSync(path.join(root, 'images/news/a/small.png'), Buffer.alloc(10));
    fs.writeFileSync(path.join(root, 'images/news/a/with space.png'), Buffer.alloc(10));
    fs.writeFileSync(path.join(root, 'images/news/a/big.jpg'), Buffer.alloc(2048));
    fs.writeFileSync(path.join(root, 'outside.png'), Buffer.alloc(10));
  });

  afterAll(() => fs.rmSync(root, { recursive: true, force: true }));

  it('accepts a file that exists and fits the size cap', () => {
    const check = servedImageCheck(root, 1024);
    expect(check('/images/news/a/small.png')).toBe(true);
    expect(check('/images/news/a/with%20space.png')).toBe(true);
    expect(check('/images/news/a/small.png?v=1')).toBe(true);
  });

  it('rejects missing files, folders and files over the cap', () => {
    const check = servedImageCheck(root, 1024);
    expect(check('/images/news/a/gone.png')).toBe(false);
    expect(check('/images/news/a')).toBe(false);
    expect(check('/images/news/a/big.jpg')).toBe(false);
    expect(servedImageCheck(root, 4096)('/images/news/a/big.jpg')).toBe(true);
  });

  it('resolves dot segments like the browser and never leaves the public folder', () => {
    const check = servedImageCheck(root, 1024);
    expect(check('/images/news/a/../a/small.png')).toBe(true);
    expect(check('/images/news/b/../../news/a/gone.png')).toBe(false);
    expect(check('/../outside.png')).toBe(true);
    expect(servedImageCheck(path.join(root, 'images'), 1024)('/../outside.png')).toBe(false);
    expect(servedImageCheck(path.join(root, 'images'), 1024)('../outside.png')).toBe(false);
  });
});
