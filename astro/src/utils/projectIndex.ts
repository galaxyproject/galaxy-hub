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

function rank(item: ProjectIndexItem, now: Date): number {
  if (item.external) return 3;
  if (!item.facts) return 2;
  return projectStatus(item.facts, now) === 'ended' ? 1 : 0;
}

/** Running projects, then ended ones (each newest start first), then other pages by title, external sites last. */
export function sortProjectIndex(items: ProjectIndexItem[], now: Date): ProjectIndexItem[] {
  return [...items].sort(
    (a, b) =>
      rank(a, now) - rank(b, now) ||
      (b.facts?.start?.getTime() ?? 0) - (a.facts?.start?.getTime() ?? 0) ||
      a.title.localeCompare(b.title)
  );
}
