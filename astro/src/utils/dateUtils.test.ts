import { describe, expect, it } from 'vitest';
import { getEventEndFromDays } from './dateUtils';

describe('getEventEndFromDays', () => {
  it('returns the last day of a multi-day event', () => {
    expect(getEventEndFromDays(new Date('2026-06-22'), 6)).toEqual(new Date('2026-06-27'));
    expect(getEventEndFromDays('2019-02-25', 5)).toEqual(new Date('2019-03-01'));
  });

  it('does not change the start date', () => {
    const start = new Date('2026-10-12');
    getEventEndFromDays(start, 5);
    expect(start).toEqual(new Date('2026-10-12'));
  });

  it('returns undefined for one-day events and missing input', () => {
    expect(getEventEndFromDays('2026-10-12', 1)).toBeUndefined();
    expect(getEventEndFromDays('2026-10-12', 0)).toBeUndefined();
    expect(getEventEndFromDays('2026-10-12', null)).toBeUndefined();
    expect(getEventEndFromDays(undefined, 3)).toBeUndefined();
    expect(getEventEndFromDays('not a date', 3)).toBeUndefined();
  });
});
