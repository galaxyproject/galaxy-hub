#!/usr/bin/env node
/**
 * Refresh the Release Guardians event for the cycle named in the config.
 *
 * Single point of GitHub interaction for the initiative. Fetches the labeled
 * PRs via GraphQL, projects each into render-ready data, writes a per-cycle
 * JSON snapshot for the components to consume, writes the event markdown
 * file (preprocess will convert to .mdx via the `components: true`
 * frontmatter), and writes the stable redirect mapping.
 *
 *   Usage: GITHUB_TOKEN=<token> npm run release-guardians:sync-event
 *
 * Behaviour:
 *   - ALWAYS overwrites the JSON + event file for the cycle named in config.
 *     Both are derived artifacts; users only ever edit the config.
 *   - NEVER touches files for any other cycle. Past releases stay frozen
 *     exactly as their last sync left them.
 *   - Without GITHUB_TOKEN: writes the event with empty PR sections.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractPlainTease } from './release-guardians-tease.mjs';

// ── Paths and constants ───────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const REPO_ROOT = path.resolve(ASTRO_ROOT, '..');

const CONFIG_PATH = path.join(ASTRO_ROOT, 'src/data/release-guardians-config.json');
const TEMPLATE_PATH = path.join(ASTRO_ROOT, 'src/templates/release-guardians-event.md.template');
const EVENTS_DIR = path.join(REPO_ROOT, 'content/events');
const DATA_DIR = path.join(ASTRO_ROOT, 'src/data/release-guardians');
const REDIRECT_PATH = path.join(ASTRO_ROOT, 'src/build/release-guardians-redirect.json');

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const QUERY = `
query ($searchQuery: String!, $after: String) {
    search(query: $searchQuery, type: ISSUE, first: 100, after: $after) {
        nodes {
            ... on PullRequest {
                number
                title
                url
                state
                updatedAt
                body
                author { login url avatarUrl }
                labels(first: 20) { nodes { name } }
                timelineItems(itemTypes: [LABELED_EVENT], last: 100) {
                    nodes {
                        ... on LabeledEvent {
                            createdAt
                            actor { login url avatarUrl }
                            label { name }
                        }
                    }
                }
            }
        }
        pageInfo { hasNextPage endCursor }
    }
}`;

// ── Pure helpers ──────────────────────────────────────────────────────────

function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

function renderTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) {
      throw new Error(`template references unknown placeholder "${key}"`);
    }
    return vars[key];
  });
}

/** The actor who most recently applied the given label on this PR. */
function findGuardian(pr, label) {
  const events = pr.labelingEvents.filter((e) => e.label === label);
  if (events.length === 0) return null;
  events.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return events[0].actor;
}

/** Project a raw PR (from GraphQL) into the render-ready shape the components
 *  consume. Drops `body` and `labelingEvents` — they're machinery, not
 *  display data. */
function projectPr(pr, excludedLabels, guardianLabel) {
  return {
    number: pr.number,
    title: pr.title,
    url: pr.url,
    author: pr.author,
    labels: pr.labels.filter((l) => !excludedLabels.has(l)),
    tease: extractPlainTease(pr.body),
    guardian: guardianLabel ? findGuardian(pr, guardianLabel) : null,
  };
}

// ── GitHub ────────────────────────────────────────────────────────────────

async function fetchPrs(config) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('[release-guardians] GITHUB_TOKEN not set — event will have empty PR sections.');
    return null;
  }
  const searchQuery = `repo:${config.repo} is:pr label:"${config.testingLabel}"`;
  const all = [];
  let after = null;
  for (let page = 0; page < 10; page++) {
    const resp = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'galaxy-hub-release-guardians-sync',
      },
      body: JSON.stringify({ query: QUERY, variables: { searchQuery, after } }),
    });
    if (!resp.ok) {
      console.warn(`[release-guardians] GitHub API ${resp.status}: ${resp.statusText}`);
      return null;
    }
    const json = await resp.json();
    if (json.errors?.length) {
      console.warn('[release-guardians] GraphQL errors:', json.errors);
      return null;
    }
    const search = json.data?.search;
    if (!search) return null;
    all.push(...search.nodes);
    if (!search.pageInfo.hasNextPage) break;
    after = search.pageInfo.endCursor;
  }
  return all
    .filter((n) => n && typeof n.number === 'number')
    .map((n) => ({
      number: n.number,
      title: n.title,
      url: n.url,
      updatedAt: n.updatedAt,
      body: n.body || '',
      author: n.author,
      labels: n.labels.nodes.map((l) => l.name),
      labelingEvents: (n.timelineItems?.nodes ?? [])
        .filter((e) => e && e.label && e.actor)
        .map((e) => ({ createdAt: e.createdAt, actor: e.actor, label: e.label.name })),
    }))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const config = readConfig();
  const slug = `${config.testingStart}-release-guardians-${config.releaseVersion}`;
  const targetDir = path.join(EVENTS_DIR, slug);
  const targetPath = path.join(targetDir, 'index.md');
  const dataPath = path.join(DATA_DIR, `${config.releaseVersion}.json`);

  const prs = await fetchPrs(config);
  const complete = prs ? prs.filter((p) => p.labels.includes(config.completeLabel)) : [];
  const inProgress = prs
    ? prs.filter((p) => p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel))
    : [];
  const needsValidation = prs
    ? prs.filter((p) => !p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel))
    : [];

  const excludedLabels = new Set([config.testingLabel, config.inProgressLabel, config.completeLabel]);

  // Render-ready snapshot. Components are pure presentation; everything they
  // need is pre-projected here.
  const snapshot = {
    version: config.releaseVersion,
    fetchedAt: new Date().toISOString(),
    needsValidation: needsValidation.map((p) => projectPr(p, excludedLabels, null)),
    inProgress: inProgress.map((p) => projectPr(p, excludedLabels, config.inProgressLabel)),
    complete: complete.map((p) => projectPr(p, excludedLabels, config.completeLabel)),
  };

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(dataPath, JSON.stringify(snapshot, null, 2) + '\n');

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const organisersYaml = config.organisers.map((o) => `    - ${o}`).join('\n');
  const rendered = renderTemplate(template, {
    version: config.releaseVersion,
    startDate: config.testingStart,
    endDate: config.testingEnd,
    organisersYaml,
    matrixLink: config.matrixLink,
    testServer: config.testServer,
    meetingLink: config.meetingLink,
    meetingSchedule: config.meetingSchedule,
    testingLabel: config.testingLabel,
    inProgressLabel: config.inProgressLabel,
    completeLabel: config.completeLabel,
  });

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetPath, rendered);

  const redirect = { from: '/community/release-guardians/', to: `/events/${slug}/` };
  fs.writeFileSync(REDIRECT_PATH, JSON.stringify(redirect, null, 2) + '\n');

  console.log(`✓ Synced event:    ${path.relative(REPO_ROOT, targetPath)}`);
  console.log(`✓ Synced data:     ${path.relative(REPO_ROOT, dataPath)}`);
  console.log(`  Cycle: ${config.releaseVersion} (${config.testingStart} → ${config.testingEnd})`);
  console.log(
    `  PRs: ${needsValidation.length} need validation, ${inProgress.length} in progress, ${complete.length} complete${prs === null ? ' (data unavailable)' : ''}`
  );
  console.log(`✓ Redirect:        ${redirect.from} → ${redirect.to}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
