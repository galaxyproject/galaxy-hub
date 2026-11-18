import { describe, it, expect } from 'vitest';
import { platformInitials, scopeLabel } from './platformLabels';

describe('scopeLabel', () => {
  it('names every scope slug the platforms use, in sentence case', () => {
    expect(['usegalaxy', 'domain', 'general', 'tool-publishing', 'academic-cloud'].map(scopeLabel)).toEqual([
      'UseGalaxy',
      'Domain specific',
      'General purpose',
      'Tool publishing',
      'Academic cloud',
    ]);
  });

  it('turns an unknown slug into readable text instead of showing it raw', () => {
    expect(scopeLabel('citizen-science')).toBe('Citizen science');
    expect(scopeLabel('teaching_labs')).toBe('Teaching labs');
  });
});

describe('platformInitials', () => {
  it('takes the first letters of the first two words', () => {
    expect(platformInitials('Galaxy Australia')).toBe('GA');
    expect(platformInitials('Mount Sinai Galaxy')).toBe('MS');
  });

  it('takes the first two characters of a single word', () => {
    expect(platformInitials('Migale')).toBe('MI');
    expect(platformInitials('UseGalaxy.eu')).toBe('US');
  });

  it('skips punctuation and falls back to a placeholder for an empty title', () => {
    expect(platformInitials('  (ELIXIR) - Italy ')).toBe('EI');
    expect(platformInitials('')).toBe('GX');
    expect(platformInitials('--')).toBe('GX');
  });
});
