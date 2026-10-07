import { describe, it, expect } from 'vitest';
import { daysToEnd } from './normalize-content.mjs';

describe('daysToEnd', () => {
  it('replaces days with the last day for multi-day events', () => {
    expect(daysToEnd("title: X\ndate: '2026-10-12'\ndays: 5\n")).toBe(
      "title: X\ndate: '2026-10-12'\nend: '2026-10-16'\n"
    );
  });

  it('keeps the quote style of the date', () => {
    expect(daysToEnd('date: "2026-10-12"\ndays: 2\n')).toBe('date: "2026-10-12"\nend: "2026-10-13"\n');
    expect(daysToEnd('date: 2026-10-12\ndays: 2\n')).toBe('date: 2026-10-12\nend: 2026-10-13\n');
  });

  it('rolls over months and years', () => {
    expect(daysToEnd("date: '2026-12-30'\ndays: 5\n")).toBe("date: '2026-12-30'\nend: '2027-01-03'\n");
  });

  it('drops days for one-day events', () => {
    expect(daysToEnd("date: '2026-10-20'\ndays: 1\ntitle: X\n")).toBe("date: '2026-10-20'\ntitle: X\n");
  });

  it('drops an empty days', () => {
    expect(daysToEnd("date: '2022-02-17'\ndays: \ntitle: X\n")).toBe("date: '2022-02-17'\ntitle: X\n");
  });

  it('keeps an existing end and drops days', () => {
    expect(daysToEnd("date: '2026-10-11'\nend: '2026-10-14'\ndays: 6\n")).toBe(
      "date: '2026-10-11'\nend: '2026-10-14'\n"
    );
  });

  it('edits only the days and date lines, not matching text elsewhere', () => {
    expect(daysToEnd("# days: 1\ndate: '2026-10-12'\ndays: 1\n")).toBe("# days: 1\ndate: '2026-10-12'\n");
    expect(daysToEnd(`tease: "Save the date: '2026-10-12'"\ndate: '2026-10-12'\ndays: 3\n`)).toBe(
      `tease: "Save the date: '2026-10-12'"\ndate: '2026-10-12'\nend: '2026-10-14'\n`
    );
  });

  it('leaves frontmatter with an impossible date unchanged', () => {
    const fm = "date: '2026-13-01'\ndays: 3\n";
    expect(daysToEnd(fm)).toBe(fm);
  });

  it('leaves frontmatter without a full date unchanged', () => {
    const fm = "date: '2024-06'\ndays: 5\n";
    expect(daysToEnd(fm)).toBe(fm);
  });

  it('leaves frontmatter without days unchanged', () => {
    const fm = "date: '2026-10-12'\ntitle: X\n";
    expect(daysToEnd(fm)).toBe(fm);
  });
});
