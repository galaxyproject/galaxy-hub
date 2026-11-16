import { describe, expect, it, vi } from 'vitest';
import { resolveSupporters } from './supporters';

const UNSAFE_URLS: Record<string, string> = {
  'unsafe-js': 'javascript:alert(1)',
  'unsafe-upper': 'JAVASCRIPT:alert(1)',
  'unsafe-tab': 'java\tscript:alert(1)',
  'unsafe-data': 'data:text/html;base64,PHNjcmlwdD4=',
  'unsafe-vb': 'vbscript:msgbox(1)',
  'unsafe-relative': '//evil.example/x',
};

// Synced records with hostile `url` values, served as organisations (`org-*`) and grants (`grant-*`).
vi.mock('./contributors', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./contributors')>();
  const fake = (prefix: string, id: string | undefined) => {
    const key = id?.startsWith(prefix) ? id.slice(prefix.length) : undefined;
    return key && key in UNSAFE_URLS ? { id, name: id, github: false, url: UNSAFE_URLS[key] } : undefined;
  };
  return {
    ...actual,
    getOrganisation: (id: string | undefined) => fake('org-', id) || actual.getOrganisation(id),
    getGrant: (id: string | undefined) => fake('grant-', id) || actual.getGrant(id),
  };
});

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

  it.each(Object.keys(UNSAFE_URLS))('drops a non-http(s) url from organisation and grant %s', async (key) => {
    const supporters = await resolveSupporters([`org-${key}`, `grant-${key}`]);
    expect(supporters.map((s) => s.name)).toEqual([`org-${key}`, `grant-${key}`]);
    for (const supporter of supporters) expect(supporter.url).toBeUndefined();
  });
});
