/**
 * Pure HTML renderers for the run window, shared by the server (final state,
 * no JS) and the client player (animated replay). No DOM access here.
 *
 * Transcript lines whose markup matches the agent shells (user, assistant,
 * tool, out) reuse that renderer; the YAML card and the Galaxy history panel
 * are new here.
 */
import type { Line as ShellLine, Scene as ShellScene } from '../agent-shells/types';
import { esc, lineHtml as shellLineHtml } from '../agent-shells/render';
import type { HistLine, HistModel, HistRow, Line, Scene } from './types';

/** The empty transcript's blinking prompt, shown until the run starts. */
export const PROMPT_HTML =
  '<div class="ln ln-prompt" aria-hidden="true"><span class="ps">›</span><span class="caret"></span></div>';

/** Just enough scene for the shared renderer; the reused line kinds never read it. */
const SHELL = { promptSymbol: '›', slashPrefix: '' } as ShellScene;

export type LeftLine = Extract<Line, { kind: 'user' | 'assistant' | 'tool' | 'out' | 'yaml' }>;

export function isLeft(line: Line): line is LeftLine {
  return (
    line.kind === 'user' ||
    line.kind === 'assistant' ||
    line.kind === 'tool' ||
    line.kind === 'out' ||
    line.kind === 'yaml'
  );
}

/** One YAML card line, with the key set off from its value. */
export function yamlLineHtml(text: string): string {
  const m = /^([A-Za-z_]+):(\s|$)/.exec(text);
  if (!m) return `<div class="yl">${esc(text)}</div>`;
  return `<div class="yl"><span class="yk">${esc(m[1])}</span>:${esc(text.slice(m[1].length + 1))}</div>`;
}

/**
 * HTML for one transcript line. With `final` the text is filled in and async
 * states resolved; otherwise typed text and card lines are left empty for
 * the player to fill.
 */
export function leftLineHtml(line: LeftLine, final: boolean): string {
  if (line.kind === 'yaml') {
    const body = final ? line.lines.map(yamlLineHtml).join('') : '';
    return `<div class="ln ln-yaml"><div class="yaml-hd">${esc(line.file)}</div><div class="yaml-body">${body}</div></div>`;
  }
  return shellLineHtml(line as ShellLine, SHELL, final);
}

/** The text label a row shows next to its state stripe; never colour alone. */
export function stateLabel(row: HistRow): string {
  if (row.format) return `${row.format} · ${row.state}`;
  return row.note ? `${row.state} · ${row.note}` : row.state;
}

export function stripHtml(tool?: { name: string; version: string }): string {
  const val = tool ? `${esc(tool.name)} · ${esc(tool.version)}` : 'none';
  return `<span class="gx-strip__lbl">Custom Tools</span><span class="gx-strip__sep" aria-hidden="true">·</span><span class="gx-strip__val">${val}</span>`;
}

export function pairHtml([dt, dd]: [string, string]): string {
  return `<div class="gx-pair"><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`;
}

/** The Job information card; with `final` every pair is present. */
export function infoHtml(fields: Array<[string, string]>, final: boolean): string {
  const pairs = final ? fields.map(pairHtml).join('') : '';
  return `<div class="gx-info"><div class="gx-info__hd">Job information</div><dl>${pairs}</dl></div>`;
}

export function histRowHtml(row: HistRow): string {
  const meta = row.meta ? `<span class="gx-meta">${esc(row.meta)}</span>` : '';
  const info = row.info ? infoHtml(row.info, true) : '';
  return (
    `<div class="gx-row" data-hid="${row.hid}" data-state="${row.state}"><span class="gx-bar" aria-hidden="true"></span>` +
    `<span class="gx-hid">${row.hid}:</span><span class="gx-name">${esc(row.name)}</span>` +
    `<span class="gx-state">${esc(stateLabel(row))}</span>${meta}${info}</div>`
  );
}

/** The right pane before the run: the seed datasets only. */
export function initialHist(scene: Scene): HistModel {
  return {
    rows: scene.seed.map((s) => ({ hid: s.hid, name: s.name, format: s.format, state: s.state })),
    actionsLive: false,
  };
}

/** Apply one history operation to the model (rows stay newest first). */
export function applyHist(model: HistModel, line: HistLine): void {
  switch (line.op) {
    case 'tool':
      model.tool = { name: line.name, version: line.version };
      return;
    case 'add':
      model.rows.unshift({ hid: line.hid, name: line.name, state: line.state });
      return;
    case 'actions':
      model.actionsLive = true;
      return;
  }
  const row = model.rows.find((r) => r.hid === line.hid);
  if (!row) return;
  if (line.op === 'state') {
    row.state = line.state;
    row.note = line.note;
  } else if (line.op === 'expand') row.meta = line.meta;
  else if (line.op === 'info') row.info = line.fields;
}

/** The right pane after the run. */
export function finalHist(scene: Scene): HistModel {
  const model = initialHist(scene);
  for (const line of scene.lines) if (line.kind === 'hist') applyHist(model, line);
  return model;
}

export function rowsHtml(model: HistModel): string {
  return model.rows.map(histRowHtml).join('');
}

/** The transcript in its final state (what a no-JS or reduced-motion visitor sees). */
export function finalLeftHtml(scene: Scene): string {
  return scene.lines
    .filter(isLeft)
    .map((l) => leftLineHtml(l, true))
    .join('');
}

/** The history list in its final state. */
export function finalRightHtml(scene: Scene): string {
  return rowsHtml(finalHist(scene));
}
