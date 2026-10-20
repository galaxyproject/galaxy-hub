import { describe, expect, it } from 'vitest';
import { sanitizeHtml } from './safe-html';

const SMALL_CAPS = '<span style="font-variant:small-caps">';

describe('sanitizeHtml inline profile (citation titles)', () => {
  const inline = (html: string) => sanitizeHtml(html, 'inline');

  it('keeps real-world inline markup unchanged', () => {
    for (const title of [
      'Complete genome sequence of <i>Escherichia coli</i> phage vB_EcoP_EcoN5',
      'variations of the <em>APOE</em> gene',
      'the RH5.1/AS01<sub>B</sub> malaria vaccine',
      'Differential analysis of targeted <u>I</u>sotope-labeled data',
      'x<sup>2</sup> and <b>bold</b> and <strong>strong</strong>',
      'Advances &amp; more',
      'Plain title',
    ]) {
      expect(inline(title)).toBe(title);
    }
  });

  it('renders scp as small caps', () => {
    expect(inline('<scp>EOSC‐Life</scp> recommendations')).toBe(`${SMALL_CAPS}EOSC‐Life</span> recommendations`);
    expect(inline('<SCP class="x" onclick="alert(1)">A</SCP>')).toBe(`${SMALL_CAPS}A</span>`);
  });

  it('keeps small caps from span styles but drops the rest of the style', () => {
    expect(inline('<span style="font-variant:small-caps;">CCR4</span>')).toBe(`${SMALL_CAPS}CCR4</span>`);
    expect(inline('<span style="color: red; FONT-VARIANT : Small-Caps; background: url(x)">T</span>')).toBe(
      `${SMALL_CAPS}T</span>`
    );
    expect(inline('<span style="font-variant: normal" onclick="x">T</span>')).toBe('<span>T</span>');
  });

  it('strips attributes from allowed tags', () => {
    expect(inline('<span style="color: rgb(33, 51, 104);">Note</span>')).toBe('<span>Note</span>');
    expect(inline('<i class="x" onclick="alert(1)">Name</i>')).toBe('<i>Name</i>');
  });

  it('removes script and style elements with their content', () => {
    expect(inline('A<script>alert(1)</script>B')).toBe('AB');
    expect(inline('A<SCRIPT src="//evil"></SCRIPT>B')).toBe('AB');
    expect(inline('A<style>body{display:none}</style>B')).toBe('AB');
    expect(inline('A<script>never closed')).toBe('A');
  });

  it('drops event-handler elements and disallowed tags but keeps their text', () => {
    expect(inline('<img src=x onerror="alert(1)">Title')).toBe('Title');
    expect(inline('<a href="https://example.org">link</a>')).toBe('link');
    expect(inline('<div onmouseover="alert(1)">text</div>')).toBe('text');
    expect(inline('<svg onload="alert(1)"><circle/></svg>ok')).toBe('ok');
  });

  it('does not let the package default tags through', () => {
    expect(inline('<table><tr><td>cell</td></tr></table>')).toBe('cell');
    expect(inline('<p>para</p><h1>head</h1><abbr>ab</abbr>')).toBe('paraheadab');
  });

  it('escapes broken or nested tag tricks', () => {
    expect(inline('<scr<script>ipt>alert(1)</script>')).toBe('ipt&gt;alert(1)');
    expect(inline('<i <b>x</b>')).toBe('<i>x</i>');
    expect(inline('a < b > c')).toBe('a &lt; b &gt; c');
    expect(inline('<img src="x" onerror="alert(1)"')).toBe('');
  });

  it('removes comments', () => {
    expect(inline('a<!-- <script>alert(1)</script> -->b')).toBe('ab');
    expect(inline('a<!-- unterminated <script>')).toBe('a');
  });

  it('escapes bare ampersands and decodes other entities', () => {
    expect(inline('R & D &amp; &#x2014; &copy; a&#160;b')).toBe('R &amp; D &amp; — © a b');
    expect(inline('&lt;script&gt;alert(1)&lt;/script&gt;')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('balances tags', () => {
    expect(inline('<i>unclosed')).toBe('<i>unclosed</i>');
    expect(inline('stray</i> close')).toBe('stray close');
    expect(inline('<b><i>x</b></i>')).toBe('<b><i>x</i></b>');
  });

  it('never emits attribute-bearing markup from hostile input', () => {
    const out = inline(
      '<i onmouseover=alert(1)>a</i><b/onload=alert(1)>b</b><u style=x:expression(alert(1))>c</u><iframe src=javascript:alert(1)></iframe>'
    );
    expect(out).toBe('<i>a</i><b>b</b><u>c</u>');
  });
});

describe('sanitizeHtml bio profile (hall-of-fame)', () => {
  const bio = (html: string) => sanitizeHtml(html, 'bio');

  it('keeps marked output for real bios', () => {
    const html = [
      '<p><a href="https://www.denbi.de/elixir-de/">ELIXIR Germany</a> is operated by the network.</p>',
      '<h3>Project results:</h3>',
      '<h4>Coordinator contact:</h4>',
      '<ul>',
      '<li>European Molecular Biology Laboratory</li>',
      '<li>ZB MED – Information Centre</li>',
      '</ul>',
      '<p><strong>Disclaimer:</strong> Views &amp; opinions.</p>',
      '<p><a href="https://example.org/data/"><code>AAPFNSO2019OpenMetaPaper-14026</code></a> is funded.</p>',
      '<p><img src="https://training.galaxyproject.org/logo.png" alt="EU logo"></p>',
      '<p>Contact <a href="mailto:someone@example.org">us</a>.<br>Thanks</p>',
      '<ol>',
      '<li><em>one</em></li>',
      '</ol>',
      '',
    ].join('\n');
    expect(bio(html)).toBe(html.replace('alt="EU logo">', 'alt="EU logo" />').replace('<br>', '<br />'));
  });

  it('unwraps links with unsafe, other-scheme or relative href', () => {
    for (const href of [
      'javascript:alert(1)',
      '&#106;avascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'data:text/html;base64,PHNjcmlwdD4=',
      'ftp://example.org/file',
      'tel:+4912345',
      '//evil.example/x',
      '/news/',
    ]) {
      expect(bio(`<a href="${href}">x</a>`), href).toBe('x');
    }
    expect(bio('<a>x</a>')).toBe('x');
  });

  it('strips attributes other than a[href] and img[src|alt]', () => {
    expect(bio('<a href="https://example.org" onclick="alert(1)" target="_top" name="n">x</a>')).toBe(
      '<a href="https://example.org">x</a>'
    );
    expect(bio('<p style="position:fixed" class="x">t</p>')).toBe('<p>t</p>');
    expect(
      bio('<img src="https://example.org/a.png" alt="a" onerror="alert(1)" srcset="https://example.org/b.png 2x">')
    ).toBe('<img src="https://example.org/a.png" alt="a" />');
  });

  it('drops images with unsafe or relative src', () => {
    expect(bio('<img src="x" onerror="alert(1)">')).toBe('');
    expect(bio('<img src="javascript:alert(1)">')).toBe('');
    expect(bio('<img src="data:image/svg+xml,<svg onload=alert(1)>">')).toBe('');
    expect(bio('<img src="ftp://example.org/a.png">')).toBe('');
    expect(bio('<img src="mailto:someone@example.org">')).toBe('');
    expect(bio('<img src="/training-material/logo.png" alt="logo">')).toBe('');
  });

  it('escapes quotes and angle brackets in kept attribute values', () => {
    expect(bio('<img src="https://example.org/a.png" alt=\'say "hi" <b>\'>')).toBe(
      '<img src="https://example.org/a.png" alt="say &quot;hi&quot; &lt;b&gt;" />'
    );
    expect(bio('<a href=https://example.org/?a=1&b=2>x</a>')).toBe('<a href="https://example.org/?a=1&amp;b=2">x</a>');
  });

  it('removes raw script, iframe and form-like elements that marked passes through', () => {
    expect(bio('<p>hi</p>\n<script>alert(1)</script>\n<iframe src="https://evil.example"></iframe>')).toBe(
      '<p>hi</p>\n\n'
    );
    expect(bio('<form action="https://evil.example"><input name="pw"></form>text')).toBe('text');
    expect(bio('<object data="x"></object><embed src="x">ok')).toBe('ok');
    expect(bio('<math><mi>x</mi></math><template><b>t</b></template>ok')).toBe('ok');
  });

  it('handles nested hostile markup', () => {
    expect(bio('<p><b><a href="javascript:alert(1)"><img src=x onerror=alert(1)>click</a></b></p>')).toBe(
      '<p><b>click</b></p>'
    );
  });
});
