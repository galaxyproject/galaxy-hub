import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const AVATAR_BASE = 'https://training.galaxyproject.org';

export interface ContributorRecord {
  id: string;
  name?: string;
  avatar?: string;
  avatarUrl?: string;
  [key: string]: any;
}

export interface OrganisationRecord {
  id: string;
  name?: string;
  short_name?: string;
  avatar?: string;
  avatarUrl?: string;
  [key: string]: any;
}

export interface GrantRecord {
  id: string;
  name?: string;
  short_name?: string;
  avatar?: string;
  avatarUrl?: string;
  url?: string;
  [key: string]: any;
}

type ContributorMap = Record<string, ContributorRecord>;
type OrganisationMap = Record<string, OrganisationRecord>;
type GrantMap = Record<string, GrantRecord>;

let contributorCache: ContributorMap | null = null;
let organisationCache: OrganisationMap | null = null;
let grantCache: GrantMap | null = null;

export function communitySlug(value: string): string {
  const normalized = String(value).trim().replace(/^@/, '');
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeAvatar(avatar?: string): string | undefined {
  if (!avatar) return undefined;
  if (/^https?:\/\//i.test(avatar)) return avatar;
  const trimmed = avatar.replace(/^\/+/, '');
  return `${AVATAR_BASE}/${trimmed}`;
}

function loadYamlFile<T extends Record<string, any>>(relativePath: string): T {
  try {
    const abs = path.resolve(fileURLToPath(new URL(relativePath, import.meta.url)));
    const raw = fs.readFileSync(abs, 'utf8');
    const parsed = parse(raw, { uniqueKeys: false });
    if (!parsed || typeof parsed !== 'object') return {} as T;
    return parsed as T;
  } catch (err) {
    console.warn(`Failed to load ${relativePath}`, err);
    return {} as T;
  }
}

function loadContributors(): ContributorMap {
  if (contributorCache) return contributorCache;
  const raw = loadYamlFile<Record<string, any>>('../../../content/CONTRIBUTORS.yaml');
  contributorCache = Object.fromEntries(
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
  return contributorCache;
}

function loadOrganisations(): OrganisationMap {
  if (organisationCache) return organisationCache;
  const raw = loadYamlFile<Record<string, any>>('../../../content/ORGANISATIONS.yaml');
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
  const raw = loadYamlFile<Record<string, any>>('../../../content/GRANTS.yaml');
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

export function getOrganisationDisplay(id: string | undefined): string | undefined {
  const organisation = getOrganisation(id);
  return organisation?.name || organisation?.short_name || organisation?.id;
}

export function getGrantDisplay(id: string | undefined): string | undefined {
  const grant = getGrant(id);
  return grant?.name || grant?.short_name || grant?.id;
}

export function getCommunityDisplay(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return getContributorDisplay(value) || getOrganisationDisplay(value) || getGrantDisplay(value) || value;
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
