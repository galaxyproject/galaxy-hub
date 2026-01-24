import { getGrant, getOrganisation } from './contributors';

export type SupporterProfile = {
  slug: string;
  name: string;
  image?: string;
  website?: string;
};

function slugify(value: string): string {
  const normalized = String(value).trim().replace(/^@/, '');
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((v) => toArray(v));
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, any>;
    if (obj.id) return [String(obj.id)];
    if (obj.name) return [String(obj.name)];
    if (obj.github) return [String(obj.github)];
    if (obj.twitter) return [String(obj.twitter)];
    return [];
  }
  return [String(value)];
}

let supporterMap: Map<string, SupporterProfile> | null = null;

async function loadSupporterMap(): Promise<Map<string, SupporterProfile>> {
  if (supporterMap) return supporterMap;

  const { getEntry } = await import('astro:content');
  const entry = await getEntry('datasets', 'supporters');
  const map = new Map<string, SupporterProfile>();

  const list = Array.isArray(entry?.data?.supporters) ? (entry.data.supporters as Array<Record<string, unknown>>) : [];

  for (const item of list) {
    const name = String(item.name || '').trim();
    if (!name) continue;
    const slug = slugify(name);
    map.set(slug, {
      slug,
      name,
      image: typeof item.image === 'string' ? item.image : undefined,
      website: typeof item.website === 'string' ? item.website : undefined,
    });
  }

  supporterMap = map;
  return map;
}

export async function resolveSupporters(value: unknown): Promise<SupporterProfile[]> {
  const map = await loadSupporterMap();
  const names = toArray(value).filter(Boolean);
  const seen = new Set<string>();
  const resolved: SupporterProfile[] = [];

  for (const name of names) {
    const org = getOrganisation(name);
    if (org) {
      const slug = slugify(org.id || name);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      resolved.push({
        slug,
        name: org.name || org.short_name || org.id,
        image: org.avatarUrl,
        website: org.url,
      });
      continue;
    }

    const grant = getGrant(name);
    if (grant) {
      const slug = slugify(grant.id || name);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      resolved.push({
        slug,
        name: grant.name || grant.short_name || grant.id,
        image: grant.avatarUrl,
        website: grant.url,
      });
      continue;
    }

    const slug = slugify(name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const mapped = map.get(slug);
    resolved.push(
      mapped || {
        slug,
        name,
      }
    );
  }

  return resolved;
}
