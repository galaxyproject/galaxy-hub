import { describe, expect, it } from 'vitest';
import { countByYear, matchesTerms, queryTerms } from './listFilters';

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
