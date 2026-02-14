import { describe, it, expect } from 'vitest';
import { processImagePaths } from './preprocess.mjs';

describe('processImagePaths', () => {
  const slug = 'events/gcc2024';

  describe('relative paths', () => {
    it('rewrites markdown image with relative src', () => {
      const input = '![logo](logo.png)';
      expect(processImagePaths(input, slug)).toBe('![logo](/images/events/gcc2024/logo.png)');
    });

    it('rewrites HTML img with relative src', () => {
      const input = '<img src="photo.jpg">';
      expect(processImagePaths(input, slug)).toBe('<img src="/images/events/gcc2024/photo.jpg">');
    });

    it('rewrites relative path with subdirectory', () => {
      const input = '![diagram](figures/arch.png)';
      expect(processImagePaths(input, slug)).toBe('![diagram](/images/events/gcc2024/figures/arch.png)');
    });
  });

  describe('absolute paths not under /images/', () => {
    it('prepends /images to absolute content path', () => {
      const input = '![logo](/events/GCC2011Logo400.png)';
      expect(processImagePaths(input, slug)).toBe('![logo](/images/events/GCC2011Logo400.png)');
    });

    it('prepends /images to /authnz/ path', () => {
      const input = '![aws](/authnz/cloud/aws/aws_01.png)';
      expect(processImagePaths(input, slug)).toBe('![aws](/images/authnz/cloud/aws/aws_01.png)');
    });

    it('prepends /images to /galaxy-team/ path', () => {
      const input = '<img src="/galaxy-team/johndavis.jpg">';
      expect(processImagePaths(input, slug)).toBe('<img src="/images/galaxy-team/johndavis.jpg">');
    });

    it('prepends /images to /use/ path', () => {
      const input = '![screenshot](/use/archive/workflow4metabolomics/workflow4metabolomics.png)';
      expect(processImagePaths(input, slug)).toBe(
        '![screenshot](/images/use/archive/workflow4metabolomics/workflow4metabolomics.png)'
      );
    });

    it('prepends /images to /news/ path', () => {
      const input = '![news](/news/2024-update/banner.png)';
      expect(processImagePaths(input, slug)).toBe('![news](/images/news/2024-update/banner.png)');
    });
  });

  describe('paths that should not be rewritten', () => {
    it('leaves external URLs unchanged', () => {
      const input = '![ext](https://example.com/image.png)';
      expect(processImagePaths(input, slug)).toBe(input);
    });

    it('leaves http URLs unchanged', () => {
      const input = '![ext](http://example.com/photo.jpg)';
      expect(processImagePaths(input, slug)).toBe(input);
    });

    it('leaves paths already under /images/ unchanged', () => {
      const input = '![ok](/images/events/gcc2024/logo.png)';
      expect(processImagePaths(input, slug)).toBe(input);
    });

    it('leaves /assets/ paths unchanged', () => {
      const input = '![asset](/assets/media/logo.svg)';
      expect(processImagePaths(input, slug)).toBe(input);
    });

    it('leaves /media/ paths unchanged', () => {
      const input = '<img src="/media/icons/brand.png">';
      expect(processImagePaths(input, slug)).toBe(input);
    });
  });

  describe('multiple images in content', () => {
    it('rewrites all images in mixed content', () => {
      const input = [
        '# Page Title',
        '![relative](photo.png)',
        'Some text here.',
        '![absolute](/events/banner.jpg)',
        '![external](https://cdn.example.com/img.png)',
        '![correct](/images/events/gcc2024/ok.png)',
        '<img src="inline.gif">',
      ].join('\n');

      const expected = [
        '# Page Title',
        '![relative](/images/events/gcc2024/photo.png)',
        'Some text here.',
        '![absolute](/images/events/banner.jpg)',
        '![external](https://cdn.example.com/img.png)',
        '![correct](/images/events/gcc2024/ok.png)',
        '<img src="/images/events/gcc2024/inline.gif">',
      ].join('\n');

      expect(processImagePaths(input, slug)).toBe(expected);
    });
  });

  describe('image extensions', () => {
    it('handles .webp extension', () => {
      const input = '![photo](hero.webp)';
      expect(processImagePaths(input, slug)).toBe('![photo](/images/events/gcc2024/hero.webp)');
    });

    it('handles .svg extension', () => {
      const input = '![icon](logo.svg)';
      expect(processImagePaths(input, slug)).toBe('![icon](/images/events/gcc2024/logo.svg)');
    });

    it('handles uppercase extensions', () => {
      const input = '![photo](photo.PNG)';
      expect(processImagePaths(input, slug)).toBe('![photo](/images/events/gcc2024/photo.PNG)');
    });
  });

  describe('markdown images with title/attributes', () => {
    it('preserves title text after src', () => {
      const input = '![alt](photo.png "A title")';
      expect(processImagePaths(input, slug)).toBe('![alt](/images/events/gcc2024/photo.png "A title")');
    });
  });
});
