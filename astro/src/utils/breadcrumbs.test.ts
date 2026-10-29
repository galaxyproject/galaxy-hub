import { describe, expect, it } from 'vitest';
import { articleCrumbs, eventCrumbs, ROOT_CRUMB } from './breadcrumbs';

const titles = new Map([
  ['/community/', 'The Galaxy Community'],
  ['/community/governance/', 'Governance'],
  ['/eu/about/', 'About Galaxy Europe'],
]);

describe('articleCrumbs', () => {
  it('starts at the Galaxy Project home and ends with the page, unlinked', () => {
    expect(articleCrumbs('community', 'The Galaxy Community', titles)).toEqual([
      ROOT_CRUMB,
      { label: 'The Galaxy Community' },
    ]);
  });

  it('links every parent level that has a page', () => {
    expect(articleCrumbs('community/governance/committees', 'Committees', titles)).toEqual([
      ROOT_CRUMB,
      { label: 'The Galaxy Community', href: '/community/' },
      { label: 'Governance', href: '/community/governance/' },
      { label: 'Committees' },
    ]);
  });

  it('leaves out parent levels without a page instead of guessing a label', () => {
    expect(articleCrumbs('admin/training/2025', 'Admin training 2025', titles)).toEqual([
      ROOT_CRUMB,
      { label: 'Admin training 2025' },
    ]);
  });

  it('puts the region after the project home on region pages', () => {
    expect(articleCrumbs('eu/about/team', 'Team', titles)).toEqual([
      ROOT_CRUMB,
      { label: 'Galaxy Europe', href: '/eu/' },
      { label: 'About Galaxy Europe', href: '/eu/about/' },
      { label: 'Team' },
    ]);
    expect(articleCrumbs('freiburg/projects', 'Projects', titles)).toEqual([
      ROOT_CRUMB,
      { label: 'Galaxy Freiburg', href: '/freiburg/' },
      { label: 'Projects' },
    ]);
  });

  it('accepts slugs with leading or trailing slashes', () => {
    expect(articleCrumbs('/community/governance/', 'Governance', titles)).toEqual([
      ROOT_CRUMB,
      { label: 'The Galaxy Community', href: '/community/' },
      { label: 'Governance' },
    ]);
  });
});

describe('eventCrumbs', () => {
  const EVENTS = { label: 'Events', href: '/events/' };
  const eventPages = new Map([
    ['/events/gcc2012/', 'GCC2012'],
    ['/events/gcc2012/training-day/', 'GCC2012 Training Day'],
    ['/events/meetups/baltimore/', 'Baltimore Galaxy Meetup'],
  ]);

  it('puts an event under Events', () => {
    expect(eventCrumbs('events/2025-admin-training-brno', 'Admin training', eventPages)).toEqual([
      ROOT_CRUMB,
      EVENTS,
      { label: 'Admin training' },
    ]);
  });

  it('links every parent event page, the conference home included', () => {
    expect(eventCrumbs('events/gcc2012/training-day/ws5', 'Workshop 5', eventPages)).toEqual([
      ROOT_CRUMB,
      EVENTS,
      { label: 'GCC2012', href: '/events/gcc2012/' },
      { label: 'GCC2012 Training Day', href: '/events/gcc2012/training-day/' },
      { label: 'Workshop 5' },
    ]);
  });

  it('leaves out parent levels without a page', () => {
    expect(eventCrumbs('events/meetups/baltimore/2015-02-18', 'Meetup', eventPages)).toEqual([
      ROOT_CRUMB,
      EVENTS,
      { label: 'Baltimore Galaxy Meetup', href: '/events/meetups/baltimore/' },
      { label: 'Meetup' },
    ]);
  });
});
