#!/usr/bin/env node
/**
 * Refresh the Release Guardians event for the cycle named in
 * `src/utils/release-guardians-config.ts`.
 *
 * Single point of GitHub interaction for the initiative. Fetches the labeled
 * PRs via GraphQL, computes ready-to-render data for each PR (filtered
 * labels, extracted tease, resolved Guardian), writes a per-cycle JSON
 * snapshot, writes the event MDX file that imports the snapshot + components,
 * and writes the stable redirect mapping.
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const REPO_ROOT = path.resolve(ASTRO_ROOT, '..');

const CONFIG_PATH = path.join(ASTRO_ROOT, 'src/utils/release-guardians-config.ts');
const TEMPLATE_PATH = path.join(ASTRO_ROOT, 'src/templates/release-guardians-event.md.template');
const EVENTS_DIR = path.join(REPO_ROOT, 'content/events');
const DATA_DIR = path.join(ASTRO_ROOT, 'src/data/release-guardians');
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
        meetingLink: pick('meetingLink'),
        meetingSchedule: pick('meetingSchedule'),
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

// Per-sentence markers — anything that signals markdown/HTML/link/image/ref
// inline. A sentence containing any of these is "dirty" and unprintable as
// plain text. Backticks (inline code like `data_collection`) are deliberately
// allowed through — they render as literal characters and remain readable.
const SENTENCE_DIRTY = /<[^>]+>|\[[^\]]*\]\(|!\[|\*\*|__|~~|#\d|(^|\s)@\w|https?:\/\//;

// A line that looks like a markdown block element (header / blockquote /
// list). Whole paragraphs containing any such line are skipped entirely.
const STRUCTURAL_LINE = /^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s)/;

/**
 * Walk the PR description for the first clean sentence (no markdown, HTML,
 * links, refs, or images) and use it as the starting point. Keep accumulating
 * subsequent clean sentences until either a dirty sentence is hit or word
 * count reaches TEASE_MAX_WORDS. Returns '' if no clean starting sentence.
 */
function extractPlainTease(body) {
    if (!body) return '';
    let stripped = body
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/```[\s\S]*?```/g, '');
    stripped = stripped
        .split('\n')
        .map((line) => {
            const t = line.trim();
            if (STRUCTURAL_LINE.test(t)) return '';
            if (/^\|.*\|$/.test(t)) return '';
            if (/^={3,}$|^-{3,}$/.test(t)) return '';
            return line;
        })
        .join('\n')
        .trim();
    if (!stripped) return '';

    const paragraphs = stripped.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    for (const paragraph of paragraphs) {
        const flat = paragraph.replace(/\s+/g, ' ').trim();
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

/** The actor who most recently applied the given label on this PR. */
function findGuardian(pr, label) {
    const events = pr.labelingEvents.filter((e) => e.label === label);
    if (events.length === 0) return null;
    events.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return events[0].actor;
}

/** Project a raw PR (from GraphQL) into the render-ready shape the component
 *  consumes. Drops labelingEvents from the output — they're machinery, not
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
    const dataPath = path.join(DATA_DIR, `${config.releaseVersion}.json`);

    const prs = await fetchPrs(config);
    const complete = prs ? prs.filter((p) => p.labels.includes(config.completeLabel)) : [];
    const inProgress = prs ? prs.filter((p) => p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel)) : [];
    const needsValidation = prs ? prs.filter((p) => !p.labels.includes(config.inProgressLabel) && !p.labels.includes(config.completeLabel)) : [];

    const excludedLabels = new Set([config.testingLabel, config.inProgressLabel, config.completeLabel]);

    // Pre-projected, render-ready snapshot. Component is pure presentation.
    const snapshot = {
        version: config.releaseVersion,
        fetchedAt: new Date().toISOString(),
        dataUnavailable: prs === null,
        config: {
            repo: config.repo,
            testServer: config.testServer,
            matrixLink: config.matrixLink,
            meetingLink: config.meetingLink,
            meetingSchedule: config.meetingSchedule,
            testingLabel: config.testingLabel,
            inProgressLabel: config.inProgressLabel,
            completeLabel: config.completeLabel,
        },
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
    console.log(`  PRs: ${needsValidation.length} need validation, ${inProgress.length} in progress, ${complete.length} complete${prs === null ? ' (data unavailable)' : ''}`);
    console.log(`✓ Redirect:        ${redirect.from} → ${redirect.to}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
