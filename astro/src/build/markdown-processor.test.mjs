import { describe, it, expect } from 'vitest';
import { processMarkdown } from './markdown-processor.mjs';

describe('processMarkdown', () => {
  it.each([
    [
      'bare URLs with underscores',
      '* Repository: https://github.com/galaxy-iuc/tool_shed/\n* www.example.org/snake_case\n',
    ],
    ['bare URLs with ampersands', 'Search: https://example.org/?a=1&b=2\n'],
    ['tables without leading pipes', 'Name | Value\n--- | ---\na | b\n'],
    ['footnotes', 'Some claim.[^1]\n\n[^1]: The source.\n'],
    ['strikethrough at line start', '~~Cancelled~~ event\n'],
    ['hard breaks', 'First line  \nsecond line\n'],
    ['emphasis with underscores', 'A _word_ and __strong__ text\n'],
  ])('leaves %s untouched when nothing changes', async (_, source) => {
    expect(await processMarkdown(source)).toBe(source);
  });

  it('rewrites relative image paths', async () => {
    expect(await processMarkdown('![x](images/a.png)\n')).toBe('![x](/images/a.png)\n');
  });

  it('leaves the rest of the file untouched when no transform runs', async () => {
    const source = 'See https://x.org/a_b\n\n![x](images/a.png)\n';
    expect(await processMarkdown(source, { fixLinks: false })).toBe(source);
  });

  it('adds a table of contents when asked', async () => {
    const out = await processMarkdown('## First\n\n## Second\n', { addToc: true });
    expect(out).toContain('## Table of contents');
    expect(out).toContain('* [First](#first)');
  });
});
