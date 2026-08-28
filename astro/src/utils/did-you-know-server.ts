/**
 * Server-only helpers for the "Did you know" collection.
 *
 * Split from did-you-know.ts so the pure helpers (pickRandom, pickWeightedIndex,
 * sortItems, toSerializable) stay client-safe — importing astro:content here
 * keeps it out of client bundles that only need the pure functions.
 */
import { getCollection } from 'astro:content';
import { filterBySubsite, sortItems, type DidYouKnowEntry } from './did-you-know';

export type { DidYouKnowEntry };

/**
 * Load all "Did you know" items, optionally filtered by subsite, sorted by
 * weight then date.
 */
export async function getDidYouKnow(subsite?: string): Promise<DidYouKnowEntry[]> {
  const items = await getCollection('did-you-know');
  return sortItems(filterBySubsite(items, subsite));
}
