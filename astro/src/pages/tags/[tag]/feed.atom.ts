/**
 * Per-tag combined Atom feed (news + events) at /tags/[tag]/feed.atom.
 * Mirrors the /tags/[tag]/ HTML pages, but only whitelisted tags are
 * generated to avoid emitting near-empty feeds for one-off tags.
 * The whitelist (TAG_FEED_WHITELIST) lives in src/content.config.ts.
 */
import type { APIContext } from 'astro';
import { TAG_FEED_WHITELIST } from '../../../content.config';
import { getTagIndex } from '../../../utils/tagIndex';
import { isPublishedDate } from '../../../utils/dateUtils';
import { buildAtomFeed, eventLinkFromSlug, type AtomEntry } from '../../../utils/feed';

const SITE_URL = 'https://galaxyproject.org';
const MAX_ITEMS = 50;

export async function getStaticPaths() {
  const index = await getTagIndex();
  return Array.from(index.keys())
    .filter((tag) => TAG_FEED_WHITELIST.includes(tag))
    .map((tag) => ({ params: { tag } }));
}

export async function GET({ params }: APIContext) {
  const tag = params.tag ?? '';
  if (!tag) return new Response('Missing tag parameter', { status: 400 });

  const now = new Date();
  const profile = (await getTagIndex()).get(tag);

  const news: AtomEntry[] = (profile?.news ?? [])
    .filter((article) => !article.data.draft && isPublishedDate(article.data.date, now))
    .map((article) => {
      const slug = (article.data.slug || article.id).replace(/\/$/, '');
      return {
        title: article.data.title || 'Untitled',
        url: `${SITE_URL}/${slug}/`,
        date: article.data.date,
        summary: article.data.tease || undefined,
        categories: [{ term: 'news', label: 'News' }],
      };
    });

  const events: AtomEntry[] = (profile?.events ?? [])
    .filter((event) => !event.data.draft)
    .map((event) => {
      const slug = (event.data.slug || event.id).replace(/\/$/, '');
      return {
        title: event.data.title || 'Untitled',
        url: `${SITE_URL}${eventLinkFromSlug(slug)}`,
        date: event.data.date,
        summary: event.data.tease || undefined,
        categories: [{ term: 'event', label: 'Event' }],
      };
    });

  const entries: AtomEntry[] = [...news, ...events]
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, MAX_ITEMS);

  const atom = buildAtomFeed({
    title: `Galaxy ${tag} News and Events`,
    alternateUrl: `${SITE_URL}/tags/${tag}/`,
    selfUrl: `${SITE_URL}/tags/${tag}/feed.atom`,
    subtitle: `Combined news and events feed for content tagged "${tag}"`,
    lastUpdated: entries[0]?.date,
    entries,
  });

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
