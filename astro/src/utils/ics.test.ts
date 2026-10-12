import { describe, expect, it } from 'vitest';
import { escapeICS, formatICSDateOnly, formatICSURI, getICSEndDate } from './ics';

function icsEnd(start: string, end: string | null): string {
  return formatICSDateOnly(getICSEndDate(new Date(start), end ? new Date(end) : null));
}

describe('getICSEndDate', () => {
  it('ends one-day events on the day after the start', () => {
    expect(icsEnd('2026-10-12', null)).toBe('20261013');
    expect(icsEnd('2026-10-12', '2026-10-12')).toBe('20261013');
  });

  it('ends multi-day events on the day after the last day', () => {
    expect(icsEnd('2026-10-12', '2026-10-16')).toBe('20261017');
  });

  it('rolls over months, years and leap days', () => {
    expect(icsEnd('2026-12-28', '2026-12-31')).toBe('20270101');
    expect(icsEnd('2028-02-26', '2028-02-28')).toBe('20280229');
  });
});

describe('escapeICS', () => {
  it('escapes backslashes, semicolons and commas', () => {
    expect(escapeICS('a\\b;c,d')).toBe('a\\\\b\\;c\\,d');
  });

  it('escapes LF, CRLF and bare CR as a single \\n', () => {
    expect(escapeICS('a\nb')).toBe('a\\nb');
    expect(escapeICS('a\r\nb')).toBe('a\\nb');
    expect(escapeICS('a\rb')).toBe('a\\nb');
    expect(escapeICS('a\r\n\r\nb')).toBe('a\\n\\nb');
  });
});

describe('formatICSURI', () => {
  const base = 'https://galaxyproject.org/events/';

  it('keeps URIs without backslash escaping', () => {
    expect(formatICSURI(`${base}a,b;c/`)).toBe(`${base}a,b;c/`);
  });

  it('removes CR and LF so the URI cannot end the property', () => {
    expect(formatICSURI(`${base}a\r\nUID:x/`)).toBe(`${base}aUID:x/`);
    expect(formatICSURI(`${base}a\rb\nc/`)).toBe(`${base}abc/`);
  });
});
