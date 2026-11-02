import { describe, expect, it, vi } from 'vitest';

vi.mock('astro:content', () => {
  const entries: Record<string, Array<{ id: string; data: Record<string, unknown> }>> = {
    news: [
      { id: 'live', data: { slug: 'news/live', date: '2020-01-02', tags: ['shared'], subsites: ['eu'] } },
      {
        id: 'draft',
        data: { slug: 'news/draft', date: '2020-01-03', tags: ['shared'], subsites: ['eu'], draft: true },
      },
    ],
    events: [
      { id: 'live', data: { slug: 'events/live', date: '2999-01-01', tags: ['shared'] } },
      { id: 'draft', data: { slug: 'events/draft', date: '2999-01-02', tags: ['shared'], draft: true } },
    ],
  };
  return {
    getCollection: async (name: string, filter: (entry: unknown) => unknown = () => true) =>
      (entries[name] ?? []).filter(filter),
  };
});

import { getListedCollection, getPublishedNews, getUpcomingEvents } from './content';
import { getTagIndex } from './tagIndex';

const ids = (entries: Array<{ id: string }>) => entries.map((entry) => entry.id);

describe('getListedCollection', () => {
  it('leaves drafts out of a collection', async () => {
    expect(ids(await getListedCollection('news'))).toEqual(['live']);
  });

  it('applies an extra filter on top of the draft rule', async () => {
    expect(ids(await getListedCollection('events', (entry) => entry.data.slug === 'events/draft'))).toEqual([]);
  });
});

describe('listing helpers built on getListedCollection', () => {
  it('leave drafts out of news and event lists', async () => {
    expect(ids(await getPublishedNews('eu'))).toEqual(['live']);
    expect(ids(await getUpcomingEvents())).toEqual(['live']);
  });

  it('leave drafts out of the tag index', async () => {
    const profile = (await getTagIndex()).get('shared');
    expect(ids(profile?.news ?? [])).toEqual(['live']);
    expect(ids(profile?.events ?? [])).toEqual(['live']);
    expect(profile?.count).toBe(2);
  });
});
