import { describe, expect, it } from 'vitest';
import { breadcrumbJsonLd, buildPageTitles, firstHeading, readingTrail } from './breadcrumbs';

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

  it('puts a sub-page of an event under the event, not directly under Events', () => {
    const events = new Map([
      ['events/gcc2025', 'Galaxy Community Conference 2025'],
      ['events/gcc2025/program', 'Program'],
    ]);
    expect(readingTrail('/events/gcc2025/program/', 'Program', events)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events/' },
      { label: 'Galaxy Community Conference 2025', href: '/events/gcc2025/' },
      { label: 'Program' },
    ]);
    expect(readingTrail('/events/gcc2025/program/schedule/', 'Schedule', events)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events/' },
      { label: 'Galaxy Community Conference 2025', href: '/events/gcc2025/' },
      { label: 'Program', href: '/events/gcc2025/program/' },
      { label: 'Schedule' },
    ]);
  });

  it('names a page without a title after its last folder, never dropping it, and keeps the parent a link', () => {
    const events = new Map([['events/gcc2025', 'Galaxy Community Conference 2025']]);
    expect(readingTrail('/events/gcc2025/organizers/', '', events)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events/' },
      { label: 'Galaxy Community Conference 2025', href: '/events/gcc2025/' },
      { label: 'Organizers' },
    ]);
  });

  it('keeps the current page when it is titled like its parent', () => {
    const pages = new Map([['jxtx', 'James Peter Taylor | 1979 - 2020']]);
    expect(readingTrail('/jxtx/bio/', 'James Peter Taylor | 1979 - 2020', pages)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'James Peter Taylor | 1979 - 2020', href: '/jxtx/' },
      { label: 'James Peter Taylor | 1979 - 2020' },
    ]);
  });

  it('shows an event folder that has no page as plain text', () => {
    expect(readingTrail('/events/gcc2025/talks/', 'Talks', new Map())).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events/' },
      { label: 'Gcc2025' },
      { label: 'Talks' },
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

  it('links an ancestor whose page has no title, labelled from its folder name', () => {
    const pages = new Map<string, string | null>([
      ['community/galaxy-admins', null],
      ['community/galaxy-admins/meetups', null],
      ['cloudman/aws', null],
    ]);
    expect(readingTrail('/community/galaxy-admins/meetups/2026/', 'Meetup 2026', pages)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Community' },
      { label: 'Galaxy admins', href: '/community/galaxy-admins/' },
      { label: 'Meetups', href: '/community/galaxy-admins/meetups/' },
      { label: 'Meetup 2026' },
    ]);
    expect(readingTrail('/cloudman/aws/setup/', 'Setup', pages)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Cloudman' },
      { label: 'AWS', href: '/cloudman/aws/' },
      { label: 'Setup' },
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

describe('firstHeading', () => {
  it('takes the first level-one heading as plain text', () => {
    expect(firstHeading('Intro\n\n# Wiki Page *Archive*\n\n## Later\n# Second')).toBe('Wiki Page Archive');
    expect(firstHeading('# The [Galaxy](/) Model #\n')).toBe('The Galaxy Model');
  });

  it('skips headings inside code fences and finds none in a body with only lower levels', () => {
    expect(firstHeading('```sh\n# a comment\n```\n\n# Real title')).toBe('Real title');
    expect(firstHeading('~~~\n# not a title\n~~~')).toBeUndefined();
    expect(firstHeading('## Only a section\n\ntext #hashtag')).toBeUndefined();
  });
});

describe('buildPageTitles', () => {
  it('prefers the front matter title, then the first heading, and keeps title-less pages as existing', () => {
    const pages = buildPageTitles([
      { slug: 'community', title: 'The Galaxy Community', body: '# Other' },
      { slug: '/archive/', body: '# Wiki Page Archive\n' },
      { slug: 'images', body: '## No top heading' },
      { slug: 'blank', title: '  ', body: '' },
    ]);
    expect(pages.get('community')).toBe('The Galaxy Community');
    expect(pages.get('archive')).toBe('Wiki Page Archive');
    expect(pages.get('images')).toBeNull();
    expect(pages.has('blank')).toBe(true);
  });

  it('adds pages routed by code, and a content page of the same slug wins', () => {
    const pages = buildPageTitles([{ slug: 'projects', title: 'All projects' }], {
      projects: 'Projects',
      '/eu/': 'Galaxy Europe',
    });
    expect(pages.get('eu')).toBe('Galaxy Europe');
    expect(pages.get('projects')).toBe('All projects');
  });

  it('links routed parents and title-less ones in a trail', () => {
    const pages = buildPageTitles([{ slug: 'archive', body: '# Wiki Page Archive' }], {
      projects: 'Projects',
      careers: 'Careers',
      eu: 'Galaxy Europe',
      'elixir-it': 'Galaxy ELIXIR-IT',
    });
    expect(readingTrail('/projects/vgp/', 'VGP', pages).map((c) => [c.label, c.href])).toEqual([
      ['Home', '/'],
      ['Projects', '/projects/'],
      ['VGP', undefined],
    ]);
    expect(readingTrail('/careers/2021-01-nmbu/', 'Job', pages)[1]).toEqual({ label: 'Careers', href: '/careers/' });
    expect(readingTrail('/archive/next-gen/', 'Next gen', pages)[1]).toEqual({
      label: 'Wiki Page Archive',
      href: '/archive/',
    });
    expect(readingTrail('/eu/about/', 'About', pages)[1]).toEqual({ label: 'Galaxy Europe', href: '/eu/' });
    expect(readingTrail('/elixir-it/news-x/', 'X', pages)[1]).toEqual({
      label: 'Galaxy ELIXIR-IT',
      href: '/elixir-it/',
    });
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

  it('lists the event a sub-page belongs to as its parent', () => {
    const events = new Map([['events/gcc2025', 'Galaxy Community Conference 2025']]);
    const trail = readingTrail('/events/gcc2025/program/', 'Program', events);
    expect(breadcrumbJsonLd(trail, 'https://galaxyproject.org', '/events/gcc2025/program/').itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://galaxyproject.org/' },
      { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://galaxyproject.org/events/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Galaxy Community Conference 2025',
        item: 'https://galaxyproject.org/events/gcc2025/',
      },
      { '@type': 'ListItem', position: 4, name: 'Program', item: 'https://galaxyproject.org/events/gcc2025/program/' },
    ]);
  });

  it('lists the current page last, with its own URL, when it has no title', () => {
    const events = new Map([['events/gcc2025', 'Galaxy Community Conference 2025']]);
    const trail = readingTrail('/events/gcc2025/organizers/', '', events);
    const items = breadcrumbJsonLd(trail, 'https://galaxyproject.org', '/events/gcc2025/organizers/').itemListElement;
    expect(items.map((item) => item.item)).toEqual([
      'https://galaxyproject.org/',
      'https://galaxyproject.org/events/',
      'https://galaxyproject.org/events/gcc2025/',
      'https://galaxyproject.org/events/gcc2025/organizers/',
    ]);
  });
});
