#!/usr/bin/env node
/**
 * Refresh the Release Guardians event for the cycle named in
 * `src/utils/release-guardians-config.ts`.
 *
 * Single point of GitHub interaction for the initiative. Fetches the labeled
 * PRs via GraphQL, renders them inline as HTML cards in an event file, and
 * writes the redirect mapping for `/community/release-guardians/` →
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
const TEASE_MAX_CHARS = 280;

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
        inProgressLabel: pick('inProgressLabel'),
        completeLabel: pick('completeLabel'),
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
                body
                author { login url avatarUrl }
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
        }))
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

function formatDate(iso) {
    return new Date(iso).toISOString().slice(0, 10);
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

// Any one of these characters/patterns in the first TEASE_MAX_CHARS means the
// description is "rich" — has markdown, HTML, links, refs, or images.
// We show no tease in that case rather than render or strip ambiguously.
const RICH_MARKERS = /[<>[\]`*_#~]|https?:\/\/|^\s*[-+]\s|^\s*\d+\.\s/m;

/**
 * Show a tease only if the first chunk of the PR description is plain text.
 * If the first TEASE_MAX_CHARS contain any markdown, HTML, links, or images,
 * we render no tease — keeping the card uniform and predictable.
 */
function extractPlainTease(body) {
    if (!body) return '';
    // Drop PR-template HTML comments — they're scaffolding, not content.
    const stripped = body.replace(/<!--[\s\S]*?-->/g, '').trim();
    if (!stripped) return '';

    const head = stripped.slice(0, TEASE_MAX_CHARS);
    if (RICH_MARKERS.test(head)) return '';

    // Word-boundary truncate at the limit if the body extends beyond it.
    if (stripped.length > TEASE_MAX_CHARS) {
        const lastSpace = head.lastIndexOf(' ');
        return head.slice(0, lastSpace > 0 ? lastSpace : head.length).trimEnd().replace(/\s+/g, ' ');
    }
    return head.replace(/\s+/g, ' ').trim();
}

/** Each card is emitted as a single line of HTML — markdown parsers treat
 *  an HTML block as opaque only while there are no blank lines / re-entry
 *  points inside. The card itself is a <div>, not a giant <a>, because the
 *  rendered tease contains its own <a> tags (issue refs, body links) and
 *  nested <a>s are invalid HTML — browsers auto-close the outer one. */
function renderPrCard(pr) {
    const avatar = pr.author?.avatarUrl
        ? `<img src="${escapeHtml(pr.author.avatarUrl)}" alt="" loading="lazy" width="32" height="32" class="w-8 h-8 rounded-full mt-1 flex-shrink-0" />`
        : '<div class="w-8 h-8 rounded-full mt-1 flex-shrink-0 bg-ebony-clay-100"></div>';
    const authorLine = pr.author
        ? `<a href="${escapeHtml(pr.author.url)}" target="_blank" rel="noopener noreferrer" class="text-chicago-700 hover:text-galaxy-primary">@${escapeHtml(pr.author.login)}</a>`
        : '<span class="text-chicago-500">anonymous</span>';
    const tease = extractPlainTease(pr.body);
    const teaseHtml = tease
        ? `<div class="text-sm text-chicago-700 mt-2 leading-snug">${escapeHtml(tease)}&hellip; <a href="${escapeHtml(pr.url)}" target="_blank" rel="noopener noreferrer" class="text-galaxy-primary hover:underline whitespace-nowrap">more</a></div>`
        : '';
    return `<div class="p-4 bg-white rounded-lg border border-ebony-clay-100 hover:border-galaxy-primary hover:shadow-md transition-all"><div class="flex items-start gap-3">${avatar}<div class="min-w-0 flex-1"><div class="font-semibold"><a href="${escapeHtml(pr.url)}" target="_blank" rel="noopener noreferrer" class="text-galaxy-dark hover:text-galaxy-primary">#${pr.number} — ${escapeHtml(pr.title)}</a></div><div class="text-sm text-chicago-500 mt-1">${authorLine} · updated ${formatDate(pr.updatedAt)}</div>${teaseHtml}</div></div></div>`;
}

function renderSection(prs, emptyMessage) {
    if (prs.length === 0) {
        return `<div class="not-prose my-4 p-6 bg-light-bg bg-grid rounded-lg border border-ebony-clay-100 text-center text-chicago-500 italic">${escapeHtml(emptyMessage)}</div>`;
    }
    // No blank lines between cards — keeps the whole section as one HTML
    // block from the markdown parser's perspective.
    const cards = prs.map((pr) => `  ${renderPrCard(pr)}`).join('\n');
    return `<div class="not-prose my-4 p-4 bg-light-bg bg-grid rounded-lg border border-ebony-clay-100"><div class="space-y-3">\n${cards}\n  </div></div>`;
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
    // Complete wins over in-progress (the lifecycle moves forward, not back).
    const complete = prs ? prs.filter((p) => p.labels.includes(config.completeLabel)) : [];
    const inProgress = prs ? prs.filter((p) => p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel)) : [];
    const needsValidation = prs ? prs.filter((p) => !p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel)) : [];

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const organisersYaml = config.organisers.map((o) => `    - ${o}`).join('\n');
    const rendered = renderTemplate(template, {
        version: config.releaseVersion,
        startDate: config.testingStart,
        endDate: config.testingEnd,
        organisersYaml,
        matrixLink: config.matrixLink,
        testingLabel: config.testingLabel,
        inProgressLabel: config.inProgressLabel,
        completeLabel: config.completeLabel,
        needsValidationList: renderSection(needsValidation, 'No PRs currently waiting for validation. Check back soon!'),
        inProgressList: renderSection(inProgress, 'No PRs currently being tested.'),
        completeList: renderSection(complete, 'No PRs marked complete yet.'),
        generatedAt: new Date().toISOString(),
        unavailableNote: prs === null
            ? `\n> _Live PR data was unavailable when this event was last generated; counts above may be stale. See the [label-filtered GitHub view](https://github.com/${config.repo}/pulls?q=is%3Apr+label%3A%22${config.testingLabel}%22) for the current list._\n`
            : '',
    });

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(targetPath, rendered);

    const redirect = { from: '/community/release-guardians/', to: `/events/${slug}/` };
    fs.writeFileSync(REDIRECT_PATH, JSON.stringify(redirect, null, 2) + '\n');

    console.log(`✓ Synced event: ${path.relative(REPO_ROOT, targetPath)}`);
    console.log(`  Cycle: ${config.releaseVersion} (${config.testingStart} → ${config.testingEnd})`);
    console.log(`  PRs: ${needsValidation.length} need validation, ${inProgress.length} in progress, ${complete.length} complete${prs === null ? ' (data unavailable)' : ''}`);
    console.log(`✓ Redirect: ${redirect.from} → ${redirect.to}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
