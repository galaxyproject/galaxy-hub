import { describe, it, expect } from 'vitest';
import { isSitemapExcludedUrl } from './sitemap-pages.mjs';

describe('isSitemapExcludedUrl', () => {
  it('leaves out the bare ESG4Stars overview, whose canonical page is the Hub one', () => {
    expect(isSitemapExcludedUrl('https://galaxyproject.org/bare/projects/esg4stars/')).toBe(true);
    expect(isSitemapExcludedUrl('https://galaxyproject.org/bare/projects/esg4stars')).toBe(true);
  });

  it('keeps the Hub page and other bare pages', () => {
    expect(isSitemapExcludedUrl('https://galaxyproject.org/projects/esg4stars/')).toBe(false);
    expect(isSitemapExcludedUrl('https://galaxyproject.org/bare/eu/news/')).toBe(false);
    expect(isSitemapExcludedUrl('https://galaxyproject.org/bare/projects/esg4stars/news/')).toBe(false);
  });

  it('leaves out each embeddable ESG4Stars part', () => {
    for (const part of ['head', 'pillars', 'architecture', 'partners', 'latest/news', 'latest/events']) {
      expect(isSitemapExcludedUrl(`https://galaxyproject.org/bare/projects/esg4stars/${part}/`)).toBe(true);
    }
  });
});
