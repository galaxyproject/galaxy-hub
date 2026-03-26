/**
 * Extract plain text from markdown content.
 */
export function extractText(markdown) {
  return (
    markdown
      // Remove frontmatter
      .replace(/^---[\s\S]*?---\n?/, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove markdown links, keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // Remove bold/italic
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove headers
      .replace(/#{1,6}\s+/g, '')
      // Remove blockquotes
      .replace(/^>\s+/gm, '')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Truncate text to a maximum length.
 */
export function truncate(text, maxLength = 300) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}
