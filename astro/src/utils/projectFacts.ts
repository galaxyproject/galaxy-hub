/**
 * Project facts read from a project's frontmatter (content/projects/<id>/main.md):
 * status, start and end dates, programme, grants, logos and related projects. Fields that are missing or
 * malformed stay undefined, so a page shows only what the content states.
 */
import { HTTP_SCHEMES, safeUrl } from './url';

export type ProjectStatus = 'active' | 'ended';

export interface ProjectGrant {
  label: string;
  id: string;
  url?: string;
}

/** Another project page this one builds on or continues in, shown in the facts box. */
export interface RelatedProject {
  label: string;
  name: string;
  href: string;
}

export interface ProjectLogo {
  src: string;
  alt: string;
}

export interface ProjectFacts {
  status?: ProjectStatus;
  start?: Date;
  end?: Date;
  /** Short labels after "Project" in the page eyebrow, e.g. EOSC, Horizon Europe. */
  labels: string[];
  programme?: string;
  call?: string;
  grants: ProjectGrant[];
  /** Logo with light lettering, for the dark project band. */
  logoOnDark?: string;
  fundingLogo?: ProjectLogo;
  related: RelatedProject[];
}

const STATUSES: ProjectStatus[] = ['active', 'ended'];

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function date(value: unknown): Date | undefined {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value;
  const raw = text(value);
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return undefined;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

/** Facts box hrefs: a site path (`/projects/esg/`) or an http(s) URL; other schemes and `//host` are dropped. */
function link(value: unknown): string | undefined {
  const raw = text(value);
  if (!raw) return undefined;
  if (raw.startsWith('/')) return raw.startsWith('//') || raw.startsWith('/\\') ? undefined : raw;
  return safeUrl(raw, HTTP_SCHEMES);
}

function grant(value: unknown): ProjectGrant | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const entry = value as Record<string, unknown>;
  const label = text(entry.label);
  const id = text(entry.id) ?? (typeof entry.id === 'number' ? String(entry.id) : undefined);
  if (!label || !id) return undefined;
  const url = link(entry.url);
  return url ? { label, id, url } : { label, id };
}

function related(value: unknown): RelatedProject | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const entry = value as Record<string, unknown>;
  const label = text(entry.label);
  const name = text(entry.name);
  const href = link(entry.href);
  return label && name && href ? { label, name, href } : undefined;
}

export function parseProjectFacts(data: Record<string, unknown>): ProjectFacts {
  const status = text(data.status) as ProjectStatus | undefined;
  const fundingLogo = text(data.funding_logo);
  return {
    status: status && STATUSES.includes(status) ? status : undefined,
    start: date(data.start_date),
    end: date(data.end_date),
    labels: Array.isArray(data.labels) ? data.labels.map(text).filter((l): l is string => !!l) : [],
    programme: text(data.programme),
    call: text(data.call),
    grants: Array.isArray(data.grants) ? data.grants.map(grant).filter((g): g is ProjectGrant => !!g) : [],
    logoOnDark: text(data.logo_on_dark),
    fundingLogo: fundingLogo ? { src: fundingLogo, alt: text(data.funding_logo_alt) ?? '' } : undefined,
    related: Array.isArray(data.related) ? data.related.map(related).filter((r): r is RelatedProject => !!r) : [],
  };
}

/** An explicit status wins; otherwise the project has ended once its end date has passed. */
export function projectHasEnded(facts: ProjectFacts, now: Date): boolean {
  if (facts.status) return facts.status === 'ended';
  if (!facts.end) return false;
  const lastDay = new Date(facts.end);
  lastDay.setUTCDate(lastDay.getUTCDate() + 1);
  return now >= lastDay;
}

function monthYear(value: Date, month: 'short' | 'long'): string {
  return value.toLocaleDateString('en-US', { month, year: 'numeric', timeZone: 'UTC' });
}

/** Status from the frontmatter, else from the end date; undefined when the content states neither. */
export function projectStatus(facts: ProjectFacts, now: Date): ProjectStatus | undefined {
  if (!facts.status && !facts.end) return undefined;
  return projectHasEnded(facts, now) ? 'ended' : 'active';
}

/** Badge text, or undefined when the status is unknown (no badge rather than a guess). */
export function statusBadgeLabel(facts: ProjectFacts, now: Date): string | undefined {
  const status = projectStatus(facts, now);
  if (status !== 'ended') return status === 'active' ? 'Active' : undefined;
  return facts.end ? `Ended · ${monthYear(facts.end, 'short')}` : 'Ended';
}

/** Start and end month, with the length in calendar months (both months included). */
export function projectDuration(facts: ProjectFacts): { short: string; long: string; months: number } | undefined {
  const { start, end } = facts;
  if (!start || !end) return undefined;
  const months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth()) + 1;
  return {
    short: `${monthYear(start, 'short')} – ${monthYear(end, 'short')}`,
    long: `${monthYear(start, 'long')} to ${monthYear(end, 'long')}`,
    months,
  };
}

export function countLabel(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`;
}
