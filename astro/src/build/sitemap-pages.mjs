/**
 * Built pages left out of the sitemap besides drafts: bare copies of Hub pages, which point search
 * engines at the Hub page with rel=canonical.
 */

export const SITEMAP_EXCLUDED_PATHS = new Set(['/bare/projects/esg4stars/']);

// True when a full page URL (as the sitemap integration passes it) is one of `excluded`.
export function isSitemapExcludedUrl(url, excluded = SITEMAP_EXCLUDED_PATHS) {
  const { pathname } = new URL(url);
  return excluded.has(pathname.endsWith('/') ? pathname : `${pathname}/`);
}
