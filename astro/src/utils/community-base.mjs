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

/**
 * Parse a hall-of-fame opt-out flag such as `gtn-halloffame` or `hub-halloffame`.
 */
export function parseHallOfFameFlag(flag, defaultValue = true) {
  if (flag === undefined || flag === null) return defaultValue;
  if (typeof flag === 'boolean') return flag;
  if (typeof flag === 'number') return flag !== 0;
  if (typeof flag === 'string') {
    const normalized = flag.trim().toLowerCase();
    if (!normalized) return false;
    if (['no', 'false', '0', 'off'].includes(normalized)) return false;
    return true;
  }
  return Boolean(flag);
}
