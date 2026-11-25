import { describe, expect, it } from 'vitest';
import { groupProjectIndex, pageIndexItems, sortProjectIndex, type ProjectIndexItem } from './projectIndex';
import { parseProjectFacts } from './projectFacts';

describe('pageIndexItems', () => {
  const pages = [
    { slug: 'projects/vgp', title: 'The Vertebrate Genomes Project in Galaxy', description: ' Genomes ' },
    { slug: 'projects/brc', title: 'BRC Analytics', description: 'Pathogens', redirect: 'https://brc-analytics.org/' },
    { slug: 'projects/singlecell', redirect: '/community/sig/singlecell/' },
    { slug: 'projects/small-scale-admins', title: 'Admins', redirect: '/community/sig/small-scale-admins/' },
    { slug: 'projects/capquant', title: null },
    { slug: 'projects/covid19/analyses', title: 'Analyses' },
    { slug: 'community/sig', title: 'SIGs' },
  ];

  it('keeps titled top-level project pages and links external redirects', () => {
    expect(pageIndexItems(pages)).toEqual([
      {
        id: 'vgp',
        title: 'The Vertebrate Genomes Project in Galaxy',
        description: 'Genomes',
        href: '/projects/vgp/',
        external: false,
      },
      {
        id: 'brc',
        title: 'BRC Analytics',
        description: 'Pathogens',
        href: 'https://brc-analytics.org/',
        external: true,
      },
    ]);
  });
});

describe('sortProjectIndex', () => {
  const now = new Date('2026-10-29');
  const item = (id: string, title: string, extra: Partial<ProjectIndexItem> = {}): ProjectIndexItem => ({
    id,
    title,
    href: `/projects/${id}/`,
    external: false,
    ...extra,
  });

  it('puts running projects first, then other pages by title, then external sites, then ended ones', () => {
    const items = [
      item('brc', 'BRC Analytics', { external: true }),
      item('vgp', 'VGP'),
      item('esg', 'EuroScienceGateway', { facts: parseProjectFacts({ status: 'ended', start_date: '2022-09-01' }) }),
      item('covid19', 'COVID-19'),
      item('esg4stars', 'ESG4Stars', { facts: parseProjectFacts({ status: 'active', start_date: '2026-10-01' }) }),
    ];
    expect(sortProjectIndex(items, now).map((entry) => entry.id)).toEqual([
      'esg4stars',
      'covid19',
      'vgp',
      'brc',
      'esg',
    ]);
  });

  it('lists a running project before an ended one that started later', () => {
    const items = [
      item('later', 'Later', { facts: parseProjectFacts({ status: 'ended', start_date: '2027-01-01' }) }),
      item('running', 'Running', { facts: parseProjectFacts({ status: 'active', start_date: '2026-10-01' }) }),
    ];
    expect(sortProjectIndex(items, now).map((entry) => entry.id)).toEqual(['running', 'later']);
  });
});

describe('groupProjectIndex', () => {
  const now = new Date('2026-10-29');
  const item = (id: string, title: string, extra: Partial<ProjectIndexItem> = {}): ProjectIndexItem => ({
    id,
    title,
    href: `/projects/${id}/`,
    external: false,
    ...extra,
  });

  it('splits entries into the four groups, in display order', () => {
    const items = [
      item('brc', 'BRC Analytics', { external: true }),
      item('vgp', 'VGP'),
      item('esg', 'EuroScienceGateway', { facts: parseProjectFacts({ status: 'ended', start_date: '2022-09-01' }) }),
      item('esg4stars', 'ESG4Stars', { facts: parseProjectFacts({ status: 'active', start_date: '2026-10-01' }) }),
    ];
    expect(groupProjectIndex(items, now).map((group) => [group.key, group.items.map((entry) => entry.id)])).toEqual([
      ['active', ['esg4stars']],
      ['page', ['vgp']],
      ['external', ['brc']],
      ['ended', ['esg']],
    ]);
  });

  it('drops empty groups', () => {
    const items = [item('vgp', 'VGP'), item('covid19', 'COVID-19')];
    expect(groupProjectIndex(items, now).map((group) => group.key)).toEqual(['page']);
  });
});
