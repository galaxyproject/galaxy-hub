import { describe, it, expect } from 'vitest';
import { isPublishedDate, isUpcomingEvent, isPastEvent } from './dateUtils';

describe('isPublishedDate', () => {
  const now = new Date('2025-06-15T12:00:00Z');

  it('returns true for undefined date', () => {
    expect(isPublishedDate(undefined, now)).toBe(true);
  });

  it('returns true for date in the past', () => {
    expect(isPublishedDate(new Date('2025-06-01'), now)).toBe(true);
    expect(isPublishedDate('2025-06-01', now)).toBe(true);
  });

  it('returns true for date equal to now', () => {
    expect(isPublishedDate(now, now)).toBe(true);
  });

  it('returns false for date in the future', () => {
    expect(isPublishedDate(new Date('2025-06-20'), now)).toBe(false);
    expect(isPublishedDate('2025-06-20', now)).toBe(false);
  });

  it('handles string dates correctly', () => {
    expect(isPublishedDate('2025-01-01', now)).toBe(true);
    expect(isPublishedDate('2025-12-31', now)).toBe(false);
  });

  it('handles ISO date strings', () => {
    expect(isPublishedDate('2025-06-14T23:59:59Z', now)).toBe(true);
    expect(isPublishedDate('2025-06-15T12:00:01Z', now)).toBe(false);
  });
});

describe('isUpcomingEvent and isPastEvent', () => {
  // Event dates are stored as UTC midnight; the nightly build runs late in the UTC day.
  const now = new Date('2026-10-07T23:30:00Z');

  it('keeps a one-day event upcoming for the whole of its day', () => {
    expect(isUpcomingEvent('2026-10-07', undefined, now)).toBe(true);
    expect(isPastEvent('2026-10-07', undefined, now)).toBe(false);
  });

  it('keeps a running multi-day event upcoming', () => {
    expect(isUpcomingEvent('2026-10-06', '2026-10-08', now)).toBe(true);
    expect(isPastEvent('2026-10-06', '2026-10-08', now)).toBe(false);
  });

  it('keeps a multi-day event upcoming on its last day', () => {
    expect(isUpcomingEvent(new Date('2026-10-05'), new Date('2026-10-07'), now)).toBe(true);
    expect(isPastEvent(new Date('2026-10-05'), new Date('2026-10-07'), now)).toBe(false);
  });

  it('marks an event past once its last day is over', () => {
    expect(isUpcomingEvent('2026-10-05', '2026-10-06', now)).toBe(false);
    expect(isPastEvent('2026-10-05', '2026-10-06', now)).toBe(true);
  });

  it('marks a later event upcoming', () => {
    expect(isUpcomingEvent('2026-10-08', undefined, now)).toBe(true);
    expect(isPastEvent('2026-10-08', undefined, now)).toBe(false);
  });

  it('treats undated or unparseable events as neither upcoming nor past', () => {
    for (const date of [undefined, null, 'not-a-date']) {
      expect(isUpcomingEvent(date, undefined, now)).toBe(false);
      expect(isPastEvent(date, undefined, now)).toBe(false);
    }
  });
});
