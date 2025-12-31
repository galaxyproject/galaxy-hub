/**
 * News JSON Feed
 * Outputs news articles within 30 days at /news/feed.json
 * Format matches original Gridsome feed for backward compatibility
 */
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const JSONFEED_DAYS_AGO_LIMIT = 30;

function formatDate(date: Date): string {
  // Match Gridsome format: "22 December 2025"
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function getDaysAgo(date: Date): number {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
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

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');

  // Filter to news articles within days_ago limit
  const newsArticles = articles
    .filter(article => {
      if (!article.data.slug.startsWith('news/')) return false;
      if (!article.data.date) return false;
      const date = article.data.date instanceof Date ? article.data.date : new Date(article.data.date);
      const daysAgo = getDaysAgo(date);
      return daysAgo < JSONFEED_DAYS_AGO_LIMIT;
    })
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    });

  const feedItems = newsArticles.map(article => {
    const data = article.data;
    const date = data.date instanceof Date ? data.date : new Date(data.date || 0);
    const daysAgo = getDaysAgo(date);
    const slug = (data.slug || article.id).replace(/\/$/, '');

    // Normalize arrays and expand "all" subsites
    let subsites = data.subsites
      ? (Array.isArray(data.subsites) ? data.subsites : [data.subsites])
      : [];
    subsites = expandSubsites(subsites);

    const tags = data.tags
      ? (Array.isArray(data.tags) ? data.tags : [data.tags])
      : [];
    const authors = data.authors
      ? (Array.isArray(data.authors) ? data.authors.join(', ') : data.authors)
      : '';

    return {
      id: generateShortId(article.id),
      title: data.title || null,
      tease: data.tease || null,
      days_ago: daysAgo,
      date: formatDate(date),
      subsites,
      main_subsite: data.main_subsite || null,
      tags,
      contact: typeof data.contacts === 'string' ? data.contacts : '',
      image: data.image || null,
      authors,
      authors_structured: [],
      external_url: data.external_url || '',
      path: `/${slug}/`,
      content: data.tease || '',
    };
  });

  return new Response(JSON.stringify({ count: feedItems.length, news: feedItems }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
