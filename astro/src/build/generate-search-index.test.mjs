import { describe, it, expect } from 'vitest';
import {
  buildHallOfFameEntries,
  classifyFunding,
  extractCommunityMetadata,
  communitySlug,
} from './generate-search-index.mjs';

describe('generate-search-index metadata helpers', () => {
  const communityData = {
    contributors: {},
    organisations: {
      deNBI: { name: 'de.NBI' },
    },
    grants: {
      eurosciencegateway: { name: 'EuroScienceGateway' },
    },
    lookups: {
      contributors: new Set(),
      organisations: new Set(['denbi', 'de-nbi']),
      grants: new Set(['eurosciencegateway']),
    },
    tagLookup: {
      exact: new Map([
        ['cofest', new Set(['CoFest'])],
        ['esg-wp1', new Set(['esg-wp1'])],
      ]),
      compact: new Map([
        ['cofest', new Set(['CoFest'])],
        ['esgwp1', new Set(['esg-wp1'])],
      ]),
    },
  };

  it('classifies funding references into organisations and grants', () => {
    const result = classifyFunding(['deNBI', 'eurosciencegateway', 'UnknownSponsor'], communityData);
    expect(result.organisations).toContain('deNBI');
    expect(result.organisations).toContain('UnknownSponsor');
    expect(result.grants).toContain('eurosciencegateway');
  });

  it('extracts tags and community metadata from frontmatter', () => {
    const metadata = extractCommunityMetadata(
      {
        slug: 'news/example',
        CONTRIBUTORS: ['afgane'],
        ORGANISATIONS: ['deNBI'],
        GRANTS: ['eurosciencegateway'],
        tags: ['community', 'cofest', 'esg wp1'],
        contributions: {
          authorship: ['afgane'],
          funding: ['deNBI', 'eurosciencegateway'],
        },
      },
      communityData
    );

    expect(metadata.tags).toContain('community');
    expect(metadata.tags).toContain('CoFest');
    expect(metadata.tags).toContain('esg-wp1');
    expect(metadata.contributors).toContain('afgane');
    expect(metadata.organisations).toContain('deNBI');
    expect(metadata.grants).toContain('eurosciencegateway');
    expect(metadata.search_terms).toContain('news/example');
  });
});

describe('generate-search-index hall-of-fame entries', () => {
  it('creates hall-of-fame entries with searchable ids and slugs', () => {
    const communityData = {
      contributors: {
        alice: {
          name: 'Alice Example',
          joined: '2024-02',
          affiliations: ['deNBI'],
        },
      },
      organisations: {
        deNBI: {
          name: 'de.NBI',
        },
      },
      grants: {},
      lookups: {
        contributors: new Set(['alice']),
        organisations: new Set(['denbi', 'de-nbi']),
        grants: new Set(),
      },
    };

    const entries = buildHallOfFameEntries(communityData);

    const orgEntry = entries.find((entry) => entry.slug === `hall-of-fame/${communitySlug('deNBI')}`);
    expect(orgEntry).toBeDefined();
    expect(orgEntry.path).toBe('/hall-of-fame/denbi/');
    expect(orgEntry.search_terms).toContain('denbi');

    const contributorEntry = entries.find((entry) => entry.slug === 'hall-of-fame/alice');
    expect(contributorEntry).toBeDefined();
    expect(contributorEntry.organisations).toContain('deNBI');
  });
});
