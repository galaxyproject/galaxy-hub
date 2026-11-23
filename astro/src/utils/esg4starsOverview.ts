/**
 * Data of the ESG4Stars overview, shared by the Hub page (/projects/esg4stars/) and its bare copy
 * (/bare/projects/esg4stars/). Facts come from content/projects/esg4stars/main.md, sections from its
 * esg4stars-* datasets, news and events from the esg4stars tag.
 */
import { getEntry, render } from 'astro:content';
import type { ProjectRow } from '@/components/projects/ProjectRows.astro';
import { getInsert } from './content';
import { isPastEvent } from './dateUtils';
import { projectStatus } from './projectFacts';
import { getProject, getProjectEvents, getProjectNews } from './projectPages';
import { eventsLabel } from './siteContext';

export interface Esg4StarsPillar {
  name: string;
  content: string;
}

export interface Esg4StarsStream {
  name?: string;
  work_packages: string;
  content: string;
}

export interface Esg4StarsPartner {
  short_name?: string;
  name: string;
  country: string;
  /** Site path of the logo, e.g. /images/projects/esg4stars/partners/uka.png */
  image?: string;
  website?: string;
  note?: string;
}

export interface OverviewHeading {
  depth: number;
  slug: string;
  text: string;
}

export const ESG4STARS_FUNDING_SLUG = 'projects/esg4stars/funding_notice';

export async function getEsg4StarsOverview(now: Date = new Date()) {
  const project = await getProject('esg4stars');
  const { Content: Summary, headings: summaryHeadings } = await render(project.entry);
  const hasFunding = Boolean(await getInsert(ESG4STARS_FUNDING_SLUG));

  // Datasets are keyed by file name across content/, hence the esg4stars- prefix
  const pillars = (await getEntry('datasets', 'esg4stars-pillars'))?.data as
    { heading?: string; pillars?: Esg4StarsPillar[] } | undefined;
  const streams = (await getEntry('datasets', 'esg4stars-streams'))?.data as
    { heading?: string; streams?: Esg4StarsStream[] } | undefined;
  const partners = project.partners as { heading?: string; partners?: Esg4StarsPartner[] } | undefined;

  const news = await getProjectNews(project.source, now);
  // Once the project has ended only past events are left, and the section says so
  const ended = projectStatus(project.facts, now) === 'ended';
  const events = await getProjectEvents(project.source, { pastOnly: ended, now });
  const eventsTitle = eventsLabel(ended);

  const pillarsTitle = pillars?.heading || 'Five pillars';
  const streamsTitle = streams?.heading || 'Project architecture';
  const partnersTitle = partners?.heading || 'Project Partners';

  const headings = [
    ...summaryHeadings.filter((heading) => heading.depth === 2),
    pillars?.pillars && { depth: 2, slug: 'pillars', text: pillarsTitle },
    streams?.streams && { depth: 2, slug: 'architecture', text: streamsTitle },
    { depth: 2, slug: 'news', text: 'News' },
    { depth: 2, slug: 'events', text: eventsTitle },
    partners?.partners && { depth: 2, slug: 'partners', text: partnersTitle },
    hasFunding && { depth: 2, slug: 'funding', text: 'Funding' },
  ].filter((heading): heading is OverviewHeading => Boolean(heading));

  const newsRows: ProjectRow[] = news.slice(0, 6).map((item) => ({
    href: `/${item.data.slug}/`,
    title: item.data.title,
    tease: item.data.tease,
    start: item.data.date,
  }));
  const eventRows: ProjectRow[] = events.slice(0, 5).map((event) => ({
    href: `/${event.data.slug}/`,
    title: event.data.title,
    tease: event.data.tease,
    start: event.data.date,
    end: event.data.end,
    past: isPastEvent(event.data.date, event.data.end, now),
  }));

  return {
    project,
    Summary,
    headings,
    fundingSlug: ESG4STARS_FUNDING_SLUG,
    pillars: pillars?.pillars,
    pillarsTitle,
    streams: streams?.streams,
    streamsTitle,
    partners: partners?.partners,
    partnersTitle,
    newsCount: news.length,
    newsRows,
    newsHref: '/projects/esg4stars/news/',
    eventRows,
    eventsTitle,
    eventsHref: '/projects/esg4stars/events/',
    ended,
  };
}

export type Esg4StarsOverview = Awaited<ReturnType<typeof getEsg4StarsOverview>>;
