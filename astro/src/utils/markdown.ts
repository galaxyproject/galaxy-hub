/**
 * Markdown utility functions for Galaxy Hub
 * Provides consistent markdown rendering across Vue and Astro components
 */

import { marked } from 'marked';

/**
 * Render markdown inline (no wrapping <p> tags)
 * Use for short text like tease/summary fields that shouldn't be block elements
 */
export function renderMarkdownInline(text?: string): string {
  return text ? (marked.parseInline(text) as string) : '';
}
