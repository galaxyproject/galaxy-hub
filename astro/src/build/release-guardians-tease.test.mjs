import { describe, expect, it } from 'vitest';

import { extractPlainTease, TEASE_MAX_WORDS } from './release-guardians-tease.mjs';

describe('extractPlainTease', () => {
  it('returns the empty string for empty / nullish input', () => {
    expect(extractPlainTease('')).toBe('');
    expect(extractPlainTease(null)).toBe('');
    expect(extractPlainTease(undefined)).toBe('');
  });

  it('returns a fully clean first sentence as-is', () => {
    const body = 'Replaces the old upload widget with the new drag-and-drop one.';
    expect(extractPlainTease(body)).toBe(body);
  });

  it('skips paragraphs that contain markdown structural lines (headings)', () => {
    const body = ['## Summary', '', 'Fixes the regression in the upload widget.'].join('\n');
    expect(extractPlainTease(body)).toBe('Fixes the regression in the upload widget.');
  });

  it('strips heading lines glued to following prose so the prose stands alone', () => {
    // Heading + prose on adjacent lines (no blank between) — the common
    // PR-template shape that an earlier version of this function missed.
    const body = ['## Activity Bar Title Badge', 'A badge at the top indicates the current activity bar context.'].join(
      '\n'
    );
    expect(extractPlainTease(body)).toBe('A badge at the top indicates the current activity bar context.');
  });

  it('skips a dirty first sentence and starts at the first clean one in the paragraph', () => {
    const body =
      'Addresses #1234 and resolves https://example.com/issue. The trash icon replaces the red cross icon for clarity.';
    expect(extractPlainTease(body)).toBe('The trash icon replaces the red cross icon for clarity.');
  });

  it('stops accumulating at the first dirty sentence', () => {
    const body =
      'First clean sentence here. Second clean sentence here. Third sentence mentions #1234. Fourth would be clean.';
    expect(extractPlainTease(body)).toBe('First clean sentence here. Second clean sentence here.');
  });

  it('handles CRLF line endings (GitHub mixes them)', () => {
    const body = '## Summary\r\n\r\nThis sentence should be the tease.';
    expect(extractPlainTease(body)).toBe('This sentence should be the tease.');
  });

  it('strips HTML comments before scanning', () => {
    const body = '<!-- template comment -->\n\nThe real description starts here.';
    expect(extractPlainTease(body)).toBe('The real description starts here.');
  });

  it('strips fenced code blocks before scanning', () => {
    const body = ['```js', 'const foo = 1;', '```', '', 'Real prose after the code block.'].join('\n');
    expect(extractPlainTease(body)).toBe('Real prose after the code block.');
  });

  it('truncates at TEASE_MAX_WORDS', () => {
    const words = Array.from({ length: TEASE_MAX_WORDS + 20 }, (_, i) => `w${i}`);
    const body = `${words.join(' ')}.`;
    const out = extractPlainTease(body);
    expect(out.split(/\s+/).length).toBe(TEASE_MAX_WORDS);
  });

  it('allows backticked inline code through (renders as literal characters)', () => {
    const body = 'The endpoint embedded the entire active history in `data` and `data_collection` parameter options.';
    expect(extractPlainTease(body)).toBe(body);
  });

  it('returns empty when no clean sentence exists anywhere', () => {
    const body = [
      '## Summary',
      '',
      '- A bullet list of changes',
      '- That contains only markdown structure',
      '',
      'See #1234 for context @somebot',
    ].join('\n');
    expect(extractPlainTease(body)).toBe('');
  });
});
