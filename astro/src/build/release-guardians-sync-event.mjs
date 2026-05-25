#!/usr/bin/env node
/**
 * Refresh the Release Guardians event for the cycle named in
 * `src/utils/release-guardians-config.ts`.
 *
 * Single point of GitHub interaction for the initiative. Fetches the labeled
 * PRs via GraphQL, renders them inline as static markdown in an event file,
 * and writes the redirect mapping for `/community/release-guardians/` →
 * `/events/<currentCycleSlug>/`.
 *
 *   Usage: GITHUB_TOKEN=<token> npm run release-guardians:sync-event
 *
 * Behaviour:
 *   - ALWAYS overwrites the event file for the cycle named in config.
 *     Event files are derived artifacts; users only ever edit the config.
 *   - NEVER touches event files for any other cycle. Past releases stay
 *     frozen exactly as their last sync left them.
 *   - Without GITHUB_TOKEN: writes the event with empty PR sections and a
 *     "data unavailable" note. Still safe to run for local prose previews.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const REPO_ROOT = path.resolve(ASTRO_ROOT, '..');

const CONFIG_PATH = path.join(ASTRO_ROOT, 'src/utils/release-guardians-config.ts');
const TEMPLATE_PATH = path.join(ASTRO_ROOT, 'src/templates/release-guardians-event.md.template');
const EVENTS_DIR = path.join(REPO_ROOT, 'content/events');
const REDIRECT_PATH = path.join(ASTRO_ROOT, 'src/build/release-guardians-redirect.json');

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

function readConfig() {
    const src = fs.readFileSync(CONFIG_PATH, 'utf8');
    const pick = (key) => {
        const m = src.match(new RegExp(`${key}:\\s*"([^"]+)"`));
        if (!m) {
            throw new Error(`release-guardians-config: missing string field "${key}"`);
        }
        return m[1];
    };
    const pickArray = (key) => {
        const m = src.match(new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`));
        if (!m) {
            throw new Error(`release-guardians-config: missing array field "${key}"`);
        }
        return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    };
    return {
        repo: pick('repo'),
        releaseVersion: pick('releaseVersion'),
        testingLabel: pick('testingLabel'),
        validatedLabel: pick('validatedLabel'),
        testingStart: pick('testingStart'),
        testingEnd: pick('testingEnd'),
        organisers: pickArray('organisers'),
        matrixLink: pick('matrixLink'),
    };
}

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
                author { login url }
                labels(first: 20) { nodes { name } }
            }
        }
        pageInfo { hasNextPage endCursor }
    }
}`;

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
    // Newest first; same ordering the rendered sections use.
    return all
        .filter((n) => n && typeof n.number === 'number')
        .map((n) => ({
            number: n.number,
            title: n.title,
            url: n.url,
            updatedAt: n.updatedAt,
            author: n.author,
            labels: n.labels.nodes.map((l) => l.name),
        }))
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

function formatDate(iso) {
    return new Date(iso).toISOString().slice(0, 10);
}

/** One PR → one markdown list line. Author handle linked; falls back to "anonymous". */
function renderPrLine(pr) {
    const author = pr.author
        ? `[@${pr.author.login}](${pr.author.url})`
        : '_anonymous_';
    return `- [#${pr.number} — ${pr.title}](${pr.url}) — ${author} · updated ${formatDate(pr.updatedAt)}`;
}

function renderSection(prs, emptyMessage) {
    if (prs.length === 0) {
        return `_${emptyMessage}_`;
    }
    return prs.map(renderPrLine).join('\n');
}

function renderTemplate(template, vars) {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        if (!(key in vars)) {
            throw new Error(`template references unknown placeholder "${key}"`);
        }
        return vars[key];
    });
}

async function main() {
    const config = readConfig();
    const slug = `${config.testingStart}-release-guardians-${config.releaseVersion}`;
    const targetDir = path.join(EVENTS_DIR, slug);
    const targetPath = path.join(targetDir, 'index.md');

    const prs = await fetchPrs(config);
    const needsValidation = prs ? prs.filter((p) => !p.labels.includes(config.validatedLabel)) : [];
    const validated = prs ? prs.filter((p) => p.labels.includes(config.validatedLabel)) : [];

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const organisersYaml = config.organisers.map((o) => `    - ${o}`).join('\n');
    const rendered = renderTemplate(template, {
        version: config.releaseVersion,
        startDate: config.testingStart,
        endDate: config.testingEnd,
        organisersYaml,
        matrixLink: config.matrixLink,
        testingLabel: config.testingLabel,
        validatedLabel: config.validatedLabel,
        needsValidationList: renderSection(needsValidation, 'No PRs currently waiting for validation. Check back soon!'),
        validatedList: renderSection(validated, 'No PRs validated yet.'),
        generatedAt: new Date().toISOString(),
        unavailableNote: prs === null
            ? '\n> _Live PR data was unavailable when this event was last generated; counts above may be stale. See the [label-filtered GitHub view](https://github.com/' + config.repo + '/pulls?q=is%3Apr+label%3A%22' + config.testingLabel + '%22) for the current list._\n'
            : '',
    });

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(targetPath, rendered);

    // Stable URL → current cycle's event. Read by astro.config.mjs.
    const redirect = { from: '/community/release-guardians/', to: `/events/${slug}/` };
    fs.writeFileSync(REDIRECT_PATH, JSON.stringify(redirect, null, 2) + '\n');

    console.log(`✓ Synced event: ${path.relative(REPO_ROOT, targetPath)}`);
    console.log(`  Cycle: ${config.releaseVersion} (${config.testingStart} → ${config.testingEnd})`);
    console.log(`  PRs: ${needsValidation.length} need validation, ${validated.length} validated${prs === null ? ' (data unavailable)' : ''}`);
    console.log(`✓ Redirect: ${redirect.from} → ${redirect.to}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
