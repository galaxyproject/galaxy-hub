import { describe, it, expect } from 'vitest';
import { processMarkdown } from './markdown-processor.mjs';

describe('processMarkdown', () => {
  it('does not escape characters inside bare URLs', async () => {
    const out = await processMarkdown(
      '* Repository: https://github.com/galaxy-iuc/tool_shed/\n* Search: https://example.org/?a=1&b=2\n* www.example.org/snake_case\n'
    );
    expect(out).toContain('https://github.com/galaxy-iuc/tool_shed/');
    expect(out).toContain('https://example.org/?a=1&b=2');
    expect(out).toContain('www.example.org/snake_case');
  });

  it('still escapes text outside bare URLs', async () => {
    expect(await processMarkdown('A \\_literal\\_ word before https://example.org/a_b\n')).toBe(
      'A \\_literal\\_ word before https://example.org/a_b\n'
    );
  });

  it('leaves link labels to the default escaping', async () => {
    const source = '[https://example.org/a\\_b](https://example.org/a_b)\n';
    expect(await processMarkdown(source)).toBe(source);
  });
});
