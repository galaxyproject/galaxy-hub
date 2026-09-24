import { describe, expect, it } from 'vitest';
import { getEventEndFromDays, isUpcomingEvent } from './dateUtils';

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

describe('isUpcomingEvent', () => {
  // Local noon on Oct 14, 2026, so the test does not depend on the machine's time zone
  const now = new Date(2026, 9, 14, 12);

  it('keeps a multi-day event upcoming until its last day is over', () => {
    expect(isUpcomingEvent('2026-10-12', '2026-10-16', now)).toBe(true);
    expect(isUpcomingEvent('2026-10-12', '2026-10-14', now)).toBe(true);
    expect(isUpcomingEvent('2026-10-12', '2026-10-13', now)).toBe(false);
  });

  it('keeps a one-day event upcoming for the whole day', () => {
    expect(isUpcomingEvent('2026-10-14', undefined, now)).toBe(true);
    expect(isUpcomingEvent(new Date('2026-10-14'), null, now)).toBe(true);
    expect(isUpcomingEvent('2026-10-13', undefined, now)).toBe(false);
    expect(isUpcomingEvent('2026-11-01', undefined, now)).toBe(true);
  });

  it('treats events without a valid date as not upcoming', () => {
    expect(isUpcomingEvent(undefined, undefined, now)).toBe(false);
    expect(isUpcomingEvent('not a date', undefined, now)).toBe(false);
  });
});
