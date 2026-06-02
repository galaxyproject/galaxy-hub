import { parse as parseYaml } from 'yaml';

// Import all domains.yml files using Vite's glob import
// This loads them at build time, not runtime
const domainsFiles = import.meta.glob<string>(
  '../../../content/use/*/domains.yml',
  { query: '?raw', import: 'default', eager: true }
);

interface DomainsCache {
  [platformSlug: string]: any[];
}

// Pre-parse all domains.yml files at module load time
const domainsCache: DomainsCache = {};

for (const [path, content] of Object.entries(domainsFiles)) {
  // Extract platform slug from path: ../../../content/use/{slug}/domains.yml
  const match = path.match(/\/use\/([^/]+)\/domains\.yml$/);
  if (match) {
    const platformSlug = match[1];
    try {
      const data = parseYaml(content);
      domainsCache[platformSlug] = data?.domains || [];
    } catch (e) {
      console.debug(`Failed to parse domains.yml for ${platformSlug}:`, e);
      domainsCache[platformSlug] = [];
    }
  }
}

/**
 * Load domains for a platform from the pre-loaded cache
 */
export function loadDomains(platformSlug: string): any[] {
  // Handle slugs that might have 'use/' prefix
  const cleanSlug = platformSlug.replace(/^use\//, '');
  return domainsCache[cleanSlug] || [];
}

/**
 * Get all loaded platform slugs with domains
 */
export function getAllPlatformSlugsWithDomains(): string[] {
  return Object.keys(domainsCache);
}
