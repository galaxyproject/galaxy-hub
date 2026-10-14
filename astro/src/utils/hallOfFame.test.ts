import { describe, expect, it, vi } from 'vitest';

vi.mock('astro:content', () => ({
  getCollection: async (name: string) =>
    name === 'news' || name === 'articles'
      ? [
          {
            id: 'opt-out-credit',
            data: {
              title: 'A credited post',
              date: '2026-01-01',
              contributions: {
                organisers: ['contributor1', 'bgruening'],
                funding: ['an-example', 'deNBI'],
              },
            },
          },
        ]
      : [],
}));

import { getContributionIndex } from './hallOfFameIndex';
import { getHallOfFameSlugs } from './hallOfFame';

describe('Hall of Fame credited opt-outs', () => {
  it('does not create a profile or a discoverable slug for opted-out credits', async () => {
    const index = await getContributionIndex();
    const slugs = await getHallOfFameSlugs();
    expect(index.has('contributor1')).toBe(false);
    expect(index.has('an-example')).toBe(false);
    expect(slugs.has('contributor1')).toBe(false);
    expect(slugs.has('an-example')).toBe(false);
    expect(index.get('bgruening')?.contributions).toHaveLength(1);
    expect(slugs.has('bgruening')).toBe(true);
    expect(index.get('denbi')?.contributions).toHaveLength(1);
    expect(slugs.has('denbi')).toBe(true);
  });
});
