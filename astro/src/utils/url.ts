/**
 * URL scheme allowlists for links built from synced, imported or fetched data. Dependency-free so
 * client components can use it without pulling the HTML sanitizer into their bundles.
 */

export const HTTP_SCHEMES = ['http:', 'https:'] as const;
export const LINK_SCHEMES = ['http:', 'https:', 'mailto:'] as const;

/** Placeholder origin for resolving relative links; `.invalid` never resolves. */
const RELATIVE_BASE = 'https://relative.invalid';

/**
 * Returns `url` unchanged when it is an absolute URL whose scheme is in `schemes`, else undefined.
 * Relative and protocol-relative URLs are rejected. The WHATWG URL parser strips the whitespace and
 * control characters browsers ignore, so `java\tscript:` is read as `javascript:`.
 */
export function safeUrl(url: unknown, schemes: readonly string[] = HTTP_SCHEMES): string | undefined {
  if (typeof url !== 'string' || !URL.canParse(url)) return undefined;
  return schemes.includes(new URL(url).protocol) ? url : undefined;
}

/**
 * Like `safeUrl`, but also keeps same-site relative links (`/path`, `page.html`, `#id`, `?q=`).
 * Absolute URLs are checked first, so a scheme hidden behind whitespace or control characters is
 * never mistaken for a relative path; protocol-relative URLs (`//host`) are rejected.
 */
export function safeHref(url: unknown, schemes: readonly string[] = LINK_SCHEMES): string | undefined {
  if (typeof url !== 'string' || !url.trim()) return undefined;
  if (URL.canParse(url)) return safeUrl(url, schemes);
  if (!URL.canParse(url, RELATIVE_BASE)) return undefined;
  return new URL(url, RELATIVE_BASE).origin === RELATIVE_BASE ? url : undefined;
}
