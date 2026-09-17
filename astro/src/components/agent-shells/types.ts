/**
 * Scene data schema for the animated "agent shells" on /tools/ai-agents/.
 *
 * A Scene is a scripted replay of installing the Galaxy plugins into one
 * harness and then talking to Galaxy through it. The player types `cmd`,
 * `user` and `assistant` lines character by character and prints the rest
 * instantly, honouring `delay`/`pause` for pacing.
 */

export type HarnessId = 'claude-code' | 'claude-desktop' | 'codex' | 'cursor' | 'antigravity' | 'pi';

/** How the window chrome should look. */
export type ShellKind =
  /** Dark terminal: title bar, monospace body, prompt symbol. */
  | 'terminal'
  /** Light desktop chat window (Claude Desktop): dialog + chat bubbles. */
  | 'desktop'
  /** IDE-style window (Cursor): slim sidebar + agent chat pane. */
  | 'ide';

export type Line =
  /** A shell command typed by the user at `promptSymbol` (or `prompt` override). */
  | { kind: 'cmd'; text: string; prompt?: string }
  /** A slash/skill command typed inside the harness REPL (e.g. `/plugin install …`). */
  | { kind: 'slash'; text: string }
  /** Output printed instantly. `tone` picks the colour. */
  | { kind: 'out'; text: string; tone?: 'plain' | 'dim' | 'ok' | 'warn' | 'accent'; delay?: number }
  /** A UI step for non-terminal shells: breadcrumb or dialog row, e.g. "Settings › Extensions › Install Extension…". */
  | { kind: 'ui'; text: string; detail?: string }
  /** A form-like row inside a dialog: label + value (value is typed). */
  | { kind: 'field'; label: string; value: string; secret?: boolean }
  /** A message from the person to the agent (typed). */
  | { kind: 'user'; text: string }
  /** A tool call card: MCP tool name, optional args and result summary. */
  | { kind: 'tool'; name: string; args?: string; result?: string; delay?: number }
  /** The agent's reply (streamed). */
  | { kind: 'assistant'; text: string }
  /** Progress spinner row that resolves to `done` text after `ms`. */
  | { kind: 'spinner'; text: string; done: string; ms: number }
  /** Hold for `ms` milliseconds. */
  | { kind: 'pause'; ms: number }
  /** Clear the window body (e.g. when a new session starts). */
  | { kind: 'clear' };

export interface Scene {
  id: HarnessId;
  /** Display name, e.g. "Claude Code". */
  name: string;
  /** One line under the tab, e.g. "Plugin marketplace, prompts for URL + key". */
  tagline: string;
  /** Link to the setup guide, e.g. "/tools/ai-agents/claude-code/". */
  href: string;
  /** Accent colour (hex) used for the tab underline, prompt and tool cards. */
  accent: string;
  /** Short monogram for the tab chip, 1–2 characters, e.g. "CC", "Cx". */
  monogram: string;
  kind: ShellKind;
  /** Window title, e.g. "claude — ~/analysis". */
  title: string;
  /** Prompt symbol for `cmd` lines, e.g. "$", "❯", "›". */
  promptSymbol: string;
  /** Prefix shown before slash/skill commands, e.g. "/" or "$". */
  slashPrefix: string;
  /** The exact install block for the Copy button (plain text, newline separated). */
  copy: string;
  /** Total scripted lines; the player will loop to the next scene when done. */
  lines: Line[];
}
