import { getCollection, type CollectionEntry } from 'astro:content';
import type { NewsEntry } from './content';

type ArticleEntry = CollectionEntry<'articles'>;
type EventEntry = CollectionEntry<'events'>;

export type TagProfile = {
  articles: ArticleEntry[];
  news: NewsEntry[];
  events: EventEntry[];
  count: number;
};

let tagIndexPromise: Promise<Map<string, TagProfile>> | undefined;

function isValidTag(tag: string): boolean {
  if (!tag || typeof tag !== 'string') return false;
  const trimmed = tag.trim();
  return trimmed.length > 0 && !trimmed.includes('/') && trimmed.length < 100;
}

function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim();
}

export async function getTagIndex(): Promise<Map<string, TagProfile>> {
  if (tagIndexPromise) return tagIndexPromise;

  tagIndexPromise = (async () => {
    const [articles, news, events] = await Promise.all([
      getCollection('articles'),
      getCollection('news'),
      getCollection('events'),
    ]);

    const index = new Map<string, TagProfile>();

    const ensureTag = (tag: string): TagProfile => {
      const normalized = normalizeTag(tag);
      let profile = index.get(normalized);
      if (!profile) {
        profile = { articles: [], news: [], events: [], count: 0 };
        index.set(normalized, profile);
      }
      return profile;
    };

    // Index articles
    for (const article of articles) {
      const tags = article.data.tags || [];
      for (const tag of tags) {
        if (!isValidTag(tag)) continue;
        const profile = ensureTag(tag);
        profile.articles.push(article);
        profile.count++;
      }
    }

    // Index news
    for (const article of news) {
      const tags = article.data.tags || [];
      for (const tag of tags) {
        if (!isValidTag(tag)) continue;
        const profile = ensureTag(tag);
        profile.news.push(article);
        profile.count++;
      }
    }

    // Index events
    for (const event of events) {
      const tags = event.data.tags || [];
      for (const tag of tags) {
        if (!isValidTag(tag)) continue;
        const profile = ensureTag(tag);
        profile.events.push(event);
        profile.count++;
      }
    }

    // Sort by date (newest first) for each tag
    index.forEach((profile) => {
      profile.articles.sort((a, b) => {
        const dateA = new Date(a.data.date || 0).getTime();
        const dateB = new Date(b.data.date || 0).getTime();
        return dateB - dateA;
      });
      profile.news.sort((a, b) => {
        const dateA = new Date(a.data.date || 0).getTime();
        const dateB = new Date(b.data.date || 0).getTime();
        return dateB - dateA;
      });
      profile.events.sort((a, b) => {
        const dateA = new Date(a.data.date || 0).getTime();
        const dateB = new Date(b.data.date || 0).getTime();
        return dateB - dateA;
      });
    });

    return index;
  })();

  return tagIndexPromise;
}
