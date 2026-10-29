/**
 * Build-time loaders for project pages (/projects/<id>/*). Facts come from content/projects/<id>/main.md,
 * lists from the news and events its `feed` frontmatter names (a subsite, a tag, or both).
 */
import { getEntry, type CollectionEntry } from 'astro:content';
import { getInsert, getListedCollection } from './content';
import { isPastEvent } from './dateUtils';
import { parseProjectFacts, type ProjectFacts } from './projectFacts';
import { matchesProjectSource, parseProjectSource, type ProjectSource } from './projectSource';

export interface Project {
  id: string;
  /** main.md, rendered as the project summary. */
  entry: CollectionEntry<'inserts'>;
  name: string;
  description: string;
  facts: ProjectFacts;
  source: ProjectSource;
  partnerCount: number;
}

function newestFirst(a?: Date | string | null, b?: Date | string | null): number {
  return new Date(b || 0).getTime() - new Date(a || 0).getTime();
}

/**
 * @param partnersDataset Dataset with the project's `partners` list. Datasets are keyed by file name
 * across all of content/, so a project's YAML files need names no other project uses.
 */
export async function getProject(id: string, partnersDataset = `${id}-partners`): Promise<Project> {
  const main = await getInsert(`projects/${id}/main`);
  if (!main) throw new Error(`content/projects/${id}/main.md is missing`);
  const data = main.data as Record<string, unknown>;
  const source = parseProjectSource(data.feed);
  if (!source) throw new Error(`content/projects/${id}/main.md needs feed.subsite or feed.tag`);
  const partners = (await getEntry('datasets', partnersDataset))?.data?.partners;
  return {
    id,
    entry: main,
    name: typeof data.title === 'string' ? data.title : id,
    description: typeof data.description === 'string' ? data.description : '',
    facts: parseProjectFacts(data),
    source,
    partnerCount: Array.isArray(partners) ? partners.length : 0,
  };
}

/** Listed news of the project, newest first. */
export async function getProjectNews(source: ProjectSource) {
  const news = await getListedCollection('news', (entry) => matchesProjectSource(entry.data, source));
  return news.sort((a, b) => newestFirst(a.data.date, b.data.date));
}

/** Listed events of the project, newest first; `pastOnly` for a project that has ended. */
export async function getProjectEvents(source: ProjectSource, { pastOnly = false, now = new Date() } = {}) {
  const events = await getListedCollection(
    'events',
    (entry) =>
      matchesProjectSource(entry.data, source) && (!pastOnly || isPastEvent(entry.data.date, entry.data.end, now))
  );
  return events.sort((a, b) => newestFirst(a.data.date, b.data.date));
}
