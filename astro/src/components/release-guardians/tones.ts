/**
 * Single source of truth for the kind-driven color palette used across the
 * Release Guardians UI — overview tile numbers, Become-a-Guardian pills,
 * and per-card Guardian chips all read from here. Edit one entry to recolor
 * a state everywhere.
 */

import type { SnapshotKind } from './data';

export interface Tone {
  /** Text color for large standalone numbers (Summary tiles). */
  text: string;
  /** Combined bg + text + border classes for chips and pills. */
  pill: string;
}

export const TONES: Record<SnapshotKind, Tone> = {
  needsValidation: {
    text: 'text-chicago-700',
    pill: 'bg-ebony-clay-50 text-chicago-700 border-ebony-clay-100',
  },
  inProgress: {
    text: 'text-amber-600',
    pill: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  complete: {
    text: 'text-emerald-600',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};
