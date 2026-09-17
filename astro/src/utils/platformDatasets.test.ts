import { describe, expect, it } from 'vitest';
import { loadReferenceNames, loadToolNames } from './platformDatasets';

describe('platformDatasets', () => {
  it('loads tool names for a platform slug with the use/ prefix', () => {
    expect(loadToolNames('use/usegalaxy-eu')).toContain('IEDB');
  });

  it('loads reference names for a platform slug with the use/ prefix', () => {
    expect(loadReferenceNames('use/usegalaxy-eu')).toContain('A. gambiae Oct. 2006 (AgamP3/anoGam3) (anoGam3)');
  });

  it('returns empty arrays for unknown platform slugs', () => {
    expect(loadToolNames('use/does-not-exist')).toEqual([]);
    expect(loadReferenceNames('use/does-not-exist')).toEqual([]);
  });
});
