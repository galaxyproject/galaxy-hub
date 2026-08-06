import { describe, it, expect } from 'vitest';
import { caseCollisions, isAssetPath, basenameHasUppercase, uppercaseAssets } from './check-filename-case.mjs';

describe('filename-case lint helpers', () => {
  describe('caseCollisions', () => {
    it('flags two paths that differ only in case', () => {
      const groups = caseCollisions([
        'content/images/events/gcc2026/Keynote.jpg',
        'content/images/events/gcc2026/keynote.jpg',
      ]);
      expect(groups).toEqual([
        ['content/images/events/gcc2026/Keynote.jpg', 'content/images/events/gcc2026/keynote.jpg'],
      ]);
    });

    it('flags directory-case collisions, not just filenames', () => {
      const groups = caseCollisions(['content/Foo/a.png', 'content/foo/a.png']);
      expect(groups).toEqual([['content/Foo/a.png', 'content/foo/a.png']]);
    });

    it('returns nothing when all paths are case-distinct', () => {
      expect(caseCollisions(['a/one.png', 'a/two.png', 'b/one.png'])).toEqual([]);
    });

    it('does not treat a path as colliding with itself', () => {
      expect(caseCollisions(['content/keynote.jpg', 'content/keynote.jpg'])).toEqual([]);
    });
  });

  describe('isAssetPath', () => {
    it('recognizes image and media extensions regardless of case', () => {
      expect(isAssetPath('content/x/Photo.JPG')).toBe(true);
      expect(isAssetPath('content/x/clip.mp4')).toBe(true);
      expect(isAssetPath('content/x/slides.pptx')).toBe(true);
    });

    it('ignores source/content files', () => {
      expect(isAssetPath('content/news/2026/post/index.md')).toBe(false);
      expect(isAssetPath('astro/src/build/thing.mjs')).toBe(false);
      expect(isAssetPath('content/x/data.yaml')).toBe(false);
    });

    it('ignores extensionless paths and dotfiles', () => {
      expect(isAssetPath('content/x/Makefile')).toBe(false);
      expect(isAssetPath('content/x/.slug-bypass')).toBe(false);
    });
  });

  describe('basenameHasUppercase', () => {
    it('looks only at the basename, not the directory', () => {
      expect(basenameHasUppercase('content/Legacy/keynote.jpg')).toBe(false);
      expect(basenameHasUppercase('content/legacy/Keynote.jpg')).toBe(true);
    });
  });

  describe('uppercaseAssets', () => {
    it('flags added assets with uppercase basenames and ignores the rest', () => {
      const flagged = uppercaseAssets([
        'content/images/events/gcc2026/Keynote.jpg', // asset, uppercase -> flagged
        'content/images/events/gcc2026/banner.png', // asset, lowercase -> ok
        'content/news/2026/GCC-Recap/index.md', // uppercase dir but .md, not an asset
        'content/x/Report.PDF', // asset, uppercase -> flagged
      ]);
      expect(flagged).toEqual(['content/images/events/gcc2026/Keynote.jpg', 'content/x/Report.PDF']);
    });
  });
});
