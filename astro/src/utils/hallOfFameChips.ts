import { getCommunityDisplay, getGrantDisplay, getHubHallOfFameUrl, getOrganisationDisplay } from './contributors';

export type CommunityChip = { id: string; label: string; href?: string };

/** Chip for a community id; `href` is omitted when the record opted out of hub Hall of Fame pages. */
export function buildCommunityChip(id: string, label?: string): CommunityChip {
  return {
    id,
    label: label || getOrganisationDisplay(id) || getGrantDisplay(id) || getCommunityDisplay(id) || id,
    href: getHubHallOfFameUrl(id),
  };
}
