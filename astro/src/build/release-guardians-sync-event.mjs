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

/** Cheap markdown-strip + first-meaningful-paragraph extraction + word-boundary truncate. */
function extractTease(body) {
    if (!body) return '';
    let t = body
        // HTML comments (common in PR templates)
        .replace(/<!--[\s\S]*?-->/g, '')
        // Raw HTML tags (e.g. <img>, <details>, <br>) — strip the tag, keep any text
        .replace(/<[^>]+>/g, '')
        // Fenced code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Inline code
        .replace(/`([^`]+)`/g, '$1')
        // Headers
        .replace(/^#{1,6}\s+/gm, '')
        // Bold / italic / strike markers
        .replace(/(\*\*|__|~~|\*|_)/g, '')
        // Inline images / links — keep link text only
        .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
        // Blockquotes
        .replace(/^>\s*/gm, '')
        // List markers
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/^\s*\d+\.\s+/gm, '');

    // Walk paragraphs until we find one with enough substance. Skips bare
    // section labels ("Summary", "Description") that PR templates leave behind.
    const paragraphs = t.split(/\n{2,}/).map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
    const firstPara = paragraphs.find((p) => p.length >= 30) || paragraphs[0] || '';
    if (firstPara.length <= TEASE_MAX_CHARS) {
        return firstPara;
    }
    const cut = firstPara.slice(0, TEASE_MAX_CHARS);
    const lastSpace = cut.lastIndexOf(' ');
    return cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).trimEnd();
}

/** Each card is emitted as a single line of HTML — markdown parsers treat
 *  an HTML block as opaque only while there are no blank lines / re-entry
 *  points inside. Internal whitespace breaks the block and re-parses the
 *  body as markdown, which mangles the layout. */
function renderPrCard(pr) {
    const avatar = pr.author?.avatarUrl
        ? `<img src="${escapeHtml(pr.author.avatarUrl)}" alt="" loading="lazy" width="32" height="32" class="w-8 h-8 rounded-full mt-1 flex-shrink-0" />`
        : '<div class="w-8 h-8 rounded-full mt-1 flex-shrink-0 bg-ebony-clay-100"></div>';
    const authorLine = pr.author
        ? `<span class="text-chicago-700">@${escapeHtml(pr.author.login)}</span>`
        : '<span class="text-chicago-500">anonymous</span>';
    const tease = extractTease(pr.body);
    const teaseHtml = tease
        ? `<div class="text-sm text-chicago-700 mt-2 leading-snug">${escapeHtml(tease)}&hellip; <span class="text-galaxy-primary whitespace-nowrap">more</span></div>`
        : '';
    return `<a href="${escapeHtml(pr.url)}" class="block p-4 bg-white rounded-lg border border-ebony-clay-100 hover:border-galaxy-primary hover:shadow-md transition-all no-underline"><div class="flex items-start gap-3">${avatar}<div class="min-w-0 flex-1"><div class="font-semibold text-galaxy-dark">#${pr.number} — ${escapeHtml(pr.title)}</div><div class="text-sm text-chicago-500 mt-1">${authorLine} · updated ${formatDate(pr.updatedAt)}</div>${teaseHtml}</div></div></a>`;
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
            ? `\n> _Live PR data was unavailable when this event was last generated; counts above may be stale. See the [label-filtered GitHub view](https://github.com/${config.repo}/pulls?q=is%3Apr+label%3A%22${config.testingLabel}%22) for the current list._\n`
            : '',
    });

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(targetPath, rendered);

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
