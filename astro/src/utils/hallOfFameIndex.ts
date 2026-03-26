import { getCollection, type CollectionEntry } from 'astro:content';
import {
  communitySlug,
  extractAuthors,
  extractFunding,
  getCommunityDisplay,
  listContributors,
  listGrants,
  listOrganisations,
} from './contributors';

type NewsEntry = CollectionEntry<'news'>;
type EventEntry = CollectionEntry<'events'>;

export type Contribution = {
  title: string;
  url: string;
  date?: string;
  dateValue: number;
  displayDate: string;
  tease?: string | null;
  kind: 'news' | 'event';
  displayMatch?: string;
};

export type ContributionProfile = {
  displayName?: string;
  matchedType?: 'author' | 'supporter';
  contributions: Contribution[];
};

let newsPromise: Promise<NewsEntry[]> | undefined;
let eventsPromise: Promise<EventEntry[]> | undefined;
let contributionIndexPromise: Promise<Map<string, ContributionProfile>> | undefined;

async function getNewsArticles(): Promise<NewsEntry[]> {
  if (!newsPromise) {
    newsPromise = getCollection('news');
  }
  return newsPromise;
}

async function getEvents(): Promise<EventEntry[]> {
  if (!eventsPromise) {
    eventsPromise = getCollection('events');
  }
  return eventsPromise;
}

function ensureProfile(
  index: Map<string, ContributionProfile>,
  slug: string,
  displayName?: string
): ContributionProfile {
  let profile = index.get(slug);
  if (!profile) {
    profile = { displayName, contributions: [] };
    index.set(slug, profile);
  } else if (!profile.displayName && displayName) {
    profile.displayName = displayName;
  }
  return profile;
}

function addContribution(
  index: Map<string, ContributionProfile>,
  targetSlug: string,
  kind: Contribution['kind'],
  entry: NewsEntry | EventEntry,
  displayMatch?: string,
  matchedType?: 'author' | 'supporter'
) {
  const dateObj = entry.data.date ? new Date(entry.data.date) : undefined;
  const contribution: Contribution = {
    title: entry.data.title || 'Untitled',
    url: buildUrl(entry),
    date: dateObj?.toISOString() || entry.data.date?.toString(),
    dateValue: dateObj?.getTime() || 0,
    displayDate: dateObj
      ? dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    tease: (entry.data as Record<string, unknown>).tease as string | undefined,
    kind,
    displayMatch,
  };

  const profile = ensureProfile(index, targetSlug, displayMatch);
  profile.contributions.push(contribution);
  if (!profile.matchedType && matchedType) {
    profile.matchedType = matchedType;
  }
}

function buildUrl(entry: NewsEntry | EventEntry): string {
  const raw = (entry.data.slug || entry.id).replace(/--/g, '/').replace(/\.mdx?$/, '');
  return `/${raw.replace(/\/$/, '')}/`;
}

function normalizeCandidates(entry: NewsEntry | EventEntry): { authors: string[]; supporters: string[] } {
  const data = entry.data as Record<string, unknown>;
  return {
    authors: extractAuthors(data),
    supporters: extractFunding(data),
  };
}

export async function getContributionIndex(): Promise<Map<string, ContributionProfile>> {
  if (contributionIndexPromise) return contributionIndexPromise;

  contributionIndexPromise = (async () => {
    const [news, events] = await Promise.all([getNewsArticles(), getEvents()]);
    const index = new Map<string, ContributionProfile>();

    const addFromEntry = (entry: NewsEntry | EventEntry, kind: Contribution['kind']) => {
      const { authors, supporters } = normalizeCandidates(entry);
      authors.forEach((name) => {
        const slug = communitySlug(name);
        if (slug) {
          addContribution(index, slug, kind, entry, getCommunityDisplay(name) || name, 'author');
        }
      });
      supporters.forEach((name) => {
        const slug = communitySlug(name);
        if (slug) {
          addContribution(index, slug, kind, entry, getCommunityDisplay(name) || name, 'supporter');
        }
      });
    };

    news.forEach((article) => addFromEntry(article, 'news'));
    events.forEach((event) => addFromEntry(event, 'event'));

    // Ensure entries exist for all contributors/organisations/grants even if they have no contributions.
    listContributors().forEach((c) => ensureProfile(index, communitySlug(c.id), c.name || c.id));
    listOrganisations().forEach((o) => ensureProfile(index, communitySlug(o.id), o.name || o.short_name || o.id));
    listGrants().forEach((g) => ensureProfile(index, communitySlug(g.id), g.name || g.short_name || g.id));

    // Sort contributions for each profile once.
    index.forEach((profile) => {
      profile.contributions.sort((a, b) => b.dateValue - a.dateValue);
    });

    return index;
  })();

  return contributionIndexPromise;
}
