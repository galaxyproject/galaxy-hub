import { describe, expect, it } from 'vitest';
import { countByYear, matchesTerms, queryTerms, yearOf } from './listFilters';

describe('queryTerms', () => {
  it('lower-cases and splits on any whitespace', () => {
    expect(queryTerms('  Single\tCell  RNA ')).toEqual(['single', 'cell', 'rna']);
  });

  it('returns no terms for an empty or blank query', () => {
    expect(queryTerms('')).toEqual([]);
    expect(queryTerms('   ')).toEqual([]);
  });
});

describe('matchesTerms', () => {
  it('matches when every term appears, in any order', () => {
    expect(matchesTerms('galaxy training network', ['training', 'galaxy'])).toBe(true);
  });

  it('fails when one term is missing', () => {
    expect(matchesTerms('galaxy training network', ['galaxy', 'proteomics'])).toBe(false);
  });

  it('matches everything when there are no terms', () => {
    expect(matchesTerms('', [])).toBe(true);
  });
});

describe('countByYear', () => {
  const items = [
    { year: 2019, keep: true },
    { year: undefined, keep: true },
    { year: 2023, keep: false },
    { year: 2019, keep: false },
    { year: 2021, keep: true },
  ];

  it('lists every year newest first and skips items without one', () => {
    expect(countByYear(items, (item) => item.year)).toEqual([
      { year: 2023, count: 1 },
      { year: 2021, count: 1 },
      { year: 2019, count: 2 },
    ]);
  });

  it('keeps every year but counts only the included items', () => {
    expect(
      countByYear(
        items,
        (item) => item.year,
        (item) => item.keep
      )
    ).toEqual([
      { year: 2023, count: 0 },
      { year: 2021, count: 1 },
      { year: 2019, count: 1 },
    ]);
  });
});

describe('yearOf', () => {
  it('reads the UTC year of a date string or Date', () => {
    expect(yearOf('2020-06-01')).toBe(2020);
    expect(yearOf(new Date(Date.UTC(2019, 11, 31, 23, 30)))).toBe(2019);
    // Midnight UTC on New Year stays in the new year in every timezone
    expect(yearOf('2021-01-01T00:00:00Z')).toBe(2021);
  });

  it('returns null for a missing or invalid date', () => {
    expect(yearOf(undefined)).toBeNull();
    expect(yearOf(null)).toBeNull();
    expect(yearOf('')).toBeNull();
    expect(yearOf('not a date')).toBeNull();
  });
});
