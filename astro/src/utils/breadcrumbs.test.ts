import { describe, expect, it } from 'vitest';
import { breadcrumbJsonLd, readingTrail } from './breadcrumbs';

const titles = new Map([
  ['community', 'The Galaxy Community'],
  ['community/sig', 'Special Interest Groups'],
  ['community/sig/digital-humanities', 'Digital Humanities'],
]);

describe('readingTrail', () => {
  it('puts a news post under News', () => {
    expect(readingTrail('/news/2026-11-18-biohackathon-2026/', 'BioHackathon 2026', titles)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'News', href: '/news/' },
      { label: 'BioHackathon 2026' },
    ]);
  });

  it('puts an event under Events', () => {
    expect(readingTrail('/events/gcc2026/', 'GCC 2026', titles)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events/' },
      { label: 'GCC 2026' },
    ]);
  });

  it('links every ancestor that has a page of its own', () => {
    expect(readingTrail('/community/sig/digital-humanities/', 'Digital Humanities', titles)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'The Galaxy Community', href: '/community/' },
      { label: 'Special Interest Groups', href: '/community/sig/' },
      { label: 'Digital Humanities' },
    ]);
  });

  it('shows a level without a page as plain text from its folder name', () => {
    expect(readingTrail('/admin/galaxy-config/', 'Galaxy config', new Map())).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Admin' },
      { label: 'Galaxy config' },
    ]);
  });

  it('has only Home above a top-level page and nothing for the front page', () => {
    expect(readingTrail('/roadmap', 'Roadmap', titles)).toEqual([{ label: 'Home', href: '/' }, { label: 'Roadmap' }]);
    expect(readingTrail('/', 'Galaxy Hub', titles)).toEqual([]);
  });
});

describe('breadcrumbJsonLd', () => {
  it('lists linked items and the current page with absolute URLs', () => {
    const trail = [
      { label: 'Home', href: '/' },
      { label: 'Admin' },
      { label: 'News', href: '/news/' },
      { label: 'Post' },
    ];
    expect(breadcrumbJsonLd(trail, 'https://galaxyproject.org', '/news/post/')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://galaxyproject.org/' },
        { '@type': 'ListItem', position: 2, name: 'News', item: 'https://galaxyproject.org/news/' },
        { '@type': 'ListItem', position: 3, name: 'Post', item: 'https://galaxyproject.org/news/post/' },
      ],
    });
  });
});
