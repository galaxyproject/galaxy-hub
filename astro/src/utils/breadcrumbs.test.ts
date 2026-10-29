import { describe, expect, it } from 'vitest';
import { articleCrumbs, ROOT_CRUMB } from './breadcrumbs';

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
