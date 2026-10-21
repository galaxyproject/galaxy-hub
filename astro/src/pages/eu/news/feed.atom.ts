import { getCollection } from 'astro:content';
import { isPublishedDate } from '../../../utils/dateUtils';
import { contentMatchesSubsite } from '../../../utils/subsites';
import { buildAtomFeed, type AtomEntry } from '../../../utils/feed';

const SITE_URL = 'https://galaxyproject.org';
const MAX_ITEMS = 50;

export async function GET() {
  const newsArticles = await getCollection('news');
  const now = new Date();

  const euNews = newsArticles
    .filter((article) => {
      if (article.data.draft) return false;
      if (!isPublishedDate(article.data.date, now)) return false;
      return contentMatchesSubsite(article.data.subsites, 'eu');
    })
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, MAX_ITEMS);

  const entries: AtomEntry[] = euNews.map((article) => {
    const slug = (article.data.slug || article.id).replace(/\/$/, '');
    return {
      title: article.data.title || 'Untitled',
      url: `${SITE_URL}/${slug}/`,
      date: article.data.date,
      summary: article.data.tease || undefined,
    };
  });

  const atom = buildAtomFeed({
    title: 'Galaxy Europe News',
    alternateUrl: `${SITE_URL}/eu/news/`,
    selfUrl: `${SITE_URL}/eu/news/feed.atom`,
    subtitle: 'News from the Galaxy Europe community',
    lastUpdated: entries[0]?.date,
    entries,
  });

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
