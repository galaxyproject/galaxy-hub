import { describe, it, expect } from 'vitest';
import { eventDateParts, eventDurationDays, formatDate, formatDateRange } from './dateUtils';

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

describe('eventDateParts', () => {
  it('describes a one-day event without an end or duration', () => {
    expect(eventDateParts('2026-10-14')).toEqual({
      label: 'Oct 14, 2026',
      start: 'Oct 14, 2026',
      end: null,
      isoStart: '2026-10-14',
      isoEnd: null,
      days: 1,
      durationLabel: null,
    });
    expect(eventDateParts('2026-10-14', '2026-10-14T15:00:00Z')).toMatchObject({ end: null, isoEnd: null, days: 1 });
  });

  it('splits a range within one month like formatDateRange', () => {
    expect(eventDateParts(new Date('2026-10-05'), new Date('2026-10-06'))).toEqual({
      label: 'Oct 5 - 6, 2026',
      start: 'Oct 5',
      end: '6, 2026',
      isoStart: '2026-10-05',
      isoEnd: '2026-10-06',
      days: 2,
      durationLabel: '2 days',
    });
  });

  it('shows both full dates across months', () => {
    expect(eventDateParts('2026-06-29', '2026-07-03')).toMatchObject({
      label: 'Jun 29, 2026 - Jul 3, 2026',
      start: 'Jun 29, 2026',
      end: 'Jul 3, 2026',
      isoEnd: '2026-07-03',
      durationLabel: '5 days',
    });
  });

  it('shows both full dates across years', () => {
    expect(eventDateParts('2026-12-30', '2027-01-02')).toMatchObject({
      label: 'Dec 30, 2026 - Jan 2, 2027',
      start: 'Dec 30, 2026',
      end: 'Jan 2, 2027',
      isoStart: '2026-12-30',
      isoEnd: '2027-01-02',
      days: 4,
      durationLabel: '4 days',
    });
  });

  it('passes format options through', () => {
    expect(eventDateParts('2026-10-05', '2026-10-06', { year: false })).toMatchObject({
      label: 'Oct 5 - Oct 6',
      start: 'Oct 5',
      end: 'Oct 6',
    });
  });

  it('returns null without a valid start and ignores an invalid end', () => {
    expect(eventDateParts(undefined)).toBeNull();
    expect(eventDateParts(null, '2026-10-12')).toBeNull();
    expect(eventDateParts('not-a-date')).toBeNull();
    expect(eventDateParts('2026-10-12', 'not-a-date')).toMatchObject({
      label: 'Oct 12, 2026',
      end: null,
      isoEnd: null,
      days: 1,
      durationLabel: null,
    });
  });

  it('gives no duration when the end is before the start', () => {
    expect(eventDateParts('2026-10-16', '2026-10-12')).toMatchObject({ days: null, durationLabel: null });
  });
});
