/**
 * Events JSON Feed
 * Outputs events within 30 days at /events/feed.json
 * Format matches original Gridsome feed for backward compatibility
 */
import { getCollection, render } from 'astro:content';
import type { APIContext } from 'astro';

const JSONFEED_DAYS_AGO_LIMIT = 30;

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getDaysAgo(date: Date): number {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export async function GET(context: APIContext) {
  const events = await getCollection('events');
  const now = new Date();

  // Filter events within days_ago limit and transform
  const feedItems = await Promise.all(
    events
      .filter(event => {
        if (!event.data.date) return false;
        const date = event.data.date instanceof Date ? event.data.date : new Date(event.data.date);
        const daysAgo = getDaysAgo(date);
        // Include events from recent past and future (negative days_ago)
        return daysAgo < JSONFEED_DAYS_AGO_LIMIT;
      })
      .map(async event => {
        const data = event.data;
        const date = data.date instanceof Date ? data.date : new Date(data.date || 0);
        const daysAgo = getDaysAgo(date);
        const slug = (data.slug || event.id).replace(/\/$/, '');

        // Get location name
        let locationObj = { name: '' };
        if (data.location) {
          if (typeof data.location === 'string') {
            locationObj = { name: data.location };
          } else if (data.location.name) {
            locationObj = { name: data.location.name };
          }
        }

        // Normalize subsites to array
        let subsites: string[] = [];
        if (data.subsites) {
          subsites = Array.isArray(data.subsites) ? data.subsites : [data.subsites];
        }

        // Render content to HTML
        let content = '';
        try {
          const rendered = await render(event);
          // Note: rendered.Content is a component, we'd need to render it
          // For now, use tease as content fallback
          content = data.tease || '';
        } catch {
          content = data.tease || '';
        }

        return {
          id: event.id,
          title: data.title || null,
          tease: data.tease || null,
          subsites,
          location: locationObj,
          continent: data.continent || null,
          contact: typeof data.contacts === 'string' ? data.contacts : '',
          external_url: data.external_url || null,
          gtn: data.gtn || null,
          links: [],
          date: formatDate(date),
          draft: data.draft || null,
          days: data.days || null,
          days_ago: daysAgo,
          path: `/events/${slug}/`,
          content,
        };
      })
  );

  // Sort by date descending
  feedItems.sort((a, b) => a.days_ago - b.days_ago);

  return new Response(JSON.stringify({ count: feedItems.length, events: feedItems }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
