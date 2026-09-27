/**
 * Scene data schema for the run window on /tools/agentic-stack/.
 *
 * One scene, two panes. Lines run strictly in order: `user`, `assistant`,
 * `tool`, `out` and `yaml` lines land in the agent transcript (left); `hist`
 * lines mutate the Galaxy history panel (right). The player animates them;
 * the server renders the same list reduced to its final state.
 */

/** Galaxy dataset states the panel shows; each always carries a text label. */
export type State = 'queued' | 'running' | 'ok';

export type Line =
  /** What the person types to the agent. */
  | { kind: 'user'; text: string }
  /** The agent's reply (streamed). */
  | { kind: 'assistant'; text: string }
  /** An MCP tool call card: name, optional args and result; `delay` ms until it resolves. */
  | { kind: 'tool'; name: string; args?: string; result?: string; delay?: number }
  /** Plain output line in the transcript. */
  | { kind: 'out'; text: string; tone?: 'plain' | 'dim' | 'ok'; delay?: number }
  /** A file card in the transcript whose lines appear one at a time. */
  | { kind: 'yaml'; file: string; lines: string[] }
  /** Right pane: the Custom Tools strip gains a tool. */
  | { kind: 'hist'; op: 'tool'; name: string; version: string }
  /** Right pane: prepend a history row (newest on top, as in Galaxy). */
  | { kind: 'hist'; op: 'add'; hid: number; name: string; state: State }
  /** Right pane: change a row's state; `note` extends the label; `hold` ms before the next line. */
  | { kind: 'hist'; op: 'state'; hid: number; state: State; note?: string; hold?: number }
  /** Right pane: a row gains a meta line (format, size). */
  | { kind: 'hist'; op: 'expand'; hid: number; meta: string }
  /** Right pane: a row opens its Job information card (the provenance <dl>). */
  | { kind: 'hist'; op: 'info'; hid: number; fields: Array<[string, string]> }
  /** Right pane: the footer actions go live. */
  | { kind: 'hist'; op: 'actions' }
  /** Hold for `ms` milliseconds. */
  | { kind: 'pause'; ms: number };

export type HistLine = Extract<Line, { kind: 'hist' }>;

export interface SeedRow {
  hid: number;
  name: string;
  format: string;
  state: 'ok';
}

export interface Scene {
  /** Window title, e.g. "agent · usegalaxy.org". */
  title: string;
  /** Galaxy server shown in the window title. */
  server: string;
  /** History name shown in the right pane header. */
  history: string;
  /** Datasets already in the history before the run. */
  seed: SeedRow[];
  lines: Line[];
  /** One-sentence description for assistive tech in place of the replay. */
  summary: string;
}

/** The right pane's state, derived by reducing `hist` lines in order. */
export interface HistRow {
  hid: number;
  name: string;
  state: State;
  /** Seed rows show their datatype in the label. */
  format?: string;
  /** Extends the state label, e.g. the container while running. */
  note?: string;
  meta?: string;
  info?: Array<[string, string]>;
}

export interface HistModel {
  tool?: { name: string; version: string };
  /** Newest first. */
  rows: HistRow[];
  actionsLive: boolean;
}
