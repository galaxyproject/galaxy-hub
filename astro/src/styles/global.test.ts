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

function parse(body: string): Array<[string, string]> {
  return [...body.matchAll(/([\w-]+)\s*:\s*([^;{}]+);/g)].map((m) => [m[1], m[2].trim()]);
}

function declarations(selector: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const [prelude, body] of topLevelRules(css)) {
    if (prelude === selector) for (const [name, value] of parse(body)) out.set(name, value);
  }
  return out;
}

/** The @theme inline block that maps the semantic roles (the one defining --color-fg). */
const roleBlock = topLevelRules(css)
  .filter(([prelude, body]) => prelude === '@theme inline' && /--color-fg\s*:/.test(body))
  .map(([, body]) => parse(body));

/** shadcn names already in the first @theme inline block (design-alignment fact 5). */
const shadcnNames =
  /^--color-(background|foreground|card|popover|primary|secondary|muted|accent|destructive)(-foreground)?$|^--color-(border|input|ring|chart-\d+|sidebar(-[\w-]+)?)$/;

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
    const required = ['fg', 'fg-strong', 'fg-meta', 'link', 'link-hover', 'surface', 'line', 'focus'];
    for (const role of required) expect(names).toContain(`--color-${role}`);
    expect(names).toContain('--color-accent-gold');
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

  it('maps every role colour to a --gx- variable and redefines no shadcn name', () => {
    expect(roleBlock).toHaveLength(1);
    const colours = roleBlock[0].filter(([name]) => name.startsWith('--color-'));
    const notMapped = colours.filter(([, value]) => !/^var\(--gx-[\w-]+\)$/.test(value)).map(([name]) => name);
    expect(notMapped).toEqual([]);
    const shadcn = colours.filter(([name]) => shadcnNames.test(name)).map(([name]) => name);
    expect(shadcn).toEqual([]);
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
