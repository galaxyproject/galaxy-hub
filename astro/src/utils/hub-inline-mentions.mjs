import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import { communitySlug } from './community-base.mjs';

const AVATAR_BASE = 'https://training.galaxyproject.org';

let contributorCache = null;
let organisationCache = null;
let grantCache = null;

function normalizeAvatar(avatar) {
  if (!avatar) return undefined;
  if (/^https?:\/\//i.test(avatar)) return avatar;
  const trimmed = String(avatar).replace(/^\/+/, '');
  return `${AVATAR_BASE}/${trimmed}`;
}

function getCommunityGithubHandle(record) {
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

function getContributorAvatarUrl(record) {
  if (record?.avatarUrl) return record.avatarUrl;
  const githubHandle = getCommunityGithubHandle(record);
  return githubHandle ? `https://github.com/${githubHandle}.png` : undefined;
}

function findContentPathFrom(startDir, filename) {
  let currentDir = path.resolve(startDir);

  while (currentDir) {
    const candidate = path.resolve(currentDir, 'content', filename);
    if (fs.existsSync(candidate)) return candidate;

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) return undefined;
    currentDir = parentDir;
  }
}

function resolveContentPath(filename) {
  const candidates = [process.cwd(), path.dirname(fileURLToPath(import.meta.url))];

  for (const candidate of candidates) {
    const resolved = findContentPathFrom(candidate, filename);
    if (resolved) return resolved;
  }

  return path.resolve(process.cwd(), '../content', filename);
}

function loadYamlFile(filename) {
  try {
    const abs = resolveContentPath(filename);
    const raw = fs.readFileSync(abs, 'utf8');
    const parsed = parse(raw, { uniqueKeys: false });
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch (err) {
    console.warn(`Failed to load content/${filename}`, err);
    return {};
  }
}

function loadCommunityMap(filename, kind) {
  const raw = loadYamlFile(filename);
  return Object.fromEntries(
    Object.entries(raw || {}).map(([id, value]) => {
      const data = typeof value === 'object' && value ? value : {};
      return [
        id,
        {
          id,
          ...data,
          kind,
          avatarUrl: normalizeAvatar(data.avatar),
        },
      ];
    })
  );
}

function loadContributors() {
  if (!contributorCache) contributorCache = loadCommunityMap('CONTRIBUTORS.yaml', 'contributor');
  return contributorCache;
}

function loadOrganisations() {
  if (!organisationCache) organisationCache = loadCommunityMap('ORGANISATIONS.yaml', 'organisation');
  return organisationCache;
}

function loadGrants() {
  if (!grantCache) grantCache = loadCommunityMap('GRANTS.yaml', 'grant');
  return grantCache;
}

function getContributorLabel(record) {
  return record?.name || record?.id;
}

function getOrganisationOrGrantLabel(record) {
  return record?.short_name || record?.name || record?.id;
}

export function resolveHubInlineMention(key) {
  if (!key) return undefined;

  const contributor = loadContributors()[key];
  if (contributor) {
    return {
      id: contributor.id,
      slug: communitySlug(contributor.id),
      href: `/hall-of-fame/${communitySlug(contributor.id)}/`,
      label: getContributorLabel(contributor),
      avatarUrl: getContributorAvatarUrl(contributor),
      type: 'contributor',
    };
  }

  const organisation = loadOrganisations()[key];
  if (organisation) {
    return {
      id: organisation.id,
      slug: communitySlug(organisation.id),
      href: `/hall-of-fame/${communitySlug(organisation.id)}/`,
      label: getOrganisationOrGrantLabel(organisation),
      avatarUrl: organisation.avatarUrl,
      type: 'organisation',
    };
  }

  const grant = loadGrants()[key];
  if (grant) {
    return {
      id: grant.id,
      slug: communitySlug(grant.id),
      href: `/hall-of-fame/${communitySlug(grant.id)}/`,
      label: getOrganisationOrGrantLabel(grant),
      avatarUrl: grant.avatarUrl,
      type: 'grant',
    };
  }

  return undefined;
}
