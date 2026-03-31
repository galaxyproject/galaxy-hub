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
});
