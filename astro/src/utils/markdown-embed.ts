/** Loading logic for the MarkdownEmbed component, kept separate so it can be tested without a DOM. */
import { renderMarkdown } from './markdown';
import { safeUrl } from './url';

export interface EmbedSource {
  url?: string;
  src?: string;
  href?: string;
}

/** The embed URL from any of the accepted props; only absolute http(s) URLs are fetched. */
export function resolveEmbedUrl(source: EmbedSource): string | undefined {
  return safeUrl(source.url || source.src || source.href);
}

/** Fetches a Markdown document and returns it rendered and sanitized for `v-html`. */
export async function loadEmbeddedMarkdown(url: string, fetchImpl: typeof fetch = fetch): Promise<string> {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Failed to load: ${response.status}`);
  }
  return renderMarkdown(await response.text());
}
