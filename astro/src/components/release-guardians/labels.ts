/**
 * Per-phase label text for the Release Guardians UI. The active page speaks in
 * the present tense (a to-do board); once the testing window closes the same
 * three buckets read as a historical record. Centralised here so `Summary`
 * (tile) and `Section` (empty-bucket message) stay in sync — edit one string,
 * it moves everywhere.
 *
 * Section *headings* are NOT covered here: they carry `id` anchors and
 * `<Icon>` children that a plain string can't express, so they're hardcoded
 * per phase directly in the event template/content file instead.
 */

import type { SnapshotKind } from './data';

export interface KindLabels {
  /** Short label for the Summary tile. */
  tile: string;
  /** Empty-bucket message. */
  empty: string;
}

export type Phase = 'active' | 'closed';

/**
 * Resolve the page phase from the testing window's end date versus the build
 * time. Returns 'closed' once `endDate` has passed. Invalid/missing dates
 * default to 'active' so a misconfigured cycle never silently freezes the
 * recruitment page. Centralised so Phase, Summary, and Section agree.
 *
 * Deliberately NOT `isPublishedDate` (astro/src/utils/dateUtils.ts): that
 * helper does `d <= now` against a raw instant, which would close the page
 * at 00:00 UTC on `endDate` — cutting off testers on the window's last day.
 * This pads to end-of-day UTC so the window stays open through all of
 * `endDate`, matching how the testing window is actually communicated
 * (e.g. "2026-06-01 → 2026-06-05" means testing runs through June 5).
 */
export function phaseFor(endDate: string | undefined, now: number = Date.now()): Phase {
  if (!endDate) return 'active';
  const end = new Date(`${endDate}T23:59:59Z`);
  if (Number.isNaN(end.getTime())) return 'active';
  return end.getTime() < now ? 'closed' : 'active';
}

export const LABELS: Record<Phase, Record<SnapshotKind, KindLabels>> = {
  active: {
    needsValidation: {
      tile: 'Needs Validation',
      empty: 'No PRs currently need validation.',
    },
    inProgress: {
      tile: 'In Progress',
      empty: 'No PRs currently in progress.',
    },
    complete: {
      tile: 'Complete',
      empty: 'No PRs marked complete yet.',
    },
  },
  closed: {
    needsValidation: {
      tile: 'Not tested',
      empty: 'No PRs went untested.',
    },
    inProgress: {
      tile: 'Attempted',
      empty: 'No validation was left unfinished.',
    },
    complete: {
      tile: 'Validated',
      empty: 'No PRs were validated.',
    },
  },
};
