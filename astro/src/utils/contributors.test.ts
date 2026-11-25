import { describe, expect, it } from 'vitest';
import {
  buildGtnHallOfFameUrl,
  communityInHubHallOfFame,
  communityNameInHubHallOfFame,
  extractAuthors,
  extractFunding,
  getContributor,
  getHubHallOfFameUrl,
  getCommunityContactLinks,
  getCommunityImage,
  getCommunityGithubHandle,
  getCommunityProfileUrl,
  getGrant,
  getOrganisation,
  profileBioHtml,
} from './contributors';
import { inHubHallOfFame } from './community-base.mjs';

describe('contribution extraction', () => {
  it('includes extended contributions roles for authors', () => {
    const data = {
      contributions: {
        organisers: ['person-a'],
        instructors: ['person-b'],
        testing: ['person-c'],
        reviewing: ['person-d'],
        translation: ['org-a'],
      },
    };

    expect(extractAuthors(data)).toEqual(['person-a', 'person-b', 'person-c', 'person-d', 'org-a']);
  });

  it('includes contributions.infrastructure for supporters and deduplicates', () => {
    const data = {
      contributions: {
        funding: ['grant-a', 'org-a'],
        infrastructure: ['org-a', 'grant-b'],
      },
    };

    expect(extractFunding(data)).toEqual(['grant-a', 'org-a', 'grant-b']);
  });
});

describe('community GitHub handles', () => {
  it('falls back to the record id when github is not set', () => {
    expect(getCommunityGithubHandle({ id: 'deKCD' })).toBe('deKCD');
  });

  it('uses an explicit github handle when provided', () => {
    expect(getCommunityGithubHandle({ id: 'deKCD', github: 'de-kcd-org' })).toBe('de-kcd-org');
  });

  it('honors github false as an opt-out', () => {
    expect(getCommunityGithubHandle({ id: 'deKCD', github: false })).toBeUndefined();
  });
});

describe('community image resolution', () => {
  it('prefers an explicit avatar over a GitHub fallback', () => {
    expect(getCommunityImage(getOrganisation('deNBI'))).toBe(
      'https://training.galaxyproject.org/training-material/shared/images/deNBI.png'
    );
  });

  it('falls back to the GitHub avatar when no explicit avatar exists', () => {
    expect(getCommunityImage(getOrganisation('deKCD'))).toBe('https://github.com/deKCD.png');
  });

  it('respects github false and returns no image without an avatar', () => {
    expect(getCommunityImage({ id: 'example', github: false })).toBeUndefined();
  });
});

describe('GTN Hall of Fame URLs', () => {
  it('preserves the original community id casing', () => {
    expect(buildGtnHallOfFameUrl('deKCD')).toBe(
      'https://training.galaxyproject.org/training-material/hall-of-fame/deKCD/'
    );
  });
});

describe('Hub Hall of Fame opt-out', () => {
  it('links eligible author chips but not opted-out credits', () => {
    expect(getHubHallOfFameUrl('contributor1')).toBeUndefined();
    expect(getHubHallOfFameUrl('an-example')).toBeUndefined();
    expect(getHubHallOfFameUrl('Example organisation')).toBeUndefined();
    expect(getHubHallOfFameUrl('bgruening')).toBe('/hall-of-fame/bgruening/');
    expect(getHubHallOfFameUrl('Guest without a record')).toBe('/hall-of-fame/guest-without-a-record/');
  });

  it('rejects credited opt-outs by ID or display name while retaining unknown credits', () => {
    expect(communityNameInHubHallOfFame('contributor1')).toBe(false);
    expect(communityNameInHubHallOfFame('Contributor A')).toBe(true);
    expect(communityNameInHubHallOfFame('an-example')).toBe(false);
    expect(communityNameInHubHallOfFame('Example organisation')).toBe(false);
    expect(communityNameInHubHallOfFame('bgruening')).toBe(true);
    expect(communityNameInHubHallOfFame('Guest without a record')).toBe(true);
  });

  it('excludes the GTN build placeholders, which set hub-halloffame: no', () => {
    for (const id of ['contributor1', 'contributor2', 'awspolly']) {
      expect(communityInHubHallOfFame(getContributor(id)!)).toBe(false);
    }
    expect(communityInHubHallOfFame(getOrganisation('an-example')!)).toBe(false);
  });

  it('keeps records without the flag', () => {
    expect(communityInHubHallOfFame(getContributor('bgruening')!)).toBe(true);
    expect(communityInHubHallOfFame(getOrganisation('deNBI')!)).toBe(true);
    expect(communityInHubHallOfFame(getGrant('eurosciencegateway')!)).toBe(true);
  });

  it.each([
    ['no', false],
    ['No', false],
    ['false', false],
    [false, false],
    ['0', false],
    [0, false],
    ['off', false],
    ['', false],
    ['yes', true],
    [undefined, true],
    [null, true],
  ])('reads hub-halloffame %j as %s', (flag, expected) => {
    expect(inHubHallOfFame({ 'hub-halloffame': flag })).toBe(expected);
  });
});

describe('avatar resolution', () => {
  it('loads contributor metadata from the repo-level YAML files', () => {
    expect(getContributor('bgruening')).toMatchObject({
      id: 'bgruening',
      name: 'Björn Grüning',
      email: 'bjoern.gruening@gmail.com',
    });
    expect(getContributor('bgruening')?.affiliations).toContain('uni-freiburg');
  });

  it('resolves training-material avatar paths to the remote training host', () => {
    expect(getOrganisation('deNBI')?.avatarUrl).toBe(
      'https://training.galaxyproject.org/training-material/shared/images/deNBI.png'
    );
    expect(getOrganisation('eu')?.avatarUrl).toBe(
      'https://training.galaxyproject.org/training-material/shared/images/EU-logo.jpg'
    );
    expect(getOrganisation('mwk')?.avatarUrl).toBe(
      'https://training.galaxyproject.org/training-material/assets/images/MWK.png'
    );
    expect(getGrant('eurosciencegateway')?.avatarUrl).toBe(
      'https://training.galaxyproject.org/training-material/assets/images/eurosciencegateway.png'
    );
  });
});

describe('profile bio HTML', () => {
  it('renders Markdown bios with links, lists and images', () => {
    const markdown = [
      '[ELIXIR Germany](https://www.denbi.de/elixir-de/) is **funded**.',
      '',
      '- one',
      '- two',
      '',
      '![logo](https://example.org/logo.png)',
    ].join('\n');
    const html = [
      '<p><a href="https://www.denbi.de/elixir-de/">ELIXIR Germany</a> is <strong>funded</strong>.</p>',
      '<ul>',
      '<li>one</li>',
      '<li>two</li>',
      '</ul>',
      '<p><img src="https://example.org/logo.png" alt="logo" /></p>',
      '',
    ].join('\n');
    expect(profileBioHtml(markdown)).toBe(html);
  });

  it('removes raw HTML and script links that marked passes through', () => {
    const markdown = 'Hi <script>alert(1)</script>[x](javascript:alert(1)) <img src=x onerror=alert(1)>';
    expect(profileBioHtml(markdown)).toBe('<p>Hi x </p>\n');
  });

  it('keeps mailto links and drops relative or non-web images', () => {
    const markdown = '[Mail](mailto:someone@example.org) ![a](/training-material/a.png) ![b](ftp://example.org/b.png)';
    expect(profileBioHtml(markdown)).toBe('<p><a href="mailto:someone@example.org">Mail</a>  </p>\n');
  });
});

describe('profile link schemes', () => {
  const unsafe = [
    'javascript:alert(1)',
    'JAVASCRIPT:alert(1)',
    ' javascript:alert(1)',
    'java\tscript:alert(1)',
    'data:text/html;base64,PHNjcmlwdD4=',
    'vbscript:msgbox(1)',
    '//evil.example/x',
    'www.example.org',
  ];

  it('keeps http(s) website URLs unchanged', () => {
    expect(getCommunityProfileUrl({ id: 'org', url: 'https://example.org/a?b=1' })).toBe('https://example.org/a?b=1');
    expect(getCommunityProfileUrl({ id: 'org', url: 'http://example.org' })).toBe('http://example.org');
  });

  it.each(unsafe)('drops website URL %j', (url) => {
    expect(getCommunityProfileUrl({ id: 'org', url })).toBeUndefined();
  });

  it('returns no website URL for a missing record or field', () => {
    expect(getCommunityProfileUrl(undefined)).toBeUndefined();
    expect(getCommunityProfileUrl({ id: 'org' })).toBeUndefined();
  });

  it.each(unsafe)('drops the Mastodon link for fediverse %j and keeps the others', (fediverse) => {
    const links = getCommunityContactLinks({ id: 'someone', github: false, fediverse, bluesky: 'someone.bsky.social' });
    expect(links.map((link) => link.label)).toEqual(['Bluesky', 'GTN Hall of Fame']);
    for (const link of links) expect(link.href).toMatch(/^https:\/\//);
  });

  it('builds every contact link from a record', () => {
    const record = {
      id: 'someone',
      fediverse: 'https://mastodon.example/@someone',
      bluesky: 'someone.bsky.social',
      linkedin: 'someone',
      matrix: '@someone:matrix.org',
      orcid: '0000-0002-1825-0097',
    };
    expect(getCommunityContactLinks(record)).toEqual([
      { label: 'Mastodon', href: 'https://mastodon.example/@someone', icon: 'mastodon' },
      { label: 'Bluesky', href: 'https://bsky.app/profile/someone.bsky.social', icon: 'bluesky' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/someone', icon: 'linkedin' },
      { label: 'Matrix', href: 'https://matrix.to/#/@someone:matrix.org', icon: 'matrix' },
      { label: 'ORCID', href: 'https://orcid.org/0000-0002-1825-0097', icon: 'orcid' },
      { label: 'GitHub', href: 'https://github.com/someone', icon: 'github' },
      {
        label: 'GTN Hall of Fame',
        href: 'https://training.galaxyproject.org/training-material/hall-of-fame/someone/',
        icon: 'gtn',
      },
    ]);
  });

  it('uses the fallback key for the GTN link when the record id is empty', () => {
    expect(getCommunityContactLinks({ id: '', github: false }, 'Some Org')).toEqual([
      {
        label: 'GTN Hall of Fame',
        href: 'https://training.galaxyproject.org/training-material/hall-of-fame/Some%20Org/',
        icon: 'gtn',
      },
    ]);
  });
});
