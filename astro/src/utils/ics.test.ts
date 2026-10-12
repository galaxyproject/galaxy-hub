import { describe, expect, it } from 'vitest';
import { escapeICS, foldLine, formatICSDateOnly, formatICSURI, getICSEndDate } from './ics';

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

  it('drops control characters but keeps tabs', () => {
    expect(escapeICS('a\x00b\x07c\x0Bd\x0Ce\x1Ff\x7Fg')).toBe('abcdefg');
    expect(escapeICS('a\tb')).toBe('a\tb');
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

  it('drops other control characters', () => {
    expect(formatICSURI(`${base}a\x00b\x0Bc\x7Fd/`)).toBe(`${base}abcd/`);
  });
});

describe('foldLine', () => {
  const octets = (text: string) => new TextEncoder().encode(text).length;
  const lines = (folded: string) => folded.split('\r\n');

  // Every physical line fits in 75 octets, no code point is split, and unfolding restores the input
  function expectValidFold(input: string, folded: string) {
    for (const line of lines(folded)) {
      expect(octets(line)).toBeLessThanOrEqual(75);
      expect(new TextDecoder().decode(new TextEncoder().encode(line))).toBe(line);
    }
    expect(folded.replace(/\r\n /g, '')).toBe(input);
  }

  it('keeps a line of exactly 75 octets', () => {
    const input = 'x'.repeat(75);
    expect(foldLine(input)).toBe(input);
  });

  it('folds a 76-octet line after 75 octets', () => {
    expect(lines(foldLine('x'.repeat(76)))).toEqual(['x'.repeat(75), ' x']);
  });

  it('counts the leading space of continuation lines', () => {
    const folded = foldLine('x'.repeat(150));
    expect(lines(folded)).toEqual(['x'.repeat(75), ' ' + 'x'.repeat(74), ' x']);
    expectValidFold('x'.repeat(150), folded);
  });

  it('counts umlauts as two octets and never splits them', () => {
    expect(foldLine('x'.repeat(73) + 'ü')).toBe('x'.repeat(73) + 'ü');
    expect(lines(foldLine('x'.repeat(74) + 'ü'))).toEqual(['x'.repeat(74), ' ü']);
  });

  it('counts emoji as four octets and never splits the surrogate pair', () => {
    expect(foldLine('x'.repeat(71) + '😀')).toBe('x'.repeat(71) + '😀');
    expect(lines(foldLine('x'.repeat(72) + '😀'))).toEqual(['x'.repeat(72), ' 😀']);
  });

  it('folds long multibyte text into valid lines', () => {
    for (const input of ['ü'.repeat(100), '😀'.repeat(50), 'Grüße 😀 aus Freiburg, '.repeat(10)]) {
      expectValidFold(input, foldLine(input));
    }
  });
});
