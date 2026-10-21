/**
 * Make content images honour the HTML `height` attribute.
 *
 * Tailwind's Preflight ships `img, video { max-width: 100%; height: auto }`.
 * An author style sheet rule outranks a presentational attribute, so every
 * `<img ... height="100">` written in the content tree is rendered at the
 * image's intrinsic height instead of the requested one -- the EU storage page
 * asks for 100px illustrations and gets them at their natural size.
 *
 * The attribute is mirrored into an inline `max-height`. Keeping `height: auto`
 * means `max-width: 100%` and `max-height` shrink the image together, so the
 * aspect ratio survives on narrow screens (a pinned `height` would squash it).
 * An image smaller than its `height` is not enlarged.
 *
 * An image with a `width` attribute is left alone: browsers derive its aspect
 * ratio from `width` and `height`, and Preflight's `height: auto` already
 * renders it correctly. So is one whose style sets `width`, `max-width`,
 * `height` or `max-height`, where a `max-height` would distort it.
 *
 * Astro registers `rehype-raw` *after* the user rehype plugins, so inline HTML
 * from a `.md` file is still a `raw` string node here. The plugin handles raw
 * nodes and parsed `img` elements.
 */

const IMG_TAG = /<img\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
const SIZE = /^\s*(\d+(?:\.\d+)?)\s*(?:px)?\s*$/;
const SIZING_DECL = /(?:^|;)\s*(?:max-)?(?:height|width)\s*:/i;

/** Style to add for these attribute values, or null to leave the image alone. */
function sizeStyle({ height, hasWidth, style }) {
  if (hasWidth) return null;
  const match = SIZE.exec(String(height ?? ''));
  if (!match || SIZING_DECL.test(style || '')) return null;
  return `max-height: ${match[1]}px`;
}

function mergeStyle(existing, addition) {
  const trimmed = (existing || '').trim();
  if (!trimmed) return addition;
  return trimmed.endsWith(';') ? `${trimmed} ${addition}` : `${trimmed}; ${addition}`;
}

/** hast element (HTML already parsed upstream). */
function fixElement(node) {
  const props = node.properties;
  if (!props) return;
  const addition = sizeStyle({
    height: props.height,
    hasWidth: props.width != null && props.width !== '',
    style: props.style,
  });
  if (addition) props.style = mergeStyle(props.style, addition);
}

/** One attribute: leading whitespace, name, optional quoted or bare value. */
const ATTR = /\s([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

/** Attributes of a raw tag by name. Scanning left to right keeps quoted values (a `src` URL) out of the way. */
function parseAttrs(tag) {
  const attrs = Object.create(null);
  for (const m of tag.matchAll(ATTR)) {
    const name = m[1].toLowerCase();
    attrs[name] ??= { value: m[2] ?? m[3] ?? m[4] ?? '', start: m.index, end: m.index + m[0].length };
  }
  return attrs;
}

/** Raw HTML string straight out of a `.md` file. */
function fixRawTag(tag) {
  const attrs = parseAttrs(tag);
  const style = attrs.style?.value ?? null;
  const addition = sizeStyle({ height: attrs.height?.value, hasWidth: 'width' in attrs, style });
  if (!addition) return tag;

  if (style === null) {
    // Insert before the tag's own closing bracket, self-closing or not.
    return tag.replace(/\s*(\/?>)$/, ` style="${addition}"$1`);
  }
  const { start, end } = attrs.style;
  return `${tag.slice(0, start)} style="${mergeStyle(style, addition).replace(/"/g, '&quot;')}"${tag.slice(end)}`;
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
