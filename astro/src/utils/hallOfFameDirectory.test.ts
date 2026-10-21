import { describe, expect, it } from 'vitest';
import { addDirectoryContributor } from './hallOfFameDirectory';

describe('Hall of Fame directory', () => {
  it('omits opted-out credits from the linked directory and totals', () => {
    const contributors = new Map<string, { slug: string; name: string; count: number }>();
    for (const id of ['contributor1', 'an-example', 'bgruening', 'bgruening', 'deNBI']) {
      addDirectoryContributor(contributors, id);
    }
    expect([...contributors.keys()]).toEqual(['bgruening', 'denbi']);
    expect(contributors.get('bgruening')?.count).toBe(2);
    expect(contributors.get('denbi')?.count).toBe(1);
  });
});
