import { getCollection } from 'astro:content';
import {
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

  listContributors().forEach((c) => add(c.id));
  listOrganisations().forEach((o) => add(o.id));
  listGrants().forEach((g) => add(g.id));

  return slugs;
}
