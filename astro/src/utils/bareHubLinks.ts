/**
 * Server-side link rewrite for bare copies of Hub pages. Bare pages sit in iframes on other sites, so
 * links rendered from shared components and Markdown (site paths like /projects/esg/) become absolute
 * Hub URLs and open in a new tab, as LatestNewsCard does by hand. setupBareLinkTargets still covers
 * links added in the browser.
 */
import { shouldOpenInNewTab } from './bare-links';

export const HUB_ORIGIN = 'https://galaxyproject.org';

/** `/path` -> `<origin>/path`; absolute, protocol-relative (`//host`), anchor and other hrefs are returned as is. */
export function absoluteHubHref(href: string, origin: string = HUB_ORIGIN): string {
  return href.startsWith('/') && !href.startsWith('//') ? `${origin}${href}` : href;
}

// A <script> or <style> element (kept as is: its text is not markup), or an opening <a> tag.
// Quoted attribute values may contain `>`.
const TAG_OR_RAW_TEXT =
  /(<(script|style)\b(?:[^>"']|"[^"]*"|'[^']*')*>[\s\S]*?<\/\2\s*>)|<a\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
// One attribute: its name, then an optional `=` and a double-quoted, single-quoted or bare value
const ATTRIBUTE = /([^\s"'<>/=]+)(?:(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

/** Rewrites one <a> tag's attributes by name; text inside another attribute's value is never an attribute. */
function rewriteAnchorAttributes(attrs: string, origin: string): string {
  let href: string | undefined;
  let hasTarget = false;
  let hasRel = false;
  for (const m of attrs.matchAll(ATTRIBUTE)) {
    const name = m[1].toLowerCase();
    if (name === 'href' && href === undefined) href = m[3] ?? m[4] ?? m[5] ?? '';
    else if (name === 'target') hasTarget = true;
    else if (name === 'rel') hasRel = true;
  }
  if (href === undefined) return attrs;

  const addTarget = !hasTarget && shouldOpenInNewTab(href);
  let hrefDone = false;
  let relDone = false;
  let next = attrs.replace(
    ATTRIBUTE,
    (attr: string, name: string, equals: string | undefined, dq?: string, sq?: string, bare?: string) => {
      const lower = name.toLowerCase();
      const quote = sq !== undefined ? "'" : '"';
      const value = dq ?? sq ?? bare ?? '';
      if (lower === 'href' && !hrefDone) {
        hrefDone = true;
        return `${name}${equals ?? '='}${quote}${absoluteHubHref(value, origin)}${quote}`;
      }
      if (lower === 'rel' && !relDone) {
        relDone = true;
        if (addTarget && !value.split(/\s+/).includes('noopener')) {
          return `${name}${equals ?? '='}${quote}${value ? `${value} ` : ''}noopener${quote}`;
        }
      }
      return attr;
    }
  );
  if (addTarget) next += hasRel ? ' target="_blank"' : ' target="_blank" rel="noopener"';
  return next;
}

/** Rewrites every <a> in rendered HTML: site paths absolute, and links that leave the page into a new tab. */
export function bareHubLinks(html: string, origin: string = HUB_ORIGIN): string {
  return html.replace(TAG_OR_RAW_TEXT, (match: string, rawText: string | undefined, _name, attrs: string) =>
    rawText === undefined ? `<a${rewriteAnchorAttributes(attrs, origin)}>` : match
  );
}
