import { getCommunityImage, getGrant, getHubHallOfFameUrl, getOrganisation } from './contributors';
import { communitySlug as baseCommunitySlug, toArray as baseToArray } from './community-base.mjs';

export type SupporterProfile = {
  slug: string;
  name: string;
  image?: string;
  url?: string;
  profileUrl?: string;
};

function slugify(value: string): string {
  return baseCommunitySlug(value);
}

function toArray(value: unknown): string[] {
  return baseToArray(value);
}

export async function resolveSupporters(value: unknown): Promise<SupporterProfile[]> {
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
        name: org.short_name || org.name || org.id,
        image: getCommunityImage(org),
        url: org.url,
        profileUrl: getHubHallOfFameUrl(org.id || name),
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
        name: grant.short_name || grant.name || grant.id,
        image: getCommunityImage(grant),
        url: grant.url,
        profileUrl: getHubHallOfFameUrl(grant.id || name),
      });
      continue;
    }

    const slug = slugify(name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    resolved.push({
      slug,
      name,
      profileUrl: getHubHallOfFameUrl(name),
    });
  }

  return resolved;
}
