/**
 * "Did you know" item utilities.
 *
 * Pure helpers (pickRandom, filterBySubsite, sortItems, toSerializable) are
 * unit-tested without an Astro runtime; getDidYouKnow wraps them with
 * getCollection for use in pages/components.
 */
import type { CollectionEntry } from 'astro:content';
import { contentMatchesSubsite } from './subsites';

export type DidYouKnowEntry = CollectionEntry<'did-you-know'>;

export interface DykImage {
  url: string;
  alt: string;
}

export interface DykLink {
  url: string;
  text: string;
}

export interface DykItem {
  slug: string;
  title: string;
  tease?: string | null;
  body: string;
  subsites: string[];
  date?: string | null;
  weight?: number | null;
  images?: DykImage[] | null;
  links?: DykLink[] | null;
}

/** Pick a random element from an array, or undefined when empty. */
export function pickRandom<T>(arr: readonly T[] | null | undefined): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick a random index from a list of weights, with probability proportional to
 * each weight. Higher weight = more likely to be picked.
 *
 * - Omitted/null weights are treated as 1 (always sampleable, but low priority).
 * - Negative weights are clamped to 0 (effectively excluded from sampling).
 * - If all effective weights are 0, falls back to uniform random over all items.
 *
 * Accepts an optional `random` function (defaults to `Math.random`) for testing.
 */
export function pickWeightedIndex(
  weights: readonly (number | null | undefined)[],
  random: () => number = Math.random
): number {
  if (weights.length === 0) return 0;
  const eff = weights.map((w) => (w == null ? 1 : Math.max(0, w)));
  const total = eff.reduce((s, x) => s + x, 0);
  if (total <= 0) return Math.floor(random() * weights.length);
  let r = random() * total;
  for (let i = 0; i < eff.length; i++) {
    r -= eff[i];
    if (r < 0) return i;
  }
  return eff.length - 1;
}

function toSubsiteList(value: unknown): string[] {
  if (value == null) return ['all'];
  return Array.isArray(value) ? value.map(String) : [String(value)];
}

/** Filter items down to those visible on the given subsite. No subsite = all items.
 *  An item without a `subsites` list defaults to `[all]` (i.e. visible everywhere),
 *  matching the schema's documented default — unlike news/events, where untagged
 *  content is root-only.
 */
export function filterBySubsite(items: DidYouKnowEntry[], subsite?: string): DidYouKnowEntry[] {
  if (!subsite) return items;
  return items.filter((item) => {
    const subsites = item.data.subsites;
    const effective = subsites && subsites.length > 0 ? subsites : ['all'];
    return contentMatchesSubsite(effective, subsite);
  });
}

/**
 * Sort items: higher weight first (undefined weight sorts last), then newer
 * date first, then slug for stability.
 */
export function sortItems<
  T extends { data: { weight?: number | null; date?: Date | null }; id?: string; slug?: string },
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const wA = a.data.weight ?? Number.NEGATIVE_INFINITY;
    const wB = b.data.weight ?? Number.NEGATIVE_INFINITY;
    if (wA !== wB) return wB - wA;
    const dA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dB = b.data.date ? new Date(b.data.date).getTime() : 0;
    if (dA !== dB) return dB - dA;
    return String(a.id ?? a.slug ?? '').localeCompare(String(b.id ?? b.slug ?? ''));
  });
}

/** Convert a collection entry into a plain JSON-serializable object for the client. */
export function toSerializable(entry: DidYouKnowEntry): DykItem {
  const d = entry.data;
  return {
    slug: entry.id,
    title: d.title,
    tease: d.tease,
    body: d.body,
    subsites: toSubsiteList(d.subsites),
    date: d.date instanceof Date ? d.date.toISOString().slice(0, 10) : d.date,
    weight: d.weight,
    images: (d.images ?? undefined) as DykImage[] | undefined,
    links: (d.links ?? undefined) as DykLink[] | undefined,
  };
}

// NOTE: getDidYouKnow() lives in did-you-know-server.ts to keep this module
// client-safe (astro:content is server-only and must not leak into client
// bundles via Vue component imports of pickRandom / pickWeightedIndex).
