import { describe, expect, it } from 'vitest';
import { safeHref, safeUrl } from './url';

describe('safeUrl', () => {
  it('keeps http(s) URLs unchanged', () => {
    expect(safeUrl('https://example.org/a?b=1&c=2')).toBe('https://example.org/a?b=1&c=2');
    expect(safeUrl('http://example.org')).toBe('http://example.org');
    expect(safeUrl('HTTPS://EXAMPLE.ORG')).toBe('HTTPS://EXAMPLE.ORG');
  });

  it('rejects script-capable, data, other-scheme and relative URLs', () => {
    for (const url of [
      'javascript:alert(1)',
      'JaVaScRiPt:alert(1)',
      ' javascript:alert(1)',
      'java\tscript:alert(1)',
      '\u0001javascript:alert(1)',
      'vbscript:msgbox(1)',
      'data:text/html;base64,PHNjcmlwdD4=',
      'ftp://example.org/file',
      'tel:+4912345',
      '//evil.example/x',
      '/relative/path',
      '#fragment',
      '',
    ]) {
      expect(safeUrl(url), url).toBeUndefined();
    }
  });

  it('rejects entity-encoded schemes', () => {
    expect(safeUrl('&#106;avascript:alert(1)')).toBeUndefined();
    expect(safeUrl('javascript&colon;alert(1)')).toBeUndefined();
  });

  it('allows mailto only when asked', () => {
    expect(safeUrl('mailto:someone@example.org')).toBeUndefined();
    expect(safeUrl('mailto:someone@example.org', ['http:', 'https:', 'mailto:'])).toBe('mailto:someone@example.org');
  });

  it('ignores non-string input', () => {
    expect(safeUrl(undefined)).toBeUndefined();
    expect(safeUrl(42 as unknown as string)).toBeUndefined();
  });
});

describe('safeHref', () => {
  it('keeps relative links and allowlisted absolute URLs unchanged', () => {
    for (const url of [
      '/news/',
      ' /path',
      'page.html',
      '../up/',
      '#fragment',
      '?q=1',
      'https://example.org/a',
      'HTTP://EXAMPLE.ORG',
      'mailto:someone@example.org',
      'MailTo:someone@example.org',
    ]) {
      expect(safeHref(url), url).toBe(url);
    }
  });

  it('rejects script-capable, data, other-scheme and protocol-relative URLs', () => {
    for (const url of [
      'javascript:alert(1)',
      'JaVaScRiPt:alert(1)',
      ' javascript:alert(1)',
      '\tjavascript:alert(1)',
      'java\tscript:alert(1)',
      'java\nscript:alert(1)',
      '\u0001javascript:alert(1)',
      'vbscript:msgbox(1)',
      'VBScript:msgbox(1)',
      'data:text/html;base64,PHNjcmlwdD4=',
      ' DATA:text/html,x',
      'ftp://example.org/file',
      'tel:+4912345',
      '//evil.example/x',
      ' //evil.example/x',
      '/\\evil.example/x',
      '',
      '   ',
    ]) {
      expect(safeHref(url), JSON.stringify(url)).toBeUndefined();
    }
  });

  it('narrows to the given schemes', () => {
    expect(safeHref('mailto:someone@example.org', ['http:', 'https:'])).toBeUndefined();
    expect(safeHref('/still/relative', ['https:'])).toBe('/still/relative');
  });

  it('ignores non-string input', () => {
    expect(safeHref(undefined)).toBeUndefined();
    expect(safeHref(null)).toBeUndefined();
    expect(safeHref(42)).toBeUndefined();
  });
});
