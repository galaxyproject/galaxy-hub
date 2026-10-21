import { describe, expect, it } from 'vitest';
import { resolveSupporters } from './supporters';

describe('resolveSupporters', () => {
  it('returns image and url for org supporters', async () => {
    const [supporter] = await resolveSupporters(['deNBI']);

    expect(supporter).toMatchObject({
      slug: 'denbi',
      name: 'de.NBI',
      image: expect.stringContaining('deNBI.png'),
      url: 'https://www.denbi.de/',
    });
  });

  it('falls back to the GitHub avatar when no explicit avatar exists', async () => {
    const [supporter] = await resolveSupporters(['deKCD']);

    expect(supporter).toMatchObject({
      slug: 'dekcd',
      name: 'de.KCD',
      image: 'https://github.com/deKCD.png',
      url: 'https://datenkompetenz.cloud',
    });
  });

  it('does not link opted-out organisations or grants to unpublished profiles', async () => {
    const [organisation, grant, eligible] = await resolveSupporters([
      'an-example',
      'an-example',
      'eurosciencegateway',
      'deNBI',
    ]);
    expect(organisation.name).toBeTruthy();
    expect(organisation.profileUrl).toBeUndefined();
    expect(grant.profileUrl).toBe('/hall-of-fame/eurosciencegateway/');
    expect(eligible.profileUrl).toBe('/hall-of-fame/denbi/');
  });
});
