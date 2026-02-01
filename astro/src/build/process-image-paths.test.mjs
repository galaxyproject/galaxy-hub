import { describe, it, expect } from 'vitest';
import { processImagePaths } from './preprocess.mjs';

const slug = 'community/sig/microbial';

describe('processImagePaths', () => {
  it('rewrites markdown relative image paths', () => {
    const input = '![alt](pic.png)';
    const output = processImagePaths(input, slug);
    expect(output).toContain('![alt](/images/community/sig/microbial/pic.png)');
  });

  it('rewrites markdown absolute paths that start with the slug', () => {
    const input = '![alt](/community/sig/microbial/pic.png)';
    const output = processImagePaths(input, slug);
    expect(output).toContain('![alt](/images/community/sig/microbial/pic.png)');
  });

  it('rewrites HTML relative image paths', () => {
    const input = '<img src="nested/pic.png" alt="n">';
    const output = processImagePaths(input, slug);
    expect(output).toContain('<img src="/images/community/sig/microbial/nested/pic.png" alt="n">');
  });

  it('rewrites HTML absolute paths that start with the slug', () => {
    const input = '<img src="/community/sig/microbial/nested/pic.png" alt="n">';
    const output = processImagePaths(input, slug);
    expect(output).toContain('<img src="/images/community/sig/microbial/nested/pic.png" alt="n">');
  });

  it('does not touch external URLs', () => {
    const input = '![alt](https://example.com/pic.png)';
    const output = processImagePaths(input, slug);
    expect(output).toBe(input);
  });

  it('leaves absolute paths outside the slug untouched', () => {
    const input = '<img src="/shared/pic.png" />';
    const output = processImagePaths(input, slug);
    expect(output).toBe(input);
  });
});
