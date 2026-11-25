import { describe, it, expect } from 'vitest';
import { isLogoPath, platformInitials, scopeLabel } from './platformLabels';

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

describe('isLogoPath', () => {
  it('accepts a site path whose name says logo', () => {
    expect(isLogoPath('/images/logos/UseGalaxy.orgLogo600.png')).toBe(true);
    expect(isLogoPath('/images/use/mitolink/mitolink-logo.jpg')).toBe(true);
    expect(isLogoPath('/use/hcemm/hcemm-LOGO.png')).toBe(true);
  });

  it('rejects paths the browser reads as another host', () => {
    expect(isLogoPath('/\\evil.example/logo.png')).toBe(false);
    expect(isLogoPath('/\t/evil.example/logo.png')).toBe(false);
    expect(isLogoPath('/\n/evil.example/logo.png')).toBe(false);
    expect(isLogoPath('/\\/evil.example/logo.png')).toBe(false);
  });

  it('rejects figures, screenshots and anything that is not a site path', () => {
    expect(isLogoPath('/use/arga/arga-pipeline.png')).toBe(false);
    expect(isLogoPath('http://abims.sb-roscoff.fr/files/logos/abims-LD.png')).toBe(false);
    expect(isLogoPath('//cdn.example.org/logo.png')).toBe(false);
    expect(isLogoPath('')).toBe(false);
    expect(isLogoPath(null)).toBe(false);
    expect(isLogoPath(undefined)).toBe(false);
  });
});
