/**
 * News JSON Feed
 * Outputs news articles within 30 days at /news/feed.json
 * Format matches original Gridsome feed for backward compatibility
 */
import { getCollection } from 'astro:content';
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

    // Normalize arrays
    const subsites = data.subsites
      ? (Array.isArray(data.subsites) ? data.subsites : [data.subsites])
      : [];
    const tags = data.tags
      ? (Array.isArray(data.tags) ? data.tags : [data.tags])
      : [];
    const authors = data.authors
      ? (Array.isArray(data.authors) ? data.authors.join(', ') : data.authors)
      : '';

    return {
      id: article.id,
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
