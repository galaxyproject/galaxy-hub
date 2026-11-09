/**
 * Builds a news or event `index.md` from the post creator form and a GitHub
 * "new file" link that opens it prefilled, like galaxy-social's post creator.
 * Output must pass `make validate-metadata` (PyYAML + pykwalify) and content:lint.
 */
import slugify from '@sindresorhus/slugify';
import { subsites } from '../stores/subsiteStore';
import { SUBSITE_GROUPS } from './subsites';
import { formatDate } from './dateUtils';
import { normalizeSlugSegment } from '../build/slug-utils.mjs';
import { KNOWN_COMPONENTS, bodyHasComponents, normalizeBody } from '../build/normalize-transforms.mjs';

export type PostKind = 'news' | 'event';

export interface PostForm {
  kind: PostKind;
  title: string;
  /** Folder name after the date; derived from the title when empty. */
  slug: string;
  date: string;
  end: string;
  tease: string;
  tags: string[];
  subsites: string[];
  mainSubsite: string;
  /** News: contributions.authorship. Events: contributions.organisers. */
  authors: string[];
  funding: string[];
  externalUrl: string;
  continent: string;
  location: string;
  contact: string;
  body: string;
}

export const REPO_NEW_FILE_URL = 'https://github.com/galaxyproject/galaxy-hub/new/main';
export const REPO_FORK_URL = 'https://github.com/galaxyproject/galaxy-hub/fork';
export const GITHUB_USERNAME = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

/**
 * GitHub's upload page for the post folder, in the author's fork: GitHub disables uploads to a
 * repository without push access, even after forking, so first-time authors upload to their fork.
 * It works for a folder that does not exist yet, so index.md and its images go up in one commit.
 */
export function uploadPageUrl(form: PostForm, owner: string): string {
  const folder = postPath(form).replace(/\/index\.md$/, '');
  return `https://github.com/${encodeURIComponent(owner)}/galaxy-hub/upload/main/${folder.split('/').map(encodeURIComponent).join('/')}`;
}

/** A URL as a Markdown link target: brackets would end it early, so they are percent-encoded. */
export function markdownUrl(url: string): string {
  return url.replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/ /g, '%20');
}

// GitHub answers 414/500 somewhere between 6000 and 7000 characters (tested Nov 2026)
export const MAX_URL_LENGTH = 6000;

const GROUPS = ['all', ...Object.keys(SUBSITE_GROUPS)];

// Subsites the site renders, not the whole SUBSITES.yaml vocabulary (it still has legacy ids)
export const OFFERED_SUBSITES = [
  { id: 'all', name: 'All subsites' },
  { id: 'all-eu', name: 'All European subsites' },
  ...subsites.filter((s) => !('external' in s)).map(({ id, name }) => ({ id, name })),
  { id: 'esg', name: 'EuroScienceGateway' },
];

export const CONTINENTS = [
  { id: 'GL', name: 'Global / online' },
  { id: 'AF', name: 'Africa' },
  { id: 'AS', name: 'Asia' },
  { id: 'AU', name: 'Australia / Oceania' },
  { id: 'EU', name: 'Europe' },
  { id: 'NA', name: 'North America' },
  { id: 'SA', name: 'South America' },
];

export function emptyForm(kind: PostKind, today: string): PostForm {
  return {
    kind,
    title: '',
    slug: '',
    date: today,
    end: '',
    tease: '',
    tags: [],
    subsites: [],
    mainSubsite: '',
    authors: [],
    funding: [],
    externalUrl: '',
    continent: '',
    location: '',
    contact: '',
    body: '',
  };
}

// shortcut: first 7 words keep folder names readable; authors can edit the slug
// The build renames folders with normalizeSlugSegment (slug-utils.mjs, plus its overrides), so a
// folder name must already be in that form or content:lint fails. slugify's camelCase split
// ("RNAseq" to "rn-aseq") does not match it, so it is turned off.
const toSlug = (text: string) => normalizeSlugSegment(slugify(text, { decamelize: false }));

export function slugFromTitle(title: string): string {
  return toSlug(title).split('-').filter(Boolean).slice(0, 7).join('-');
}

export function postPath(form: PostForm): string {
  const folder = `${form.date}-${toSlug(form.slug) || slugFromTitle(form.title) || 'my-post'}`;
  return form.kind === 'news'
    ? `content/news/${form.date.slice(0, 4)}/${folder}/index.md`
    : `content/events/${folder}/index.md`;
}

/** Single-quoted YAML scalar: PyYAML reads it as a string whatever it looks like (dates, `yes`, `a: b`). */
function quote(value: string): string {
  return `'${value.replace(/\s+/g, ' ').trim().replace(/'/g, "''")}'`;
}

function frontmatterLines(form: PostForm, components: boolean): string[] {
  const lines = [`title: ${quote(form.title)}`, `date: ${quote(form.date)}`];
  const event = form.kind === 'event';
  const add = (key: string, value: string) => value.trim() && lines.push(`${key}: ${quote(value)}`);
  const list = (key: string, values: string[]) =>
    values.length && lines.push(`${key}: [${values.map(quote).join(', ')}]`);

  if (event) add('end', form.end);
  add('tease', form.tease);
  if (event) {
    add('continent', form.continent);
    if (form.location.trim()) lines.push('location:', `  name: ${quote(form.location)}`);
    add('contact', form.contact);
  }
  add('external_url', form.externalUrl);
  list('tags', form.tags);
  list('subsites', form.subsites);
  add('main_subsite', form.mainSubsite);
  // Same rule as content:lint, so the flag never disagrees with the check
  if (components) lines.push('components: true');
  if (form.authors.length || form.funding.length) {
    lines.push('contributions:');
    for (const [role, ids] of [
      [event ? 'organisers' : 'authorship', form.authors],
      ['funding', form.funding],
    ] as const) {
      if (ids.length) lines.push(`  ${role}:`, ...ids.map((id) => `    - ${quote(id)}`));
    }
  }
  return lines;
}

/** The file to commit. The body goes through the content:lint transforms, so the check passes as is. */
export function buildPost(form: PostForm, body = form.body): string {
  const normalized = normalizeBody(form.body);
  // The flag follows the real text, also when `body` is the paste placeholder of a long post
  const lines = frontmatterLines(form, bodyHasComponents(normalized));
  const text = (body === form.body ? normalized : normalizeBody(body)).trim();
  return `---\n${lines.join('\n')}\n---\n${text ? `\n${text}\n` : ''}`;
}

// Browsers send `'` as %27; encode it here so the length check measures the real URL
const encode = (value: string) => encodeURIComponent(value).replace(/'/g, '%27');

function newFileUrl(path: string, value: string): string {
  return `${REPO_NEW_FILE_URL}?filename=${encode(path)}&value=${encode(value)}`;
}

/** `complete` is false when the text was too long for a link and only the frontmatter was sent. */
export function githubLink(form: PostForm, file = buildPost(form)): { url: string; complete: boolean } {
  const path = postPath(form);
  const url = newFileUrl(path, file);
  if (url.length <= MAX_URL_LENGTH) return { url, complete: true };
  return { url: newFileUrl(path, buildPost(form, 'Paste your text here.')), complete: false };
}

/** Same expansion as `expand_subsite_ids` in scripts/validate_common.py. */
export function mainSubsiteChoices(selected: string[]): string[] {
  const covered = new Set(selected.flatMap((id) => SUBSITE_GROUPS[id] ?? [id]));
  return OFFERED_SUBSITES.map((s) => s.id).filter(
    (id) => !GROUPS.includes(id) && (selected.includes('all') || covered.has(id))
  );
}

export interface Known {
  tags: string[];
  people: string[];
  funders: string[];
}

/** Values typed in the form that are not in the Hub's lists yet; the metadata check fails until they are added. */
export function newEntries(form: PostForm, known: Known): Known {
  const missing = (values: string[], list: string[]) => values.filter((value) => !list.includes(value));
  return {
    tags: missing(form.tags, known.tags),
    people: missing(form.authors, known.people),
    funders: missing(form.funding, known.funders),
  };
}

// `make validate-metadata` runs the stricter checks for items dated after this (Makefile --be-strict-from)
export const STRICT_FROM = '2026-02-24';

export const TITLE_PROBLEM = 'Add a title.';
export const DATE_PROBLEM = 'Add a date.';

export function postProblems(form: PostForm): string[] {
  const problems: string[] = [];
  const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!form.title.trim()) problems.push(TITLE_PROBLEM);
  if (!isDate(form.date)) problems.push(DATE_PROBLEM);
  if (form.kind === 'event' && form.end && (!isDate(form.end) || form.end < form.date))
    problems.push('The end date must be on or after the start date.');
  // Same rule as check_recent_contributions_required in scripts/validate_events.py
  if (form.kind === 'event' && form.date > STRICT_FROM && !form.authors.length && !form.funding.length)
    problems.push('Add at least one organiser or funder: the checks require them for events.');
  if (form.mainSubsite && !mainSubsiteChoices(form.subsites).includes(form.mainSubsite))
    problems.push('The main subsite must be one of the chosen subsites.');
  return problems;
}

/** True when the text uses a Hub component; the file then needs `components: true` (the content:lint rule). */
export function usesComponents(body: string): boolean {
  return bodyHasComponents(normalizeBody(body));
}

export type MediaKind = 'image' | 'video' | 'file';

// Only what the build publishes: copyAssets copies, and processImagePaths rewrites, just these types
const PUBLISHED = { image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'], video: ['mp4', 'webm'], file: ['pdf'] };
export const PUBLISHED_TYPES = Object.values(PUBLISHED).flat();

/** What a file in the post folder is, or null when the Hub would not publish it. */
export function mediaKind(name: string): MediaKind | null {
  const ext = name.split('.').at(-1)?.toLowerCase() ?? '';
  const kind = (Object.keys(PUBLISHED) as MediaKind[]).find((k) => PUBLISHED[k].includes(ext));
  return kind ?? null;
}

/** Lowercase, hyphenated file name (content:lint rejects new uppercase asset names), unique in the post folder. */
export function mediaName(fileName: string, taken: string[]): string {
  const dot = fileName.lastIndexOf('.');
  const ext =
    dot > 0
      ? fileName
          .slice(dot + 1)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')
      : '';
  const base = slugify(dot > 0 ? fileName.slice(0, dot) : fileName, { decamelize: false }) || 'file';
  const name = (suffix: string) => (ext ? `${base}${suffix}.${ext}` : `${base}${suffix}`);
  let i = 1;
  while (taken.includes(name(i === 1 ? '' : `-${i}`))) i++;
  return name(i === 1 ? '' : `-${i}`);
}

export type ImageSize = 'full' | 'medium' | 'small';
export const IMAGE_WIDTHS: Record<Exclude<ImageSize, 'full'>, number> = { medium: 600, small: 300 };

export interface MediaOptions {
  alt?: string;
  caption?: string;
  size?: ImageSize;
}

// Text inside HTML: also escape braces, which MDX would run as code
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');

/**
 * The text that shows a file from the post folder. A plain image is Markdown; a sized or captioned
 * one is a <figure> written the way content:lint wants it (self-closed, quoted numbers). Videos are
 * a <video> element and PDFs a link.
 */
export function mediaMarkdown(name: string, options: MediaOptions = {}): string {
  const { alt = '', caption = '', size = 'full' } = options;
  const kind = mediaKind(name);
  // A plain <video>: the build rewrites its src to /images/<slug>/ (processImagePaths) but not the
  // VideoPlayer component's, which would 404
  if (kind === 'video') return `<video controls src="./${name}"></video>`;
  if (kind !== 'image') return `[${alt.trim().replace(/[[\]]/g, '') || name}](./${name})`;
  if (size === 'full' && !caption.trim()) return `![${alt.replace(/[[\]]/g, '')}](./${name})`;
  const width = size === 'full' ? '' : ` width="${IMAGE_WIDTHS[size]}"`;
  const lines = ['<figure>', `  <img src="./${name}" alt="${escapeHtml(alt.trim())}"${width} />`];
  if (caption.trim()) lines.push(`  <figcaption>${escapeHtml(caption.trim())}</figcaption>`);
  return [...lines, '</figure>'].join('\n');
}

export interface Embed {
  kind: 'youtube' | 'mastodon' | 'calendar';
  text: string;
}

/** Turns a pasted link into the embed code Hub posts use, or null when the site cannot embed it. */
export function embedFor(link: string): Embed | null {
  if (!URL.canParse(link.trim())) return null;
  const url = new URL(link.trim());
  const host = url.hostname.replace(/^(www|m)\./, '');
  const youtubeId =
    host === 'youtu.be'
      ? url.pathname.slice(1)
      : host === 'youtube.com' || host === 'youtube-nocookie.com'
        ? (url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1])
        : undefined;
  if (youtubeId && /^[\w-]{6,}$/.test(youtubeId)) {
    // Same code as YouTube's own "Embed" button, on the privacy-enhanced domain
    return {
      kind: 'youtube',
      text: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${youtubeId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    };
  }
  if (/^\/@[\w.-]+(@[\w.-]+)?\/\d+\/?$/.test(url.pathname)) {
    return { kind: 'mastodon', text: `<Mastodon url="${url.href}" />` };
  }
  if (host === 'calendar.google.com' && url.pathname.startsWith('/calendar/embed')) {
    return {
      kind: 'calendar',
      text: `<iframe src="${escapeHtml(url.href)}" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>`,
    };
  }
  return null;
}

interface MdxNode {
  type: string;
  name?: string | null;
  value?: string;
  position?: { start: { line: number } };
  children?: MdxNode[];
}

/** Plain-words version of the MDX parser's message for the mistakes authors make most. */
function explainMdxError(reason: string): string {
  if (/`!` \(U\+0021\) before name/.test(reason))
    return 'HTML comments (<!-- -->) break pages with components. Use {/* your note */} instead.';
  if (/before name/.test(reason)) return 'A “<” here starts a tag. Write &lt; instead, or put the text in `backticks`.';
  const tag = reason.match(/closing tag for `(<[^`]*>)`/);
  if (tag?.[1] === '<>') return '“<>” looks like a tag. Write &lt;&gt; instead.';
  if (tag) return `${tag[1]} needs a closing tag, or write it as self-closing (for example <br />).`;
  if (/expression|acorn|`\{`|`\}`/i.test(reason))
    return 'Curly braces { } run code in pages with components. Write \\{ and \\} to show them as text.';
  return reason;
}

/**
 * Pages that use a component are built as MDX, which rejects some ordinary text. This runs the
 * text the form will commit through MDX's own parser (with GFM, as Astro does) and reports build
 * errors by line. It also flags what parses but fails when the page renders: `{…}` expressions
 * and capitalised tags that are not Hub components. Empty when the page is plain Markdown.
 */
export async function mdxProblems(body: string): Promise<string[]> {
  const text = normalizeBody(body);
  if (!bodyHasComponents(text)) return [];
  const [{ createProcessor }, { default: remarkGfm }] = await Promise.all([
    import('@mdx-js/mdx'),
    import('remark-gfm'),
  ]);
  let tree: MdxNode;
  try {
    tree = createProcessor({ remarkPlugins: [remarkGfm] }).parse(text) as MdxNode;
  } catch (error) {
    const { line, reason, message } = error as { line?: number; reason?: string; message?: string };
    const explained = explainMdxError(reason ?? message ?? String(error));
    return [line ? `Line ${line}: ${explained}` : explained];
  }
  const problems: string[] = [];
  const at = (node: MdxNode) => (node.position ? `Line ${node.position.start.line}: ` : '');
  const walk = (node: MdxNode) => {
    if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
      // {/* … */} comments are removed by the build (preprocess.mjs JSX_COMMENT_RE)
      if (!/^\s*\/\*[\s\S]*\*\/\s*$/.test(node.value ?? '')) problems.push(at(node) + explainMdxError('expression'));
    }
    if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name) {
      if (/^[A-Z]/.test(node.name) && !KNOWN_COMPONENTS.includes(node.name))
        problems.push(
          `${at(node)}<${node.name}> is not a Hub component. Check the spelling, or write HTML tags in lowercase.`
        );
    }
    node.children?.forEach(walk);
  };
  walk(tree);
  return problems;
}

export interface Outline {
  label: string;
  text: string;
}

/** Starting points for common posts; plain Markdown, so they never switch a page to MDX. */
export const OUTLINES: Record<PostKind, Outline[]> = {
  news: [
    {
      label: 'Event recap',
      text: `Write one or two sentences: what happened, when, where and who took part.

## What we did

- First session or activity
- Second session or activity

## Highlights

What went well, what people learned, a quote from a participant.

## Thank you

Thank the organisers, speakers, hosts and funders.

## Learn more

- [Slides or recordings](https://)
- [Related training on the GTN](https://training.galaxyproject.org/)`,
    },
    {
      label: 'New tool or feature',
      text: `Say in one or two sentences what is new and who it helps.

## What it does

## Try it

Open it on [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org](https://usegalaxy.org) or [usegalaxy.org.au](https://usegalaxy.org.au).

## Learn more

- [Tutorial on the GTN](https://training.galaxyproject.org/)`,
    },
    {
      label: 'Paper or publication',
      text: `Say in one or two sentences what the paper shows and why it matters.

**Paper:** Authors (year). [Title](https://doi.org/). Journal.

## What the authors did

## How Galaxy helped

## Learn more`,
    },
    {
      label: 'Announcement',
      text: `Say what is happening and why it matters, in one or two sentences.

## Details

## How to take part`,
    },
  ],
  event: [
    {
      label: 'Training or workshop',
      text: `Say who the training is for and what people will learn, in one or two sentences.

## Programme

- Day 1:
- Day 2:

## Before you join

What participants need: a laptop, a free account on [usegalaxy.eu](https://usegalaxy.eu) or [usegalaxy.org](https://usegalaxy.org), any prior knowledge.

## Registration

[Register here](https://) before the deadline.

## Organisers`,
    },
    {
      label: 'Webinar or talk',
      text: `Say what the talk is about and who is speaking, in one or two sentences.

## Speaker

## How to join

[Join the online meeting](https://). It works from any browser.

## Recording

Say whether the session will be recorded.`,
    },
    {
      label: 'Hackathon or community meeting',
      text: `Say what the group will work on and who can join, in one or two sentences.

## Goals

-

## Schedule

## How to join`,
    },
  ],
};

/** Address of the published page, or of the external site when the post links out. */
export function postLink(form: PostForm): string {
  if (form.externalUrl.trim()) return form.externalUrl.trim();
  const folder = postPath(form).split('/').at(-2);
  return `https://galaxyproject.org/${form.kind === 'news' ? 'news' : 'events'}/${folder}/`;
}

// Bluesky's limit; Mastodon allows 500 and LinkedIn far more
export const BLUESKY_LIMIT = 300;

/**
 * The text the galaxy-social-assistant posts for this item, built with the formats from its
 * config.yml (usegalaxy-eu/galaxy-social-assistant). It skips items with neither `subsites` nor
 * `main_subsite`. Images from the post are attached separately and do not count.
 */
export function socialPost(form: PostForm): { text: string; length: number; posted: boolean } {
  const link = postLink(form);
  const tease = form.tease.replace(/\s+/g, ' ').trim();
  const raw =
    form.kind === 'news'
      ? `${tease}\n${link}`
      : `📣 ${form.title.trim()}\n\n${tease}\n\n📍 ${form.location.trim()}\n📅 ${formatDate(form.date, { short: false, locale: 'en-GB' })}\n🔗 More info & registration: ${link}`;
  const text = raw.replace(/\n{3,}/g, '\n\n').trim();
  const length = [...new Intl.Segmenter().segment(text)].length;
  return { text, length, posted: form.subsites.length > 0 || Boolean(form.mainSubsite) };
}

/** Link texts whose address is still the empty `https://` left by an outline or the link button. */
export function placeholderLinks(body: string): string[] {
  return [...body.matchAll(/\[([^\]]*)\]\(https?:\/\/\)/g)].map((match) => match[1]);
}
