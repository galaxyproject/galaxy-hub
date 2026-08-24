import { describe, expect, it } from 'vitest';
export { detectSubsiteFromPath } from '../stores/subsiteStore';
import { detectSubsiteFromPath } from '../stores/subsiteStore';
import { navbarToSidebarNavigation } from './navbar';

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
      { label: 'News', href: '/eu/news/', external: false },
      { label: 'Events', href: '/events/', external: false },
      { label: 'Cite', href: '/eu/cite/', external: false },
    ]);
    expect(nav?.sections[0]).toEqual({
      title: 'Help',
      items: [
        { label: 'Training', href: '/learn/', external: false },
        { label: 'Forum', href: 'https://help.galaxyproject.org/', external: true },
      ],
    });
    expect(nav?.bottomLinks).toEqual([{ label: '@jxtx', href: 'https://jxtxfoundation.org/', external: true }]);
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

    expect(nav?.topLinks).toEqual([{ label: 'About', href: '/about/', external: false }]);
  });
});
