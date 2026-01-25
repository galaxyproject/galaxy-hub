import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { normalizeSlug } from '../../utils/slug';
import { filterOutRedirects } from '../../utils/redirects';

export async function GET(context: APIContext) {
  const events = filterOutRedirects(await getCollection('events'));

  // Get upcoming and recent events
  const relevantEvents = events
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 50);

  return rss({
    title: 'Galaxy Events',
    description: 'Events from the Galaxy Project community',
    site: context.site || 'https://galaxyproject.org',
    items: relevantEvents.map((event) => ({
      title: event.data.title || 'Untitled',
      pubDate: event.data.date instanceof Date ? event.data.date : new Date(event.data.date || 0),
      description: event.data.tease || '',
      link: `/events/${normalizeSlug(event.data.slug).replace(/^events\//, '')}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
