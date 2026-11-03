import { describe, expect, it } from 'vitest';
export { detectSubsiteFromPath } from '../stores/subsiteStore';
import { detectSubsiteFromPath } from '../stores/subsiteStore';
import {
  getDefaultSidebarNavigation,
  groupSidebarNavigation,
  isCurrentPage,
  navbarToSidebarNavigation,
} from './navbar';

describe('navbar utilities', () => {
  it('detects a subsite from the pathname', () => {
    expect(detectSubsiteFromPath('/eu/news/')).toBe('eu');
    expect(detectSubsiteFromPath('/elixir-it/')).toBe('elixir-it');
    expect(detectSubsiteFromPath('/news/')).toBe('global');
  });

  it('maps navbar content into sidebar navigation and prefixes subsite-relative links', () => {
    const nav = navbarToSidebarNavigation(
      {
        left: [
          { label: 'News', target: 'news/', relativeTo: 'subsite' },
          { label: 'Events', target: '/events/' },
          { label: 'Cite', target: 'cite/', relativeTo: 'subsite' },
        ],
        right: [
          {
            label: 'Help',
            contents: [
              { label: 'Training', target: '/learn/' },
              { label: 'Forum', target: 'https://help.galaxyproject.org/' },
            ],
          },
          { label: '@jxtx', target: 'https://jxtxfoundation.org/' },
        ],
      },
      'eu'
    );

    expect(nav?.topLinks).toEqual([
      { label: 'News', href: '/eu/news/', external: false, scope: 'region' },
      { label: 'Events', href: '/events/', external: false, scope: 'global' },
      { label: 'Cite', href: '/eu/cite/', external: false, scope: 'region' },
    ]);
    expect(nav?.sections[0]).toEqual({
      title: 'Help',
      items: [
        { label: 'Training', href: '/learn/', external: false, scope: 'global' },
        { label: 'Forum', href: 'https://help.galaxyproject.org/', external: true, scope: 'global' },
      ],
    });
    expect(nav?.bottomLinks).toEqual([
      { label: '@jxtx', href: 'https://jxtxfoundation.org/', external: true, scope: 'global' },
    ]);
  });

  it('returns null when no navbar is available', () => {
    expect(navbarToSidebarNavigation(null, 'eu')).toBeNull();
  });

  it('does not prefix plain internal links without relativeTo subsite', () => {
    const nav = navbarToSidebarNavigation(
      {
        left: [{ label: 'About', target: '/about/' }],
      },
      'eu'
    );

    expect(nav?.topLinks).toEqual([{ label: 'About', href: '/about/', external: false, scope: 'global' }]);
  });

  it('scopes links that point into the current subsite as region links', () => {
    const nav = navbarToSidebarNavigation(
      {
        left: [
          { label: 'People', target: '/freiburg/people/' },
          { label: 'Elsewhere', target: '/eu/about/' },
          { label: 'Home', target: '/freiburg' },
        ],
      },
      'freiburg'
    );

    expect(nav?.topLinks.map((link) => link.scope)).toEqual(['region', 'global', 'region']);
    expect(
      navbarToSidebarNavigation({ left: [{ label: 'People', target: '/freiburg/people/' }] }, 'global')?.topLinks
    ).toEqual([{ label: 'People', href: '/freiburg/people/', external: false, scope: 'global' }]);
  });

  it('groups region links first and keeps the global sections', () => {
    const nav = navbarToSidebarNavigation(
      {
        left: [
          { label: 'News', target: 'news/', relativeTo: 'subsite' },
          { label: 'People', target: '/freiburg/people/' },
        ],
        right: [
          {
            label: 'About',
            contents: [
              { label: 'Jobs', target: '/careers/' },
              { label: 'Publications', target: '/freiburg/publications/' },
            ],
          },
          { label: 'Region only', contents: [{ label: 'Services', target: '/freiburg/services/' }] },
          { label: '@jxtx', target: 'https://jxtxfoundation.org/' },
        ],
      },
      'freiburg'
    );
    const groups = groupSidebarNavigation(nav!, 'freiburg');

    expect(groups.region.map((link) => [link.label, link.href])).toEqual([
      ['Overview', '/freiburg/'],
      ['News', '/freiburg/news/'],
      ['People', '/freiburg/people/'],
      ['Publications', '/freiburg/publications/'],
      ['Services', '/freiburg/services/'],
    ]);
    // A region navbar has no global top links: the global group falls back to the global News and Events
    expect(groups.global.topLinks.map((link) => link.href)).toEqual(['/news/', '/events/']);
    expect(groups.global.sections).toEqual([
      { title: 'About', items: [{ label: 'Jobs', href: '/careers/', external: false, scope: 'global' }] },
    ]);
    expect(groups.global.bottomLinks.map((link) => link.label)).toEqual(['@jxtx']);
  });

  it('starts the global group with the global News and Events when a region has other global links', () => {
    // Shaped like content/genouest/navbar.yml: region News/Events/People plus a cross-region Tools link
    const nav = navbarToSidebarNavigation(
      {
        left: [
          { label: 'News', target: 'news/', relativeTo: 'subsite' },
          { label: 'Events', target: 'events/', relativeTo: 'subsite' },
          { label: 'People', target: 'people/', relativeTo: 'subsite' },
          { label: 'Tools', target: '/eu/tools/' },
          { label: 'Global news again', target: '/news/' },
        ],
      },
      'genouest'
    );
    const groups = groupSidebarNavigation(nav!, 'genouest');

    expect(groups.region.map((link) => link.href)).toEqual([
      '/genouest/',
      '/genouest/news/',
      '/genouest/events/',
      '/genouest/people/',
    ]);
    expect(groups.global.topLinks.map((link) => [link.label, link.href])).toEqual([
      ['News', '/news/'],
      ['Events', '/events/'],
      ['Tools', '/eu/tools/'],
    ]);
  });

  it('does not add a second overview link when the navbar has one', () => {
    const nav = navbarToSidebarNavigation({ left: [{ label: 'Home', target: '/eu/' }] }, 'eu');
    expect(groupSidebarNavigation(nav!, 'eu').region.map((link) => link.label)).toEqual(['Home']);
  });

  it('has no region group on global pages', () => {
    const groups = groupSidebarNavigation(getDefaultSidebarNavigation(), 'global');
    expect(groups.region).toEqual([]);
    expect(groups.global).toEqual(getDefaultSidebarNavigation());
  });

  it('marks only the exact page as current', () => {
    expect(isCurrentPage('/news/', '/news/')).toBe(true);
    expect(isCurrentPage('/news/', '/news')).toBe(true);
    expect(isCurrentPage('/eu/news/', '/eu/news/')).toBe(true);
    expect(isCurrentPage('/news/', '/news/2024-01-01-post/')).toBe(false);
    expect(isCurrentPage('/', '/news/')).toBe(false);
    expect(isCurrentPage('https://help.galaxyproject.org/', '/')).toBe(false);
    expect(isCurrentPage('/community/#sigs', '/community/')).toBe(false);
    expect(isCurrentPage('/news/', undefined)).toBe(false);
  });
});
