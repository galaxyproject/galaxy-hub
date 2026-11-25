import { describe, expect, it } from 'vitest';
import { matchesProjectSource, parseProjectSource } from './projectSource';

describe('parseProjectSource', () => {
  it('reads a subsite or a tag', () => {
    expect(parseProjectSource({ subsite: 'esg' })).toEqual({ subsite: 'esg' });
    expect(parseProjectSource({ tag: 'esg4stars' })).toEqual({ tag: 'esg4stars' });
    expect(parseProjectSource({ subsite: ' esg ', tag: 'esg4stars' })).toEqual({ subsite: 'esg', tag: 'esg4stars' });
  });

  it('is undefined without a subsite or tag', () => {
    expect(parseProjectSource(undefined)).toBeUndefined();
    expect(parseProjectSource('esg')).toBeUndefined();
    expect(parseProjectSource({ subsite: '', tag: 3 })).toBeUndefined();
  });
});

describe('matchesProjectSource', () => {
  it('matches the subsite in a list or a single value', () => {
    expect(matchesProjectSource({ subsites: ['global', 'esg'] }, { subsite: 'esg' })).toBe(true);
    expect(matchesProjectSource({ subsites: 'esg' }, { subsite: 'esg' })).toBe(true);
    expect(matchesProjectSource({ subsites: ['esg4stars'], tags: ['esg'] }, { subsite: 'esg' })).toBe(false);
  });

  it('matches the tag in a list or a single value', () => {
    expect(matchesProjectSource({ tags: ['conference', 'esg4stars'] }, { tag: 'esg4stars' })).toBe(true);
    expect(matchesProjectSource({ tags: 'esg4stars' }, { tag: 'esg4stars' })).toBe(true);
    // Related tags (esg4stars-s1) and subsites do not count as the tag
    expect(matchesProjectSource({ tags: ['esg4stars-s1'], subsites: ['esg4stars'] }, { tag: 'esg4stars' })).toBe(false);
  });

  it('matches either one when both are given', () => {
    const source = { subsite: 'esg', tag: 'esg4stars' };
    expect(matchesProjectSource({ subsites: ['esg'] }, source)).toBe(true);
    expect(matchesProjectSource({ tags: ['esg4stars'] }, source)).toBe(true);
    expect(matchesProjectSource({ tags: null, subsites: null }, source)).toBe(false);
  });
});
