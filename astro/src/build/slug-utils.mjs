import slugOverrides from './slug-overrides.json' with { type: 'json' };

/**
 * Normalize a single path segment into a lowercase-hyphenated slug.
 *
 * Rules applied in order:
 *   1. Insert hyphen at lowercase→uppercase boundary (camelCase / PascalCase)
 *   2. Insert hyphen at end-of-uppercase-run→lowercase boundary
 *   3. Replace underscores with hyphens
 *   4. Lowercase everything
 *   5. Collapse consecutive hyphens
 *   6. Apply slug-overrides.json fixups for known edge cases
 *
 * Uppercase runs are NOT split internally — "RNA" stays "rna", not "rn-a".
 * Letter↔digit boundaries are intentionally NOT split — identifiers like
 * gcc2026, orf3a, ga4gh stay intact. Hand-curate redirects.yaml for any
 * specific cases that need redirecting.
 */
export function normalizeSlugSegment(segment) {
  let s = segment;

  s = s.replace(/([a-z])([A-Z])/g, '$1-$2');
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');
  s = s.replace(/_/g, '-');
  s = s.toLowerCase();
  s = s.replace(/-{2,}/g, '-');

  const sortedKeys = Object.keys(slugOverrides).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (s.includes(key)) {
      s = s.replaceAll(key, slugOverrides[key]);
    }
  }

  s = s.replace(/^-|-$/g, '');

  return s;
}

/**
 * Normalize a full slug path (e.g. "events/2024-01-12-PAG31").
 * Each segment is normalized independently; leading date prefixes (YYYY-MM-DD-)
 * pass through unchanged since they're already well-formed.
 */
export function normalizeSlug(slug) {
  return slug
    .split('/')
    .map((segment) => normalizeSlugSegment(segment))
    .join('/');
}
