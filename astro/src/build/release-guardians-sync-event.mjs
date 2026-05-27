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
import { buildSnapshot, snapshotFingerprint } from './release-guardians-projection.mjs';

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

// GitHub fetch limits. The two `100`s are GraphQL hard maxes per `first`/`last`;
// MAX_PAGES * PRS_PER_PAGE caps total PRs we'll walk in one sync. LABELS_PER_PR
// is conservative — release-testing PRs rarely have more than a few labels.
const PRS_PER_PAGE = 100;
const MAX_PAGES = 10;
const LABELS_PER_PR = 20;
const LABELING_EVENTS_PER_PR = 100;

const QUERY = `
query ($searchQuery: String!, $after: String) {
    search(query: $searchQuery, type: ISSUE, first: ${PRS_PER_PAGE}, after: $after) {
        nodes {
            ... on PullRequest {
                number
                title
                url
                updatedAt
                body
                author { login url }
                labels(first: ${LABELS_PER_PR}) { nodes { name } }
                timelineItems(itemTypes: [LABELED_EVENT], last: ${LABELING_EVENTS_PER_PR}) {
                    nodes {
                        ... on LabeledEvent {
                            createdAt
                            actor { login url }
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

function readJsonOrNull(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function renderTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) {
      throw new Error(`template references unknown placeholder "${key}"`);
    }
    return vars[key];
  });
}

// ── GitHub ────────────────────────────────────────────────────────────────

async function fetchPrs(config) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('[release-guardians] GITHUB_TOKEN not set.');
    return null;
  }
  const searchQuery = `repo:${config.repo} is:pr is:merged label:"${config.testingLabel}"`;
  const all = [];
  let after = null;
  for (let page = 0; page < MAX_PAGES; page++) {
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
  // Slug must match the events validator regex `^\d{4}-\d{2}-\d{2}-[a-z0-9_-]+$`,
  // so dots in the release version (`26.1`) become dashes (`26-1`) here.
  const versionSlug = config.releaseVersion.replace(/\./g, '-');
  const slug = `${config.testingStart}-release-guardians-${versionSlug}`;
  const targetDir = path.join(EVENTS_DIR, slug);
  const targetPath = path.join(targetDir, 'index.md');
  const dataPath = path.join(DATA_DIR, `${config.releaseVersion}.json`);

  const prs = await fetchPrs(config);
  // Treat a failed/blocked upstream fetch as a no-op: leave every existing
  // file intact and exit non-zero so the workflow run is visibly red. The
  // alternative (writing an empty snapshot) would wipe the live page on any
  // transient GitHub API hiccup.
  if (prs === null) {
    console.error('[release-guardians] Upstream fetch failed — existing snapshot, event, and redirect left untouched.');
    process.exit(2);
  }

  const newSnapshot = buildSnapshot(prs, config, new Date().toISOString());

  // Skip the snapshot write when the only thing that changed is `fetchedAt`
  // — otherwise the cron would open a noise PR every 12 hours even when no
  // PR labels moved.
  const existingSnapshot = readJsonOrNull(dataPath);
  const snapshotChanged = snapshotFingerprint(newSnapshot) !== snapshotFingerprint(existingSnapshot);
  if (snapshotChanged) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify(newSnapshot, null, 2) + '\n');
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const organisersYaml = config.organisers.map((o) => `    - ${o}`).join('\n');
  const rendered = renderTemplate(template, {
    version: config.releaseVersion,
    startDate: config.testingStart,
    endDate: config.testingEnd,
    organisersYaml,
    matrixLink: config.matrixLink,
    testServer: config.testServer,
    meetingName: config.meetingName,
    meetingLink: config.meetingLink,
    testingLabel: config.testingLabel,
    inProgressLabel: config.inProgressLabel,
    completeLabel: config.completeLabel,
    issueLink: `https://github.com/${config.repo}/issues/new?template=bug_report.md`,
  });

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetPath, rendered);

  const redirect = { from: '/community/release-guardians/', to: `/events/${slug}/` };
  fs.writeFileSync(REDIRECT_PATH, JSON.stringify(redirect, null, 2) + '\n');

  console.log(`✓ Synced event:    ${path.relative(REPO_ROOT, targetPath)}`);
  console.log(
    snapshotChanged
      ? `✓ Synced data:     ${path.relative(REPO_ROOT, dataPath)}`
      : `· Snapshot unchanged — keeping fetchedAt ${existingSnapshot.fetchedAt}`
  );
  console.log(`  Cycle: ${config.releaseVersion} (${config.testingStart} → ${config.testingEnd})`);
  console.log(
    `  PRs: ${newSnapshot.needsValidation.length} need validation, ${newSnapshot.inProgress.length} in progress, ${newSnapshot.complete.length} complete`
  );
  console.log(`✓ Redirect:        ${redirect.from} → ${redirect.to}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
