import { describe, it, expect } from 'vitest';
import { parseTweetUrl } from './tweet-url';

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
