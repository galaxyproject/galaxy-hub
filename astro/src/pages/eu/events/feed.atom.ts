import { getCollection } from 'astro:content';
import { contentMatchesSubsite } from '../../../utils/subsites';
import { buildAtomFeed, eventLinkFromSlug, type AtomEntry } from '../../../utils/feed';

const SITE_URL = 'https://galaxyproject.org';
const MAX_ITEMS = 50;

export async function GET() {
  const events = await getCollection('events');

  const euEvents = events
    .filter((event) => {
      if (event.data.draft) return false;
      return contentMatchesSubsite(event.data.subsites, 'eu');
    })
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, MAX_ITEMS);

  const entries: AtomEntry[] = euEvents.map((event) => {
    const slug = (event.data.slug || event.id).replace(/\/$/, '');
    return {
      title: event.data.title || 'Untitled',
      url: `${SITE_URL}${eventLinkFromSlug(slug)}`,
      date: event.data.date,
      summary: event.data.tease || undefined,
    };
  });

  const atom = buildAtomFeed({
    title: 'Galaxy Europe Events',
    alternateUrl: `${SITE_URL}/eu/events/`,
    selfUrl: `${SITE_URL}/eu/events/feed.atom`,
    subtitle: 'Events from the Galaxy Europe community',
    lastUpdated: entries[0]?.date,
    entries,
  });

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
