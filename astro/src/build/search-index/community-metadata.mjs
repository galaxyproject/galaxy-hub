import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import { communitySlug, toArray } from '../../utils/community-base.mjs';
export { communitySlug } from '../../utils/community-base.mjs';

function uniqueStrings(values) {
  return Array.from(
    new Set(
      values
        .filter((v) => v !== undefined && v !== null)
        .map((v) => String(v).trim())
        .filter(Boolean)
    )
  );
}

function lookupTokens(value) {
  const raw = String(value || '').trim();
  if (!raw) return [];
  const lower = raw.toLowerCase();
  const slug = communitySlug(raw);
  const compact = lower.replace(/[^a-z0-9]+/g, '');
  return uniqueStrings([lower, slug, compact]);
}

function matchesLookup(value, lookupSet) {
  const tokens = lookupTokens(value);
  return tokens.some((token) => lookupSet.has(token));
}

function loadYamlMap(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function loadYamlList(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((v) => typeof v === 'string')
      .map((v) => v.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function normalizeTagToken(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '');
}

function addSetMap(map, key, value) {
  if (!key) return;
  if (!map.has(key)) {
    map.set(key, new Set());
  }
  map.get(key).add(value);
}

function buildTagLookup(tags) {
  const exact = new Map();
  const compact = new Map();
  for (const tag of tags) {
    const raw = String(tag || '').trim();
    if (!raw) continue;
    addSetMap(exact, raw.toLowerCase(), raw);
    addSetMap(compact, normalizeTagToken(raw), raw);
  }
  return { exact, compact };
}

function expandTagVariants(tag, tagLookup) {
  const raw = String(tag || '').trim();
  if (!raw) return [];

  const variants = new Set([raw]);
  const exactMatches = tagLookup?.exact?.get(raw.toLowerCase());
  const compactMatches = tagLookup?.compact?.get(normalizeTagToken(raw));

  exactMatches?.forEach((v) => variants.add(v));
  compactMatches?.forEach((v) => variants.add(v));

  return Array.from(variants);
}

function buildLookupSet(map) {
  const lookup = new Set();
  for (const [id, value] of Object.entries(map || {})) {
    const record = value && typeof value === 'object' ? value : {};
    [id, record.name, record.short_name].forEach((candidate) => {
      lookupTokens(candidate).forEach((token) => lookup.add(token));
    });
  }
  return lookup;
}

const communityDataCache = new Map();

export function loadCommunityData(sourceContentDir) {
  if (communityDataCache.has(sourceContentDir)) {
    return communityDataCache.get(sourceContentDir);
  }

  const contributors = loadYamlMap(path.join(sourceContentDir, 'CONTRIBUTORS.yaml'));
  const organisations = loadYamlMap(path.join(sourceContentDir, 'ORGANISATIONS.yaml'));
  const grants = loadYamlMap(path.join(sourceContentDir, 'GRANTS.yaml'));
  const tags = loadYamlList(path.join(sourceContentDir, 'TAGS.yaml'));

  const data = {
    contributors,
    organisations,
    grants,
    tags,
    tagLookup: buildTagLookup(tags),
    lookups: {
      contributors: buildLookupSet(contributors),
      organisations: buildLookupSet(organisations),
      grants: buildLookupSet(grants),
    },
  };

  communityDataCache.set(sourceContentDir, data);
  return data;
}

function normalizeDate(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  let candidate = raw;
  if (/^\d{4}-\d{2}$/.test(raw)) {
    candidate = `${raw}-01`;
  } else if (/^\d{4}$/.test(raw)) {
    candidate = `${raw}-01-01`;
  }

  const date = new Date(candidate);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function classifyFunding(values, communityData) {
  const organisations = [];
  const grants = [];

  for (const value of uniqueStrings(values)) {
    if (matchesLookup(value, communityData.lookups.grants)) {
      grants.push(value);
      continue;
    }
    if (matchesLookup(value, communityData.lookups.organisations)) {
      organisations.push(value);
      continue;
    }
    // Unknown funding references are treated as organisation-style supporters.
    organisations.push(value);
  }

  return {
    organisations: uniqueStrings(organisations),
    grants: uniqueStrings(grants),
  };
}

export function extractCommunityMetadata(frontmatter, communityData) {
  const contributions = frontmatter.contributions || {};

  const contributors = uniqueStrings([
    ...toArray(frontmatter.CONTRIBUTORS),
    ...toArray(frontmatter.contributors),
    ...toArray(contributions.authorship),
    ...toArray(contributions.author),
    ...toArray(contributions.contributors),
  ]);

  const directOrganisations = uniqueStrings([
    ...toArray(frontmatter.ORGANISATIONS),
    ...toArray(frontmatter.organisations),
    ...toArray(frontmatter.organizations),
  ]);

  const directGrants = uniqueStrings([...toArray(frontmatter.GRANTS), ...toArray(frontmatter.grants)]);

  const fundingCandidates = uniqueStrings([
    ...toArray(contributions.funding),
    ...toArray(frontmatter.funding),
    ...toArray(frontmatter.infrastructure),
    ...toArray(frontmatter.data),
  ]);
  const funding = classifyFunding(fundingCandidates, communityData);

  const organisations = uniqueStrings([...directOrganisations, ...funding.organisations]);
  const grants = uniqueStrings([...directGrants, ...funding.grants]);
  const rawTags = uniqueStrings(toArray(frontmatter.tags));
  const tags = uniqueStrings(rawTags.flatMap((tag) => expandTagVariants(tag, communityData.tagLookup)));

  return {
    tags,
    contributors,
    organisations,
    grants,
    search_terms: uniqueStrings([
      frontmatter.slug,
      frontmatter.naturalSlug,
      ...tags,
      ...contributors,
      ...organisations,
      ...grants,
    ]),
  };
}

function buildHallOfFameEntry(type, id, record, extractText, truncate, communityData) {
  const slug = communitySlug(id);
  if (!slug) return null;

  const displayName = record.name || record.short_name || id;
  const profileText = extractText(
    [record.bio, record.description, record.funding_statement].filter((v) => typeof v === 'string').join('\n\n')
  );

  const entry = {
    title: displayName,
    slug: `hall-of-fame/${slug}`,
    path: `/hall-of-fame/${slug}/`,
    external_url: null,
    excerpt: truncate(profileText),
    tease: '',
    tags: uniqueStrings(['hall-of-fame', type]),
    date: normalizeDate(record.joined),
    collection: 'hall-of-fame',
    contributors: [],
    organisations: [],
    grants: [],
    search_terms: uniqueStrings([id, record.name, record.short_name, slug, slug.replace(/-/g, '')]),
  };

  if (type === 'contributor') {
    const affiliations = uniqueStrings([...toArray(record.affiliations), ...toArray(record.former_affiliations)]);
    const classifiedAffiliations = classifyFunding(affiliations, communityData);
    entry.contributors = uniqueStrings([id, record.name]);
    entry.organisations = classifiedAffiliations.organisations;
    entry.grants = classifiedAffiliations.grants;
    entry.search_terms = uniqueStrings([
      ...entry.search_terms,
      ...entry.contributors,
      ...entry.organisations,
      ...entry.grants,
    ]);
    return entry;
  }

  if (type === 'organisation') {
    entry.organisations = uniqueStrings([id, record.name, record.short_name]);
    entry.search_terms = uniqueStrings([...entry.search_terms, ...entry.organisations]);
    return entry;
  }

  entry.grants = uniqueStrings([id, record.name, record.short_name, record.funding_id, record.funder_name]);
  entry.search_terms = uniqueStrings([...entry.search_terms, ...entry.grants]);
  return entry;
}

function mergeHallOfFameEntries(existing, incoming) {
  return {
    ...existing,
    title: existing.title || incoming.title,
    excerpt: existing.excerpt.length >= incoming.excerpt.length ? existing.excerpt : incoming.excerpt,
    date: existing.date || incoming.date,
    tags: uniqueStrings([...existing.tags, ...incoming.tags]),
    contributors: uniqueStrings([...existing.contributors, ...incoming.contributors]),
    organisations: uniqueStrings([...existing.organisations, ...incoming.organisations]),
    grants: uniqueStrings([...existing.grants, ...incoming.grants]),
    search_terms: uniqueStrings([...existing.search_terms, ...incoming.search_terms]),
  };
}

export function buildHallOfFameEntries(communityData, extractText, truncate) {
  const bySlug = new Map();

  const addEntry = (type, id, record) => {
    const entry = buildHallOfFameEntry(type, id, record, extractText, truncate, communityData);
    if (!entry) return;
    const existing = bySlug.get(entry.slug);
    bySlug.set(entry.slug, existing ? mergeHallOfFameEntries(existing, entry) : entry);
  };

  for (const [id, record] of Object.entries(communityData.contributors || {})) {
    addEntry('contributor', id, record && typeof record === 'object' ? record : {});
  }
  for (const [id, record] of Object.entries(communityData.organisations || {})) {
    addEntry('organisation', id, record && typeof record === 'object' ? record : {});
  }
  for (const [id, record] of Object.entries(communityData.grants || {})) {
    addEntry('grant', id, record && typeof record === 'object' ? record : {});
  }

  return Array.from(bySlug.values());
}
