import { describe, expect, it } from 'vitest';
import { getSubsiteStaticPaths, subsites } from './subsiteStore';

describe('European member subsites', () => {
  it('registers GenOuest for native subsite routes', () => {
    expect(subsites).toContainEqual({
      id: 'genouest',
      name: 'GenOuest',
      path: '/genouest/',
    });
    expect(getSubsiteStaticPaths().map(({ params }) => params.subsite)).toContain('genouest');
  });
});
