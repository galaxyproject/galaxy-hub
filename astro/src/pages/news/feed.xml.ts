import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');

  // Filter to only news articles, sorted by date
  const newsArticles = articles
    .filter((article) => article.data.slug.startsWith('news/'))
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 50);

  return rss({
    title: 'Galaxy News',
    description: 'News from the Galaxy Project community',
    site: context.site || 'https://galaxyproject.org',
    items: newsArticles.map((article) => ({
      title: article.data.title || 'Untitled',
      pubDate: article.data.date instanceof Date ? article.data.date : new Date(article.data.date || 0),
      description: article.data.tease || '',
      link: `/${article.data.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
