import { describe, expect, it } from 'vitest';
import { pickActive, spyLine } from './tocSpy';

describe('spyLine', () => {
  it('sits 30% down a short viewport and at most 160px down a tall one', () => {
    expect(spyLine(400)).toBe(120);
    expect(spyLine(900)).toBe(160);
  });
});

describe('pickActive', () => {
  it('returns -1 before the first heading reaches the line', () => {
    expect(pickActive([300, 800], 160, false)).toBe(-1);
  });

  it('picks the last heading at or above the line', () => {
    expect(pickActive([-500, -10, 100, 800], 160, false)).toBe(2);
    expect(pickActive([-500, 160, 800], 160, false)).toBe(1);
  });

  it('skips headings that are missing or hidden', () => {
    expect(pickActive([-500, null, 900], 160, false)).toBe(0);
    expect(pickActive([null, null], 160, false)).toBe(-1);
  });

  it('picks the last heading at the end of the page, even below the line', () => {
    expect(pickActive([-500, 400, 700], 160, true)).toBe(2);
    expect(pickActive([-500, 400, null], 160, true)).toBe(1);
  });
});
