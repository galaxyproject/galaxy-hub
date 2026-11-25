/**
 * Publish-date check shared by the build scripts (preprocess.mjs) and the
 * site code (dateUtils.ts), so both agree on what counts as published.
 */

/**
 * Check if frontmatter marks content as a draft (`draft: true`).
 * Only the boolean true counts, so a stray string never hides a page.
 */
export function isDraft(frontmatter) {
  return frontmatter?.draft === true;
}

/**
 * Check if a collection entry may appear in listings, feeds and indexes.
 * Drafts are still built at their URL; they are only left out of lists.
 */
export function isListed(entry) {
  return !isDraft(entry?.data);
}

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
