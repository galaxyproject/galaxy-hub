import { describe, expect, it } from 'vitest';
import { ALL_SUBSITE_IDS, contentMatchesSubsite, expandSubsites, normalizeSubsites } from './subsites';

describe('normalizeSubsites', () => {
  it('normalizes missing values to an empty list', () => {
    expect(normalizeSubsites(undefined)).toEqual([]);
    expect(normalizeSubsites(null)).toEqual([]);
    expect(normalizeSubsites('')).toEqual([]);
  });

  it('normalizes strings and arrays case-insensitively', () => {
    expect(normalizeSubsites(' EU ')).toEqual(['eu']);
    expect(normalizeSubsites(['Global', ' US ', 'all-EU'])).toEqual(['global', 'us', 'all-eu']);
  });
});

describe('contentMatchesSubsite', () => {
  it('treats missing or empty subsites as visible everywhere', () => {
    expect(contentMatchesSubsite([], 'eu')).toBe(true);
    expect(contentMatchesSubsite([], 'global')).toBe(true);
  });

  it('treats all as visible on every subsite', () => {
    expect(contentMatchesSubsite(['all'], 'global')).toBe(true);
    expect(contentMatchesSubsite(['all'], 'eu')).toBe(true);
    expect(contentMatchesSubsite(['all'], 'us')).toBe(true);
  });

  it('treats global as a regular subsite id', () => {
    expect(contentMatchesSubsite(['global', 'us'], 'global')).toBe(true);
    expect(contentMatchesSubsite(['global', 'us'], 'us')).toBe(true);
    expect(contentMatchesSubsite(['global', 'us'], 'eu')).toBe(false);
  });

  it('matches direct subsite ids case-insensitively', () => {
    expect(contentMatchesSubsite(['EU'], 'eu')).toBe(true);
    expect(contentMatchesSubsite(['eu'], 'EU')).toBe(true);
    expect(contentMatchesSubsite(['freiburg'], 'eu')).toBe(false);
  });

  it('matches all-eu only for EU-affiliated subsites', () => {
    expect(contentMatchesSubsite(['all-eu'], 'eu')).toBe(true);
    expect(contentMatchesSubsite(['all-eu'], 'freiburg')).toBe(true);
    expect(contentMatchesSubsite(['all-eu'], 'ifb')).toBe(true);
    expect(contentMatchesSubsite(['all-eu'], 'global')).toBe(false);
    expect(contentMatchesSubsite(['all-eu'], 'us')).toBe(false);
  });

  it('matches all-fr only for FR-affiliated subsites', () => {
    expect(contentMatchesSubsite(['all-fr'], 'fr')).toBe(true);
    expect(contentMatchesSubsite(['all-fr'], 'ifb')).toBe(true);
    expect(contentMatchesSubsite(['all-fr'], 'genouest')).toBe(true);
    expect(contentMatchesSubsite(['all-fr'], 'global')).toBe(false);
    expect(contentMatchesSubsite(['all-fr'], 'eu')).toBe(false);
  });

  it('keeps arbitrary tags as direct matches only', () => {
    expect(contentMatchesSubsite(['esg'], 'esg')).toBe(true);
    expect(contentMatchesSubsite(['esg'], 'eu')).toBe(false);
  });
});

describe('expandSubsites', () => {
  it('expands all to the configured subsite ids', () => {
    expect(expandSubsites(['all'])).toEqual(ALL_SUBSITE_IDS);
  });

  it('normalizes and returns non-all values unchanged', () => {
    expect(expandSubsites(['Global', ' US '])).toEqual(['global', 'us']);
  });
});
