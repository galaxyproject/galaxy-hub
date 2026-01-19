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
