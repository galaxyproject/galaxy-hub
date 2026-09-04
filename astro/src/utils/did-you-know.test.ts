import { describe, expect, it } from 'vitest';
import {
  pickRandom,
  pickWeightedIndex,
  filterBySubsite,
  sortItems,
  toSerializable,
  type DidYouKnowEntry,
} from './did-you-know';

function makeEntry(overrides: Partial<DidYouKnowEntry['data']> & { id?: string } = {}): DidYouKnowEntry {
  return {
    id: overrides.id ?? 'x',
    data: {
      title: 'Tip',
      tease: null,
      body: 'Body',
      subsites: ['all'],
      date: null,
      weight: null,
      images: null,
      links: null,
      ...overrides,
    },
  } as unknown as DidYouKnowEntry;
}

describe('pickRandom', () => {
  it('returns undefined for empty / nullish input', () => {
    expect(pickRandom([])).toBeUndefined();
    expect(pickRandom(null)).toBeUndefined();
    expect(pickRandom(undefined)).toBeUndefined();
  });

  it('returns the only element for a single-item array', () => {
    expect(pickRandom([42])).toBe(42);
  });

  it('returns an element of the array', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toContain(pickRandom(arr));
  });
});

describe('pickWeightedIndex', () => {
  it('returns 0 for an empty array', () => {
    expect(pickWeightedIndex([], () => 0.5)).toBe(0);
  });

  it('returns the only index for a single-item list', () => {
    expect(pickWeightedIndex([10], () => 0.5)).toBe(0);
  });

  it('picks proportionally to weight', () => {
    // weights [0, 10, 20]: total 30. r=0 → idx 1; r=9 → idx 1; r=10 → idx 2; r=29 → idx 2.
    expect(pickWeightedIndex([0, 10, 20], () => 0)).toBe(1);
    expect(pickWeightedIndex([0, 10, 20], () => 9 / 30)).toBe(1);
    expect(pickWeightedIndex([0, 10, 20], () => 10 / 30)).toBe(2);
    expect(pickWeightedIndex([0, 10, 20], () => 29 / 30)).toBe(2);
  });

  it('treats omitted/null weights as 1 (always sampleable)', () => {
    // weights [null, 0]: effective [1, 0], total 1. Any r in [0,1) → idx 0.
    expect(pickWeightedIndex([null, 0], () => 0)).toBe(0);
    expect(pickWeightedIndex([null, 0], () => 0.99)).toBe(0);
  });

  it('clamps negative weights to 0', () => {
    // weights [-5, 5]: effective [0, 5], total 5. r=0 → idx 1.
    expect(pickWeightedIndex([-5, 5], () => 0)).toBe(1);
    expect(pickWeightedIndex([-5, 5], () => 0.99)).toBe(1);
  });

  it('falls back to uniform when all effective weights are 0', () => {
    // all zero: uniform over 3 items. r=0 → idx 0; r=0.5 → idx 1; r=0.9 → idx 2.
    expect(pickWeightedIndex([0, 0, 0], () => 0)).toBe(0);
    expect(pickWeightedIndex([0, 0, 0], () => 0.5)).toBe(1);
    expect(pickWeightedIndex([0, 0, 0], () => 0.9)).toBe(2);
  });
});

describe('filterBySubsite', () => {
  it('keeps items tagged all for any subsite', () => {
    const items = [makeEntry({ id: 'a', subsites: ['all'] })];
    expect(filterBySubsite(items, 'eu')).toHaveLength(1);
    expect(filterBySubsite(items, 'us')).toHaveLength(1);
  });

  it('filters by explicit subsite membership', () => {
    const items = [
      makeEntry({ id: 'eu-only', subsites: ['eu'] }),
      makeEntry({ id: 'us-only', subsites: ['us'] }),
      makeEntry({ id: 'both', subsites: ['eu', 'us'] }),
    ];
    expect(filterBySubsite(items, 'eu').map((i) => i.id)).toEqual(['eu-only', 'both']);
    expect(filterBySubsite(items, 'us').map((i) => i.id)).toEqual(['us-only', 'both']);
  });

  it('excludes items not tagged for the subsite', () => {
    const items = [makeEntry({ id: 'eu-only', subsites: ['eu'] })];
    expect(filterBySubsite(items, 'us')).toHaveLength(0);
  });

  it('treats missing subsites as [all] (shows up everywhere)', () => {
    const items = [
      makeEntry({ id: 'undef', subsites: undefined as unknown as string[] }),
      makeEntry({ id: 'null', subsites: null as unknown as string[] }),
      makeEntry({ id: 'empty', subsites: [] }),
    ];
    expect(filterBySubsite(items, 'eu').map((i) => i.id)).toEqual(['undef', 'null', 'empty']);
    expect(filterBySubsite(items, 'us').map((i) => i.id)).toEqual(['undef', 'null', 'empty']);
  });
});

describe('sortItems', () => {
  it('sorts by descending weight, undefined weight last', () => {
    const items = [
      makeEntry({ id: 'c', weight: null }),
      makeEntry({ id: 'a', weight: 30 }),
      makeEntry({ id: 'b', weight: 10 }),
    ];
    expect(sortItems(items).map((i) => i.id)).toEqual(['a', 'b', 'c']);
  });

  it('breaks weight ties by descending date', () => {
    const items = [
      makeEntry({ id: 'old', weight: 10, date: new Date('2025-01-01') }),
      makeEntry({ id: 'new', weight: 10, date: new Date('2026-01-01') }),
    ];
    expect(sortItems(items).map((i) => i.id)).toEqual(['new', 'old']);
  });

  it('breaks remaining ties by id', () => {
    const items = [makeEntry({ id: 'z', weight: 10 }), makeEntry({ id: 'a', weight: 10 })];
    expect(sortItems(items).map((i) => i.id)).toEqual(['a', 'z']);
  });
});

describe('toSerializable', () => {
  it('serializes entry fields and defaults subsites to [all]', () => {
    const entry = makeEntry({ id: 'slug-1', title: 'T', body: 'B', tease: 'Tease' });
    const out = toSerializable(entry);
    expect(out.slug).toBe('slug-1');
    expect(out.title).toBe('T');
    expect(out.body).toBe('B');
    expect(out.tease).toBe('Tease');
    expect(out.subsites).toEqual(['all']);
  });

  it('formats Date to YYYY-MM-DD', () => {
    const entry = makeEntry({ id: 'x', date: new Date('2026-08-28T00:00:00Z') });
    expect(toSerializable(entry).date).toBe('2026-08-28');
  });

  it('passes through images and links', () => {
    const entry = makeEntry({
      id: 'x',
      images: [{ url: 'https://a.b/x.png', alt: 'An image' }],
      links: [{ url: 'https://a.b', text: 'A link' }],
    });
    const out = toSerializable(entry);
    expect(out.images).toEqual([{ url: 'https://a.b/x.png', alt: 'An image' }]);
    expect(out.links).toEqual([{ url: 'https://a.b', text: 'A link' }]);
  });
});
