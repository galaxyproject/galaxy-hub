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
  it('mirrors a raw height attribute into an inline style', () => {
    expect(raw('<img src="/a.svg" height="100"/>')).toBe(
      '<img src="/a.svg" height="100" style="height: 100px; width: auto"/>'
    );
  });

  it('leaves width to the attribute when one is present', () => {
    expect(raw('<img src="/a.png" width="50" height="50">')).toBe(
      '<img src="/a.png" width="50" height="50" style="height: 50px">'
    );
  });

  it('appends to an existing style attribute', () => {
    expect(raw('<img src="/a.svg" style="border: 0" height="40">')).toBe(
      '<img src="/a.svg" style="border: 0; height: 40px; width: auto" height="40">'
    );
  });

  it('does not override a height the author already set in CSS', () => {
    const tag = '<img src="/a.svg" style="height: 3rem" height="40">';
    expect(raw(tag)).toBe(tag);
  });

  it('ignores non-numeric heights', () => {
    const tag = '<img src="/a.svg" height="50%">';
    expect(raw(tag)).toBe(tag);
  });

  it('rewrites every image in a raw block', () => {
    const out = raw('<div><img src="/a.svg" height="10"><img src="/b.svg" height="20"></div>');
    expect(out).toContain('height: 10px');
    expect(out).toContain('height: 20px');
  });

  it('handles parsed elements too', () => {
    const tree = run({
      type: 'root',
      children: [{ type: 'element', tagName: 'img', properties: { src: '/a.svg', height: 100 }, children: [] }],
    });
    expect(tree.children[0].properties.style).toBe('height: 100px; width: auto');
  });

  it('leaves images without a height alone', () => {
    const tag = '<img src="/a.svg" width="200">';
    expect(raw(tag)).toBe(tag);
  });
});
