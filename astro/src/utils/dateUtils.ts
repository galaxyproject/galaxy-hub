/**
 * Date utility functions for Galaxy Hub
 * Pure functions that can be easily unit tested
 */

/**
 * Check if a date is published (not in the future)
 * Returns true if the date is undefined, in the past, or today
 */
export function isPublishedDate(date: Date | string | undefined, now: Date = new Date()): boolean {
  if (!date) return true;
  const d = date instanceof Date ? date : new Date(date);
  return d <= now;
}

/**
 * Convert a date value to a Date object
 */
function toDate(d: Date | string | undefined): Date | null {
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
 * Format a date for display
 * @param date - Date to format
 * @param short - If true, use short month names (Jan, Feb). Default true for lists.
 * @returns Formatted date string like "Jan 15, 2024" or "January 15, 2024"
 */
export function formatDate(date: Date | string | undefined, short: boolean = true): string {
  const d = toDate(date);
  if (!d || isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: short ? 'short' : 'long',
    day: 'numeric',
  });
}

/**
 * Format a date range for events
 * @param start - Start date
 * @param end - End date (optional)
 * @param short - If true, use short month names. Default true for lists.
 * @returns Formatted date range like "Jan 15 - 17, 2024" or "Jan 15 - Feb 2, 2024"
 */
export function formatDateRange(
  start: Date | string | undefined,
  end?: Date | string | undefined,
  short: boolean = true
): string {
  if (!start) return '';

  const startDate = toDate(start);
  const endDate = toDate(end);

  if (!startDate || isNaN(startDate.getTime())) return '';

  // No end date or same as start
  if (!endDate || startDate.getTime() === endDate.getTime()) {
    return formatDate(startDate, short);
  }

  // Same month and year - show "Jan 15 - 17, 2024"
  if (startDate.getUTCMonth() === endDate.getUTCMonth() && startDate.getUTCFullYear() === endDate.getUTCFullYear()) {
    const monthDay = startDate.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: short ? 'short' : 'long',
      day: 'numeric',
    });
    return `${monthDay} - ${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}`;
  }

  // Different months - show full dates
  return `${formatDate(startDate, short)} - ${formatDate(endDate, short)}`;
}
