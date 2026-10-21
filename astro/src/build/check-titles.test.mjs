import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { hasTitle, needsTitle, pageSlug, findUntitled, compareToBypass } from './check-titles.mjs';

describe('title lint helpers', () => {
  describe('hasTitle', () => {
    it('accepts a non-empty string title', () => {
      expect(hasTitle({ title: 'Galaxy' })).toBe(true);
    });

    it('rejects a missing, empty or blank title', () => {
      expect(hasTitle({})).toBe(false);
      expect(hasTitle({ title: '' })).toBe(false);
      expect(hasTitle({ title: '   ' })).toBe(false);
      expect(hasTitle({ title: null })).toBe(false);
    });
  });

  describe('needsTitle', () => {
    it('skips pages that redirect', () => {
      expect(needsTitle({ redirect: '/elsewhere/' }, 'page')).toBe(false);
      expect(needsTitle({ redirect: 'https://example.org/' }, 'page')).toBe(false);
      expect(needsTitle({}, 'page')).toBe(true);
    });

    it('checks pages whose redirect produces no redirect', () => {
      expect(needsTitle({ redirect: '   ' }, 'page')).toBe(true);
      expect(needsTitle({ redirect: true }, 'page')).toBe(true);
      expect(needsTitle({ redirect: '/page/' }, 'page')).toBe(true);
      expect(needsTitle({ redirect: 'ftp://example.org/file' }, 'page')).toBe(true);
    });
  });

  describe('pageSlug', () => {
    it('matches the slug preprocess gives the page', () => {
      expect(pageSlug('.')).toBe('home');
      expect(pageSlug('news/2024/2024-01-02-Post')).toBe('news/2024-01-02-post');
      expect(pageSlug('events/GCC2024')).toBe('events/gcc2024');
    });
  });

  describe('findUntitled', () => {
    let contentDir;

    const write = (relPath, raw) => {
      const filePath = path.join(contentDir, relPath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, raw);
    };

    beforeEach(() => {
      contentDir = fs.mkdtempSync(path.join(os.tmpdir(), 'check-titles-test-'));
    });

    afterEach(() => {
      fs.rmSync(contentDir, { recursive: true, force: true });
    });

    it('lists the directories of untitled pages, sorted', () => {
      write('titled/index.md', '---\ntitle: Titled\n---\nBody\n');
      write('untitled/index.md', 'Body\n');
      write('empty/index.md', '---\ntitle: ""\n---\nBody\n');
      write('events/gcc2099/venue/index.md', '---\nnav_title: Venue\n---\nBody\n');
      expect(findUntitled(contentDir).untitled).toEqual(['empty', 'events/gcc2099/venue', 'untitled']);
    });

    it('skips redirects, inserts and ignored directories', () => {
      write('moved/index.md', '---\nredirect: /elsewhere/\n---\n');
      write('page/insert.md', 'Insert body\n');
      write('0examples/sample/index.md', 'Body\n');
      write('other/Index.md', 'Insert body\n');
      expect(findUntitled(contentDir).untitled).toEqual([]);
    });

    it('reports pages whose front matter cannot be parsed', () => {
      write('broken/index.md', '---\ntitle: [unclosed\n---\nBody\n');
      const { untitled, unreadable } = findUntitled(contentDir);
      expect(untitled).toEqual([]);
      expect(unreadable.map((u) => u.path)).toEqual(['broken/index.md']);
    });
  });

  describe('compareToBypass', () => {
    it('flags untitled pages that are not bypassed', () => {
      const { missing, stale } = compareToBypass(['a', 'b'], new Set(['a']));
      expect(missing).toEqual(['b']);
      expect(stale).toEqual([]);
    });

    it('flags bypass entries that are no longer untitled', () => {
      const { missing, stale } = compareToBypass(['a'], new Set(['c', 'a', 'b']));
      expect(missing).toEqual([]);
      expect(stale).toEqual(['b', 'c']);
    });
  });
});
