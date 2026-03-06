import { describe, expect, it } from 'vitest';
import { extractAuthors, extractFunding } from './contributors';

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
