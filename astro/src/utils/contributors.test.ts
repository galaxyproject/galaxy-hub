import { describe, expect, it } from 'vitest';
import { extractAuthors, extractFunding, getCommunityGithubHandle } from './contributors';

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
      funding: ['legacy-funding-only'],
      infrastructure: ['legacy-infra-only'],
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
