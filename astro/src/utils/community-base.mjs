/**
 * Shared normalization helpers for community identifiers and frontmatter values.
 */
export function communitySlug(value) {
  const normalized = String(value || '')
    .trim()
    .replace(/^@/, '');
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert unknown values to a flat array of strings.
 * Handles arrays, objects with id/name/github/twitter fields, and primitives.
 */
export function toArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((v) => toArray(v));
  }
  if (typeof value === 'object') {
    const obj = value;
    if (obj.id) return [String(obj.id)];
    if (obj.name) return [String(obj.name)];
    if (obj.github) return [String(obj.github)];
    if (obj.twitter) return [String(obj.twitter)];
    return [];
  }
  return [String(value)];
}
