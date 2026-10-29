import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const css = readFileSync(fileURLToPath(new URL('./global.css', import.meta.url)), 'utf8').replace(
  /\/\*[\s\S]*?\*\//g,
  ''
);

/** Top-level rules as [prelude, body]; nested blocks stay inside their parent's body. */
function topLevelRules(source: string): Array<[string, string]> {
  const rules: Array<[string, string]> = [];
  let depth = 0;
  let start = 0;
  let open = 0;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === '{') {
      if (depth === 0) open = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        const prelude = source
          .slice(start, open)
          .replace(/^[\s\S]*;/, '')
          .trim();
        rules.push([prelude, source.slice(open + 1, i)]);
        start = i + 1;
      }
    }
  }
  return rules;
}

function declarations(selector: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const [prelude, body] of topLevelRules(css)) {
    if (prelude !== selector) continue;
    for (const m of body.matchAll(/([\w-]+)\s*:\s*([^;{}]+);/g)) out.set(m[1], m[2].trim());
  }
  return out;
}

const theme = declarations('@theme inline');
const light = declarations(':root');
const dark = declarations('.dark');

/** Colour utilities mapped to a runtime variable: --color-<name>: var(--<role>). */
const colourRoles = [...theme]
  .filter(([name]) => name.startsWith('--color-'))
  .map(([name, value]) => [name, /^var\((--[\w-]+)\)$/.exec(value)?.[1]] as const)
  .filter((entry): entry is readonly [string, string] => Boolean(entry[1]));

describe('global.css theme roles', () => {
  it('maps the semantic colour roles into Tailwind', () => {
    const names = colourRoles.map(([name]) => name);
    for (const role of [
      'fg',
      'fg-strong',
      'fg-meta',
      'link',
      'link-hover',
      'surface',
      'line',
      'focus',
      'accent-gold',
    ]) {
      expect(names).toContain(`--color-${role}`);
    }
  });

  it('gives every colour role a light value in :root and a dark value in .dark', () => {
    const missing = colourRoles.flatMap(([name, role]) => [
      ...(light.has(role) ? [] : [`${name} -> ${role} has no :root value`]),
      ...(dark.has(role) ? [] : [`${name} -> ${role} has no .dark value`]),
    ]);
    expect(missing).toEqual([]);
  });

  it('declares color-scheme in both theme blocks', () => {
    expect(light.get('color-scheme')).toBe('light');
    expect(dark.get('color-scheme')).toBe('dark');
  });

  it('never reuses galaxy-ui primitive names or the shadcn accent for theme colours', () => {
    const clashes = [...theme.keys()].filter((name) => /^--color-(blue|grey|green|yellow|orange|red)-\d+$/.test(name));
    expect(clashes).toEqual([]);
    expect(theme.get('--color-accent')).toBe('var(--accent)');
  });

  it('exposes the compact type scale and the reading measure', () => {
    for (const step of ['h1', 'h2', 'h3', 'h4', 'body', 'lead', 'meta', 'micro']) {
      expect(theme.has(`--text-${step}`)).toBe(true);
      expect(theme.has(`--text-${step}--line-height`)).toBe(true);
    }
    expect(light.get('--measure')).toBe('72ch');
  });
});
