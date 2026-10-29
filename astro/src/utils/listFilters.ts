/**
 * Shared matching helpers for list filters (news, events and citations).
 * Pure functions: the list component owns the state and the URL sync (`@/utils/urlFilters`).
 */

export interface YearCount {
  year: number;
  count: number;
}

/** UTC year of an item date (the year chips use UTC); `null` when the date is missing or invalid. */
export function yearOf(date: Date | string | null | undefined): number | null {
  if (!date) return null;
  const parsed = date instanceof Date ? date : new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getUTCFullYear();
}

/** Lower-cased words of a text query; a blank query has no terms. */
export function queryTerms(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/** True when every term appears in `text` (already lower-cased), in any order. */
export function matchesTerms(text: string, terms: string[]): boolean {
  return terms.every((term) => text.includes(term));
}

/**
 * Every year found in `items`, newest first, with the number of `include`d items per year.
 * Years whose items are all excluded stay listed with a count of 0, so the chips do not jump.
 */
export function countByYear<T>(
  items: T[],
  yearOf: (item: T) => number | null | undefined,
  include: (item: T) => boolean = () => true
): YearCount[] {
  const counts = new Map<number, number>();
  for (const item of items) {
    const year = yearOf(item);
    if (!year) continue;
    counts.set(year, (counts.get(year) ?? 0) + (include(item) ? 1 : 0));
  }
  return Array.from(counts, ([year, count]) => ({ year, count })).sort((a, b) => b.year - a.year);
}
