import { normalizeSlug } from './slug';

export function normalizeRedirectTarget(raw?: string | null): string | null {
  if (!raw) return null;
  let target = String(raw).trim();
  if (!target) return null;

  // Try to parse URL to safely separate path, search, and hash.
  try {
    const parsed = new URL(target, 'http://local.test');
    const trimmedPath = parsed.pathname.replace(/^\/+|\/+$/g, '');
    // Normalize slugs so redirects follow the same lowercased paths generated at build time
    const normalizedPath = trimmedPath ? `/${normalizeSlug(trimmedPath)}/` : '/';
    return `${normalizedPath}${parsed.search}${parsed.hash}`;
  } catch (error) {
    console.warn('Could not parse redirect target', error);
  }

  // Fallback: strip domain parts so redirects stay relative in local and production deployments.
  try {
    if (target.startsWith('http://') || target.startsWith('https://')) {
      const parsed = new URL(target);
      target = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch (error) {
    console.warn('Could not parse redirect target', error);
  }

  if (!target.startsWith('/')) {
    target = `/${target}`;
  }

  // Normalize trailing slash to a single slash
  target = `${target.replace(/\/+$/, '')}/`;

  return target;
}

export function filterOutRedirects<T extends { data: { redirect?: string | null } }>(entries: T[]): T[] {
  return filterCollections(entries, { skipRedirects: true });
}

export function formatSlugPath(slug?: string | null): string {
  if (!slug) return '/';
  return `/${slug.replace(/^\/|\/$/g, '')}/`;
}

type FilterableEntry = { data: Record<string, any> };

type FilterOptions = {
  skipRedirects?: boolean;
  skipDrafts?: boolean;
  predicate?: (entry: FilterableEntry) => boolean;
};

/**
 * Central filtering helper for content collections.
 * Use skipRedirects/skipDrafts flags and an optional predicate for additional rules.
 */
export function filterCollections<T extends FilterableEntry>(entries: T[], options: FilterOptions = {}): T[] {
  const { skipRedirects = false, skipDrafts = false, predicate } = options;

  return entries.filter((entry) => {
    if (skipRedirects && entry.data.redirect) return false;
    if (skipDrafts && entry.data.draft) return false;
    if (predicate && !predicate(entry)) return false;
    return true;
  });
}
