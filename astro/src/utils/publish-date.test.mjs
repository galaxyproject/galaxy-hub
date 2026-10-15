import { describe, it, expect } from 'vitest';
import { isDraft } from './publish-date.mjs';

describe('isDraft', () => {
  it('is true only for draft: true', () => {
    expect(isDraft({ draft: true })).toBe(true);
  });

  it('is false for draft: false, missing or empty frontmatter', () => {
    expect(isDraft({ draft: false })).toBe(false);
    expect(isDraft({})).toBe(false);
    expect(isDraft(undefined)).toBe(false);
    expect(isDraft(null)).toBe(false);
  });

  it('does not treat other truthy values as drafts', () => {
    expect(isDraft({ draft: 'yes' })).toBe(false);
    expect(isDraft({ draft: 1 })).toBe(false);
  });
});
