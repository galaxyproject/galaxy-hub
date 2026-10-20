/**
 * Build-time allowlist sanitizing for HTML that comes from synced data (Zotero BibTeX titles,
 * GTN CONTRIBUTORS.yaml bios) and is rendered with `set:html`, built on the `sanitize-html` package.
 *
 * Every option is set explicitly so that none of the package defaults (its broad tag list, `ftp:`
 * and `tel:` links, protocol-relative URLs) applies.
 */
import sanitize from 'sanitize-html';
import { HTTP_SCHEMES, LINK_SCHEMES, safeUrl } from './url';

export type SanitizeProfile = 'inline' | 'bio';

const SMALL_CAPS = 'font-variant: small-caps';

/** Keeps `href`/`src` only when `safeUrl` accepts it; sanitize-html alone lets relative URLs through. */
function urlAttrTransform(
  attr: string,
  schemes: readonly string[],
  keep: readonly string[] = []
): sanitize.Transformer {
  return (tagName, attribs) => {
    const out: sanitize.Attributes = {};
    const url = safeUrl(attribs[attr], schemes);
    if (url !== undefined) out[attr] = url;
    for (const name of keep) if (attribs[name] !== undefined) out[name] = attribs[name];
    return { tagName, attribs: out };
  };
}

/** Zotero writes small caps as `<scp>` or as a span style; every other inline style is dropped. */
const smallCapsSpan: sanitize.Transformer = (_tagName, attribs) => ({
  tagName: 'span',
  attribs: /font-variant\s*:\s*small-caps/i.test(attribs.style || '') ? { style: SMALL_CAPS } : {},
});

const INLINE_TAGS = ['b', 'em', 'i', 'span', 'strong', 'sub', 'sup', 'u'];
const BIO_TAGS = [
  ...INLINE_TAGS,
  'a',
  'blockquote',
  'br',
  'code',
  'del',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'ul',
];

/** Removed together with their content (a superset of the package's own list). */
const NON_TEXT_TAGS = [
  'iframe',
  'math',
  'noembed',
  'noframes',
  'noscript',
  'object',
  'option',
  'plaintext',
  'script',
  'style',
  'svg',
  'template',
  'textarea',
  'title',
  'xmp',
];

const COMMON: sanitize.IOptions = {
  disallowedTagsMode: 'discard',
  nonTextTags: NON_TEXT_TAGS,
  allowedClasses: {},
  allowedStyles: { span: { 'font-variant': [/^small-caps$/] } },
  parseStyleAttributes: true,
  allowedSchemes: [],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: false,
  allowedEmptyAttributes: ['alt'],
  selfClosing: ['br', 'hr', 'img'],
  allowVulnerableTags: false,
  enforceHtmlBoundary: false,
};

const OPTIONS: Record<SanitizeProfile, sanitize.IOptions> = {
  inline: {
    ...COMMON,
    allowedTags: INLINE_TAGS,
    allowedAttributes: { span: ['style'] },
    allowedSchemesByTag: {},
    // sanitize-html checks allowedTags against the transformed name, so `scp` itself is not listed.
    transformTags: {
      scp: () => ({ tagName: 'span', attribs: { style: SMALL_CAPS } }),
      span: smallCapsSpan,
    },
  },
  bio: {
    ...COMMON,
    allowedTags: BIO_TAGS,
    allowedAttributes: { a: ['href'], img: ['src', 'alt'], span: ['style'] },
    allowedSchemesByTag: { a: ['http', 'https', 'mailto'], img: ['http', 'https'] },
    transformTags: {
      scp: () => ({ tagName: 'span', attribs: { style: SMALL_CAPS } }),
      span: smallCapsSpan,
      a: urlAttrTransform('href', LINK_SCHEMES),
      img: urlAttrTransform('src', HTTP_SCHEMES, ['alt']),
    },
    // A link without a safe href is unwrapped (text kept); an image without a safe src is removed.
    exclusiveFilter: (frame) => {
      if (frame.tag === 'a' && !frame.attribs.href) return 'excludeTag';
      if (frame.tag === 'img' && !frame.attribs.src) return true;
      return false;
    },
  },
};

/** Sanitizes an HTML fragment against the allowlist of `profile`. */
export function sanitizeHtml(html: string, profile: SanitizeProfile): string {
  return sanitize(html, OPTIONS[profile]);
}
