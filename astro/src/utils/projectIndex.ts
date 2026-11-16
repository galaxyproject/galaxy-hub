/**
 * Entries of the projects index (/projects/): the project sections with their own facts
 * (content/projects/<id>/main.md) and the other top-level pages under content/projects/.
 */
import { projectStatus, type ProjectFacts } from './projectFacts';

export interface ProjectIndexItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  external: boolean;
  /** Facts of a project section; plain project pages have none. */
  facts?: ProjectFacts;
}

export interface ProjectPageInput {
  slug: string;
  title?: string | null;
  description?: string | null;
  redirect?: string | null;
}

const TOP_LEVEL = /^projects\/([^/]+)$/;

function text(value: string | null | undefined): string | undefined {
  return value?.trim() || undefined;
}

/**
 * Top-level pages under projects/ that have a title. A redirect to another site becomes an external
 * link; a redirect inside the Hub (a project that moved, e.g. to a SIG) is left out.
 */
export function pageIndexItems(pages: ProjectPageInput[]): ProjectIndexItem[] {
  const items: ProjectIndexItem[] = [];
  for (const page of pages) {
    const id = TOP_LEVEL.exec(page.slug)?.[1];
    const title = text(page.title);
    const redirect = text(page.redirect);
    if (!id || !title) continue;
    if (redirect && !/^https?:\/\//.test(redirect)) continue;
    const description = text(page.description);
    items.push({
      id,
      title,
      ...(description && { description }),
      href: redirect ?? `/projects/${id}/`,
      external: Boolean(redirect),
    });
  }
  return items;
}

/** The groups of the index, in the order they are shown. */
export const PROJECT_GROUPS = [
  { key: 'active', title: 'Active projects' },
  { key: 'page', title: 'Projects and community efforts' },
  { key: 'external', title: 'External sites' },
  { key: 'ended', title: 'Completed projects' },
] as const satisfies readonly { key: string; title: string }[];

export type ProjectGroupKey = (typeof PROJECT_GROUPS)[number]['key'];

export interface ProjectGroup<T extends ProjectIndexItem = ProjectIndexItem> {
  key: ProjectGroupKey;
  title: string;
  items: T[];
}

/** Which group an entry belongs to: a project section by its status, any other page by where it points. */
export function projectGroup(item: ProjectIndexItem, now: Date): ProjectGroupKey {
  if (item.facts) return projectStatus(item.facts, now) === 'ended' ? 'ended' : 'active';
  return item.external ? 'external' : 'page';
}

function rank(item: ProjectIndexItem, now: Date): number {
  return PROJECT_GROUPS.findIndex((group) => group.key === projectGroup(item, now));
}

/** Running projects (newest start first), then other pages by title, then external sites, then completed ones. */
export function sortProjectIndex<T extends ProjectIndexItem>(items: T[], now: Date): T[] {
  return [...items].sort(
    (a, b) =>
      rank(a, now) - rank(b, now) ||
      (b.facts?.start?.getTime() ?? 0) - (a.facts?.start?.getTime() ?? 0) ||
      a.title.localeCompare(b.title)
  );
}

/** The sorted entries split into their groups, empty groups dropped. */
export function groupProjectIndex<T extends ProjectIndexItem>(items: T[], now: Date): ProjectGroup<T>[] {
  const sorted = sortProjectIndex(items, now);
  return PROJECT_GROUPS.map(({ key, title }) => ({
    key,
    title,
    items: sorted.filter((item) => projectGroup(item, now) === key),
  })).filter((group) => group.items.length > 0);
}
