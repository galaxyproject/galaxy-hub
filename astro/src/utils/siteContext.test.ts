import { describe, expect, it } from 'vitest';
import { contextFromPath, contextMenuGroups, contextPersistKey } from './siteContext';

describe('contextFromPath', () => {
  it('uses the region for region-prefixed URLs', () => {
    expect(contextFromPath('/freiburg/')).toEqual({
      id: 'freiburg',
      kind: 'region',
      name: 'Galaxy Freiburg',
      shortName: 'Freiburg',
      href: '/freiburg/',
    });
    expect(contextFromPath('/eu/news/2024-01-01-post/')).toMatchObject({ id: 'eu', kind: 'region' });
  });

  it('falls back to the global context for every other URL', () => {
    expect(contextFromPath('/news/')).toEqual({
      id: 'global',
      kind: 'global',
      name: 'Galaxy Project',
      shortName: 'Global',
      href: '/get-started/',
    });
    expect(contextFromPath('/')).toMatchObject({ id: 'global', kind: 'global' });
  });

  it('treats ESG pages as a project context', () => {
    expect(contextFromPath('/projects/esg/news/')).toEqual({
      id: 'esg',
      kind: 'project',
      name: 'EuroScienceGateway',
      shortName: 'ESG',
      href: '/projects/esg/',
    });
    expect(contextFromPath('/projects/esgx/')).toMatchObject({ kind: 'global' });
  });
});

describe('contextMenuGroups', () => {
  it('lists the global context, the hub regions and the external sites', () => {
    const groups = contextMenuGroups('freiburg');

    expect(groups.map((group) => group.label)).toEqual(['Global', 'Regions on this Hub', 'Other Galaxy sites']);
    expect(groups[0].items).toEqual([
      { id: 'global', name: 'Galaxy Project', meta: 'All regions', href: '/get-started/', current: false },
    ]);
    expect(groups[1].items.find((item) => item.id === 'freiburg')).toEqual({
      id: 'freiburg',
      name: 'Freiburg',
      meta: '/freiburg/',
      href: '/freiburg/',
      current: true,
    });
    expect(groups[1].items.filter((item) => item.current)).toHaveLength(1);
    expect(groups[2].items).toEqual([
      {
        id: 'au',
        name: 'Australia',
        meta: 'site.usegalaxy.org.au',
        href: 'https://site.usegalaxy.org.au',
        current: false,
        external: true,
      },
      {
        id: 'ca',
        name: 'Canada',
        meta: 'starthere.usegalaxy.ca',
        href: 'https://starthere.usegalaxy.ca',
        current: false,
        external: true,
      },
    ]);
  });

  it('marks nothing current in a project context', () => {
    const items = contextMenuGroups('esg').flatMap((group) => group.items);
    expect(items.some((item) => item.current)).toBe(false);
  });
});

describe('contextPersistKey', () => {
  it('keeps the sidebar only while the context stays the same', () => {
    expect(contextPersistKey('/freiburg/news/')).toBe(contextPersistKey('/freiburg/'));
    expect(contextPersistKey('/news/')).toBe(contextPersistKey('/community/'));
    expect(contextPersistKey('/freiburg/')).not.toBe(contextPersistKey('/news/'));
  });
});
