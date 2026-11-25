/**
 * Plain objects for the NewsList island, shared by /news/, the regional news pages and every project
 * news page, so each list gets the same teaser HTML and tile image.
 */
import { isPublishedDate } from './dateUtils';
import { listImage } from './listImage';
import { renderMarkdownTeaser } from './markdown';

export interface NewsListEntry {
  data: {
    slug: string;
    title?: string | null;
    date?: Date | string | null;
    tease?: string | null;
    tags?: string[] | string | null;
    subsites?: string[] | string | null;
    external_url?: string | null;
    image?: string | null;
  };
  body?: string | null;
}

export interface NewsListItem {
  slug: string;
  title: string;
  date?: string | null;
  tease?: string | null;
  teaseHtml: string;
  tags: string[];
  subsites?: string[] | string | null;
  externalUrl?: string | null;
  image?: string;
}

/**
 * `acceptImage` checks a tile image candidate; pages pass `servedImageCheck()` (file in public/, under
 * the size cap). Fields pass through as they are (null stays null), so the island props match what
 * /news/ rendered before the mapping was shared.
 */
export function newsListItems(
  entries: NewsListEntry[],
  acceptImage: (src: string) => boolean = () => true
): NewsListItem[] {
  return entries.map(({ data, body }) => ({
    slug: data.slug,
    title: data.title || 'Untitled',
    date: data.date instanceof Date ? data.date.toISOString() : data.date,
    tease: data.tease,
    teaseHtml: renderMarkdownTeaser(data.tease),
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    subsites: data.subsites,
    externalUrl: data.external_url,
    image: listImage(data.image, body, acceptImage),
  }));
}

type Dated = { data: { date?: Date | string | null } };

/**
 * News that is out by `now`: future-dated posts stay hidden until a rebuild on or after their date.
 * Every news listing uses it (/news/, regional and project news).
 */
export function publishedNews<T extends Dated>(entries: T[], now = new Date()): T[] {
  return entries.filter((entry) => isPublishedDate(entry.data.date ?? undefined, now));
}
