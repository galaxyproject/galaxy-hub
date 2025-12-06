import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');

  // Filter to only news articles, sorted by date
  const newsArticles = articles
    .filter(article => article.data.slug.startsWith('news/'))
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 100);

  const feedItems = newsArticles.map(article => {
    const date = article.data.date instanceof Date ? article.data.date : new Date(article.data.date || 0);

    return {
      title: article.data.title || 'Untitled',
      slug: article.data.slug,
      url: `/${article.data.slug}/`,
      date: date.toISOString(),
      tease: article.data.tease || '',
      tags: Array.isArray(article.data.tags) ? article.data.tags : (article.data.tags ? [article.data.tags] : []),
      authors: Array.isArray(article.data.authors) ? article.data.authors : (article.data.authors ? [article.data.authors] : []),
    };
  });

  return new Response(JSON.stringify({ news: feedItems }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
