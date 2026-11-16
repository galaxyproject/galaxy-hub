import { describe, expect, it } from 'vitest';
import { buildCommunityChip } from './hallOfFameChips';

describe('Hall of Fame profile chips', () => {
  it('links eligible ids to their profile', () => {
    expect(buildCommunityChip('bgruening').href).toBe('/hall-of-fame/bgruening/');
    expect(buildCommunityChip('deNBI').href).toBe('/hall-of-fame/denbi/');
  });

  it('renders opted-out ids as plain text without a link', () => {
    for (const id of ['an-example', 'contributor1']) {
      const chip = buildCommunityChip(id);
      expect(chip.label).toBeTruthy();
      expect(chip.href).toBeUndefined();
    }
  });

  it('keeps links for unknown ids', () => {
    expect(buildCommunityChip('Guest without a record').href).toBe('/hall-of-fame/guest-without-a-record/');
  });
});
