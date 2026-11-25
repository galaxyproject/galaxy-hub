/**
 * Markdown utility functions for Galaxy Hub
 * Provides consistent markdown rendering across Vue and Astro components.
 * Output goes through the `markdown` sanitize profile, because marked passes raw HTML through.
 */

import { marked } from 'marked';
import { sanitizeHtml } from './safe-html';

/**
 * Render markdown inline (no wrapping <p> tags)
 * Use for short text like tease/summary fields that shouldn't be block elements
 */
export function renderMarkdownInline(text?: string | null): string {
  return text ? sanitizeHtml(marked.parseInline(text, { async: false }), 'markdown') : '';
}

// Opening and closing tags of links in sanitized HTML
const LINK_TAG = /<\/?a\b[^>]*>/gi;

/**
 * Render a teaser for a list row. The whole row is a link, and a link inside a link makes the browser split
 * the row (and Vue report a hydration mismatch), so teaser links keep only their text.
 */
export function renderMarkdownTeaser(text?: string | null): string {
  return renderMarkdownInline(text).replace(LINK_TAG, '');
}

/**
 * Render markdown as block HTML (with <p> tags etc.)
 * Use for longer body text that should be formatted as paragraphs.
 */
export function renderMarkdown(text?: string | null): string {
  return text ? sanitizeHtml(marked.parse(text, { async: false }), 'markdown') : '';
}
