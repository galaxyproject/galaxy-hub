import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedNews } from '../../utils/content';
import { normalizeSlug } from '../../utils/slug';

export async function GET(context: APIContext) {
  // Get published news articles (excludes future-dated articles)
  const newsArticles = (await getPublishedNews()).slice(0, 50);

  return rss({
    title: 'Galaxy News',
    description: 'News from the Galaxy Project community',
    site: context.site || 'https://galaxyproject.org',
    items: newsArticles.map((article) => ({
      title: article.data.title || 'Untitled',
      pubDate: article.data.date instanceof Date ? article.data.date : new Date(article.data.date || 0),
      description: article.data.tease || '',
      link: `/${normalizeSlug(article.data.slug)}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
