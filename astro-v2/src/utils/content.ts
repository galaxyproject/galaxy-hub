/**
 * Content utility functions for Galaxy Hub
 * Helper functions to query and filter content collections
 */

import { getCollection, type CollectionEntry } from 'astro:content';

type ArticleEntry = CollectionEntry<'articles'>;
type EventEntry = CollectionEntry<'events'>;
type PlatformEntry = CollectionEntry<'platforms'>;
type InsertEntry = CollectionEntry<'inserts'>;

/**
 * Get all articles, optionally filtered by subsite
 */
export async function getArticles(subsite?: string): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles');

  if (!subsite || subsite === 'global') {
    return articles;
  }

  return articles.filter(article => {
    const subsites = article.data.subsites || [];
    return subsites.includes(subsite) || subsites.includes('all');
  });
}

/**
 * Get all events, optionally filtered by subsite
 */
export async function getEvents(subsite?: string): Promise<EventEntry[]> {
  const events = await getCollection('events');

  if (!subsite || subsite === 'global') {
    return events;
  }

  return events.filter(event => {
    const subsites = event.data.subsites || [];
    return subsites.includes(subsite) || subsites.includes('all');
  });
}

/**
 * Get upcoming events (events with date >= today)
 */
export async function getUpcomingEvents(subsite?: string): Promise<EventEntry[]> {
  const events = await getEvents(subsite);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return events
    .filter(event => {
      const eventDate = event.data.date;
      if (!eventDate) return false;
      return new Date(eventDate) >= now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.data.date || 0);
      const dateB = new Date(b.data.date || 0);
      return dateA.getTime() - dateB.getTime();
    });
}

/**
 * Get recent past events (within specified days)
 */
export async function getRecentEvents(subsite?: string, days = 365): Promise<EventEntry[]> {
  const events = await getEvents(subsite);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);

  return events
    .filter(event => {
      const eventDate = event.data.date;
      if (!eventDate) return false;
      const date = new Date(eventDate);
      return date < now && date >= cutoff;
    })
    .sort((a, b) => {
      const dateA = new Date(a.data.date || 0);
      const dateB = new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
}

/**
 * Get events filtered by tag
 */
export async function getEventsByTag(tag: string, subsite?: string): Promise<EventEntry[]> {
  const events = await getEvents(subsite);

  return events.filter(event => {
    const tags = event.data.tags || [];
    return tags.includes(tag);
  });
}

/**
 * Get all platforms (Galaxy servers)
 */
export async function getPlatforms(): Promise<PlatformEntry[]> {
  return await getCollection('platforms');
}

/**
 * Get platforms filtered by scope
 */
export async function getPlatformsByScope(scope: string): Promise<PlatformEntry[]> {
  const platforms = await getPlatforms();
  return platforms.filter(p => p.data.scope === scope);
}

// Cache for insert lookups - loaded once per build
let insertCache: Map<string, InsertEntry> | null = null;

function normalizeSlug(slug: string): string {
  return slug
    .replace(/^\/insert:\//, '')
    .replace(/^\//, '')
    .replace(/\/$/, '');
}

/**
 * Get an insert by its slug/path
 * Uses caching to avoid repeated collection queries during build
 */
export async function getInsert(slug: string): Promise<InsertEntry | undefined> {
  // Build cache on first call
  if (!insertCache) {
    const inserts = await getCollection('inserts');
    insertCache = new Map();
    for (const insert of inserts) {
      const key = normalizeSlug(insert.data.slug);
      insertCache.set(key, insert);
    }
  }

  return insertCache.get(normalizeSlug(slug));
}

/**
 * Get news articles (articles in news/ path)
 */
export async function getNews(subsite?: string): Promise<ArticleEntry[]> {
  const articles = await getArticles(subsite);

  return articles
    .filter(article => article.data.slug?.startsWith('news/'))
    .sort((a, b) => {
      const dateA = new Date(a.data.date || 0);
      const dateB = new Date(b.data.date || 0);
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Get articles by category (path prefix)
 */
export async function getArticlesByCategory(
  category: string,
  subsite?: string
): Promise<ArticleEntry[]> {
  const articles = await getArticles(subsite);

  return articles.filter(article =>
    article.data.slug?.startsWith(`${category}/`)
  );
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleEntry | undefined> {
  const articles = await getCollection('articles');
  return articles.find(a => a.data.slug === slug);
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventEntry | undefined> {
  const events = await getCollection('events');
  return events.find(e => e.data.slug === slug);
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date range for events
 */
export function formatDateRange(start: Date | string | undefined, end: Date | string | undefined): string {
  if (!start) return '';

  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = end ? (typeof end === 'string' ? new Date(end) : end) : null;

  if (!endDate || startDate.getTime() === endDate.getTime()) {
    return formatDate(startDate);
  }

  // Same month
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.getDate()}, ${endDate.getFullYear()}`;
  }

  // Different months
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
