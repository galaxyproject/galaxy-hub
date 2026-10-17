import { describe, it, expect } from 'vitest';
import { eventDurationDays, formatDate, formatDateRange } from './dateUtils';

describe('formatDate', () => {
  it('uses short US month-day-year by default', () => {
    expect(formatDate('2026-10-12')).toBe('Oct 12, 2026');
    expect(formatDate(new Date('2026-10-12'), false)).toBe('October 12, 2026');
  });

  it('reads date-only values as UTC days', () => {
    expect(formatDate('2026-01-01')).toBe('Jan 1, 2026');
    expect(formatDate('2025-12-31T23:30:00Z')).toBe('Dec 31, 2025');
  });

  it('can drop the year', () => {
    expect(formatDate('2026-10-12', { year: false })).toBe('Oct 12');
  });

  it('can add the long weekday', () => {
    expect(formatDate('2026-10-12', { short: false, weekday: true })).toBe('Monday, October 12, 2026');
  });

  it('can use day-month-year order', () => {
    expect(formatDate('2026-10-12', { locale: 'en-GB' })).toBe('12 Oct 2026');
    expect(formatDate('2025-12-22', { short: false, locale: 'en-GB' })).toBe('22 December 2025');
  });

  it('returns an empty string for missing or invalid input', () => {
    expect(formatDate(undefined)).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate('not-a-date')).toBe('');
  });
});

describe('formatDateRange with format options', () => {
  it('shortens long-month ranges within one month', () => {
    expect(formatDateRange('2026-10-12', '2026-10-16', false)).toBe('October 12 - 16, 2026');
  });

  it('shows both full dates with the weekday', () => {
    const long = { short: false, weekday: true };
    expect(formatDateRange('2026-10-12', '2026-10-16', long)).toBe(
      'Monday, October 12, 2026 - Friday, October 16, 2026'
    );
    expect(formatDateRange('2026-10-12', '2026-10-12', long)).toBe('Monday, October 12, 2026');
  });

  it('shows both full dates in day-month-year order', () => {
    expect(formatDateRange('2026-10-12', '2026-10-16', { locale: 'en-GB' })).toBe('12 Oct 2026 - 16 Oct 2026');
    expect(formatDateRange('2026-12-30', '2027-01-02', { locale: 'en-GB' })).toBe('30 Dec 2026 - 2 Jan 2027');
  });

  it('shows both dates without the year', () => {
    expect(formatDateRange('2026-10-12', '2026-10-16', { year: false })).toBe('Oct 12 - Oct 16');
    expect(formatDateRange('2026-09-29', '2026-10-02', { year: false })).toBe('Sep 29 - Oct 2');
    expect(formatDateRange('2026-10-12', undefined, { year: false })).toBe('Oct 12');
  });

  it('treats an end on the same UTC day as a one-day event', () => {
    expect(formatDateRange('2026-10-12', '2026-10-12T15:00:00Z')).toBe('Oct 12, 2026');
  });

  it('ignores an invalid end date', () => {
    expect(formatDateRange('2026-10-12', 'not-a-date')).toBe('Oct 12, 2026');
    expect(formatDateRange('not-a-date', '2026-10-12')).toBe('');
  });
});

describe('eventDurationDays', () => {
  it('counts a one-day event as one day', () => {
    expect(eventDurationDays('2026-10-12')).toBe(1);
    expect(eventDurationDays('2026-10-12', null)).toBe(1);
    expect(eventDurationDays('2026-10-12', '')).toBe(1);
    expect(eventDurationDays('2026-10-12', '2026-10-12')).toBe(1);
  });

  it('counts both the first and last day', () => {
    expect(eventDurationDays('2026-10-12', '2026-10-16')).toBe(5);
    expect(eventDurationDays(new Date('2026-09-29'), new Date('2026-10-02'))).toBe(4);
    expect(eventDurationDays('2026-12-30', '2027-01-02')).toBe(4);
  });

  it('counts whole UTC days, ignoring times and daylight saving changes', () => {
    // Europe and the US change clocks within these ranges; UTC days are always 24 hours.
    expect(eventDurationDays('2026-03-27', '2026-03-30')).toBe(4);
    expect(eventDurationDays('2026-10-30', '2026-11-02')).toBe(4);
    expect(eventDurationDays('2026-10-12T22:00:00Z', '2026-10-13T01:00:00Z')).toBe(2);
  });

  it('returns null without a valid range', () => {
    expect(eventDurationDays(undefined)).toBeNull();
    expect(eventDurationDays(null, '2026-10-12')).toBeNull();
    expect(eventDurationDays('not-a-date')).toBeNull();
    expect(eventDurationDays('2026-10-12', 'not-a-date')).toBeNull();
    expect(eventDurationDays('2026-10-16', '2026-10-12')).toBeNull();
    expect(eventDurationDays('2026-10-13', '2026-10-12')).toBeNull();
  });
});
