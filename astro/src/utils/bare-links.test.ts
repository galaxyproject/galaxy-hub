import { describe, it, expect } from 'vitest';
import { shouldOpenInNewTab } from './bare-links';

describe('shouldOpenInNewTab', () => {
  it('forces Hub pages out of the embedding iframe', () => {
    expect(shouldOpenInNewTab('/eu/tools/')).toBe(true);
    expect(shouldOpenInNewTab('/eu/storage')).toBe(true);
  });

  it('forces absolute links out of the embedding iframe', () => {
    expect(shouldOpenInNewTab('https://usegalaxy.eu/')).toBe(true);
    expect(shouldOpenInNewTab('https://status.galaxyproject.org/')).toBe(true);
  });

  it('leaves in-page anchors alone', () => {
    expect(shouldOpenInNewTab('#our-data-policy')).toBe(false);
  });

  it('leaves protocol handlers alone', () => {
    expect(shouldOpenInNewTab('mailto:contact@usegalaxy.eu')).toBe(false);
    expect(shouldOpenInNewTab('tel:+4900000000')).toBe(false);
  });

  it('ignores empty and missing hrefs', () => {
    expect(shouldOpenInNewTab('')).toBe(false);
    expect(shouldOpenInNewTab('   ')).toBe(false);
    expect(shouldOpenInNewTab(null)).toBe(false);
    expect(shouldOpenInNewTab(undefined)).toBe(false);
  });
});
