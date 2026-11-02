import { describe, expect, it, vi } from 'vitest';

vi.mock('astro:content', () => ({ defineCollection: (config: unknown) => config }));
vi.mock('astro/loaders', () => ({ glob: () => ({}) }));

const { collections } = await import('./content.config');

type Schema = { parse: (data: unknown) => { external_url?: string | null } };
const schemaOf = (name: keyof typeof collections) => (collections[name] as unknown as { schema: Schema }).schema;

const UNSAFE = ['javascript:alert(1)', 'java\tscript:alert(1)', 'data:text/html,x', '//evil.example/'];
const SAFE = ['https://example.org/a?b=1', 'http://example.org/', 'mailto:a@example.org', '/news/x/file.pdf', ''];

describe('external_url in content collections', () => {
  const linked = ['news', 'events', 'articles', 'bare-articles'] as const;

  it.each(linked)('%s drops links with other schemes', (name) => {
    for (const url of UNSAFE) {
      expect(schemaOf(name).parse({ slug: 'x', external_url: url }).external_url).toBeNull();
    }
  });

  it.each(linked)('%s keeps web, mail and site-relative links and empty values', (name) => {
    for (const url of SAFE) {
      expect(schemaOf(name).parse({ slug: 'x', external_url: url }).external_url).toBe(url);
    }
    expect(schemaOf(name).parse({ slug: 'x', external_url: null }).external_url).toBeNull();
    expect(schemaOf(name).parse({ slug: 'x' }).external_url).toBeUndefined();
  });
});
