import { parse as parseYaml } from 'yaml';

// Load per-platform tool/reference YAML at build time (mirrors utils/domains.ts).
// These files live under content/use/<slug>/ and are intentionally skipped by the
// content preprocess step, so they are read straight from source here.
const toolsFiles = import.meta.glob<string>('../../../content/use/*/tools.yml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const referencesFiles = import.meta.glob<string>('../../../content/use/*/references.yml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

type NameCache = Record<string, string[]>;

function uniqueNonEmpty(names: unknown[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const name of names) {
    if (typeof name === 'string' && name.trim() !== '' && !seen.has(name)) {
      seen.add(name);
      out.push(name);
    }
  }
  return out;
}

const toolsCache: NameCache = {};
for (const [path, content] of Object.entries(toolsFiles)) {
  const match = path.match(/\/use\/([^/]+)\/tools\.yml$/);
  if (!match) continue;
  try {
    const data = parseYaml(content);
    const names = (data?.tools ?? []).map((tool: { name?: string }) => tool?.name);
    toolsCache[match[1]] = uniqueNonEmpty(names);
  } catch (e) {
    console.debug(`Failed to parse tools.yml for ${match[1]}:`, e);
    toolsCache[match[1]] = [];
  }
}

const referencesCache: NameCache = {};
for (const [path, content] of Object.entries(referencesFiles)) {
  const match = path.match(/\/use\/([^/]+)\/references\.yml$/);
  if (!match) continue;
  try {
    const data = parseYaml(content);
    const names: string[] = [];
    for (const group of data?.references ?? []) {
      for (const item of group?.items ?? []) {
        if (item?.name) names.push(item.name);
      }
    }
    referencesCache[match[1]] = uniqueNonEmpty(names);
  } catch (e) {
    console.debug(`Failed to parse references.yml for ${match[1]}:`, e);
    referencesCache[match[1]] = [];
  }
}

function cleanSlug(platformSlug: string): string {
  return platformSlug.replace(/^use\//, '');
}

/**
 * Tool names offered by a platform (empty if the platform has no tools.yml).
 */
export function loadToolNames(platformSlug: string): string[] {
  return toolsCache[cleanSlug(platformSlug)] ?? [];
}

/**
 * Reference (genome) names offered by a platform (empty if no references.yml).
 */
export function loadReferenceNames(platformSlug: string): string[] {
  return referencesCache[cleanSlug(platformSlug)] ?? [];
}
