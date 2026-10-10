import { getCollection } from 'astro:content';
import {
  communityInHubHallOfFame,
  communitySlug,
  extractAuthors,
  extractFunding,
  listContributors,
  listGrants,
  listOrganisations,
} from './contributors';

export async function getHallOfFameSlugs(): Promise<Set<string>> {
  const [articles, events] = await Promise.all([getCollection('articles'), getCollection('events')]);
  const slugs = new Set<string>();

  const add = (value: string | undefined) => {
    if (!value) return;
    const slug = communitySlug(value);
    if (slug) slugs.add(slug);
  };

  const collect = (values: string[]) => values.forEach(add);

  articles.forEach((article) => {
    collect(extractAuthors(article.data));
    collect(extractFunding(article.data));
  });

  events.forEach((event) => {
    collect(extractAuthors(event.data));
    collect(extractFunding(event.data));
  });

  listContributors()
    .filter(communityInHubHallOfFame)
    .forEach((c) => add(c.id));
  listOrganisations()
    .filter(communityInHubHallOfFame)
    .forEach((o) => add(o.id));
  listGrants()
    .filter(communityInHubHallOfFame)
    .forEach((g) => add(g.id));

  return slugs;
}
