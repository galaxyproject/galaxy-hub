import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Tailwind builds utilities only from the files it scans. It scans astro/ (src/ and config),
// but not the repo's content/ directory, so a colour-role class that appears only in content
// Markdown is never generated and silently does nothing. Content may use a role class only
// when src/ already uses the same class (same variant prefix too, e.g. `hover:`).
// This approximates Tailwind's scan by text search: a class that appears in src/ only inside
// `@apply` or a comment passes here and is still missing from the build.

const astroRoot = fileURLToPath(new URL('../../', import.meta.url));
const contentRoot = join(astroRoot, '..', 'content');
const srcRoot = join(astroRoot, 'src');

function files(dir: string, test: (name: string) => boolean, skip: (name: string) => boolean = () => false): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skip(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...files(path, test, skip));
    else if (test(entry.name)) out.push(path);
  }
  return out;
}

const ROLE =
  /(?<![\w:/-])((?:[a-z-]+:)*(?:text|bg|border|divide|ring|outline|decoration)-(?:fg|fg-strong|fg-2|fg-meta|fg-faint|fg-brand|link|link-hover|link-line|link-hover-line|surface|surface-2|surface-tint|surface-sunken|surface-raised|surface-overlay|surface-chip|surface-chip-hover|line|line-strong|line-input|line-brand|on-brand|on-accent-gold|on-selected|accent-gold|accent-gold-hover|selected|ok-fg|ok-bg|ok-line|info-fg|info-bg|warn-fg|warn-bg|danger-fg|danger-bg|past-fg|past-bg|past-line|page|chrome|chrome-fg|chrome-meta|chrome-line|chrome-field|focus)(?:\/\d+)?)(?![\w/-])/g;

const contentFiles = files(
  contentRoot,
  (name) => /\.mdx?$/.test(name),
  (name) => name.startsWith('.')
);
const srcText = files(
  srcRoot,
  (name) => /\.(astro|vue|ts|tsx|js|mjs|css)$/.test(name) && !/\.test\.ts$/.test(name),
  (name) => name === 'content'
)
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n');

describe('colour-role classes in content/', () => {
  it('only uses role classes that src/ also uses, because Tailwind does not scan content/', () => {
    const missing = new Map<string, string>();
    for (const path of contentFiles) {
      const text = readFileSync(path, 'utf8');
      for (const [, cls] of text.matchAll(ROLE)) {
        if (!missing.has(cls) && !new RegExp(`(?<![\\w:/-])${cls.replace(/[/:]/g, '\\$&')}(?![\\w/-])`).test(srcText))
          missing.set(cls, path.slice(contentRoot.length + 1));
      }
    }
    expect(Object.fromEntries(missing)).toEqual({});
  });
});
