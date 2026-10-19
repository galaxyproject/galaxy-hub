/**
 * Date utility functions for Galaxy Hub
 * Pure functions that can be easily unit tested
 */

import { isFutureDate } from './publish-date.mjs';

/**
 * Check if a date is published (not in the future)
 * Returns true if the date is undefined, in the past, or today
 */
export function isPublishedDate(date: Date | string | undefined, now: Date = new Date()): boolean {
  return !isFutureDate(date, now);
}

/**
 * Convert a date value to a Date object
 */
function toDate(d: Date | string | undefined | null): Date | null {
  if (!d) return null;
  return d instanceof Date ? d : new Date(d);
}

/**
 * UTC date component helpers — use these instead of getFullYear()/getMonth()/getDate()
 * to avoid hydration mismatches between server (UTC) and client (local timezone).
 */
export function getUTCYear(date: Date | string): number {
  const d = date instanceof Date ? date : new Date(date);
  return d.getUTCFullYear();
}
export function getUTCMonth(date: Date | string): number {
  const d = date instanceof Date ? date : new Date(date);
  return d.getUTCMonth();
}
export function getUTCDate(date: Date | string): number {
  const d = date instanceof Date ? date : new Date(date);
  return d.getUTCDate();
}

/**
 * Display variants for formatDate and formatDateRange.
 * Passing a boolean instead is shorthand for { short }.
 */
export interface DateFormatOptions {
  /** Short month names (Jan) instead of long ones (January). Default true. */
  short?: boolean;
  /** Include the year. Default true. */
  year?: boolean;
  /** Start with the long weekday name, as on event pages ("Monday, January 15, 2024"). Default false. */
  weekday?: boolean;
  /** 'en-GB' puts the day first ("15 Jan 2024"), as the bare subsite tables do. Default 'en-US'. */
  locale?: 'en-US' | 'en-GB';
}

function resolveFormat(format: boolean | DateFormatOptions): Required<DateFormatOptions> {
  const options = typeof format === 'boolean' ? { short: format } : format;
  return { short: true, year: true, weekday: false, locale: 'en-US', ...options };
}

function isValidDate(d: Date | null): d is Date {
  return d !== null && !isNaN(d.getTime());
}

/** Whole days since the epoch for the UTC calendar day of a date, ignoring the time. */
function utcDayNumber(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86_400_000;
}

/**
 * Format a date for display, always as its UTC calendar day
 * @param date - Date to format
 * @param format - Format options, or a boolean for short month names (Jan, Feb). Default short.
 * @returns Formatted date string like "Jan 15, 2024" or "January 15, 2024"
 */
export function formatDate(date: Date | string | undefined | null, format: boolean | DateFormatOptions = true): string {
  const d = toDate(date);
  if (!isValidDate(d)) return '';
  const { short, year, weekday, locale } = resolveFormat(format);
  return d.toLocaleDateString(locale, {
    timeZone: 'UTC',
    weekday: weekday ? 'long' : undefined,
    year: year ? 'numeric' : undefined,
    month: short ? 'short' : 'long',
    day: 'numeric',
  });
}

/**
 * Format a date range for events
 * @param start - Start date
 * @param end - End date (optional; ignored when missing, invalid or on the start day)
 * @param format - Format options, or a boolean for short month names. Default short.
 * @returns Formatted date range like "Jan 15 - 17, 2024" or "Jan 15, 2024 - Feb 2, 2024".
 *   Only the default US month-day-year form shortens ranges within one month; the
 *   weekday, day-first and year-less forms always show both dates in full.
 */
export function formatDateRange(
  start: Date | string | undefined | null,
  end?: Date | string | undefined | null,
  format: boolean | DateFormatOptions = true
): string {
  const startDate = toDate(start);
  if (!isValidDate(startDate)) return '';
  return joinRange(rangeSegments(startDate, toDate(end), format));
}

/** Range text split at the separator; end is null for a one-day range. */
interface RangeSegments {
  start: string;
  end: string | null;
  /** The end date, when it falls on a later day than the start. */
  endDate: Date | null;
}

function rangeSegments(startDate: Date, endDate: Date | null, format: boolean | DateFormatOptions): RangeSegments {
  // No end date, or ends on the start day
  if (!isValidDate(endDate) || utcDayNumber(startDate) === utcDayNumber(endDate)) {
    return { start: formatDate(startDate, format), end: null, endDate: null };
  }

  const { short, year, weekday, locale } = resolveFormat(format);
  const canShorten = locale === 'en-US' && year && !weekday;

  // Same month and year - show "Jan 15 - 17, 2024"
  if (
    canShorten &&
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCFullYear() === endDate.getUTCFullYear()
  ) {
    return {
      start: formatDate(startDate, { short, year: false }),
      end: `${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}`,
      endDate,
    };
  }

  // Otherwise show both dates in full
  return { start: formatDate(startDate, format), end: formatDate(endDate, format), endDate };
}

function joinRange({ start, end }: RangeSegments): string {
  return end === null ? start : `${start} - ${end}`;
}

/** The UTC calendar day of a date as YYYY-MM-DD, for a <time datetime> attribute. */
function toISODay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Everything an event date line shows: the range text split into its start and end
 * parts (one <time> each), their machine-readable days, and the duration.
 */
export interface EventDateParts {
  /** Whole range, the same text formatDateRange returns. */
  label: string;
  /** Start part ("Oct 5" in "Oct 5 - 6, 2026"), or the whole date for one-day events. */
  start: string;
  /** End part ("6, 2026"), or null for one-day events. */
  end: string | null;
  /** Start day as YYYY-MM-DD (UTC). */
  isoStart: string;
  /** End day as YYYY-MM-DD (UTC), or null for one-day events. */
  isoEnd: string | null;
  /** Calendar days covered (see eventDurationDays); null when the end is before the start. */
  days: number | null;
  /** "2 days" for multi-day events, null otherwise. */
  durationLabel: string | null;
}

/**
 * Split an event's dates for display. Returns null when the start is missing or invalid;
 * an invalid end is ignored, as in formatDateRange.
 */
export function eventDateParts(
  start: Date | string | undefined | null,
  end?: Date | string | undefined | null,
  format: boolean | DateFormatOptions = true
): EventDateParts | null {
  const startDate = toDate(start);
  if (!isValidDate(startDate)) return null;
  const segments = rangeSegments(startDate, toDate(end), format);
  const days = eventDurationDays(startDate, segments.endDate);
  return {
    label: joinRange(segments),
    start: segments.start,
    end: segments.end,
    isoStart: toISODay(startDate),
    isoEnd: segments.endDate ? toISODay(segments.endDate) : null,
    days,
    durationLabel: days !== null && days > 1 ? `${days} days` : null,
  };
}

/**
 * Number of calendar days an event covers, counting its first and last day (UTC).
 * Returns 1 for a one-day event (no end, or the end is on the start day), and null
 * when the start is missing or invalid, the end is invalid, or the end is before the start.
 */
export function eventDurationDays(
  start: Date | string | undefined | null,
  end?: Date | string | undefined | null
): number | null {
  const startDate = toDate(start);
  if (!isValidDate(startDate)) return null;
  if (!end) return 1;
  const endDate = toDate(end);
  if (!isValidDate(endDate)) return null;
  const days = utcDayNumber(endDate) - utcDayNumber(startDate) + 1;
  return days >= 1 ? days : null;
}

/**
 * Check if a date falls on today or later, comparing whole UTC days.
 * Dates are stored as UTC midnight, so a date counts until its day is over.
 */
export function isTodayOrLater(date: Date, now: Date = new Date()): boolean {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return date.getTime() >= today;
}

/**
 * UTC midnight of the same calendar day one year before now (29 February rolls over to 1 March).
 * Use it as a one-year cutoff for dates stored as UTC midnight.
 */
export function utcDayOneYearAgo(now: Date = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate()));
}

/**
 * Get the last day of an event (end date, or start date for one-day events).
 * Returns null if the event has no valid date.
 */
function eventLastDay(date: Date | string | null | undefined, end: Date | string | null | undefined): Date | null {
  const last = toDate(end ?? undefined) || toDate(date ?? undefined);
  return last && !isNaN(last.getTime()) ? last : null;
}

/**
 * Check if an event is upcoming or still running: its last day is today or later.
 */
export function isUpcomingEvent(
  date: Date | string | null | undefined,
  end: Date | string | null | undefined,
  now: Date = new Date()
): boolean {
  const last = eventLastDay(date, end);
  return last !== null && isTodayOrLater(last, now);
}

/**
 * Check if an event is over: it has a valid date and its last day is before today.
 */
export function isPastEvent(
  date: Date | string | null | undefined,
  end: Date | string | null | undefined,
  now: Date = new Date()
): boolean {
  return eventLastDay(date, end) !== null && !isUpcomingEvent(date, end, now);
}
