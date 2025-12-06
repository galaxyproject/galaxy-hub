import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const events = await getCollection('events');

  // Get upcoming and recent events (sorted by date, most recent first)
  const recentEvents = events
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 100);

  const feedItems = recentEvents.map(event => {
    const date = event.data.date instanceof Date ? event.data.date : new Date(event.data.date || 0);
    const end = event.data.end instanceof Date ? event.data.end : (event.data.end ? new Date(event.data.end) : null);

    let location = '';
    if (event.data.location) {
      if (typeof event.data.location === 'string') {
        location = event.data.location;
      } else if (event.data.location.name) {
        location = event.data.location.name;
      }
    }

    return {
      title: event.data.title || 'Untitled',
      slug: event.data.slug,
      url: `/events/${event.data.slug}/`,
      date: date.toISOString(),
      end: end?.toISOString() || null,
      location,
      tease: event.data.tease || '',
      tags: Array.isArray(event.data.tags) ? event.data.tags : (event.data.tags ? [event.data.tags] : []),
      continent: event.data.continent || null,
      external_url: event.data.external_url || null,
    };
  });

  return new Response(JSON.stringify({ events: feedItems }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
