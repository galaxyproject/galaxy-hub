export interface Crumb {
  label: string;
  href?: string;
}

/** Pages that exist, by slug ("community/sig"): the title to show, or null when the page has none. */
export type PageTitles = ReadonlyMap<string, string | null>;

// News and events live in their own collections, so their parent is the list page, not a folder.
const SECTIONS: Record<string, Crumb> = {
  news: { label: 'News', href: '/news/' },
  events: { label: 'Events', href: '/events/' },
};

// Folder names that read as acronyms when a page has no title to take the label from
const ACRONYMS = new Set(['aws', 'api', 'ftp', 'gcc', 'gtn', 'hpc', 'sig', 'ifb', 'eu', 'us', 'cz', 'ca', 'au']);

function humanize(segment: string): string {
  const words = segment
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => (ACRONYMS.has(word.toLowerCase()) ? word.toUpperCase() : word))
    .join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const trimSlashes = (slug: string) => slug.replace(/^\/|\/$/g, '');

/** The first `# heading` of a Markdown body, outside code fences, as plain text. */
export function firstHeading(body: string): string | undefined {
  let fence: string | undefined;
  for (const line of body.split('\n')) {
    const marker = line.match(/^\s*(```|~~~)/)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (fence === marker) fence = undefined;
      continue;
    }
    if (fence) continue;
    const heading = line.match(/^#[ \t]+(.+?)(?:[ \t]+#+)?[ \t]*$/)?.[1];
    if (!heading) continue;
    const text = heading
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/[*_`]/g, '')
      .trim();
    if (text) return text;
  }
  return undefined;
}

export interface TitleSource {
  slug: string;
  title?: string | null;
  body?: string;
}

/**
 * Every page that can be a parent in a trail: content entries (the front matter title, else the first
 * heading of the body, else null) and pages that are routed by code, given as slug -> title.
 */
export function buildPageTitles(
  entries: Iterable<TitleSource>,
  routed: Record<string, string> = {}
): Map<string, string | null> {
  const titles = new Map<string, string | null>();
  for (const [slug, title] of Object.entries(routed)) titles.set(trimSlashes(slug), title);
  for (const entry of entries) {
    const title = entry.title?.trim() || (entry.body ? firstHeading(entry.body) : undefined);
    titles.set(trimSlashes(entry.slug), title || null);
  }
  return titles;
}

/**
 * The trail above a reading page's title: Home, one crumb per folder of the URL, then the page itself.
 * `pageTitles` lists the pages that exist by slug ("community/sig"); a folder with a page is a link, labelled with
 * its title (or its folder name when it has none), a folder without a page becomes plain text from its name.
 * News posts go under News; events go under Events, then their folders (a conference's sub-pages sit under it).
 * The current page is always the last crumb: an empty `title` falls back to the last folder name. Returns nothing for
 * the front page.
 */
export function readingTrail(pathname: string, title: string, pageTitles: PageTitles): Crumb[] {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  const trail: Crumb[] = [{ label: 'Home', href: '/' }];
  const section = SECTIONS[segments[0]];
  let first = 0;
  if (section && segments.length > 1) {
    trail.push(section);
    if (segments[0] === 'news') return [...trail, { label: title || humanize(segments[segments.length - 1]) }];
    first = 1;
  }

  for (let index = first; index < segments.length - 1; index++) {
    const slug = segments.slice(0, index + 1).join('/');
    if (pageTitles.has(slug)) {
      trail.push({ label: pageTitles.get(slug) || humanize(segments[index]), href: `/${slug}/` });
    } else {
      trail.push({ label: humanize(segments[index]) });
    }
  }
  trail.push({ label: title || humanize(segments[segments.length - 1]) });
  return trail;
}

/** schema.org BreadcrumbList: only items with a URL qualify, and the last one is the current page. */
export function breadcrumbJsonLd(trail: Crumb[], site: string, currentPath: string) {
  const origin = site.replace(/\/$/, '');
  const lastIndex = trail.length - 1;
  const items = trail
    .map((crumb, index) => ({ name: crumb.label, path: index === lastIndex ? currentPath : crumb.href }))
    .filter((entry): entry is { name: string; path: string } => Boolean(entry.path));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: `${origin}${entry.path}`,
    })),
  };
}
