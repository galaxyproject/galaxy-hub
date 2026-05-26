/**
 * Single source of truth for the kind-driven color palette used across the
 * Release Guardians UI — overview tile numbers, Become-a-Guardian pills,
 * and per-card Guardian chips all read from here. Edit one entry to recolor
 * a state everywhere. Hex values mirror the actual GitHub label colors.
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
    text: 'text-yellow-400',
    pill: 'bg-yellow-400 text-gray-900 border-yellow-400',
  },
  complete: {
    text: 'text-green-700',
    pill: 'bg-green-700 text-white border-green-700',
  },
};
