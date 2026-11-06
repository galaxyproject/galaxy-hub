/**
 * Turns HTML pasted from Google Docs, Word, email or a web page into Markdown for the post creator.
 * Browser only (uses DOMParser). Loaded on the first rich paste.
 */
import { unified } from 'unified';
import rehypeDomParse from 'rehype-dom-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

// Formatting worth keeping; a paste with none of it (a plain paragraph, code from an editor) stays plain text
const RICH = /<(h[1-6]|ul|ol|table|strong|b|em|i|a|blockquote)\b/i;

export function isRichHtml(html: string): boolean {
  return RICH.test(html);
}

/** Docs and Word mark bold and italic with styles instead of tags; turn those into tags. */
function cleanDocument(doc: Document): number {
  // Google Docs wraps the whole paste in <b style="font-weight:normal" id="docs-internal-guid-…">
  doc.querySelectorAll('b[id^="docs-internal-guid"]').forEach((b) => b.replaceWith(...b.childNodes));
  doc.querySelectorAll<HTMLElement>('span[style]').forEach((span) => {
    const style = span.getAttribute('style') ?? '';
    const wrap = (tag: string) => {
      const el = doc.createElement(tag);
      el.append(...span.childNodes);
      span.append(el);
    };
    if (/font-weight\s*:\s*(bold|[6-9]00)/i.test(style)) wrap('strong');
    if (/font-style\s*:\s*italic/i.test(style)) wrap('em');
  });
  // Pasted images point at the source document (Docs links expire), so they are left out
  const images = doc.querySelectorAll('img');
  images.forEach((img) => img.remove());
  doc.querySelectorAll('style, meta, script, title').forEach((el) => el.remove());
  return images.length;
}

/** Markdown for the pasted HTML, and how many images were left out. */
export async function htmlToMarkdown(html: string): Promise<{ markdown: string; droppedImages: number }> {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const droppedImages = cleanDocument(doc);
  const file = await unified()
    .use(rehypeDomParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkGfm)
    // Same options as src/build/markdown-processor.mjs
    .use(remarkStringify, { fences: true, rule: '-', listItemIndent: 'one', resourceLink: true, bullet: '-' })
    .process(doc.body.innerHTML);
  return { markdown: String(file).trim(), droppedImages };
}
