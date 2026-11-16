import { describe, expect, it, vi } from 'vitest';
import { loadEmbeddedMarkdown, resolveEmbedUrl } from './markdown-embed';

const RAW = 'https://raw.githubusercontent.com/galaxyproject/example/main/doc.md';

function fakeFetch(body: string, status = 200) {
  return vi.fn(async () => new Response(body, { status })) as unknown as typeof fetch & ReturnType<typeof vi.fn>;
}

describe('resolveEmbedUrl', () => {
  it('accepts url, src and href, in that order', () => {
    expect(resolveEmbedUrl({ href: RAW })).toBe(RAW);
    expect(resolveEmbedUrl({ src: RAW, href: 'https://example.org/b.md' })).toBe(RAW);
    expect(resolveEmbedUrl({ url: RAW, src: 'https://example.org/b.md' })).toBe(RAW);
  });

  it('returns nothing without a URL or for a non-http(s) URL', () => {
    expect(resolveEmbedUrl({})).toBeUndefined();
    for (const href of [
      'javascript:alert(1)',
      'data:text/markdown,x',
      'file:///etc/passwd',
      '/local.md',
      '//evil.example/x',
    ]) {
      expect(resolveEmbedUrl({ href }), href).toBeUndefined();
    }
  });
});

describe('loadEmbeddedMarkdown', () => {
  it('renders the fetched Markdown', async () => {
    const fetchImpl = fakeFetch('## Methods\n\nSee [this script](https://github.com/x/y).');
    await expect(loadEmbeddedMarkdown(RAW, fetchImpl)).resolves.toBe(
      '<h2>Methods</h2>\n<p>See <a href="https://github.com/x/y">this script</a>.</p>\n'
    );
    expect(fetchImpl).toHaveBeenCalledWith(RAW);
  });

  it('sanitizes markup in the fetched document', async () => {
    const fetchImpl = fakeFetch('Hi <script>alert(1)</script><img src=x onerror=alert(1)> [x](javascript:alert(1))');
    await expect(loadEmbeddedMarkdown(RAW, fetchImpl)).resolves.toBe('<p>Hi <img src="x" /> x</p>\n');
  });

  it('rejects on an HTTP error status', async () => {
    await expect(loadEmbeddedMarkdown(RAW, fakeFetch('nope', 404))).rejects.toThrow('Failed to load: 404');
  });
});
