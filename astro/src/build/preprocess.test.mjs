import { describe, it, expect } from 'vitest';
import {
  hasProblematicHtml,
  needsVueProcessing,
  convertGridsomeSyntax,
  convertVueToJsx,
  convertComponentsToPascalCase,
  addBootstrapMarker,
} from './preprocess.mjs';

describe('hasProblematicHtml', () => {
  it('returns false for plain markdown', () => {
    expect(hasProblematicHtml('# Hello\n\nThis is text.')).toBe(false);
  });

  it('returns false for single well-formed div', () => {
    expect(hasProblematicHtml('<div class="foo">content</div>')).toBe(false);
  });

  it('detects div with markdown link inside', () => {
    const content = '<div class="box">\n[Link](http://example.com)\n</div>';
    expect(hasProblematicHtml(content)).toBe(true);
  });

  it('detects unbalanced divs', () => {
    expect(hasProblematicHtml('<div><div></div>')).toBe(true);
  });

  it('detects multiple divs', () => {
    expect(hasProblematicHtml('<div>a</div><div>b</div>')).toBe(true);
  });

  it('detects HTML tables', () => {
    expect(hasProblematicHtml('<table><tr><td>cell</td></tr></table>')).toBe(true);
  });

  it('detects markdown tables', () => {
    const table = '| col1 | col2 |\n|------|------|\n| a | b |';
    expect(hasProblematicHtml(table)).toBe(true);
  });

  it('detects arrow patterns like <---', () => {
    expect(hasProblematicHtml('text <--- arrow')).toBe(true);
    expect(hasProblematicHtml('pointer <--')).toBe(true);
  });

  it('detects < followed by numbers', () => {
    expect(hasProblematicHtml('distance <1.0km')).toBe(true);
    expect(hasProblematicHtml('count <500')).toBe(true);
  });

  it('detects malformed tags like <row>', () => {
    expect(hasProblematicHtml('<row>content</row>')).toBe(true);
    expect(hasProblematicHtml('<column>content</column>')).toBe(true);
    expect(hasProblematicHtml('<link-box>content</link-box>')).toBe(true);
  });

  it('detects Vue import patterns', () => {
    expect(hasProblematicHtml('import Foo from "foo"')).toBe(true);
  });

  it('allows normal less-than comparisons in text', () => {
    // This should be false - normal text with < but not followed by number/dash
    expect(hasProblematicHtml('x < y in math')).toBe(false);
  });
});

describe('needsVueProcessing', () => {
  it('returns false for plain markdown', () => {
    expect(needsVueProcessing('# Hello', {})).toBe(false);
  });

  it('returns true for explicit components frontmatter', () => {
    expect(needsVueProcessing('content', { components: true })).toBe(true);
  });

  it('detects Insert component', () => {
    expect(needsVueProcessing('<Insert name="/foo" />', {})).toBe(true);
  });

  it('detects Twitter component', () => {
    expect(needsVueProcessing('<twitter id="123" />', {})).toBe(true);
  });

  it('detects vega-embed component', () => {
    expect(needsVueProcessing('<vega-embed spec="chart.json" />', {})).toBe(true);
  });

  it('returns false for bare/ directory files', () => {
    expect(needsVueProcessing('<Insert name="/foo" />', {}, 'bare/page/index.md')).toBe(false);
  });

  it('returns false when content has problematic HTML', () => {
    // Even with Insert, if there's problematic HTML, skip MDX
    expect(needsVueProcessing('<Insert name="/foo" />\n<div><div></div>', {})).toBe(false);
  });
});

describe('convertGridsomeSyntax', () => {
  it('converts g-link to anchor tags', () => {
    expect(convertGridsomeSyntax('<g-link to="/page">text</g-link>')).toBe('<a to="/page">text</a>');
  });

  it('converts g-image to img tags', () => {
    expect(convertGridsomeSyntax('<g-image src="pic.png" />')).toBe('<img src="pic.png" />');
  });

  it('handles paired g-image tags', () => {
    expect(convertGridsomeSyntax('<g-image src="pic.png"></g-image>')).toBe('<img src="pic.png">');
  });

  it('leaves other content unchanged', () => {
    const content = '# Title\n\nParagraph with [link](url).';
    expect(convertGridsomeSyntax(content)).toBe(content);
  });
});

describe('convertVueToJsx', () => {
  it('converts HTML comments to JSX comments', () => {
    expect(convertVueToJsx('<!-- comment -->')).toBe('{/*  comment  */}');
  });

  it('converts auto-links to markdown links', () => {
    expect(convertVueToJsx('<https://example.com>')).toBe('[https://example.com](https://example.com)');
  });

  it('escapes empty angle brackets', () => {
    expect(convertVueToJsx('use <> for generics')).toBe('use &lt;&gt; for generics');
  });

  it('converts void elements to self-closing', () => {
    expect(convertVueToJsx('<br>')).toBe('<br />');
    expect(convertVueToJsx('<hr>')).toBe('<hr />');
    expect(convertVueToJsx('<img src="x">')).toBe('<img src="x" />');
  });

  it('fixes unquoted numeric attributes', () => {
    // td is not a void element, so it shouldn't become self-closing
    expect(convertVueToJsx('<td rowspan=3>')).toBe('<td rowspan="3">');
    expect(convertVueToJsx('<img width=100>')).toBe('<img width="100" />');
  });

  it('converts Vue numeric bindings', () => {
    expect(convertVueToJsx(':width="100"')).toBe('width={100}');
  });
});

describe('convertComponentsToPascalCase', () => {
  it('converts vega-embed to VegaEmbed', () => {
    expect(convertComponentsToPascalCase('<vega-embed spec="x" />')).toBe('<VegaEmbed spec="x" />');
  });

  it('converts video-player to VideoPlayer', () => {
    expect(convertComponentsToPascalCase('<video-player src="x"></video-player>')).toBe(
      '<VideoPlayer src="x"></VideoPlayer>'
    );
  });

  it('converts calendar-embed to CalendarEmbed', () => {
    expect(convertComponentsToPascalCase('<calendar-embed id="x" />')).toBe('<CalendarEmbed id="x" />');
  });

  it('converts twitter (lowercase) to Twitter', () => {
    expect(convertComponentsToPascalCase('<twitter id="123" />')).toBe('<Twitter id="123" />');
  });

  it('leaves unknown components unchanged', () => {
    expect(convertComponentsToPascalCase('<custom-component />')).toBe('<custom-component />');
  });
});

describe('addBootstrapMarker', () => {
  it('adds bs-compat marker to btn-primary', () => {
    expect(addBootstrapMarker('<a class="btn btn-primary">Click</a>')).toBe(
      '<a class="bs-compat btn btn-primary">Click</a>'
    );
  });

  it('adds bs-compat marker to card elements', () => {
    expect(addBootstrapMarker('<div class="card">Content</div>')).toBe('<div class="bs-compat card">Content</div>');
  });

  it('adds bs-compat marker to card-deck', () => {
    expect(addBootstrapMarker('<div class="card-deck">')).toBe('<div class="bs-compat card-deck">');
  });

  it('adds bs-compat marker to card-img-top', () => {
    expect(addBootstrapMarker('<img class="card-img-top" src="x" />')).toBe(
      '<img class="bs-compat card-img-top" src="x" />'
    );
  });

  it('adds bs-compat marker to alert classes', () => {
    expect(addBootstrapMarker('<div class="alert alert-warning">Warning!</div>')).toBe(
      '<div class="bs-compat alert alert-warning">Warning!</div>'
    );
  });

  it('adds bs-compat marker to lead text', () => {
    expect(addBootstrapMarker('<p class="lead">Important text</p>')).toBe(
      '<p class="bs-compat lead">Important text</p>'
    );
  });

  it('does not add duplicate bs-compat marker', () => {
    expect(addBootstrapMarker('<div class="bs-compat card">Already marked</div>')).toBe(
      '<div class="bs-compat card">Already marked</div>'
    );
  });

  it('leaves non-Bootstrap classes unchanged', () => {
    expect(addBootstrapMarker('<div class="my-custom-class">Content</div>')).toBe(
      '<div class="my-custom-class">Content</div>'
    );
  });

  it('handles multiple Bootstrap elements', () => {
    const input = '<div class="card-deck"><div class="card">One</div><div class="card">Two</div></div>';
    const expected =
      '<div class="bs-compat card-deck"><div class="bs-compat card">One</div><div class="bs-compat card">Two</div></div>';
    expect(addBootstrapMarker(input)).toBe(expected);
  });

  it('handles combined Bootstrap classes', () => {
    expect(addBootstrapMarker('<a class="btn btn-primary btn-lg">Big button</a>')).toBe(
      '<a class="bs-compat btn btn-primary btn-lg">Big button</a>'
    );
  });
});
