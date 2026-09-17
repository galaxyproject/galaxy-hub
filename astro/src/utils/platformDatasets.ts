import { parse as parseYaml } from 'yaml';

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

const toolsCache: Record<string, string[]> = {};
const referencesCache: Record<string, string[]> = {};

function cleanPlatformSlug(platformSlug: string): string {
  return platformSlug.replace(/^use\//, '');
}

function uniqueNonEmpty(values: unknown[]): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => typeof value === 'string' && value.trim().length > 0).map((value) => value.trim()))
  );
}

for (const [path, content] of Object.entries(toolsFiles)) {
  const match = path.match(/\/use\/([^/]+)\/tools\.yml$/);
  if (!match) continue;

  try {
    const data = parseYaml(content) as { tools?: Array<{ name?: string | null }> } | null;
    toolsCache[match[1]] = uniqueNonEmpty((data?.tools || []).map((tool) => tool?.name));
  } catch (e) {
    console.debug(`Failed to parse tools.yml for ${match[1]}:`, e);
    toolsCache[match[1]] = [];
  }
}

for (const [path, content] of Object.entries(referencesFiles)) {
  const match = path.match(/\/use\/([^/]+)\/references\.yml$/);
  if (!match) continue;

  try {
    const data = parseYaml(content) as
      | {
          references?: Array<{
            items?: Array<{ name?: string | null }> | null;
          }>;
        }
      | null;
    referencesCache[match[1]] = uniqueNonEmpty(
      (data?.references || []).flatMap((reference) => (reference?.items || []).map((item) => item?.name))
    );
  } catch (e) {
    console.debug(`Failed to parse references.yml for ${match[1]}:`, e);
    referencesCache[match[1]] = [];
  }
}

export function loadToolNames(platformSlug: string): string[] {
  return toolsCache[cleanPlatformSlug(platformSlug)] || [];
}

export function loadReferenceNames(platformSlug: string): string[] {
  return referencesCache[cleanPlatformSlug(platformSlug)] || [];
}
