import { contextFromPath } from './siteContext';

/** One breadcrumb level; same shape as the Breadcrumbs component's items. */
export interface Crumb {
  label: string;
  href?: string;
}

export const ROOT_CRUMB: Crumb = { label: 'Galaxy Project', href: '/' };

/** Trail for a section page under the project home, e.g. Galaxy Project › News › <post>. */
export function sectionCrumbs(section: Required<Crumb>, title: string): Crumb[] {
  return [ROOT_CRUMB, section, { label: title }];
}

/**
 * Trail for a content page: the project home, the region on region pages, then every parent
 * level that has a page (`pageTitles` maps "/path/" to its title), then the page itself.
 * A parent without a page is left out rather than given a label guessed from its URL.
 */
export function articleCrumbs(slug: string, title: string, pageTitles: ReadonlyMap<string, string>): Crumb[] {
  const segments = slug.split('/').filter(Boolean);
  const context = contextFromPath(`/${segments.join('/')}/`);
  const trail: Crumb[] = [ROOT_CRUMB];
  let start = 0;

  if (context.kind === 'region') {
    trail.push({ label: context.name, href: context.href });
    start = context.href.split('/').filter(Boolean).length;
  }

  for (let depth = start + 1; depth < segments.length; depth += 1) {
    const href = `/${segments.slice(0, depth).join('/')}/`;
    const label = pageTitles.get(href);
    if (label) trail.push({ label, href });
  }

  trail.push({ label: title });
  return trail;
}
