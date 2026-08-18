import { describe, it, expect, beforeEach } from 'vitest';
import {
  addBootstrapMarker,
  deriveNewsNaturalSlug,
  normalizeSlugSegment,
  normalizeSlug,
  inlineInserts,
  resolveInsertContent,
  insertCache,
  generateTease,
  replaceHubInlineMentions,
  shiftHeadings,
  preprocessContent,
} from './preprocess.mjs';

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

  it('does not split at letter→digit boundary', () => {
    expect(normalizeSlugSegment('PAG31')).toBe('pag31');
  });

  it('does not split at digit→letter boundary', () => {
    expect(normalizeSlugSegment('4Bio')).toBe('4bio');
  });

  it('replaces underscores with hyphens', () => {
    expect(normalizeSlugSegment('slides_to_videos')).toBe('slides-to-videos');
  });

  it('does not split within uppercase runs or at letter-digit boundaries', () => {
    // "GBCC2025" — the uppercase run "GBCC" stays together, no letter-digit split
    expect(normalizeSlugSegment('GBCC2025')).toBe('gbcc2025');
  });

  it('handles mixed camelCase with acronyms', () => {
    expect(normalizeSlugSegment('GalaxyRNAseq_Giessen')).toBe('galaxy-rnaseq-giessen');
  });

  it('handles PascalCase with numbers', () => {
    expect(normalizeSlugSegment('GCC2023-Meeting-Report')).toBe('gcc2023-meeting-report');
  });

  it('handles GalaxyInResearch', () => {
    expect(normalizeSlugSegment('GalaxyInResearch')).toBe('galaxy-in-research');
  });

  it('handles NFDI4Bioimage (no digit→letter split)', () => {
    expect(normalizeSlugSegment('NFDI4Bioimage')).toBe('nfdi4bioimage');
  });

  it('collapses multiple hyphens', () => {
    expect(normalizeSlugSegment('foo--bar')).toBe('foo-bar');
  });

  it('handles date-prefixed segments (already well-formed)', () => {
    expect(normalizeSlugSegment('2024-01-12-PAG31')).toBe('2024-01-12-pag31');
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

  it('handles gcc2024 (no change needed, no letter-digit split)', () => {
    expect(normalizeSlugSegment('gcc2024')).toBe('gcc2024');
  });
});

describe('normalizeSlug', () => {
  it('normalizes each path segment independently', () => {
    expect(normalizeSlug('events/2024-01-12-PAG31')).toBe('events/2024-01-12-pag31');
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

describe('deriveNewsNaturalSlug', () => {
  it('keeps the news prefix and removes a year bucket', () => {
    expect(deriveNewsNaturalSlug('news/2025/2025-01-foo')).toBe('news/2025-01-foo');
  });

  it('keeps the news prefix for non-bucketed news paths', () => {
    expect(deriveNewsNaturalSlug('news/2025-01-foo')).toBe('news/2025-01-foo');
  });

  it('passes through non-news paths', () => {
    expect(deriveNewsNaturalSlug('articles/example')).toBe('articles/example');
  });
});

describe('inlineInserts', () => {
  beforeEach(() => {
    insertCache.clear();
  });

  it('resolves a real insert file (learn/linkbox)', () => {
    const content = 'Before\n<slot name="/learn/linkbox" />\nAfter';
    const { content: result } = inlineInserts(content);
    expect(result).toContain('Before');
    expect(result).toContain('After');
    expect(result).not.toContain('<slot');
    // The linkbox contains a div with links
    expect(result).toContain('linkbox');
  });

  it('leaves a comment for missing inserts', () => {
    const content = '<slot name="/nonexistent/path" />';
    const { content: result } = inlineInserts(content);
    expect(result).toContain('<!-- Insert not found: /nonexistent/path -->');
  });

  it('handles multiple slots in the same content', () => {
    const content = '<slot name="/learn/linkbox" />\nMiddle\n<slot name="/learn/linkbox" />';
    const { content: result } = inlineInserts(content);
    expect(result).not.toContain('<slot');
    expect(result).toContain('Middle');
    // Both should be resolved
    const matches = result.match(/linkbox/g);
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  it('handles nested inserts (cop_template references common_linkbox)', () => {
    const result = resolveInsertContent('/community/sig/common_linkbox');
    expect(result).not.toBeNull();
    expect(result.content).toContain('Galaxy Community Board');
  });

  it('applies bootstrap marker to insert content', () => {
    const result = resolveInsertContent('/community/sig/common_linkbox');
    // common_linkbox has class="alert alert-info..." which should get bs-compat
    expect(result.content).toContain('bs-compat');
  });

  it('passes content through unchanged when no slots present', () => {
    const content = '# Hello\n\nNo slots here.';
    const { content: result } = inlineInserts(content);
    expect(result).toBe(content);
  });
});

describe('shiftHeadings', () => {
  it('shifts all headings down by one when multiple h1s exist', () => {
    const content = '# First\n\nSome text\n\n# Second\n\n## Sub';
    expect(shiftHeadings(content)).toBe('## First\n\nSome text\n\n## Second\n\n### Sub');
  });

  it('leaves content unchanged when only one h1', () => {
    const content = '# Title\n\n## Section\n\n### Sub';
    expect(shiftHeadings(content)).toBe(content);
  });

  it('leaves content unchanged when no h1s', () => {
    const content = '## Section\n\n### Sub';
    expect(shiftHeadings(content)).toBe(content);
  });

  it('caps at h6', () => {
    const content = '# A\n\n# B\n\n###### Deep';
    expect(shiftHeadings(content)).toBe('## A\n\n## B\n\n###### Deep');
  });

  it('shifts h5 to h6', () => {
    const content = '# A\n\n# B\n\n##### Five';
    expect(shiftHeadings(content)).toBe('## A\n\n## B\n\n###### Five');
  });

  it('does not shift headings inside fenced code blocks', () => {
    const content = '# A\n\n# B\n\n```\n# code comment\n## also code\n```\n\n## Real heading';
    expect(shiftHeadings(content)).toBe('## A\n\n## B\n\n```\n# code comment\n## also code\n```\n\n### Real heading');
  });

  it('does not shift headings inside tilde fenced code blocks', () => {
    const content = '# A\n\n# B\n\n~~~\n# code comment\n~~~\n\n## Real';
    expect(shiftHeadings(content)).toBe('## A\n\n## B\n\n~~~\n# code comment\n~~~\n\n### Real');
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

describe('replaceHubInlineMentions', () => {
  it('replaces contributor mentions with inline hall-of-fame links', () => {
    const result = replaceHubInlineMentions('Implemented by @hub:bgruening.');
    expect(result).toContain('href="/hall-of-fame/bgruening/"');
    expect(result).toContain('Björn Grüning');
    expect(result).toContain('class="hub-inline-link"');
    expect(result).not.toContain('@hub:bgruening');
  });

  it('accepts the @gtn alias', () => {
    const result = replaceHubInlineMentions('Implemented by @gtn:bgruening.');
    expect(result).toContain('href="/hall-of-fame/bgruening/"');
    expect(result).toContain('Björn Grüning');
    expect(result).not.toContain('@gtn:bgruening');
  });

  it('leaves unknown mentions unchanged', () => {
    expect(replaceHubInlineMentions('Unknown @hub:not-real')).toContain('@hub:not-real');
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
