/**
 * EU News Atom Feed
 * Outputs EU-filtered news articles at /eu/feed.atom
 * Format matches original Gridsome feed for backward compatibility
 */
import { getCollection } from 'astro:content';
import { marked } from 'marked';

const SITE_URL = 'https://galaxyproject.org';
const FEED_TITLE = 'Galaxy Europe';
const FEED_DESCRIPTION = 'The European Galaxy Instance';
const MAX_ITEMS = 25;

function escapeXML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatAtomDate(date: Date): string {
  return date.toISOString();
}

export async function GET() {
  const articles = await getCollection('articles');

  // Filter to EU news articles
  const euNews = articles
    .filter((article) => {
      // Must be a news article
      if (!article.data.slug.startsWith('news/')) return false;
      // Must have a date
      if (!article.data.date) return false;
      // Must be for EU subsite
      const subsites = article.data.subsites
        ? Array.isArray(article.data.subsites)
          ? article.data.subsites
          : [article.data.subsites]
        : [];
      return (
        subsites.includes('eu') || subsites.includes('all') || subsites.includes('global') || subsites.length === 0
      );
    })
    .sort((a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date || 0);
      const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, MAX_ITEMS);

  const now = new Date();
  const latestDate =
    euNews.length > 0
      ? euNews[0].data.date instanceof Date
        ? euNews[0].data.date
        : new Date(euNews[0].data.date || 0)
      : now;

  let atomContent = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <id>${SITE_URL}/eu/feed.atom</id>
    <title>${escapeXML(FEED_TITLE)}</title>
    <updated>${formatAtomDate(latestDate)}</updated>
    <generator>Astro Galaxy Hub</generator>
    <link rel="alternate" href="${SITE_URL}/"/>
    <link rel="self" href="${SITE_URL}/eu/feed.atom"/>
    <subtitle>${escapeXML(FEED_DESCRIPTION)}</subtitle>
`;

  for (const article of euNews) {
    const data = article.data;
    const date = data.date instanceof Date ? data.date : new Date(data.date || 0);
    const slug = (data.slug || article.id).replace(/\/$/, '');
    const url = `${SITE_URL}/${slug}/`;
    const title = data.title || 'Untitled';
    const description = data.tease || '';

    // Render markdown body to HTML
    let content = '';
    try {
      if (article.body) {
        content = await marked.parse(article.body);
      } else {
        content = description;
      }
    } catch {
      content = description;
    }

    atomContent += `    <entry>
        <title type="html"><![CDATA[${title}]]></title>
        <id>${url}</id>
        <link href="${url}"/>
        <updated>${formatAtomDate(date)}</updated>
`;

    if (description) {
      atomContent += `        <summary type="html"><![CDATA[${description}]]></summary>
`;
    }

    // Content - render full body as HTML
    if (content) {
      atomContent += `        <content type="html"><![CDATA[${content}]]></content>
`;
    }

    atomContent += `    </entry>
`;
  }

  atomContent += `</feed>`;

  return new Response(atomContent, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
