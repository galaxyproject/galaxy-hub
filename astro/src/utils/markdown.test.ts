import { describe, expect, it } from 'vitest';
import { renderMarkdown, renderMarkdownInline } from './markdown';

describe('renderMarkdownInline', () => {
  it('keeps the formatting authored teasers use', () => {
    expect(renderMarkdownInline('**Bold**, *em*, `code` and [a link](https://example.org/a?b=1&c=2)')).toBe(
      '<strong>Bold</strong>, <em>em</em>, <code>code</code> and <a href="https://example.org/a?b=1&amp;c=2">a link</a>'
    );
  });

  it('keeps relative, mailto and autolinked addresses', () => {
    expect(renderMarkdownInline('[News](/news/) or [top](#top) or <someone@example.org>')).toBe(
      '<a href="/news/">News</a> or <a href="#top">top</a> or <a href="mailto:someone@example.org">someone@example.org</a>'
    );
  });

  it('keeps the inline HTML found in platform pages', () => {
    expect(renderMarkdownInline('MPDS<sup>TB</sup> quotas.<br />')).toBe('MPDS<sup>TB</sup> quotas.<br />');
    expect(renderMarkdownInline("<img class='img-fluid' src='/images/use/a.png' />")).toBe(
      '<img src="/images/use/a.png" class="img-fluid" />'
    );
  });

  it('removes script and style elements and event-handler attributes', () => {
    expect(renderMarkdownInline('Hi <script>alert(1)</script><style>body{}</style>there')).toBe('Hi there');
    expect(renderMarkdownInline('<b onclick="alert(1)" style="color:red" class="x">b</b>')).toBe('<b>b</b>');
    expect(renderMarkdownInline('<img src="/a.png" onerror="alert(1)" class="fixed inset-0">')).toBe(
      '<img src="/a.png" />'
    );
  });

  it('unwraps links and drops images with a script, data or protocol-relative URL', () => {
    expect(renderMarkdownInline('[x](javascript:alert(1)) [y](JAVASCRIPT:alert(1))')).toBe('x y');
    expect(renderMarkdownInline('<a href=" java\tscript:alert(1)">x</a> <a href="vbscript:msgbox(1)">y</a>')).toBe(
      'x y'
    );
    expect(
      renderMarkdownInline('<a href="data:text/html;base64,PHNjcmlwdD4=">x</a> <a href="//evil.example">y</a>')
    ).toBe('x y');
    expect(renderMarkdownInline('![i](javascript:alert(1))<img src="data:image/svg+xml,x">')).toBe('');
  });

  it('drops elements outside the allowlist but keeps their text', () => {
    expect(renderMarkdownInline('<iframe src="https://evil.example"></iframe><div>text</div><form>f</form>')).toBe(
      'textf'
    );
  });

  it('returns an empty string for missing text', () => {
    expect(renderMarkdownInline(undefined)).toBe('');
    expect(renderMarkdownInline(null)).toBe('');
    expect(renderMarkdownInline('')).toBe('');
  });
});

describe('renderMarkdown', () => {
  it('keeps block markup, code languages and tables', () => {
    const markdown = [
      '# Title',
      '',
      '> quote',
      '',
      '1. one',
      '2. two',
      '',
      '```js',
      'const a = 1;',
      '```',
      '',
      '| a | b |',
      '|:--|--:|',
      '| 1 | 2 |',
    ].join('\n');
    expect(renderMarkdown(markdown)).toBe(
      [
        '<h1>Title</h1>',
        '<blockquote>',
        '<p>quote</p>',
        '</blockquote>',
        '<ol>',
        '<li>one</li>',
        '<li>two</li>',
        '</ol>',
        '<pre><code class="language-js">const a = 1;',
        '</code></pre>',
        '<table>',
        '<thead>',
        '<tr>',
        '<th align="left">a</th>',
        '<th align="right">b</th>',
        '</tr>',
        '</thead>',
        '<tbody><tr>',
        '<td align="left">1</td>',
        '<td align="right">2</td>',
        '</tr>',
        '</tbody></table>',
        '',
      ].join('\n')
    );
  });

  it('removes raw script blocks and unsafe links from bodies', () => {
    expect(renderMarkdown('Text\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))')).toBe(
      '<p>Text</p>\n<p>x</p>\n'
    );
  });
});
