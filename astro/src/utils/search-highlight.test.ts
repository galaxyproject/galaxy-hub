import { describe, expect, it } from 'vitest';
import { escapeHtml, highlightMatch } from './search-highlight';

const MARK = '<mark class="bg-yellow-200">';

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
      '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;'
    );
  });
});

describe('highlightMatch', () => {
  it('escapes markup in the excerpt when nothing matches', () => {
    expect(highlightMatch('<img src=x onerror=alert(1)>', [])).toBe('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('cannot complete an unclosed tag with the inserted mark', () => {
    const out = highlightMatch('Bio <img src=x onerror=alert(1) galaxy', ['galaxy']);
    expect(out).toBe(`Bio &lt;img src=x onerror=alert(1) ${MARK}galaxy</mark>`);
    expect(out.match(/</g)).toHaveLength(2);
  });

  it('escapes the matched text inside the mark', () => {
    expect(highlightMatch('see <img> here', ['<img>'])).toBe(`see ${MARK}&lt;img&gt;</mark> here`);
  });

  it('does not match inside escaped entities or the inserted mark', () => {
    expect(highlightMatch('a & b < c', ['amp', 'lt;'])).toBe('a &amp; b &lt; c');
    expect(highlightMatch('Galaxy training', ['galaxy', 'class', 'yellow', 'mark'])).toBe(
      `${MARK}Galaxy</mark> training`
    );
  });

  it('matches case-insensitively and keeps the original casing', () => {
    expect(highlightMatch('Galaxy and GALAXY', ['galaxy'])).toBe(`${MARK}Galaxy</mark> and ${MARK}GALAXY</mark>`);
  });

  it('treats regex characters in the query literally', () => {
    expect(highlightMatch('a.b axb (c)', ['a.b', '(c)'])).toBe(`${MARK}a.b</mark> axb ${MARK}(c)</mark>`);
  });

  it('merges overlapping matches into one mark', () => {
    expect(highlightMatch('workflows', ['work', 'kflow'])).toBe(`${MARK}workflow</mark>s`);
  });

  it('truncates before escaping and appends an ellipsis', () => {
    expect(highlightMatch('abc & def', [], 5)).toBe('abc &amp;...');
  });

  it('returns an empty string for empty text', () => {
    expect(highlightMatch('', ['galaxy'])).toBe('');
  });
});
