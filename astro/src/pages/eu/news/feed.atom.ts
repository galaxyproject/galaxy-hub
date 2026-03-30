import { getCollection } from 'astro:content';
import { isPublishedDate } from '../../../utils/dateUtils';

function normalizeSubsites(value: unknown): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value.map((item) => String(item)) : [String(value)];
}

function isEuSubsite(subsites: string[]): boolean {
  return (
    subsites.includes('eu') ||
    subsites.includes('all') ||
    subsites.includes('all-eu') ||
    subsites.includes('global') ||
    subsites.length === 0
  );
}

function escapeXML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function atomDate(value: Date | string | undefined): string {
  if (!value) return new Date().toISOString();
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}

export async function GET() {
  const siteUrl = 'https://galaxyproject.org';
  const newsArticles = await getCollection('news');
  const now = new Date();

  const euNews = newsArticles
    .filter((article) => {
      if (article.data.draft) return false;
      if (!isPublishedDate(article.data.date, now)) return false;
      const subsites = normalizeSubsites(article.data.subsites);
      return isEuSubsite(subsites);
    })
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 50);

  const lastUpdated = euNews.length > 0 ? atomDate(euNews[0].data.date) : new Date().toISOString();

  let atom = `<?xml version="1.0" encoding="utf-8"?>\n`;
  atom += `<feed xmlns="http://www.w3.org/2005/Atom">\n`;
  atom += `  <id>${siteUrl}/eu/news/feed.atom</id>\n`;
  atom += `  <title>${escapeXML('Galaxy Europe News')}</title>\n`;
  atom += `  <updated>${lastUpdated}</updated>\n`;
  atom += `  <generator>Galaxy Hub</generator>\n`;
  atom += `  <author><name>Galaxy Project</name></author>\n`;
  atom += `  <link rel="alternate" href="${siteUrl}/eu/news/"/>\n`;
  atom += `  <link rel="self" href="${siteUrl}/eu/news/feed.atom"/>\n`;
  atom += `  <subtitle>${escapeXML('News from the Galaxy Europe community')}</subtitle>\n`;

  for (const article of euNews) {
    const slug = (article.data.slug || article.id).replace(/\/$/, '');
    const url = `${siteUrl}/${slug}/`;
    const title = article.data.title || 'Untitled';
    const tease = article.data.tease || '';
    const updated = atomDate(article.data.date);

    atom += `  <entry>\n`;
    atom += `    <title>${escapeXML(title)}</title>\n`;
    atom += `    <id>${url}</id>\n`;
    atom += `    <link href="${url}"/>\n`;
    atom += `    <updated>${updated}</updated>\n`;
    if (tease) {
      atom += `    <summary>${escapeXML(tease)}</summary>\n`;
    }
    atom += `  </entry>\n`;
  }

  atom += `</feed>`;

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
