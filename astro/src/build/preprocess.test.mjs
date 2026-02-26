import { describe, it, expect, beforeEach } from 'vitest';
import {
  hasProblematicHtml,
  needsVueProcessing,
  convertFontAwesomeToLucide,
  convertHtmlToJsx,
  convertComponentsToPascalCase,
  addBootstrapMarker,
  normalizeSlugSegment,
  normalizeSlug,
  inlineInserts,
  resolveInsertContent,
  insertCache,
  generateTease,
  preprocessContent,
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

  it('allows multiple balanced divs', () => {
    expect(hasProblematicHtml('<div>a</div><div>b</div>')).toBe(false);
  });

  it('detects HTML tables', () => {
    expect(hasProblematicHtml('<table><tr><td>cell</td></tr></table>')).toBe(true);
  });

  it('allows clean pipe tables without bare <', () => {
    const table = '| col1 | col2 |\n|------|------|\n| a | b |';
    expect(hasProblematicHtml(table)).toBe(false);
  });

  it('allows pipe tables with safe inline HTML tags', () => {
    const table = '| col1 | col2 |\n|------|------|\n| <a href="x">link</a> | <em>text</em> |';
    expect(hasProblematicHtml(table)).toBe(false);
  });

  it('detects pipe tables with unsafe < characters', () => {
    const table = '| col1 | col2 |\n|------|------|\n| <div class="highlight"> | val |';
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

  it('does not flag Vue imports (stripped during preprocessing)', () => {
    expect(hasProblematicHtml('import Foo from "foo"')).toBe(false);
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

  it('returns true for bare/ directory files with components', () => {
    expect(needsVueProcessing('<Insert name="/foo" />', {}, 'bare/page/index.md')).toBe(true);
  });

  it('detects PascalCase Carousel component', () => {
    expect(needsVueProcessing('<Carousel />', {})).toBe(true);
  });

  it('returns false when content has problematic HTML', () => {
    // Even with Insert, if there's problematic HTML, skip MDX
    expect(needsVueProcessing('<Insert name="/foo" />\n<div><div></div>', {})).toBe(false);
  });

  it('honors components: true even when HTML is problematic', () => {
    // Author explicit opt-in overrides hasProblematicHtml (Vue artifacts are stripped in preprocessing)
    expect(needsVueProcessing('<div><div></div>\n<vega-embed spec="x" />', { components: true })).toBe(true);
  });
});

describe('convertFontAwesomeToLucide', () => {
  it('converts FA4 syntax (fa fa-icon)', () => {
    const input = '<i class="fa fa-laptop"></i>';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
    expect(result).toContain('viewBox="0 0 24 24"');
  });

  it('converts FA5 syntax (fas fa-icon)', () => {
    const input = '<i class="fas fa-video"></i>';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
  });

  it('converts FA6 syntax (fa fa-solid fa-icon)', () => {
    const input = '<i class="fa fa-solid fa-book"></i>';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
  });

  it('converts brand icons (fab fa-icon)', () => {
    const input = '<i class="fab fa-github"></i>';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
  });

  it('preserves unmapped icons', () => {
    const input = '<i class="fa fa-unknown-icon"></i>';
    expect(convertFontAwesomeToLucide(input)).toBe(input);
  });

  it('leaves non-FA elements unchanged', () => {
    const input = '<i class="some-other-class"></i>';
    expect(convertFontAwesomeToLucide(input)).toBe(input);
  });

  it('handles icons with aria-hidden attribute', () => {
    const input = '<i class="fa fa-laptop" aria-hidden="true"></i>';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
  });

  it('converts multiple icons in content', () => {
    const input = '<i class="fa fa-laptop"></i> | <i class="fas fa-video"></i>';
    const result = convertFontAwesomeToLucide(input);
    expect(result.match(/<svg/g)).toHaveLength(2);
  });
});

describe('convertHtmlToJsx', () => {
  it('converts HTML comments to JSX comments', () => {
    expect(convertHtmlToJsx('<!-- comment -->')).toBe('{/*  comment  */}');
  });

  it('escapes empty angle brackets', () => {
    expect(convertHtmlToJsx('use <> for generics')).toBe('use &lt;&gt; for generics');
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

  it('adds bs-compat marker to table elements', () => {
    expect(addBootstrapMarker('<table class="table">Content</table>')).toBe(
      '<table class="bs-compat table">Content</table>'
    );
  });

  it('adds bs-compat marker to table-striped', () => {
    expect(addBootstrapMarker('<table class="table table-striped">Content</table>')).toBe(
      '<table class="bs-compat table table-striped">Content</table>'
    );
  });

  it('adds bs-compat marker to table-bordered', () => {
    expect(addBootstrapMarker('<table class="table-bordered">Content</table>')).toBe(
      '<table class="bs-compat table-bordered">Content</table>'
    );
  });
});

describe('normalizeSlugSegment', () => {
  it('lowercases simple uppercase strings', () => {
    expect(normalizeSlugSegment('HELLO')).toBe('hello');
  });

  it('keeps already-normalized segments unchanged', () => {
    expect(normalizeSlugSegment('already-lowercase')).toBe('already-lowercase');
  });

  it('inserts hyphen at camelCase boundaries', () => {
    expect(normalizeSlugSegment('ChatGPT')).toBe('chat-gpt');
  });

  it('inserts hyphen at letter→digit boundary', () => {
    expect(normalizeSlugSegment('PAG31')).toBe('pag-31');
  });

  it('inserts hyphen at digit→letter boundary', () => {
    expect(normalizeSlugSegment('4Bio')).toBe('4-bio');
  });

  it('replaces underscores with hyphens', () => {
    expect(normalizeSlugSegment('slides_to_videos')).toBe('slides-to-videos');
  });

  it('does not split within uppercase runs', () => {
    // "GBCC2025" — the uppercase run "GBCC" stays together
    expect(normalizeSlugSegment('GBCC2025')).toBe('gbcc-2025');
  });

  it('handles mixed camelCase with acronyms', () => {
    expect(normalizeSlugSegment('GalaxyRNAseq_Giessen')).toBe('galaxy-rnaseq-giessen');
  });

  it('handles PascalCase with numbers', () => {
    expect(normalizeSlugSegment('GCC2023-Meeting-Report')).toBe('gcc-2023-meeting-report');
  });

  it('handles GalaxyInResearch', () => {
    expect(normalizeSlugSegment('GalaxyInResearch')).toBe('galaxy-in-research');
  });

  it('handles NFDI4Bioimage (digit→letter boundary)', () => {
    expect(normalizeSlugSegment('NFDI4Bioimage')).toBe('nfdi-4-bioimage');
  });

  it('collapses multiple hyphens', () => {
    expect(normalizeSlugSegment('foo--bar')).toBe('foo-bar');
  });

  it('handles date-prefixed segments (already well-formed)', () => {
    expect(normalizeSlugSegment('2024-01-12-PAG31')).toBe('2024-01-12-pag-31');
  });

  it('applies overrides for BiaPy', () => {
    expect(normalizeSlugSegment('BiaPy-available-in-Galaxy')).toBe('biapy-available-in-galaxy');
  });

  it('applies overrides for NeIC', () => {
    expect(normalizeSlugSegment('NeIC-conference')).toBe('neic-conference');
  });

  it('applies overrides for bioMLtool', () => {
    expect(normalizeSlugSegment('bioMLtool')).toBe('bio-ml-tool');
  });

  it('handles community_page (underscore replacement)', () => {
    expect(normalizeSlugSegment('2024-12-19-community_page')).toBe('2024-12-19-community-page');
  });

  it('handles gcc2024 (no change needed except letter-digit boundary)', () => {
    expect(normalizeSlugSegment('gcc2024')).toBe('gcc-2024');
  });
});

describe('normalizeSlug', () => {
  it('normalizes each path segment independently', () => {
    expect(normalizeSlug('events/2024-01-12-PAG31')).toBe('events/2024-01-12-pag-31');
  });

  it('normalizes multi-segment paths', () => {
    expect(normalizeSlug('news/2024-09-02-ChatGPT')).toBe('news/2024-09-02-chat-gpt');
  });

  it('handles already-normalized paths', () => {
    expect(normalizeSlug('events/2025-admin-training-brno')).toBe('events/2025-admin-training-brno');
  });

  it('normalizes nested paths', () => {
    expect(normalizeSlug('community/GalaxyAdmins/SurveyResults')).toBe('community/galaxy-admins/survey-results');
  });

  it('handles single segment', () => {
    expect(normalizeSlug('home')).toBe('home');
  });
});

describe('inlineInserts', () => {
  beforeEach(() => {
    insertCache.clear();
  });

  it('resolves a real insert file (learn/linkbox)', () => {
    const content = 'Before\n<slot name="/learn/linkbox" />\nAfter';
    const result = inlineInserts(content);
    expect(result).toContain('Before');
    expect(result).toContain('After');
    expect(result).not.toContain('<slot');
    // The linkbox contains a div with links
    expect(result).toContain('linkbox');
  });

  it('leaves a comment for missing inserts', () => {
    const content = '<slot name="/nonexistent/path" />';
    const result = inlineInserts(content);
    expect(result).toContain('<!-- Insert not found: /nonexistent/path -->');
  });

  it('handles multiple slots in the same content', () => {
    const content = '<slot name="/learn/linkbox" />\nMiddle\n<slot name="/learn/linkbox" />';
    const result = inlineInserts(content);
    expect(result).not.toContain('<slot');
    expect(result).toContain('Middle');
    // Both should be resolved
    const matches = result.match(/linkbox/g);
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  it('handles nested inserts (cop_template references common_linkbox)', () => {
    const result = resolveInsertContent('/community/sig/common_linkbox');
    expect(result).not.toBeNull();
    expect(result).toContain('Galaxy Community Board');
  });

  it('applies bootstrap marker to insert content', () => {
    const result = resolveInsertContent('/community/sig/common_linkbox');
    // common_linkbox has class="alert alert-info..." which should get bs-compat
    expect(result).toContain('bs-compat');
  });

  it('passes content through unchanged when no slots present', () => {
    const content = '# Hello\n\nNo slots here.';
    expect(inlineInserts(content)).toBe(content);
  });
});

describe('convertFontAwesomeToLucide - kramdown patterns', () => {
  it('converts kramdown FA link patterns to Lucide SVGs', () => {
    const input = '[](){: .fa .fa-envelope style="color: #777"} [email](mailto:test@test.com)';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
    expect(result).not.toContain('{:');
    expect(result).toContain('mailto:test@test.com');
  });

  it('converts kramdown FA brand icons', () => {
    const input = '[](){: .fab .fa-github style="color: #777"} [repo](https://github.com)';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
    expect(result).not.toContain('{:');
  });

  it('removes unrecognized kramdown FA patterns', () => {
    const input = '[](){: .fa .fa-unknown-icon style="color: red"}';
    const result = convertFontAwesomeToLucide(input);
    expect(result).not.toContain('{:');
    expect(result).toBe('');
  });

  it('converts fa-rss to SVG', () => {
    const input = '[](){: .fa .fa-rss style="color: #777"} [feed](/feed.atom)';
    const result = convertFontAwesomeToLucide(input);
    expect(result).toContain('<svg');
    expect(result).toContain('/feed.atom');
  });
});

describe('generateTease', () => {
  it('extracts the first sentence from plain text', () => {
    const body = 'This is the first sentence. This is the second sentence.';
    expect(generateTease(body)).toBe('This is the first sentence.');
  });

  it('strips markdown links', () => {
    const body = '[TÜV SÜD](https://example.com) awarded the certification. More text here.';
    expect(generateTease(body)).toBe('TÜV SÜD awarded the certification.');
  });

  it('strips images', () => {
    const body = '![alt text](image.png)\n\nThe actual content starts here. And continues.';
    expect(generateTease(body)).toBe('The actual content starts here.');
  });

  it('strips HTML tags', () => {
    const body = '<div class="alert">Important announcement.</div> More text follows.';
    expect(generateTease(body)).toBe('Important announcement.');
  });

  it('strips heading markers', () => {
    const body = '## Overview\n\nThis project does something. Details follow.';
    expect(generateTease(body)).toBe('Overview This project does something.');
  });

  it('truncates long text at word boundary with ellipsis', () => {
    const body = 'word '.repeat(100);
    const result = generateTease(body);
    expect(result.length).toBeLessThanOrEqual(201);
    expect(result).toMatch(/…$/);
  });

  it('returns null for empty content', () => {
    expect(generateTease('')).toBeNull();
    expect(generateTease('   \n\n  ')).toBeNull();
  });

  it('returns short content as-is when under 200 chars', () => {
    const body = 'A short news item with no period';
    expect(generateTease(body)).toBe('A short news item with no period');
  });
});

describe('slug collision detection', () => {
  it('has no duplicate slugs within the same collection', async () => {
    const results = await preprocessContent({ verbose: false, clear: false });
    const slugMap = new Map();
    for (const result of results) {
      if (!result.slug) continue;
      const key = `${result.collection}/${result.slug}`;
      if (!slugMap.has(key)) {
        slugMap.set(key, []);
      }
      slugMap.get(key).push(result.source);
    }
    const duplicates = [...slugMap.entries()]
      .filter(([, sources]) => sources.length > 1)
      .map(([key, sources]) => `${key}: ${sources.join(', ')}`);
    expect(duplicates, `Duplicate slugs found:\n${duplicates.join('\n')}`).toHaveLength(0);
  }, 120_000);
});
