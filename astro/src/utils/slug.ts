import slugify from '@sindresorhus/slugify';

const slugifySegment = (segment: string) =>
  slugify(segment, {
    decamelize: true,
    separator: '-',
    preserveLeadingUnderscore: false,
  });

/**
 * Normalize slugs to the same shape produced during preprocessing:
 * - decamelize CamelCase -> camel-case
 * - force hyphens
 * - lower-case
 * - remove empty/duplicate separators
 */
export function normalizeSlug(slug: string | undefined | null): string {
  if (!slug) return '';

  return slug.split('/').filter(Boolean).map(slugifySegment).join('/').replace(/\/+$/, '');
}
