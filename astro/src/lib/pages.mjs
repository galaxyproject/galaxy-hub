/**
 * Page utility functions for platform pages
 */

/**
 * Get image source URL for a platform
 * @param {string} image - The image path from platform data
 * @returns {string} The image URL
 */
export function getImage(image) {
  if (!image) return '';

  // Handle absolute URLs
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  // Handle relative paths - ensure they start with /
  if (!image.startsWith('/')) {
    return `/${image}`;
  }

  return image;
}
