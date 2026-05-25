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
const TEASE_MAX_WORDS = 50;

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
        testServer: pick('testServer'),
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

/** The actor who most recently applied the given label on this PR. */
function findGuardian(pr, label) {
    const events = pr.labelingEvents.filter((e) => e.label === label);
    if (events.length === 0) return null;
    events.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return events[0].actor;
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

// Per-sentence markers — anything that signals markdown/HTML/link/image/ref
// inline. A sentence containing any of these is "dirty" and unprintable as
// plain text. Backticks (inline code like `data_collection`) are deliberately
// allowed through — they render as literal characters and remain readable.
const SENTENCE_DIRTY = /<[^>]+>|\[[^\]]*\]\(|!\[|\*\*|__|~~|#\d|(^|\s)@\w|https?:\/\//;

// A line that looks like a markdown block element (header / blockquote /
// list). Whole paragraphs containing any such line are skipped entirely.
const STRUCTURAL_LINE = /^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s)/;

/**
 * Walk the PR description for the first **clean** sentence — no markdown,
 * HTML, links, refs, or images. Use that as the starting point and keep
 * accumulating subsequent clean sentences until either:
 *   - a dirty sentence is hit, or
 *   - the word count reaches TEASE_MAX_WORDS.
 *
 * Skips paragraphs that look like markdown structure (headers, blockquotes,
 * lists) so a PR that opens with `## Summary` followed by `Addresses #123`
 * followed by plain prose lands on the prose.
 *
 * Returns '' if no clean starting sentence exists in any paragraph.
 */
function extractPlainTease(body) {
    if (!body) return '';
    // Normalise CRLF / lone CR — GitHub returns mixed line endings and the
    // paragraph split below requires consecutive '\n's to detect boundaries.
    let stripped = body
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/```[\s\S]*?```/g, '');

    // Strip structural lines (headings, blockquotes, lists, table rows,
    // setext underlines) by replacing them with blank lines. This breaks the
    // heading off from any directly-following prose so the prose becomes its
    // own paragraph instead of being rejected with the heading.
    stripped = stripped
        .split('\n')
        .map((line) => {
            const t = line.trim();
            if (STRUCTURAL_LINE.test(t)) return '';
            if (/^\|.*\|$/.test(t)) return '';        // markdown table row
            if (/^={3,}$|^-{3,}$/.test(t)) return ''; // setext header underline
            return line;
        })
        .join('\n')
        .trim();
    if (!stripped) return '';

    const paragraphs = stripped.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    for (const paragraph of paragraphs) {
        const flat = paragraph.replace(/\s+/g, ' ').trim();
        // Sentence split on terminator + space. Conservative — won't over-split
        // on "v1.0" or "Mr." but may under-split on missing terminators (fine).
        const sentences = flat.split(/(?<=[.!?])\s+/);
        const startIdx = sentences.findIndex((s) => !SENTENCE_DIRTY.test(s));
        if (startIdx === -1) continue;

        const out = [];
        let wordCount = 0;
        for (let i = startIdx; i < sentences.length; i++) {
            if (SENTENCE_DIRTY.test(sentences[i])) break;
            const words = sentences[i].split(/\s+/).filter(Boolean);
            const remaining = TEASE_MAX_WORDS - wordCount;
            if (words.length > remaining) {
                out.push(...words.slice(0, remaining));
                wordCount = TEASE_MAX_WORDS;
                break;
            }
            out.push(...words);
            wordCount += words.length;
            if (wordCount >= TEASE_MAX_WORDS) break;
        }
        if (out.length === 0) continue;
        return out.join(' ');
    }
    return '';
}

/** Each card is emitted as a single line of HTML — markdown parsers treat
 *  an HTML block as opaque only while there are no blank lines / re-entry
 *  points inside. The card itself is a <div>, not a giant <a>, because the
 *  rendered tease contains its own <a> tags (issue refs, body links) and
 *  nested <a>s are invalid HTML — browsers auto-close the outer one. */
function renderPrCard(pr, excludedLabels, guardian) {
    const avatar = pr.author?.avatarUrl
        ? `<img src="${escapeHtml(pr.author.avatarUrl)}" alt="" loading="lazy" width="32" height="32" class="w-8 h-8 rounded-full mt-1 flex-shrink-0" />`
        : '<div class="w-8 h-8 rounded-full mt-1 flex-shrink-0 bg-ebony-clay-100"></div>';
    // Drop lifecycle labels (testing/in-progress/complete) — the section the
    // card sits in already conveys that state, so showing them is redundant.
    const visibleLabels = pr.labels.filter((l) => !excludedLabels.has(l));
    const labelsHtml = visibleLabels.length
        ? `<div class="flex flex-wrap gap-1 mt-2">${visibleLabels.map((l) => `<span class="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-ebony-clay-50 text-chicago-700 border border-ebony-clay-100">${escapeHtml(l)}</span>`).join('')}</div>`
        : '';
    const guardianHtml = guardian
        ? `<div class="flex justify-end mt-2"><span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-200">Guardian: <a href="${escapeHtml(guardian.url)}" target="_blank" rel="noopener noreferrer" class="font-medium hover:underline">@${escapeHtml(guardian.login)}</a></span></div>`
        : '';
    const tease = extractPlainTease(pr.body);
    const teaseHtml = tease
        ? `<div class="text-sm text-chicago-700 mt-2 leading-snug">${escapeHtml(tease)}&hellip; <a href="${escapeHtml(pr.url)}" target="_blank" rel="noopener noreferrer" class="text-galaxy-primary hover:underline whitespace-nowrap">more</a></div>`
        : '';
    return `<div class="p-4 bg-white rounded-lg border border-ebony-clay-100 hover:border-galaxy-primary hover:shadow-md transition-all"><div class="flex items-start gap-3">${avatar}<div class="min-w-0 flex-1"><div class="font-semibold"><a href="${escapeHtml(pr.url)}" target="_blank" rel="noopener noreferrer" class="text-galaxy-dark hover:text-galaxy-primary">#${pr.number} — ${escapeHtml(pr.title)}</a></div>${labelsHtml}${teaseHtml}${guardianHtml}</div></div></div>`;
}

function renderSection(prs, emptyMessage, excludedLabels, guardianLabel) {
    if (prs.length === 0) {
        return `<div class="not-prose my-4 p-6 bg-light-bg bg-grid rounded-lg border border-ebony-clay-100 text-center text-chicago-500 italic">${escapeHtml(emptyMessage)}</div>`;
    }
    // No blank lines between cards — keeps the whole section as one HTML
    // block from the markdown parser's perspective.
    const cards = prs.map((pr) => {
        const guardian = guardianLabel ? findGuardian(pr, guardianLabel) : null;
        return `  ${renderPrCard(pr, excludedLabels, guardian)}`;
    }).join('\n');
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

    // Lifecycle labels are conveyed by the section itself — don't repeat as chips.
    const excludedLabels = new Set([config.testingLabel, config.inProgressLabel, config.completeLabel]);

    const summaryHtml = `<div class="not-prose my-6 grid grid-cols-1 sm:grid-cols-3 gap-3"><div class="p-4 rounded-lg border border-ebony-clay-100 bg-white text-center"><div class="text-3xl font-bold text-chicago-700">${needsValidation.length}</div><div class="text-xs text-chicago-500 mt-1 uppercase tracking-wide">Needs Validation</div></div><div class="p-4 rounded-lg border border-ebony-clay-100 bg-white text-center"><div class="text-3xl font-bold text-amber-600">${inProgress.length}</div><div class="text-xs text-chicago-500 mt-1 uppercase tracking-wide">In Progress</div></div><div class="p-4 rounded-lg border border-ebony-clay-100 bg-white text-center"><div class="text-3xl font-bold text-emerald-600">${complete.length}</div><div class="text-xs text-chicago-500 mt-1 uppercase tracking-wide">Complete</div></div></div>`;

    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const organisersYaml = config.organisers.map((o) => `    - ${o}`).join('\n');
    const rendered = renderTemplate(template, {
        version: config.releaseVersion,
        startDate: config.testingStart,
        endDate: config.testingEnd,
        organisersYaml,
        matrixLink: config.matrixLink,
        testServer: config.testServer,
        testingLabel: config.testingLabel,
        inProgressLabel: config.inProgressLabel,
        completeLabel: config.completeLabel,
        summaryHtml,
        needsValidationList: renderSection(needsValidation, 'No PRs currently waiting for validation. Check back soon!', excludedLabels, null),
        inProgressList: renderSection(inProgress, 'No PRs currently being tested.', excludedLabels, config.inProgressLabel),
        completeList: renderSection(complete, 'No PRs marked complete yet.', excludedLabels, config.completeLabel),
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
