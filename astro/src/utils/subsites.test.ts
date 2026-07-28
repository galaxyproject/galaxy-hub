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
  it('keeps untagged content off every subsite', () => {
    expect(contentMatchesSubsite([], 'eu')).toBe(false);
    expect(contentMatchesSubsite([], 'global')).toBe(false);
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

  it('matches all-eu for every EU-affiliated subsite', () => {
    for (const subsite of ['eu', 'freiburg', 'erasmusmc', 'belgium', 'pasteur', 'elixir-it', 'ifb']) {
      expect(contentMatchesSubsite(['all-eu'], subsite)).toBe(true);
    }
  });

  it('does not match all-eu outside the EU group', () => {
    expect(contentMatchesSubsite(['all-eu'], 'global')).toBe(false);
    expect(contentMatchesSubsite(['all-eu'], 'us')).toBe(false);
    expect(contentMatchesSubsite(['all-eu'], 'genouest')).toBe(false);
  });

  it('treats all-fr as an ordinary tag, not a group', () => {
    expect(contentMatchesSubsite(['all-fr'], 'fr')).toBe(false);
    expect(contentMatchesSubsite(['all-fr'], 'ifb')).toBe(false);
    expect(contentMatchesSubsite(['all-fr'], 'genouest')).toBe(false);
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
