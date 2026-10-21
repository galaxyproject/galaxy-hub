import { describe, it, expect, vi } from 'vitest';
import { atomDate, buildAtomFeed, escapeXML, eventLinkFromSlug, expandFeedRoutes } from './feed';

describe('escapeXML', () => {
  it('escapes XML special characters', () => {
    expect(escapeXML('A & B < C > D " E \' F')).toBe('A &amp; B &lt; C &gt; D &quot; E &apos; F');
  });

  it('leaves plain text unchanged', () => {
    expect(escapeXML('plain text')).toBe('plain text');
  });
});

describe('atomDate', () => {
  it('formats Date values as ISO strings', () => {
    expect(atomDate(new Date('2025-06-15T12:00:00Z'))).toBe('2025-06-15T12:00:00.000Z');
  });

  it('accepts date strings', () => {
    expect(atomDate('2025-06-15T12:00:00Z')).toBe('2025-06-15T12:00:00.000Z');
  });

  it('falls back to the current time for missing values', () => {
    const before = new Date().toISOString();
    const value = atomDate(undefined);
    const after = new Date().toISOString();
    expect(value >= before && value <= after).toBe(true);
  });
});

describe('eventLinkFromSlug', () => {
  it('strips the events/ prefix and ensures a trailing slash', () => {
    expect(eventLinkFromSlug('events/gcc2026/')).toBe('/events/gcc2026/');
    expect(eventLinkFromSlug('events/gcc2026')).toBe('/events/gcc2026/');
  });

  it('leaves slugs without the events/ prefix in place', () => {
    expect(eventLinkFromSlug('some/page')).toBe('/events/some/page/');
  });
});

describe('buildAtomFeed', () => {
  it('renders feed metadata and entries', () => {
    const atom = buildAtomFeed({
      title: 'Galaxy Europe News',
      alternateUrl: 'https://galaxyproject.org/eu/news/',
      selfUrl: 'https://galaxyproject.org/eu/news/feed.atom',
      subtitle: 'News from the Galaxy Europe community',
      lastUpdated: new Date('2025-06-15T12:00:00Z'),
      entries: [
        {
          title: 'First & foremost',
          url: 'https://galaxyproject.org/news/first/',
          date: '2025-06-15T12:00:00Z',
          summary: 'A <summary>',
          categories: [{ term: 'news', label: 'News' }],
        },
        { title: 'Second', url: 'https://galaxyproject.org/news/second/', categories: [{ term: 'event' }] },
      ],
    });

    expect(atom.startsWith('<?xml version="1.0" encoding="utf-8"?>\n')).toBe(true);
    expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(atom).toContain('<id>https://galaxyproject.org/eu/news/feed.atom</id>');
    expect(atom).toContain('<title>Galaxy Europe News</title>');
    expect(atom).toContain('<updated>2025-06-15T12:00:00.000Z</updated>');
    expect(atom).toContain('<link rel="alternate" href="https://galaxyproject.org/eu/news/"/>');
    expect(atom).toContain('<link rel="self" href="https://galaxyproject.org/eu/news/feed.atom"/>');
    expect(atom).toContain('<subtitle>News from the Galaxy Europe community</subtitle>');
    expect(atom).toContain('<title>First &amp; foremost</title>');
    expect(atom).toContain('<category term="news" label="News"/>');
    expect(atom).toContain('<category term="event"/>');
    expect(atom).toContain('<summary>A &lt;summary&gt;</summary>');
    expect(atom).not.toContain('<summary></summary>');
    expect(atom.endsWith('</feed>')).toBe(true);
  });

  it('omits the subtitle when not given', () => {
    const atom = buildAtomFeed({
      title: 'A Feed',
      alternateUrl: 'https://galaxyproject.org/',
      selfUrl: 'https://galaxyproject.org/feed.atom',
      entries: [],
    });

    expect(atom).not.toContain('<subtitle>');
    expect(atom).not.toContain('<entry>');
  });
});

describe('expandFeedRoutes', () => {
  const toRoute = (modulePath: string): string | null => {
    const withoutPrefix = modulePath.replace(/^\.\.\//, '').replace(/\.(ts|js|mts|mjs)$/, '');
    if (!withoutPrefix.includes('/feed.')) return null;
    return `/${withoutPrefix}`;
  };

  it('returns static routes unchanged and expands dynamic ones via getStaticPaths', async () => {
    const modules = {
      '../news/feed.atom.ts': async () => ({}),
      '../tags/[tag]/feed.atom.ts': async () => ({
        getStaticPaths: async () => [{ params: { tag: 'esg4stars' } }, { params: { tag: 'webinar' } }],
      }),
      '../events/feed.json.ts': async () => ({}),
    };

    const routes = await expandFeedRoutes(modules, toRoute);

    expect(routes).toEqual([
      '/news/feed.atom',
      '/tags/esg4stars/feed.atom',
      '/tags/webinar/feed.atom',
      '/events/feed.json',
    ]);
  });

  it('skips non-feed modules and warns on failing dynamic loaders', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const modules = {
      '../feeds/index.astro': async () => ({}),
      '../tags/[tag]/feed.atom.ts': async () => {
        throw new Error('boom');
      },
    };

    const routes = await expandFeedRoutes(modules, toRoute);

    expect(routes).toEqual([]);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it('expands multiple dynamic segments and skips paths with undefined params', async () => {
    const modules = {
      '../[subsite]/[tag]/feed.atom.ts': async () => ({
        getStaticPaths: async () => [
          { params: { subsite: 'eu', tag: 'esg4stars' } },
          { params: { subsite: 'eu', tag: undefined } },
        ],
      }),
    };

    const routes = await expandFeedRoutes(modules, toRoute);

    expect(routes).toEqual(['/eu/esg4stars/feed.atom']);
  });
});
