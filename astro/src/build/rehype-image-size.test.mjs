import { describe, expect, it } from 'vitest';
import rehypeImageSize from './rehype-image-size.mjs';

/** Run the plugin over a hast-ish tree and hand it back. */
function run(tree) {
  rehypeImageSize()(tree);
  return tree;
}

function raw(value) {
  return run({ type: 'root', children: [{ type: 'raw', value }] }).children[0].value;
}

describe('rehypeImageSize', () => {
  it('mirrors a raw height attribute into an inline max-height', () => {
    expect(raw('<img src="/a.svg" height="100"/>')).toBe('<img src="/a.svg" height="100" style="max-height: 100px"/>');
  });

  it('reads a height with a px suffix', () => {
    expect(raw('<img src="/a.svg" height="40px">')).toBe('<img src="/a.svg" height="40px" style="max-height: 40px">');
  });

  it('leaves an image with a width attribute alone', () => {
    const tag = '<img src="/a.png" width="640" height="427">';
    expect(raw(tag)).toBe(tag);
    const percent = '<img src="/a.png" width="50%" height="427">';
    expect(raw(percent)).toBe(percent);
  });

  it('appends to an existing style attribute', () => {
    expect(raw('<img src="/a.svg" style="border: 0" height="40">')).toBe(
      '<img src="/a.svg" style="border: 0; max-height: 40px" height="40">'
    );
  });

  it('does not override a size the author already set in CSS', () => {
    for (const style of [
      'height: 3rem',
      'max-height: 3rem',
      'width: 200px',
      'max-width: 50%',
      'float: left; Height:3rem',
    ]) {
      const tag = `<img src="/a.svg" style="${style}" height="40">`;
      expect(raw(tag)).toBe(tag);
    }
  });

  it('ignores non-numeric heights', () => {
    for (const height of ['50%', 'auto']) {
      const tag = `<img src="/a.svg" height="${height}">`;
      expect(raw(tag)).toBe(tag);
    }
  });

  it('does not read data attributes as a height', () => {
    const tag = '<img src="/a.svg" data-height="40" data-width="9">';
    expect(raw(tag)).toBe(tag);
  });

  it('does not read query parameters in a src URL as attributes', () => {
    const badge = '<img src="https://img.shields.io/x?style=flat&height=20&width=5" height="20">';
    expect(raw(badge)).toBe(
      '<img src="https://img.shields.io/x?style=flat&height=20&width=5" height="20" style="max-height: 20px">'
    );
    const noHeight = '<img src="/a.png?height=20" alt="a">';
    expect(raw(noHeight)).toBe(noHeight);
  });

  it('keeps a quoted `>` inside the tag', () => {
    expect(raw('<img src="/a.svg" alt="a > b" height="30">')).toBe(
      '<img src="/a.svg" alt="a > b" height="30" style="max-height: 30px">'
    );
  });

  it('rewrites every image in a raw block', () => {
    const out = raw('<div><img src="/a.svg" height="10"><img src="/b.svg" height="20"></div>');
    expect(out).toContain('max-height: 10px');
    expect(out).toContain('max-height: 20px');
  });

  it('handles parsed elements too', () => {
    const tree = run({
      type: 'root',
      children: [
        { type: 'element', tagName: 'img', properties: { src: '/a.svg', height: 100 }, children: [] },
        { type: 'element', tagName: 'img', properties: { src: '/b.png', height: 100, width: 640 }, children: [] },
      ],
    });
    expect(tree.children[0].properties.style).toBe('max-height: 100px');
    expect(tree.children[1].properties.style).toBeUndefined();
  });

  it('leaves images without a height alone', () => {
    const tag = '<img src="/a.svg" width="200">';
    expect(raw(tag)).toBe(tag);
  });
});
