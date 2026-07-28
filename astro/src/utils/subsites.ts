import { subsites } from '../stores/subsiteStore';

// Group tags that fan out to a set of subsites. Keep in sync with content/SUBSITES.yaml,
// which is the vocabulary content validation accepts.
export const SUBSITE_GROUPS: Record<string, readonly string[]> = {
  'all-eu': ['eu', 'freiburg', 'erasmusmc', 'belgium', 'pasteur', 'elixir-it', 'ifb'],
} as const;

export const ALL_SUBSITE_IDS = subsites.map((subsite) => subsite.id);

function normalizeSubsiteId(value: unknown): string {
  return String(value).trim().toLowerCase();
}

export function normalizeSubsites(value: unknown): string[] {
  if (value == null) return [];

  const values = Array.isArray(value) ? value : [value];
  return values.map(normalizeSubsiteId).filter(Boolean);
}

export function contentMatchesSubsite(contentSubsites: unknown, targetSubsite: string): boolean {
  const normalizedSubsites = normalizeSubsites(contentSubsites);
  const target = normalizeSubsiteId(targetSubsite);

  // Untagged content belongs to the root site only, so it never matches a subsite.
  if (normalizedSubsites.length === 0) return false;
  if (normalizedSubsites.includes('all')) return true;
  if (normalizedSubsites.includes(target)) return true;

  return Object.entries(SUBSITE_GROUPS).some(([group, groupSubsites]) => {
    return normalizedSubsites.includes(group) && groupSubsites.includes(target);
  });
}

export function expandSubsites(contentSubsites: unknown): string[] {
  const normalizedSubsites = normalizeSubsites(contentSubsites);
  return normalizedSubsites.includes('all') ? [...ALL_SUBSITE_IDS] : normalizedSubsites;
}
