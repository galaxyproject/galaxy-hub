import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as lucide from 'lucide-static';
import { describe, expect, it } from 'vitest';

import { brandIcons } from './mdx/brand-icons';

// Two Icon components exist and each fails differently on an unknown name: ui/Icon.astro renders a
// <path> with no `d`, mdx/Icon.astro renders an empty span. Neither warns at build time, so this
// test checks every literal `<Icon name="...">` against the icon set of the component it imports.
const srcDir = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const contentDir = fileURLToPath(new URL('../../../content', import.meta.url));

const uiIconSource = readFileSync(fileURLToPath(new URL('./ui/Icon.astro', import.meta.url)), 'utf8');
const uiIconNames = new Set(
  [...uiIconSource.slice(uiIconSource.indexOf('const icons')).matchAll(/^ {2}(?:'([\w-]+)'|(\w+)):/gm)].map(
    (m) => m[1] ?? m[2]
  )
);

const toPascal = (name: string) => name.replace(/(^|-)([a-z0-9])/g, (_, _sep, c: string) => c.toUpperCase());
const isMdxIcon = (name: string) => toPascal(name) in lucide || toPascal(name) in brandIcons;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    // astro/src/content is a git-ignored copy of /content made by the preprocess step.
    if (entry.isDirectory()) return path === `${srcDir}/content` ? [] : sourceFiles(path);
    return /\.(astro|mdx|md)$/.test(entry.name) ? [path] : [];
  });
}

/** Literal icon names per file, with the Icon component each file resolves `Icon` to. */
function iconUsages(file: string): Array<{ name: string; component: 'ui' | 'mdx' }> {
  const source = readFileSync(file, 'utf8');
  // MDX pages get Icon from the global MDX component map (mdx/Icon.astro); only .astro files choose.
  const component = /import Icon from '[^']*\bui\/Icon\.astro'/.test(source) ? 'ui' : 'mdx';
  return [...source.matchAll(/<Icon\b[^>]*?\bname=["']([^"']+)["']/g)].map((m) => ({ name: m[1], component }));
}

describe('Icon names', () => {
  it('parses the ui icon set', () => {
    expect(uiIconNames).toContain('location');
    expect(uiIconNames).toContain('calendar');
  });

  it('every literal name exists in the icon set of the component it uses', () => {
    const unknown: string[] = [];
    for (const file of [...sourceFiles(srcDir), ...sourceFiles(contentDir)]) {
      for (const { name, component } of iconUsages(file)) {
        const known = component === 'ui' ? uiIconNames.has(name) : isMdxIcon(name);
        if (!known) unknown.push(`${file.replace(`${srcDir}/`, '')}: <Icon name="${name}"> (${component}/Icon.astro)`);
      }
    }
    expect(unknown).toEqual([]);
  }, 30_000);
});
