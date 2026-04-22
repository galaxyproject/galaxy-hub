import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import { communitySlug as baseCommunitySlug, toArray as baseToArray } from './community-base.mjs';
import { resolveHubInlineMention as resolveHubInlineMentionData } from './hub-inline-mentions.mjs';

const AVATAR_BASE = 'https://training.galaxyproject.org';

export interface ContributorRecord {
  id: string;
  name?: string;
  avatar?: string;
  avatarUrl?: string;
  'gtn-halloffame'?: string | boolean | number;
  halloffame?: string | boolean | number;
  hasHallOfFame?: boolean;
  [key: string]: any;
}

export interface OrganisationRecord {
  id: string;
  name?: string;
  short_name?: string;
  avatar?: string;
  avatarUrl?: string;
  'gtn-halloffame'?: string | boolean | number;
  [key: string]: any;
}

export interface GrantRecord {
  id: string;
  name?: string;
  short_name?: string;
  avatar?: string;
  avatarUrl?: string;
  url?: string;
  'gtn-halloffame'?: string | boolean | number;
  [key: string]: any;
}

export interface HubInlineMentionRecord {
  id: string;
  slug: string;
  href: string;
  label: string;
  avatarUrl?: string;
  type: 'contributor' | 'organisation' | 'grant';
}

type ContributorMap = Record<string, ContributorRecord>;
type OrganisationMap = Record<string, OrganisationRecord>;
type GrantMap = Record<string, GrantRecord>;
type CommunityGithubRecord = {
  id?: string;
  github?: string | boolean;
  github_username?: string;
};
type HallOfFameRecord = {
  id?: string;
  'gtn-halloffame'?: string | boolean | number;
  gtnHallOfFame?: string | boolean | number;
  halloffame?: string | boolean | number;
  hasHallOfFame?: boolean;
};

let contributorCache: ContributorMap | null = null;
let organisationCache: OrganisationMap | null = null;
let grantCache: GrantMap | null = null;

export function communitySlug(value: string): string {
  return baseCommunitySlug(value);
}

function parseHallOfFameFlag(flag: unknown, defaultValue = true): boolean {
  if (flag === undefined || flag === null) return defaultValue;
  if (typeof flag === 'boolean') return flag;
  if (typeof flag === 'number') return flag !== 0;
  if (typeof flag === 'string') {
    const normalized = flag.trim().toLowerCase();
    if (!normalized) return false;
    if (['no', 'false', '0', 'off'].includes(normalized)) return false;
    return true;
  }
  return Boolean(flag);
}

function normalizeAvatar(avatar?: string): string | undefined {
  if (!avatar) return undefined;
  if (/^https?:\/\//i.test(avatar)) return avatar;
  const trimmed = avatar.replace(/^\/+/, '');
  return `${AVATAR_BASE}/${trimmed}`;
}

function findContentPathFrom(startDir: string, filename: string): string | undefined {
  let currentDir = path.resolve(startDir);

  while (currentDir) {
    const candidate = path.resolve(currentDir, 'content', filename);
    if (fs.existsSync(candidate)) return candidate;

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) return undefined;
    currentDir = parentDir;
  }
}

function resolveContentPath(filename: string): string {
  const candidates = [process.cwd(), path.dirname(fileURLToPath(import.meta.url))];

  for (const candidate of candidates) {
    const resolved = findContentPathFrom(candidate, filename);
    if (resolved) return resolved;
  }

  return path.resolve(process.cwd(), '../content', filename);
}

function loadYamlFile<T extends Record<string, any>>(filename: string): T {
  try {
    const abs = resolveContentPath(filename);
    const raw = fs.readFileSync(abs, 'utf8');
    const parsed = parse(raw, { uniqueKeys: false });
    if (!parsed || typeof parsed !== 'object') return {} as T;
    return parsed as T;
  } catch (err) {
    console.warn(`Failed to load content/${filename}`, err);
    return {} as T;
  }
}

function loadContributors(): ContributorMap {
  if (contributorCache) return contributorCache;
  const raw = loadYamlFile<Record<string, any>>('CONTRIBUTORS.yaml');
  contributorCache = Object.fromEntries(
    Object.entries(raw || {}).map(([id, value]) => {
      const data = typeof value === 'object' && value ? value : {};
      return [
        id,
        {
          id,
          ...data,
          avatarUrl: normalizeAvatar((data as any).avatar),
          hasHallOfFame: contributorHasHallOfFame(data),
        },
      ];
    })
  );
  return contributorCache;
}

function loadOrganisations(): OrganisationMap {
  if (organisationCache) return organisationCache;
  const raw = loadYamlFile<Record<string, any>>('ORGANISATIONS.yaml');
  organisationCache = Object.fromEntries(
    Object.entries(raw || {}).map(([id, value]) => {
      const data = typeof value === 'object' && value ? value : {};
      return [
        id,
        {
          id,
          ...data,
          avatarUrl: normalizeAvatar((data as any).avatar),
        },
      ];
    })
  );
  return organisationCache;
}

function loadGrants(): GrantMap {
  if (grantCache) return grantCache;
  const raw = loadYamlFile<Record<string, any>>('GRANTS.yaml');
  grantCache = Object.fromEntries(
    Object.entries(raw || {}).map(([id, value]) => {
      const data = typeof value === 'object' && value ? value : {};
      return [
        id,
        {
          id,
          ...data,
          avatarUrl: normalizeAvatar((data as any).avatar),
        },
      ];
    })
  );
  return grantCache;
}

function resolveBySlug<T extends { id: string; name?: string; short_name?: string }>(
  map: Record<string, T>,
  target: string
): T | undefined {
  const targetSlug = communitySlug(target);
  for (const entry of Object.values(map)) {
    if (communitySlug(entry.id) === targetSlug) return entry;
    if (entry.name && communitySlug(entry.name) === targetSlug) return entry;
    if ('short_name' in entry && entry.short_name && communitySlug(entry.short_name) === targetSlug) return entry;
  }
  return undefined;
}

export function getContributor(userid: string | undefined): ContributorRecord | undefined {
  if (!userid) return undefined;
  const contributors = loadContributors();
  return contributors[userid] || resolveBySlug(contributors, userid);
}

export function getOrganisation(id: string | undefined): OrganisationRecord | undefined {
  if (!id) return undefined;
  const organisations = loadOrganisations();
  return organisations[id] || resolveBySlug(organisations, id);
}

export function getGrant(id: string | undefined): GrantRecord | undefined {
  if (!id) return undefined;
  const grants = loadGrants();
  return grants[id] || resolveBySlug(grants, id);
}

export function getContributorDisplay(userid: string | undefined): string | undefined {
  const contributor = getContributor(userid);
  return contributor?.name || contributor?.id;
}

/**
 * Determine if a community record has a GTN Hall of Fame page.
 * Defaults to true when the field is absent; falsy values or "no"/"false"/"0"/"off" disable it.
 */
export function communityHasGtnHallOfFame(
  value?: string | ContributorRecord | OrganisationRecord | GrantRecord
): boolean {
  const record: HallOfFameRecord | undefined =
    typeof value === 'string'
      ? getContributor(value) || getOrganisation(value) || getGrant(value)
      : (value as HallOfFameRecord | undefined);
  if (!record) return false;
  if (typeof record.hasHallOfFame === 'boolean') return record.hasHallOfFame;
  const flag = record['gtn-halloffame'] ?? record.gtnHallOfFame ?? record.halloffame;
  return parseHallOfFameFlag(flag, true);
}

export function contributorHasHallOfFame(value?: string | ContributorRecord): boolean {
  return communityHasGtnHallOfFame(value);
}

function normalizeGtnHallOfFameKey(value: string): string {
  return String(value || '')
    .trim()
    .replace(/^@/, '');
}

export function buildGtnHallOfFameUrl(value: string): string {
  const key = normalizeGtnHallOfFameKey(value);
  return key
    ? `https://training.galaxyproject.org/training-material/hall-of-fame/${encodeURIComponent(key)}/`
    : 'https://training.galaxyproject.org/training-material/hall-of-fame/';
}

export function getOrganisationDisplay(id: string | undefined): string | undefined {
  const organisation = getOrganisation(id);
  return organisation?.short_name || organisation?.name || organisation?.id;
}

export function getGrantDisplay(id: string | undefined): string | undefined {
  const grant = getGrant(id);
  return grant?.short_name || grant?.name || grant?.id;
}

export function resolveHubInlineMention(key: string | undefined): HubInlineMentionRecord | undefined {
  if (!key) return undefined;
  return resolveHubInlineMentionData(key) as HubInlineMentionRecord | undefined;
}

export function getCommunityDisplay(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return getContributorDisplay(value) || getOrganisationDisplay(value) || getGrantDisplay(value) || value;
}

export function getCommunityGithubHandle(record?: CommunityGithubRecord): string | undefined {
  if (!record) return undefined;

  const explicit = record.github_username ?? record.github;
  if (explicit === false) return undefined;
  if (typeof explicit === 'string' && explicit.trim()) {
    return explicit.trim().replace(/^@/, '');
  }

  if (typeof record.id === 'string' && record.id.trim()) {
    return record.id.trim().replace(/^@/, '');
  }

  return undefined;
}

export function getCommunityImage(
  record?: (CommunityGithubRecord & { avatarUrl?: string }) | undefined
): string | undefined {
  if (!record) return undefined;
  if (record.avatarUrl) return record.avatarUrl;

  const githubHandle = getCommunityGithubHandle(record);
  return githubHandle ? `https://github.com/${githubHandle}.png` : undefined;
}

export function listContributors(): ContributorRecord[] {
  return Object.values(loadContributors());
}

export function listOrganisations(): OrganisationRecord[] {
  return Object.values(loadOrganisations());
}

export function listGrants(): GrantRecord[] {
  return Object.values(loadGrants());
}

export function findCommunityBySlug(
  slug: string
):
  | { type: 'contributor'; record: ContributorRecord }
  | { type: 'organisation'; record: OrganisationRecord }
  | { type: 'grant'; record: GrantRecord }
  | undefined {
  const normalized = communitySlug(slug);
  const contributor = listContributors().find(
    (c) => communitySlug(c.id) === normalized || (c.name && communitySlug(c.name) === normalized)
  );
  if (contributor) return { type: 'contributor', record: contributor };

  const organisation = listOrganisations().find(
    (o) =>
      communitySlug(o.id) === normalized ||
      (o.name && communitySlug(o.name) === normalized) ||
      (o.short_name && communitySlug(o.short_name) === normalized)
  );
  if (organisation) return { type: 'organisation', record: organisation };

  const grant = listGrants().find(
    (g) =>
      communitySlug(g.id) === normalized ||
      (g.name && communitySlug(g.name) === normalized) ||
      (g.short_name && communitySlug(g.short_name) === normalized)
  );
  if (grant) return { type: 'grant', record: grant };

  return undefined;
}

/**
 * Convert unknown values to a flat array of strings.
 * Handles arrays, objects with id/name/github/twitter fields, and primitives.
 */
export function toArray(value: unknown): string[] {
  return baseToArray(value);
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  values.forEach((value) => {
    if (!value || seen.has(value)) return;
    seen.add(value);
    out.push(value);
  });
  return out;
}

/**
 * Extract author identifiers from content entry data.
 */
export function extractAuthors(data: Record<string, unknown>): string[] {
  const contrib = (data.contributions as Record<string, unknown>) || {};
  const contributionAuthors = [
    ...toArray(contrib.organisers),
    ...toArray(contrib.organizers),
    ...toArray(contrib.authorship),
    ...toArray(contrib.author),
    ...toArray(contrib.contributors),
    ...toArray(contrib.instructors),
    ...toArray(contrib.testing),
    ...toArray(contrib.reviewing),
    ...toArray(contrib.translation),
  ].filter(Boolean);

  return uniqueStrings(contributionAuthors);
}

/**
 * Extract funding/supporter identifiers from content entry data.
 * Uses explicit contribution metadata only.
 */
export function extractFunding(data: Record<string, unknown>): string[] {
  const contrib = (data.contributions as Record<string, unknown>) || {};
  const funding = [...toArray(contrib.funding), ...toArray(contrib.infrastructure)].filter(Boolean);

  return uniqueStrings(funding);
}

/**
 * Resolve an author identifier to a display object with id and name.
 */
export function resolveAuthor(value: string): { id?: string; name: string } {
  const contributor = getContributor(value);
  if (contributor) {
    return { id: contributor.id, name: contributor.name || contributor.id };
  }
  return { name: value };
}
