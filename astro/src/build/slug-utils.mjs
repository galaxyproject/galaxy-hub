import slugOverrides from './slug-overrides.json' with { type: 'json' };

/**
 * Normalize a single path segment into a lowercase-hyphenated slug.
 *
 * Rules applied in order:
 *   1. Insert hyphen at lowercase→uppercase boundary (camelCase / PascalCase)
 *   2. Insert hyphen at end-of-uppercase-run→lowercase boundary
 *   3. Insert hyphen at letter→digit boundary
 *   4. Insert hyphen at digit→letter boundary
 *   5. Replace underscores with hyphens
 *   6. Lowercase everything
 *   7. Collapse consecutive hyphens
 *   8. Apply slug-overrides.json fixups for known edge cases
 *
 * Uppercase runs are NOT split internally — "RNA" stays "rna", not "rn-a".
 */
export function normalizeSlugSegment(segment) {
  let s = segment;

  s = s.replace(/([a-z])([A-Z])/g, '$1-$2');
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2');
  s = s.replace(/([a-zA-Z])(\d)/g, '$1-$2');
  s = s.replace(/(\d)([a-zA-Z])/g, '$1-$2');
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
