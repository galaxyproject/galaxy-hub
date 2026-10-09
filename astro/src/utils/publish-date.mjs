/**
 * Publish-date check shared by the build scripts (preprocess.mjs) and the
 * site code (dateUtils.ts), so both agree on what counts as published.
 */

/**
 * Check if a date is after now.
 * Missing dates are not future (undated content is published). Unparseable
 * dates are not future either, so they reach the content schema and fail the
 * build instead of hiding the page.
 */
export function isFutureDate(date, now = new Date()) {
  if (!date) return false;
  const d = date instanceof Date ? date : new Date(date);
  return d > now;
}
