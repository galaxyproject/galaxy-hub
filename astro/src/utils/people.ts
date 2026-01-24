import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import { communitySlug } from './contributors';

export const europeSites = ['freiburg', 'ifb', 'erasmusmc', 'elixir-it', 'genouest'] as const;

export type EuropeSiteId = (typeof europeSites)[number];

export interface PersonProfile {
  id: string;
  subsite: string;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  locationLink?: string;
  website?: string;
  github?: string;
  matrix?: string;
  linkedin?: string;
  orcid?: string;
  mastodon?: string;
  gitter?: string;
  googleScholar?: string;
  researchgate?: string;
  hallOfFameSlug: string;
  gtnProfile?: string;
  avatarUrl?: string;
  bio?: string;
  alumni?: boolean;
}

export type PeopleBySubsite = Record<string, PersonProfile[]>;

let cache: PeopleBySubsite | null = null;

function normalizeMastodon(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^https?:\/\//i, '')}`;
}

function normalizeGithub(id: string, record: Record<string, any>): string | undefined {
  const explicit = record.github_username || record.github;
  const handle = explicit && typeof explicit === 'string' ? explicit.trim() : id;
  return handle || undefined;
}

function buildAvatar(handle?: string): string | undefined {
  if (!handle) return undefined;
  const clean = handle.replace(/^@/, '');
  return `https://avatars.githubusercontent.com/${clean}?s=240`;
}

function resolvePath(): string {
  return path.resolve(fileURLToPath(new URL('../../../content/people/people.yaml', import.meta.url)));
}

export function loadPeopleData(): PeopleBySubsite {
  if (cache) return cache;

  try {
    const raw = fs.readFileSync(resolvePath(), 'utf8');
    const parsed = parse(raw, { uniqueKeys: false }) as Record<string, Record<string, any>>;
    const entries: PeopleBySubsite = {};

    for (const [subsite, people] of Object.entries(parsed || {})) {
      if (!people || typeof people !== 'object') continue;
      const profiles: PersonProfile[] = [];

      for (const [id, record] of Object.entries(people)) {
        if (!record || typeof record !== 'object') continue;
        const github = normalizeGithub(id, record);
        const hallSlug = communitySlug(github || record.name || id);
        const profile: PersonProfile = {
          id,
          subsite,
          name: typeof record.name === 'string' && record.name.trim().length > 0 ? record.name : github || id,
          title: record.title,
          email: record.email,
          phone: record.phone,
          location: record.location,
          locationLink: record.location_link,
          website: record.website,
          github,
          matrix: record.matrix,
          linkedin: record.linkedin,
          orcid: record.orcid,
          mastodon: normalizeMastodon(record.mastodon || record.fediverse),
          gitter: record.gitter,
          googleScholar: record['google-scholar'],
          researchgate: record.researchgate,
          hallOfFameSlug: hallSlug,
          gtnProfile: hallSlug
            ? `https://training.galaxyproject.org/training-material/hall-of-fame/${hallSlug}/`
            : undefined,
          avatarUrl: buildAvatar(github),
          bio: record.bio,
          alumni: record.alumni === true,
        };
        profiles.push(profile);
      }

      profiles.sort((a, b) => a.name.localeCompare(b.name));
      entries[subsite] = profiles;
    }

    cache = entries;
    return entries;
  } catch (err) {
    console.warn('Failed to load people.yaml', err);
    return {};
  }
}
