import { getCollection } from 'astro:content';
import { subsiteLabels, subsites } from '@/stores/subsiteStore';
import { buildPageTitles, type PageTitles } from '@/utils/breadcrumbs';

// Pages that are routed in src/pages instead of coming from a content file, and can be the parent of articles.
const ROUTED_PAGES: Record<string, string> = {
  projects: 'Projects',
  careers: 'Careers',
  'events/archive': 'Events Archive',
};

// Each hub-hosted subsite has a home page (/eu/, /us/, ...) titled by its landing-page label
const SUBSITE_HOMES = Object.fromEntries(
  subsites
    .filter((subsite) => subsite.id !== 'global' && subsite.path && !('external' in subsite && subsite.external))
    .map((subsite) => [subsite.path, subsiteLabels[subsite.id]?.title ?? subsite.name])
);

let cached: Promise<PageTitles> | undefined;

async function load(): Promise<PageTitles> {
  const [articles, events] = await Promise.all([getCollection('articles'), getCollection('events')]);
  return buildPageTitles(
    [...articles, ...events].map((entry) => ({ slug: entry.data.slug, title: entry.data.title, body: entry.body })),
    { ...SUBSITE_HOMES, ...ROUTED_PAGES }
  );
}

/** Every page that can be a parent in a breadcrumb trail, by slug. Built once per build; dev rebuilds it so edits show. */
export function getPageTitles(): Promise<PageTitles> {
  if (import.meta.env.DEV) return load();
  cached ??= load();
  return cached;
}
