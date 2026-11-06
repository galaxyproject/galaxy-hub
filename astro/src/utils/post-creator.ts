/**
 * Builds a news or event `index.md` from the post creator form and a GitHub
 * "new file" link that opens it prefilled, like galaxy-social's post creator.
 * Output must pass `make validate-metadata` (PyYAML + pykwalify) and content:lint.
 */
import slugify from '@sindresorhus/slugify';
import { subsites } from '../stores/subsiteStore';
import { SUBSITE_GROUPS } from './subsites';

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
export function slugFromTitle(title: string): string {
  return slugify(title).split('-').filter(Boolean).slice(0, 7).join('-');
}

export function postPath(form: PostForm): string {
  const folder = `${form.date}-${slugify(form.slug) || slugFromTitle(form.title) || 'my-post'}`;
  return form.kind === 'news'
    ? `content/news/${form.date.slice(0, 4)}/${folder}/index.md`
    : `content/events/${folder}/index.md`;
}

/** Single-quoted YAML scalar: PyYAML reads it as a string whatever it looks like (dates, `yes`, `a: b`). */
function quote(value: string): string {
  return `'${value.replace(/\s+/g, ' ').trim().replace(/'/g, "''")}'`;
}

function frontmatterLines(form: PostForm): string[] {
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

export function buildPost(form: PostForm, body = form.body): string {
  const text = body.trim();
  return `---\n${frontmatterLines(form).join('\n')}\n---\n${text ? `\n${text}\n` : ''}`;
}

// Browsers send `'` as %27; encode it here so the length check measures the real URL
const encode = (value: string) => encodeURIComponent(value).replace(/'/g, '%27');

function newFileUrl(path: string, value: string): string {
  return `${REPO_NEW_FILE_URL}?filename=${encode(path)}&value=${encode(value)}`;
}

/** `complete` is false when the text was too long for a link and only the frontmatter was sent. */
export function githubLink(form: PostForm): { url: string; complete: boolean } {
  const path = postPath(form);
  const url = newFileUrl(path, buildPost(form));
  if (url.length <= MAX_URL_LENGTH) return { url, complete: true };
  return { url: newFileUrl(path, buildPost(form, '<!-- Paste your text here -->')), complete: false };
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

export function postProblems(form: PostForm): string[] {
  const problems: string[] = [];
  const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!form.title.trim()) problems.push('Add a title.');
  if (!isDate(form.date)) problems.push('Add a date.');
  if (form.kind === 'event' && form.end && (!isDate(form.end) || form.end < form.date))
    problems.push('The end date must be on or after the start date.');
  if (form.mainSubsite && !mainSubsiteChoices(form.subsites).includes(form.mainSubsite))
    problems.push('The main subsite must be one of the chosen subsites.');
  return problems;
}
