export interface Crumb {
  label: string;
  href?: string;
}

// News and events live in their own collections, so their parent is the list page, not a folder.
const SECTIONS: Record<string, Crumb> = {
  news: { label: 'News', href: '/news/' },
  events: { label: 'Events', href: '/events/' },
};

function humanize(segment: string): string {
  const words = segment.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * The trail above a reading page's title: Home, one crumb per folder of the URL, then the page itself.
 * `pageTitles` maps a page's slug ("community/sig") to its title; a folder without a page of its own
 * becomes plain text from its name. Returns nothing for the front page.
 */
export function readingTrail(pathname: string, title: string, pageTitles: ReadonlyMap<string, string>): Crumb[] {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  const trail: Crumb[] = [{ label: 'Home', href: '/' }];
  const section = SECTIONS[segments[0]];
  if (section && segments.length > 1) return [...trail, section, { label: title }];

  segments.slice(0, -1).forEach((segment, index) => {
    const slug = segments.slice(0, index + 1).join('/');
    const known = pageTitles.get(slug);
    trail.push(known ? { label: known, href: `/${slug}/` } : { label: humanize(segment) });
  });
  trail.push({ label: title });
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
