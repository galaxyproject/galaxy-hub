import { describe, it, expect } from 'vitest';
import { listImage } from './listImage';

describe('listImage', () => {
  it('prefers the frontmatter image', () => {
    expect(listImage('/images/news/a/lead.png', '![x](/images/news/a/body.png)')).toBe('/images/news/a/lead.png');
  });

  it('falls back to the first Markdown image in the body', () => {
    const body = 'Intro text.\n\n![Group photo](/images/news/a/group.jpg "Title")\n\n![second](/images/news/a/b.png)';
    expect(listImage(null, body)).toBe('/images/news/a/group.jpg');
  });

  it('reads an HTML img in the body', () => {
    expect(listImage(undefined, '<p>Hi</p>\n<img alt="" class="w-1/2" src="/images/news/a/fig.webp">')).toBe(
      '/images/news/a/fig.webp'
    );
  });

  it('takes whichever image comes first', () => {
    const body = '<img src="/images/a/first.png">\n\n![second](/images/a/second.png)';
    expect(listImage(null, body)).toBe('/images/a/first.png');
  });

  it('accepts angle-bracket Markdown destinations', () => {
    expect(listImage(null, '![x](</images/news/a/with space.png>)')).toBe('/images/news/a/with space.png');
  });

  it('skips images that are not served by the site', () => {
    expect(listImage(null, '![x](https://example.org/a.png)')).toBeUndefined();
    expect(listImage(null, '![x](//cdn.example.org/a.png)')).toBeUndefined();
    expect(listImage(null, '<img src="data:image/png;base64,AAAA">')).toBeUndefined();
    expect(listImage('https://example.org/lead.png', '![x](/images/a/b.png)')).toBe('/images/a/b.png');
  });

  it('skips non-image assets and missing bodies', () => {
    expect(listImage(null, '[slides](/images/a/talk.pdf)')).toBeUndefined();
    expect(listImage(null, '![x](/images/a/talk.pdf)')).toBeUndefined();
    expect(listImage('/images/a/f.pdf', undefined)).toBeUndefined();
    expect(listImage(null, undefined)).toBeUndefined();
    expect(listImage(null, 'No pictures here.')).toBeUndefined();
  });

  it('skips GIFs, which are often large animations', () => {
    expect(listImage('/images/a/anim.gif', '![x](/images/a/still.png)')).toBe('/images/a/still.png');
    expect(listImage(null, '![x](/images/a/anim.GIF)')).toBeUndefined();
  });

  it('moves on to the next candidate the predicate rejects', () => {
    const ok = (src: string) => !src.includes('missing');
    expect(listImage('/images/a/missing.png', '![x](/images/a/missing2.png) ![y](/images/a/here.png)', ok)).toBe(
      '/images/a/here.png'
    );
    expect(listImage('/images/a/missing.png', undefined, ok)).toBeUndefined();
  });
});
