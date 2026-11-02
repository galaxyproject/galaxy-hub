/**
 * Search-result excerpt highlighting. Excerpts come from synced or authored content and are shown
 * with `v-html`, so the text is HTML-escaped and only the `<mark>` wrappers are markup.
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** Named entities found in the search index, plus the HTML basics. */
const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  bull: '•',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  larr: '←',
  uarr: '↑',
  rarr: '→',
  darr: '↓',
  copy: '©',
  reg: '®',
  trade: '™',
};

/**
 * Decodes the entities authored content leaves in index text, which `v-html` used to decode.
 * Unknown names and invalid code points stay as written (and are escaped later).
 */
export function decodeEntities(text: string): string {
  return text.replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (entity, dec, hex, name) => {
    if (name) return NAMED_ENTITIES[name] ?? entity;
    const code = dec ? Number.parseInt(dec, 10) : Number.parseInt(hex, 16);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Decodes entities in `text`, truncates it to `maxLength`, escapes it, and wraps case-insensitive matches of `words` in
 * `<mark>`. Matches are found on the raw text, so a word never matches inside an escape sequence
 * or an inserted mark; overlapping matches are merged.
 */
export function highlightMatch(text: string, words: readonly string[], maxLength: number = 200): string {
  if (!text) return '';
  const decoded = decodeEntities(text);
  const source = decoded.length > maxLength ? decoded.slice(0, maxLength) : decoded;
  const suffix = decoded.length > maxLength ? '...' : '';

  const ranges: Array<[number, number]> = [];
  for (const word of words) {
    if (!word) continue;
    for (const match of source.matchAll(new RegExp(escapeRegExp(word), 'gi'))) {
      const start = match.index ?? 0;
      ranges.push([start, start + match[0].length]);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);

  const merged: Array<[number, number]> = [];
  for (const [start, end] of ranges) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }

  let result = '';
  let pos = 0;
  for (const [start, end] of merged) {
    result += escapeHtml(source.slice(pos, start));
    result += `<mark class="bg-yellow-200">${escapeHtml(source.slice(start, end))}</mark>`;
    pos = end;
  }
  return result + escapeHtml(source.slice(pos)) + suffix;
}
