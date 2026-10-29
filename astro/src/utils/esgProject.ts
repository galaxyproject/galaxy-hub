/**
 * Build-time loaders for the EuroScienceGateway project pages (/projects/esg/*).
 * Facts come from content/projects/esg/main.md, lists from news and events tagged `esg`.
 */
import { getEntry, type CollectionEntry } from 'astro:content';
import { getInsert, getListedCollection } from './content';
import { isPastEvent } from './dateUtils';
import { parseProjectFacts, type ProjectFacts } from './projectFacts';

export const ESG_ID = 'esg';

export interface EsgProject {
  /** main.md, rendered as the project summary. */
  entry: CollectionEntry<'inserts'>;
  name: string;
  description: string;
  facts: ProjectFacts;
  partnerCount: number;
}

// ESG is a project surface, so it intentionally uses its narrow project tag rather than subsite-wide matching.
function taggedEsg(subsites: string[] | string | null | undefined): boolean {
  return Array.isArray(subsites) ? subsites.includes(ESG_ID) : subsites === ESG_ID;
}

function newestFirst(a?: Date | string | null, b?: Date | string | null): number {
  return new Date(b || 0).getTime() - new Date(a || 0).getTime();
}

export async function getEsgProject(): Promise<EsgProject> {
  const main = await getInsert('projects/esg/main');
  if (!main) throw new Error('content/projects/esg/main.md is missing');
  const data = main.data as Record<string, unknown>;
  const partners = (await getEntry('datasets', 'partners'))?.data?.partners;
  return {
    entry: main,
    name: typeof data.title === 'string' ? data.title : 'EuroScienceGateway',
    description: typeof data.description === 'string' ? data.description : '',
    facts: parseProjectFacts(data),
    partnerCount: Array.isArray(partners) ? partners.length : 0,
  };
}

/** Listed news tagged esg, newest first. */
export async function getEsgNews() {
  const news = await getListedCollection('news', (entry) => taggedEsg(entry.data.subsites));
  return news.sort((a, b) => newestFirst(a.data.date, b.data.date));
}

/** Past events tagged esg, newest first (the project is over, so upcoming events are not listed). */
export async function getEsgPastEvents(now: Date = new Date()) {
  const events = await getListedCollection(
    'events',
    (entry) => taggedEsg(entry.data.subsites) && isPastEvent(entry.data.date, entry.data.end, now)
  );
  return events.sort((a, b) => newestFirst(a.data.date, b.data.date));
}
