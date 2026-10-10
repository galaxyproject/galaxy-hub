import { describe, it, expect } from 'vitest';
import { parseTweetId, parseTweetUrl } from './tweet-url';

describe('parseTweetUrl', () => {
  it('rejects a javascript: URL', () => {
    expect(parseTweetUrl('javascript:alert(document.domain)')).toBeUndefined();
    expect(parseTweetUrl('JavaScript:alert(1)//https://twitter.com/a/status/1')).toBeUndefined();
  });

  it('rejects other schemes, other hosts and invalid input', () => {
    expect(parseTweetUrl('data:text/html,<script>alert(1)</script>')).toBeUndefined();
    expect(parseTweetUrl('http://twitter.com/galaxyproject/status/1')).toBeUndefined();
    expect(parseTweetUrl('https://example.org/galaxyproject/status/1')).toBeUndefined();
    expect(parseTweetUrl('https://twitter.com.example.org/galaxyproject/status/1')).toBeUndefined();
    expect(parseTweetUrl('https://twitter.com@example.org/galaxyproject/status/1')).toBeUndefined();
    expect(parseTweetUrl('https://twitter.com:8443/galaxyproject/status/1')).toBeUndefined();
    expect(parseTweetUrl('/galaxyproject/status/1')).toBeUndefined();
    expect(parseTweetUrl('not a url')).toBeUndefined();
    expect(parseTweetUrl('')).toBeUndefined();
    expect(parseTweetUrl(undefined)).toBeUndefined();
  });

  it('accepts https URLs on twitter.com and x.com', () => {
    expect(parseTweetUrl('https://twitter.com/galaxyproject/status/981073917187100672')).toEqual({
      href: 'https://twitter.com/galaxyproject/status/981073917187100672',
      id: '981073917187100672',
      user: 'galaxyproject',
    });
    expect(parseTweetUrl('https://www.x.com/galaxyproject/status/1665752049231749120?s=20')).toEqual({
      href: 'https://www.x.com/galaxyproject/status/1665752049231749120?s=20',
      id: '1665752049231749120',
      user: 'galaxyproject',
    });
    expect(parseTweetUrl('https://mobile.twitter.com/i/statuses/1595105516749225984')).toEqual({
      href: 'https://mobile.twitter.com/i/statuses/1595105516749225984',
      id: '1595105516749225984',
      user: undefined,
    });
  });

  it('keeps a profile link without a tweet id', () => {
    expect(parseTweetUrl('https://x.com/galaxyproject')).toEqual({
      href: 'https://x.com/galaxyproject',
      id: undefined,
      user: undefined,
    });
  });
});

describe('parseTweetId', () => {
  it('accepts a numeric id, trimmed', () => {
    expect(parseTweetId('981073917187100672')).toBe('981073917187100672');
    expect(parseTweetId(' 981073917187100672\n')).toBe('981073917187100672');
    expect(parseTweetId(1234567890)).toBe('1234567890');
  });

  it('rejects anything that is not only digits', () => {
    expect(parseTweetId('../../galaxyproject')).toBeUndefined();
    expect(parseTweetId('981073917187100672/../../galaxyproject')).toBeUndefined();
    expect(parseTweetId('https://twitter.com/i/status/981073917187100672')).toBeUndefined();
    expect(parseTweetId('javascript:alert(1)')).toBeUndefined();
    expect(parseTweetId('galaxyproject')).toBeUndefined();
    expect(parseTweetId('12a')).toBeUndefined();
    expect(parseTweetId('-1')).toBeUndefined();
    expect(parseTweetId('1e3')).toBeUndefined();
    expect(parseTweetId('1 2')).toBeUndefined();
    expect(parseTweetId('')).toBeUndefined();
    expect(parseTweetId('   ')).toBeUndefined();
    expect(parseTweetId(undefined)).toBeUndefined();
  });

  it('rejects numbers that cannot hold an exact tweet id', () => {
    expect(parseTweetId(Number.MAX_SAFE_INTEGER + 1)).toBeUndefined();
    expect(parseTweetId(1.5)).toBeUndefined();
    expect(parseTweetId(-1)).toBeUndefined();
    expect(parseTweetId(Number.NaN)).toBeUndefined();
  });
});
