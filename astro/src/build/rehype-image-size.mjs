/**
 * Copy the HTML `height` attribute of content images into an inline style.
 *
 * Tailwind's Preflight ships `img, video { max-width: 100%; height: auto }`.
 * An author style sheet rule outranks a presentational attribute, so every
 * `<img ... height="100">` written in the content tree is rendered at the
 * image's intrinsic height instead of the requested one -- the EU storage page
 * asks for 100px illustrations and gets 665px ones. `height: revert-layer`
 * does not bring the attribute back (presentational hints sit below *all*
 * author rules, layered or not) and `attr(height px)` is Chromium-only, so the
 * attribute is mirrored into an inline style, which does outrank Preflight.
 *
 * `width` needs no such treatment: Preflight caps it with `max-width` but never
 * sets it, so the attribute still applies.
 *
 * Astro registers `rehype-raw` *after* the user rehype plugins, so inline HTML
 * from a `.md` file is still a `raw` string node here -- both node kinds are
 * handled.
 */

const IMG_TAG = /<img\b[^>]*>/gi;
const SIZE = /^\s*(\d+(?:\.\d+)?)\s*(?:px)?\s*$/;

/** Does this style attribute already pin a height? Then leave it alone. */
function hasHeightDecl(style) {
  return /(?:^|;)\s*height\s*:/i.test(style || '');
}

function sizeStyle(height, hasWidth) {
  const decls = [`height: ${height}px`];
  // Without a width the image would keep its intrinsic width and distort;
  // `auto` lets the aspect ratio drive it.
  if (!hasWidth) decls.push('width: auto');
  return decls.join('; ');
}

function mergeStyle(existing, addition) {
  const trimmed = (existing || '').trim();
  if (!trimmed) return addition;
  return trimmed.endsWith(';') ? `${trimmed} ${addition}` : `${trimmed}; ${addition}`;
}

/** hast element (MDX, or HTML already parsed upstream). */
function fixElement(node) {
  const props = node.properties;
  if (!props) return;
  const match = SIZE.exec(String(props.height ?? ''));
  if (!match) return;
  if (hasHeightDecl(props.style)) return;
  props.style = mergeStyle(props.style, sizeStyle(match[1], props.width != null && props.width !== ''));
}

const ATTR = (name) => new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i');

function attrValue(tag, name) {
  const m = ATTR(name).exec(tag);
  if (!m) return null;
  return m[1] ?? m[2] ?? m[3] ?? '';
}

/** Raw HTML string straight out of a `.md` file. */
function fixRawTag(tag) {
  const height = attrValue(tag, 'height');
  if (height === null) return tag;
  const match = SIZE.exec(height);
  if (!match) return tag;

  const style = attrValue(tag, 'style');
  if (hasHeightDecl(style)) return tag;

  const addition = sizeStyle(match[1], attrValue(tag, 'width') !== null);

  if (style === null) {
    // Insert before the tag's own closing bracket, self-closing or not.
    return tag.replace(/\s*(\/?>)$/, ` style="${addition}"$1`);
  }
  return tag.replace(ATTR('style'), `style="${mergeStyle(style, addition).replace(/"/g, '&quot;')}"`);
}

function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'img') fixElement(node);
  if (node.type === 'raw' && typeof node.value === 'string' && node.value.includes('<img')) {
    node.value = node.value.replace(IMG_TAG, fixRawTag);
  }
  if (Array.isArray(node.children)) for (const child of node.children) walk(child);
}

export default function rehypeImageSize() {
  return (tree) => walk(tree);
}
