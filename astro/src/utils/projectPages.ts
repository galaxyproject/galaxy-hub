/**
 * Build-time loaders for project pages (/projects/<id>/*). Facts come from content/projects/<id>/main.md,
 * lists from the news and events its `feed` frontmatter names (a subsite, a tag, or both).
 */
import { getEntry, type CollectionEntry } from 'astro:content';
import { getInsert, getListedCollection } from './content';
import { isPastEvent } from './dateUtils';
import { parseProjectFacts, type ProjectFacts } from './projectFacts';
import { matchesProjectSource, parseProjectSource, type ProjectSource } from './projectSource';
import { pageIndexItems, sortProjectIndex, type ProjectIndexItem } from './projectIndex';
import { projectContextIds } from './siteContext';

export interface Project {
  id: string;
  /** main.md, rendered as the project summary. */
  entry: CollectionEntry<'inserts'>;
  name: string;
  description: string;
  facts: ProjectFacts;
  source: ProjectSource;
  /** The partners dataset named by `partners_dataset` in main.md (its `partners` list and optional `heading`). */
  partners?: { heading?: string; partners?: unknown[] };
  partnerCount: number;
}

function newestFirst(a?: Date | string | null, b?: Date | string | null): number {
  return new Date(b || 0).getTime() - new Date(a || 0).getTime();
}

/**
 * A project's facts, news source and partner list, all named in its main.md. `partners_dataset` is the
 * file name of its partner YAML: datasets are keyed by file name across all of content/.
 */
export async function getProject(id: string): Promise<Project> {
  const main = await getInsert(`projects/${id}/main`);
  if (!main) throw new Error(`content/projects/${id}/main.md is missing`);
  const data = main.data as Record<string, unknown>;
  const source = parseProjectSource(data.feed);
  if (!source) throw new Error(`content/projects/${id}/main.md needs feed.subsite or feed.tag`);
  const partnersDataset = typeof data.partners_dataset === 'string' ? data.partners_dataset.trim() : '';
  const partners = partnersDataset ? (await getEntry('datasets', partnersDataset))?.data : undefined;
  if (partnersDataset && !partners) throw new Error(`content/projects/${id}/main.md: no dataset ${partnersDataset}`);
  return {
    id,
    entry: main,
    name: typeof data.title === 'string' ? data.title : id,
    description: typeof data.description === 'string' ? data.description : '',
    facts: parseProjectFacts(data),
    source,
    partners,
    partnerCount: Array.isArray(partners?.partners) ? partners.partners.length : 0,
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

/** Entries of /projects/: project sections with their facts, plus the other top-level project pages. */
export async function getProjectIndex(now: Date = new Date()): Promise<ProjectIndexItem[]> {
  const sections = await Promise.all(
    projectContextIds().map(async (id): Promise<ProjectIndexItem> => {
      const project = await getProject(id);
      return {
        id,
        title: project.name,
        ...(project.description && { description: project.description }),
        href: `/projects/${id}/`,
        external: false,
        facts: project.facts,
      };
    })
  );
  const sectionIds = new Set(sections.map((item) => item.id));
  const pages = await getListedCollection('articles', (entry) => entry.data.slug.startsWith('projects/'));
  const others = pageIndexItems(pages.map((entry) => entry.data)).filter((item) => !sectionIds.has(item.id));
  return sortProjectIndex([...sections, ...others], now);
}
