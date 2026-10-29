/**
 * Pure helpers for the events filter bar (DESIGN.md "Filters"): the `status` param, tag lists and
 * the text a query is matched against. EventsList owns the state and the URL sync.
 */

export const EVENT_STATUSES = ['upcoming', 'past'] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

/** Read a `status` param; missing or unknown values mean all events (`null`). */
export function parseEventStatus(value: string | null | undefined): EventStatus | null {
  return EVENT_STATUSES.find((status) => status === value) ?? null;
}

/** Frontmatter `tags` (a list or one string) as a list of distinct, non-blank tags. */
export function eventTags(tags: string[] | string | null | undefined): string[] {
  const list = Array.isArray(tags) ? tags : tags ? [tags] : [];
  return Array.from(new Set(list.map((tag) => String(tag).trim()).filter(Boolean)));
}

export type EventLocation =
  | string
  | { name?: string | null; city?: string | null; region?: string | null; country?: string | null }
  | null
  | undefined;

export interface SearchableEvent {
  title?: string;
  tease?: string;
  location?: EventLocation;
}

function locationText(location: EventLocation): string {
  if (!location) return '';
  if (typeof location === 'string') return location;
  return [location.name, location.city, location.region, location.country].filter(Boolean).join(' ');
}

/** Lower-cased title, summary and location; every word of a query must appear in it. */
export function eventSearchText(event: SearchableEvent): string {
  return [event.title, event.tease, locationText(event.location)].filter(Boolean).join(' ').toLowerCase();
}
