import { communitySlug, getCommunityDisplay, getHubHallOfFameUrl } from './contributors';

export type DirectoryContributor = { slug: string; name: string; count: number };

export function addDirectoryContributor(map: Map<string, DirectoryContributor>, id: string): void {
  if (!getHubHallOfFameUrl(id)) return;
  const slug = communitySlug(id);
  const name = getCommunityDisplay(id) || id;
  const existing = map.get(slug) || { slug, name, count: 0 };
  existing.count += 1;
  map.set(slug, existing);
}
