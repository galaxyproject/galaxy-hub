import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import { describe, expect, it } from 'vitest';
import { safeJsonLd } from './json-ld';

describe('safeJsonLd', () => {
  const data = {
    '@type': 'Event',
    name: 'Workshop </script><script>alert(1)</script>',
    description: 'a <!-- b --> c\u2028d\u2029e & "quoted"',
    nested: [{ url: 'https://example.org/?a=1&b=<2>' }],
  };

  it('round-trips through JSON.parse unchanged', () => {
    expect(JSON.parse(safeJsonLd(data))).toEqual(data);
  });

  it('writes no literal "<" or line separators', () => {
    const out = safeJsonLd(data);
    expect(out).not.toMatch(/[<\u2028\u2029]/);
    expect(out).toContain('Workshop \\u003c/script>\\u003cscript>');
    expect(out).toContain('c\\u2028d\\u2029e');
  });

  it('matches JSON.stringify for data without those characters', () => {
    const plain = { '@context': 'https://schema.org', headline: 'Galaxy & friends', n: 1 };
    expect(safeJsonLd(plain)).toBe(JSON.stringify(plain));
  });
});

describe('JSON-LD script elements', () => {
  const src = path.resolve(import.meta.dirname, '..');
  const scripts = globSync('**/*.{astro,vue}', { cwd: src }).flatMap((file) =>
    [...fs.readFileSync(path.join(src, file), 'utf8').matchAll(/<script\b[^>]*application\/ld\+json[^>]*>/g)].map(
      ([tag]) => ({ file, tag })
    )
  );

  it('finds the news and event structured data', () => {
    expect(scripts.map((s) => s.file).sort()).toEqual([
      'pages/events/[...slug].astro',
      'pages/events/[...slug].astro',
      'pages/news/[...slug].astro',
    ]);
  });

  it('serializes every one with safeJsonLd', () => {
    for (const { file, tag } of scripts) {
      expect(tag, file).toMatch(/set:html=\{safeJsonLd\(\w+\)\}/);
    }
  });
});
