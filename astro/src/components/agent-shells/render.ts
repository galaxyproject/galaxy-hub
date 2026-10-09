/**
 * Pure HTML renderers shared by the server (final state, no JS) and the
 * client player (animated replay). No DOM access here.
 */
import type { Line, Scene } from './types';
import { icons, svg } from '../../lib/icons';

export const SPIN_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** The string the player types for a typed line (masked for secrets). */
export function typedText(line: Line): string {
  switch (line.kind) {
    case 'field':
      return line.secret ? '•'.repeat(Math.min(line.value.length, 24)) : line.value;
    case 'cmd':
    case 'slash':
    case 'user':
    case 'assistant':
      return line.text;
    default:
      return '';
  }
}

/** Lines that are grouped into one dialog panel when adjacent. */
export function isDialogLine(line: Line): boolean {
  return line.kind === 'ui' || line.kind === 'field';
}

const TOOL_ICON = svg(icons.wrench);

/**
 * HTML for one line. With `final` the text is filled in and async states
 * (tool result, spinner) are resolved; otherwise typed text is left empty
 * for the player to fill.
 */
export function lineHtml(line: Line, scene: Scene, final: boolean): string {
  const tx = (s: string, tag = 'span') => `<${tag} class="tx">${final ? esc(s) : ''}</${tag}>`;
  switch (line.kind) {
    case 'cmd':
      return `<div class="ln ln-cmd"><span class="ps">${esc(line.prompt ?? scene.promptSymbol)}</span>${tx(line.text)}</div>`;
    case 'slash': {
      const prefix = scene.slashPrefix;
      const text = prefix && line.text.startsWith(prefix) ? line.text.slice(prefix.length) : line.text;
      return `<div class="ln ln-slash"><span class="ps">${esc(prefix)}</span>${tx(text)}</div>`;
    }
    case 'out':
      return `<div class="ln ln-out tone-${line.tone ?? 'plain'}">${esc(line.text)}</div>`;
    case 'ui': {
      const crumbs = line.text
        .split(/\s*[›>]\s*/)
        .filter(Boolean)
        .map((c) => `<span class="crumb">${esc(c)}</span>`)
        .join('<span class="crumb-sep" aria-hidden="true">›</span>');
      const detail = line.detail ? `<span class="ui-detail">${esc(line.detail)}</span>` : '';
      return `<div class="ln ln-ui"><span class="crumbs">${crumbs}</span>${detail}</div>`;
    }
    case 'field':
      return `<div class="ln ln-field"><span class="lbl">${esc(line.label)}</span><span class="inp">${tx(typedText(line))}</span></div>`;
    case 'user':
      return `<div class="ln ln-user"><div class="bubble">${tx(line.text)}</div></div>`;
    case 'tool': {
      const args = line.args ? `<span class="tool-args">${esc(line.args)}</span>` : '';
      const res = line.result ? `<div class="tool-res">${esc(line.result)}</div>` : '';
      return (
        `<div class="ln ln-tool${final ? ' is-done' : ''}"><div class="tool-hd"><span class="tool-ic">${TOOL_ICON}</span>` +
        `<span class="tool-name">${esc(line.name)}</span>${args}<span class="tool-st"><span class="ring" aria-hidden="true"></span><span class="ok">✓</span></span></div>${res}</div>`
      );
    }
    case 'assistant':
      return `<div class="ln ln-assistant"><span class="av" aria-hidden="true"></span>${tx(line.text, 'div')}</div>`;
    case 'spinner':
      return (
        `<div class="ln ln-spin${final ? ' is-done' : ''}"><span class="spin" aria-hidden="true">${final ? '✓' : SPIN_FRAMES[0]}</span>` +
        `<span class="tx">${esc(final ? line.done : line.text)}</span></div>`
      );
    default:
      return '';
  }
}

/** The body of a scene in its final state (what a no-JS or reduced-motion visitor sees). */
export function finalBodyHtml(scene: Scene): string {
  let parts: string[] = [];
  let dialog: string[] | null = null;
  const flush = () => {
    if (dialog) parts.push(`<div class="dlg">${dialog.join('')}</div>`);
    dialog = null;
  };
  for (const line of scene.lines) {
    if (line.kind === 'clear') {
      parts = [];
      dialog = null;
      continue;
    }
    if (line.kind === 'pause') continue;
    const html = lineHtml(line, scene, true);
    if (isDialogLine(line)) (dialog ??= []).push(html);
    else {
      flush();
      parts.push(html);
    }
  }
  flush();
  return parts.join('');
}

/** One-sentence description for assistive tech in place of the live replay. */
export function sceneSummary(scene: Scene): string {
  const firstUser = scene.lines.find((l) => l.kind === 'user');
  const tools = scene.lines.filter((l) => l.kind === 'tool').length;
  const ask = firstUser && firstUser.kind === 'user' ? ` Then the person asks: "${firstUser.text}"` : '';
  const calls = tools ? ` The agent answers after ${tools} Galaxy tool call${tools === 1 ? '' : 's'}.` : '';
  const what = scene.kind === 'desktop' ? 'the Galaxy MCP bundle' : 'the Galaxy plugins';
  return `Replay of installing ${what} into ${scene.name}.${ask}${calls}`;
}
