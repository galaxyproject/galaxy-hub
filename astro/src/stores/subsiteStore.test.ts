import { describe, expect, it } from 'vitest';
import { getSubsiteStaticPaths, subsites } from './subsiteStore';

describe('European member subsites', () => {
  it('registers Galaxy France for native subsite routes', () => {
    expect(subsites).toContainEqual({
      id: 'ifb',
      name: 'France',
      path: '/ifb/',
    });
    expect(getSubsiteStaticPaths().map(({ params }) => params.subsite)).toContain('ifb');
  });
});
