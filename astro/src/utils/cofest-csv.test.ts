import { describe, expect, it } from 'vitest';
import { parseCsv } from './cofest-csv';

describe('parseCsv', () => {
  it('parses a basic sheet keyed by header', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,Does foo,Ada,Bob';
    expect(parseCsv(csv)).toEqual([{ project: 'Foo', description: 'Does foo', lead: 'Ada', assignees: ['Bob'] }]);
  });

  it('splits assignees on commas inside a quoted field', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,Desc,Ada,"Bob, Carol, Dan"';
    expect(parseCsv(csv)[0].assignees).toEqual(['Bob', 'Carol', 'Dan']);
  });

  it('keeps commas that belong to a quoted description', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,"Two things: a, and b",Ada,Bob';
    expect(parseCsv(csv)[0].description).toBe('Two things: a, and b');
  });

  it('handles newlines embedded in a quoted cell', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,"line one\nline two",Ada,Bob';
    const out = parseCsv(csv);
    expect(out).toHaveLength(1);
    expect(out[0].description).toBe('line one\nline two');
  });

  it('handles CRLF line endings from published sheets', () => {
    const csv = 'Project,Description,Lead,Assignees\r\nFoo,Desc,Ada,"Bob, Carol"\r\n';
    const out = parseCsv(csv);
    expect(out).toHaveLength(1);
    expect(out[0].assignees).toEqual(['Bob', 'Carol']);
  });

  it('matches columns by header even when reordered', () => {
    const csv = 'Lead,Assignees,Project,Description\nAda,"Bob, Carol",Foo,Does foo';
    expect(parseCsv(csv)).toEqual([
      { project: 'Foo', description: 'Does foo', lead: 'Ada', assignees: ['Bob', 'Carol'] },
    ]);
  });

  it('treats an empty assignees cell as no team', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,Desc,Ada,';
    expect(parseCsv(csv)[0].assignees).toEqual([]);
  });

  it('unescapes doubled quotes', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,"a ""quoted"" word",Ada,Bob';
    expect(parseCsv(csv)[0].description).toBe('a "quoted" word');
  });

  it('drops rows without a project name', () => {
    const csv = 'Project,Description,Lead,Assignees\nFoo,Desc,Ada,Bob\n,,,\nBar,Desc,Eve,Frank';
    expect(parseCsv(csv).map((p) => p.project)).toEqual(['Foo', 'Bar']);
  });

  it('returns an empty array for header-only or empty input', () => {
    expect(parseCsv('Project,Description,Lead,Assignees')).toEqual([]);
    expect(parseCsv('')).toEqual([]);
  });
});
