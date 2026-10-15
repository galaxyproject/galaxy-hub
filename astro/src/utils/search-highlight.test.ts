import { describe, expect, it } from 'vitest';
import { decodeEntities, escapeHtml, highlightMatch } from './search-highlight';

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

describe('decodeEntities', () => {
  it('decodes named and numeric entities', () => {
    expect(decodeEntities('a&nbsp;b &amp; c &bull; &#65;&#x42; &rarr;')).toBe('a b & c • AB →');
  });

  it('leaves unknown or invalid entities as text', () => {
    expect(decodeEntities('&bogus; &#xFFFFFFF; &#0;')).toBe('&bogus; &#xFFFFFFF; &#0;');
  });
});

describe('highlightMatch with entities in the index', () => {
  it('shows authored entities as their characters', () => {
    expect(highlightMatch('a&nbsp;b &amp; c', [])).toBe('a b &amp; c');
    expect(highlightMatch('&bogus;', [])).toBe('&amp;bogus;');
  });

  it('keeps encoded markup as text', () => {
    expect(highlightMatch('&lt;img src=x onerror=alert(1)&gt;', [])).toBe('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('does not match entity names', () => {
    expect(highlightMatch('a&nbsp;b', ['nbsp'])).toBe('a b');
    expect(highlightMatch('a &amp; b', ['amp'])).toBe('a &amp; b');
  });
});
