import { subsites } from '../stores/subsiteStore';

export const SUBSITE_GROUPS: Record<string, readonly string[]> = {
  'all-eu': ['eu', 'freiburg', 'erasmusmc', 'belgium', 'pasteur', 'elixir-it', 'ifb'],
  'all-fr': ['fr', 'ifb', 'genouest'],
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

export function contentMatchesSubsite(contentSubsites: string[], targetSubsite: string): boolean {
  const normalizedSubsites = normalizeSubsites(contentSubsites);
  const target = normalizeSubsiteId(targetSubsite);

  if (normalizedSubsites.length === 0) return true;
  if (normalizedSubsites.includes('all')) return true;
  if (normalizedSubsites.includes(target)) return true;

  return Object.entries(SUBSITE_GROUPS).some(([group, groupSubsites]) => {
    return normalizedSubsites.includes(group) && groupSubsites.includes(target);
  });
}

export function expandSubsites(contentSubsites: string[]): string[] {
  const normalizedSubsites = normalizeSubsites(contentSubsites);
  return normalizedSubsites.includes('all') ? [...ALL_SUBSITE_IDS] : normalizedSubsites;
}
