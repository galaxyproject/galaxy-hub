/**
 * Events JSON Feed
 * Outputs events within 30 days at /events/feed.json
 * Format matches original Gridsome feed for backward compatibility
 */
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { marked } from 'marked';

const JSONFEED_DAYS_AGO_LIMIT = 30;

function formatDate(date: Date): string {
  // Match Gridsome format: "4 November 2026"
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Generate short hash ID like Gridsome does
function generateShortId(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).slice(0, 8);
}

// Expand "all" subsite to full list of regional subsites
const ALL_SUBSITES = [
  'freiburg', 'pasteur', 'belgium', 'ifb', 'genouest',
  'erasmusmc', 'elixir-it', 'au', 'eu', 'us', 'global'
];

function expandSubsites(subsites: string[]): string[] {
  if (subsites.includes('all')) {
    return ALL_SUBSITES;
  }
  return subsites;
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

        // Normalize subsites to array and expand "all"
        let subsites: string[] = [];
        if (data.subsites) {
          subsites = Array.isArray(data.subsites) ? data.subsites : [data.subsites];
        }
        subsites = expandSubsites(subsites);

        // Get contact info - can be string or array
        let contact = '';
        if (data.contacts) {
          if (typeof data.contacts === 'string') {
            contact = data.contacts;
          } else if (Array.isArray(data.contacts)) {
            contact = data.contacts.join(', ');
          }
        }

        // Build proper path - slug may already include "events/" prefix
        const pathSlug = slug.startsWith('events/') ? slug.slice(7) : slug;

        // Render markdown body to HTML
        let content = '';
        try {
          if (event.body) {
            content = await marked.parse(event.body);
          } else {
            content = data.tease || '';
          }
        } catch {
          content = data.tease || '';
        }

        return {
          id: generateShortId(event.id),
          title: data.title || null,
          tease: data.tease || null,
          subsites,
          location: locationObj,
          continent: data.continent || null,
          contact,
          external_url: data.external_url || null,
          gtn: data.gtn || null,
          links: [],
          date: formatDate(date),
          draft: data.draft || null,
          days: data.days || null,
          days_ago: daysAgo,
          path: `/events/${pathSlug}/`,
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
