import { describe, it, expect } from 'vitest';
import { processImagePaths, rewriteSrc } from './preprocess.mjs';

describe('rewriteSrc', () => {
  const slug = 'events/gcc-2024';

  it('normalizes directory segments in /images/ paths', () => {
    expect(rewriteSrc('/images/events/gcc2013/photos/Venue.jpg', slug)).toBe(
      '/images/events/gcc-2013/photos/Venue.jpg'
    );
  });

  it('leaves already-normalized /images/ paths unchanged', () => {
    expect(rewriteSrc('/images/events/gcc-2024/logo.png', slug)).toBe(
      '/images/events/gcc-2024/logo.png'
    );
  });

  it('normalizes absolute paths when prepending /images/', () => {
    expect(rewriteSrc('/events/gcc2013/photos/Venue.jpg', slug)).toBe(
      '/images/events/gcc-2013/photos/Venue.jpg'
    );
  });

  it('strips ./ prefix from relative paths', () => {
    expect(rewriteSrc('./video.mp4', slug)).toBe('/images/events/gcc-2024/video.mp4');
  });

  it('handles relative paths', () => {
    expect(rewriteSrc('logo.png', slug)).toBe('/images/events/gcc-2024/logo.png');
  });

  it('leaves external URLs unchanged', () => {
    expect(rewriteSrc('https://example.com/img.png', slug)).toBe('https://example.com/img.png');
  });

  it('leaves /assets/ paths unchanged', () => {
    expect(rewriteSrc('/assets/file.pdf', slug)).toBe('/assets/file.pdf');
  });

  it('leaves /media/ paths unchanged', () => {
    expect(rewriteSrc('/media/icons/brand.png', slug)).toBe('/media/icons/brand.png');
  });
});

describe('processImagePaths', () => {
  const slug = 'events/gcc-2024';

  describe('relative paths', () => {
    it('rewrites markdown image with relative src', () => {
      const input = '![logo](logo.png)';
      expect(processImagePaths(input, slug)).toBe('![logo](/images/events/gcc-2024/logo.png)');
    });

    it('rewrites HTML img with relative src', () => {
      const input = '<img src="photo.jpg">';
      expect(processImagePaths(input, slug)).toBe('<img src="/images/events/gcc-2024/photo.jpg">');
    });

    it('rewrites relative path with subdirectory', () => {
      const input = '![diagram](figures/arch.png)';
      expect(processImagePaths(input, slug)).toBe(
        '![diagram](/images/events/gcc-2024/figures/arch.png)'
      );
    });

    it('strips ./ prefix from relative paths', () => {
      const input = '<source src="./vizarr.mp4" type="video/mp4">';
      expect(processImagePaths(input, slug)).toBe(
        '<source src="/images/events/gcc-2024/vizarr.mp4" type="video/mp4">'
      );
    });
  });

  describe('absolute paths not under /images/', () => {
    it('prepends /images to absolute content path', () => {
      const input = '![logo](/events/GCC2011Logo400.png)';
      expect(processImagePaths(input, slug)).toBe('![logo](/images/events/GCC2011Logo400.png)');
    });

    it('normalizes directory segments when prepending /images', () => {
      const input = '<img src="/events/gcc2013/photos/Venue.jpg">';
      expect(processImagePaths(input, slug)).toBe(
        '<img src="/images/events/gcc-2013/photos/Venue.jpg">'
      );
    });

    it('prepends /images to /authnz/ path', () => {
      const input = '![aws](/authnz/cloud/aws/aws_01.png)';
      expect(processImagePaths(input, slug)).toBe('![aws](/images/authnz/cloud/aws/aws_01.png)');
    });

    it('prepends /images to /galaxy-team/ path', () => {
      const input = '<img src="/galaxy-team/johndavis.jpg">';
      expect(processImagePaths(input, slug)).toBe('<img src="/images/galaxy-team/johndavis.jpg">');
    });

    it('normalizes slug segments like workflow4metabolomics', () => {
      const input =
        '![screenshot](/use/archive/workflow4metabolomics/workflow4metabolomics.png)';
      expect(processImagePaths(input, slug)).toBe(
        '![screenshot](/images/use/archive/workflow-4-metabolomics/workflow4metabolomics.png)'
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

    it('leaves /assets/ paths unchanged', () => {
      const input = '![asset](/assets/media/logo.svg)';
      expect(processImagePaths(input, slug)).toBe(input);
    });

    it('leaves /media/ paths unchanged', () => {
      const input = '<img src="/media/icons/brand.png">';
      expect(processImagePaths(input, slug)).toBe(input);
    });
  });

  describe('/images/ path normalization', () => {
    it('normalizes slug segments in /images/ paths', () => {
      const input = '![ok](/images/events/gcc2013/logo.png)';
      expect(processImagePaths(input, slug)).toBe('![ok](/images/events/gcc-2013/logo.png)');
    });

    it('leaves already-normalized /images/ paths unchanged', () => {
      const input = '![ok](/images/events/gcc-2024/logo.png)';
      expect(processImagePaths(input, slug)).toBe(input);
    });
  });

  describe('anchor links to asset files', () => {
    it('rewrites a href pointing to local image', () => {
      const input = '<a href="/cloudman/getting-started/iam1.png"><img src="/cloudman/getting-started/iam1.png"></a>';
      expect(processImagePaths(input, slug)).toBe(
        '<a href="/images/cloudman/getting-started/iam1.png"><img src="/images/cloudman/getting-started/iam1.png"></a>'
      );
    });

    it('rewrites a href pointing to PDF', () => {
      const input = '<a href="slides.pdf">Download</a>';
      expect(processImagePaths(input, slug)).toBe(
        '<a href="/images/events/gcc-2024/slides.pdf">Download</a>'
      );
    });

    it('does not rewrite a href to HTML pages', () => {
      const input = '<a href="/events/gcc-2024/">GCC 2024</a>';
      expect(processImagePaths(input, slug)).toBe(input);
    });
  });

  describe('video and source tags', () => {
    it('rewrites source src for video', () => {
      const input = '<source src="./vizarr-visualization.mp4" type="video/mp4">';
      expect(processImagePaths(input, slug)).toBe(
        '<source src="/images/events/gcc-2024/vizarr-visualization.mp4" type="video/mp4">'
      );
    });

    it('rewrites video src', () => {
      const input = '<video src="demo.webm">';
      expect(processImagePaths(input, slug)).toBe(
        '<video src="/images/events/gcc-2024/demo.webm">'
      );
    });
  });

  describe('markdown links to asset files', () => {
    it('rewrites markdown link to GIF', () => {
      const input = '[Watch animation](/learn/privacy-features/set-perm.gif)';
      expect(processImagePaths(input, slug)).toBe(
        '[Watch animation](/images/learn/privacy-features/set-perm.gif)'
      );
    });

    it('rewrites markdown link to PDF', () => {
      const input = '[slides](EGD2023_slides.pdf)';
      expect(processImagePaths(input, slug)).toBe(
        '[slides](/images/events/gcc-2024/EGD2023_slides.pdf)'
      );
    });

    it('does not double-rewrite markdown images', () => {
      const input = '![logo](logo.png)';
      const result = processImagePaths(input, slug);
      expect(result).toBe('![logo](/images/events/gcc-2024/logo.png)');
      expect(result).not.toContain('/images/images/');
    });
  });

  describe('multiple references in content', () => {
    it('rewrites all reference types in mixed content', () => {
      const input = [
        '# Page Title',
        '![relative](photo.png)',
        'Some text here.',
        '![absolute](/events/banner.jpg)',
        '![external](https://cdn.example.com/img.png)',
        '![correct](/images/events/gcc-2024/ok.png)',
        '<img src="inline.gif">',
      ].join('\n');

      const expected = [
        '# Page Title',
        '![relative](/images/events/gcc-2024/photo.png)',
        'Some text here.',
        '![absolute](/images/events/banner.jpg)',
        '![external](https://cdn.example.com/img.png)',
        '![correct](/images/events/gcc-2024/ok.png)',
        '<img src="/images/events/gcc-2024/inline.gif">',
      ].join('\n');

      expect(processImagePaths(input, slug)).toBe(expected);
    });
  });

  describe('asset extensions', () => {
    it('handles .webp extension', () => {
      const input = '![photo](hero.webp)';
      expect(processImagePaths(input, slug)).toBe(
        '![photo](/images/events/gcc-2024/hero.webp)'
      );
    });

    it('handles .svg extension', () => {
      const input = '![icon](logo.svg)';
      expect(processImagePaths(input, slug)).toBe(
        '![icon](/images/events/gcc-2024/logo.svg)'
      );
    });

    it('handles uppercase extensions', () => {
      const input = '![photo](photo.PNG)';
      expect(processImagePaths(input, slug)).toBe(
        '![photo](/images/events/gcc-2024/photo.PNG)'
      );
    });

    it('handles .pdf extension', () => {
      const input = '[download](report.pdf)';
      expect(processImagePaths(input, slug)).toBe(
        '[download](/images/events/gcc-2024/report.pdf)'
      );
    });

    it('handles .mp4 extension', () => {
      const input = '<source src="demo.mp4" type="video/mp4">';
      expect(processImagePaths(input, slug)).toBe(
        '<source src="/images/events/gcc-2024/demo.mp4" type="video/mp4">'
      );
    });
  });

  describe('markdown images with title/attributes', () => {
    it('preserves title text after src', () => {
      const input = '![alt](photo.png "A title")';
      expect(processImagePaths(input, slug)).toBe(
        '![alt](/images/events/gcc-2024/photo.png "A title")'
      );
    });
  });
});
