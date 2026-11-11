import { describe, it, expect } from 'vitest';
import { countryName } from './countryName';

describe('countryName', () => {
  it('names the ISO 3166 codes of the partner list in English', () => {
    expect(['DE', 'ES', 'CZ', 'BE', 'FI', 'IT', 'FR', 'GB'].map(countryName)).toEqual([
      'Germany',
      'Spain',
      'Czechia',
      'Belgium',
      'Finland',
      'Italy',
      'France',
      'United Kingdom',
    ]);
  });

  it('accepts lower case and spaces around the code', () => {
    expect(countryName(' de ')).toBe('Germany');
  });

  it('keeps text that is not a two-letter code as written', () => {
    expect(countryName('Germany')).toBe('Germany');
    expect(countryName('')).toBe('');
  });
});
