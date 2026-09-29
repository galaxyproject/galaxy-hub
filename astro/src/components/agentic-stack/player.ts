/**
 * Client runtime for the run window: replays the scene once into the two
 * panes (agent transcript on the left, Galaxy history on the right), drives
 * the progress line and the Pause/Replay controls, and stops at the end on
 * the provenance card. No tabs, no loop.
 */
import type { HistLine, Line, Scene } from './types';
import {
  finalHist,
  finalLeftHtml,
  histRowHtml,
  infoHtml,
  initialHist,
  leftLineHtml,
  pairHtml,
  PROMPT_HTML,
  rowsHtml,
  stateLabel,
  stripHtml,
  yamlLineHtml,
} from './render';

const TYPE_MS = 35;
const STREAM_MS = 12;
const STREAM_LEAD_MS = 360;
const GAP_MS = 140;
const ENTER_MS = 260;
const TOOL_MS = 900;
const YAML_LINE_MS = 260;
const YAML_TAIL_MS = 600;
const HIST_MS = 320;
const INFO_PAIR_MS = 120;
const INFO_TAIL_MS = 1200;

/** Rough duration of a line, used to pace the progress bar. */
export function lineMs(line: Line): number {
  switch (line.kind) {
    case 'user':
      return line.text.length * TYPE_MS + ENTER_MS + GAP_MS;
    case 'assistant':
      return line.text.length * STREAM_MS + STREAM_LEAD_MS + ENTER_MS + GAP_MS;
    case 'tool':
      return (line.delay ?? TOOL_MS) + GAP_MS;
    case 'out':
      return (line.delay ?? 0) + GAP_MS;
    case 'yaml':
      return line.lines.length * YAML_LINE_MS + YAML_TAIL_MS;
    case 'hist':
      if (line.op === 'state') return HIST_MS + (line.hold ?? 0);
      if (line.op === 'info') return line.fields.length * INFO_PAIR_MS + INFO_TAIL_MS;
      return HIST_MS;
    case 'pause':
      return line.ms;
    default:
      return 0;
  }
}

function q<T extends Element>(root: Element, sel: string): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`agentic-stack: missing ${sel}`);
  return el;
}

function nodeFrom(html: string): HTMLElement {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content.firstElementChild as HTMLElement;
}

export function mountAgenticStack(root: HTMLElement, scene: Scene): () => void {
  if (root.dataset.mounted === '1') return () => {};
  root.dataset.mounted = '1';

  const win = q<HTMLElement>(root, '[data-window]');
  const agent = q<HTMLElement>(root, '[data-agent-body]');
  const hist = q<HTMLElement>(root, '[data-hist]');
  const strip = q<HTMLElement>(root, '[data-tools]');
  const actions = q<HTMLElement>(root, '[data-actions]');
  const bar = q<HTMLElement>(root, '[data-progress]');
  const playBtn = q<HTMLButtonElement>(root, '[data-play]');
  const replayBtn = q<HTMLButtonElement>(root, '[data-replay]');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.toggle('is-static', reduce);

  let token = 0;
  let started = false;
  let done = false;
  let userPaused = false;
  let inView = false;
  let pageVisible = !document.hidden;
  let paused = false;
  let waiters: Array<() => void> = [];
  let barTarget = 0;
  let barDur = 0;

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  const wake = () => {
    const w = waiters;
    waiters = [];
    w.forEach((fn) => fn());
  };
  const waitForWake = () => new Promise<void>((r) => waiters.push(r));

  /** Wait `ms`, then stall while paused. Resolves false when superseded. */
  async function hold(ms: number, tok: number): Promise<boolean> {
    if (ms > 0) await sleep(ms);
    while (paused && tok === token) await waitForWake();
    return tok === token;
  }

  // ── Scrolling: the transcript follows its newest line unless the visitor
  // scrolled up; the history keeps its top (newest is on top) unless scrolled.
  let follow = true;
  let scrollQueued = false;
  const onAgentScroll = () => {
    follow = agent.scrollHeight - agent.scrollTop - agent.clientHeight < 24;
  };
  agent.addEventListener('scroll', onAgentScroll);
  const requestScroll = () => {
    if (!follow || scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      if (follow) agent.scrollTop = agent.scrollHeight;
    });
  };
  let histFollow = true;
  const onHistScroll = () => {
    histFollow = hist.scrollTop < 8;
  };
  hist.addEventListener('scroll', onHistScroll);
  const histTop = () => {
    if (histFollow) hist.scrollTop = 0;
  };

  function addLeft(html: string): HTMLElement {
    agent.querySelector('.ln-prompt')?.remove();
    const node = nodeFrom(html);
    agent.appendChild(node);
    requestScroll();
    return node;
  }

  function setProgress(fraction: number, ms: number) {
    barTarget = fraction;
    barDur = ms;
    bar.style.transition = ms > 0 ? `width ${ms}ms linear` : 'none';
    bar.style.width = `${(fraction * 100).toFixed(2)}%`;
  }

  function freezeProgress() {
    const w = getComputedStyle(bar).width;
    bar.style.transition = 'none';
    bar.style.width = w;
  }

  function thawProgress() {
    void bar.offsetWidth;
    bar.style.transition = `width ${barDur}ms linear`;
    bar.style.width = `${(barTarget * 100).toFixed(2)}%`;
  }

  function updatePaused() {
    const next = userPaused || !inView || !pageVisible;
    if (next === paused) return;
    paused = next;
    root.classList.toggle('is-paused', paused);
    if (paused) freezeProgress();
    else {
      thawProgress();
      wake();
    }
  }

  /** The control's accessible name carries its state (Pause while running, Play while paused). */
  function setPlayLabel() {
    playBtn.dataset.state = userPaused ? 'paused' : 'playing';
    q<HTMLElement>(playBtn, '.lbl').textContent = userPaused ? 'Play' : 'Pause';
  }

  function setState(state: 'idle' | 'playing' | 'done') {
    root.dataset.state = state;
  }

  /** Both panes before the run: empty transcript, seed datasets only. */
  function showInitial() {
    agent.innerHTML = PROMPT_HTML;
    hist.innerHTML = rowsHtml(initialHist(scene));
    strip.innerHTML = stripHtml();
    strip.classList.remove('is-set');
    actions.classList.remove('is-live');
    follow = true;
    histFollow = true;
    agent.scrollTop = 0;
    hist.scrollTop = 0;
    setProgress(0, 0);
  }

  /** Both panes after the run, without animation. */
  function showFinal() {
    const model = finalHist(scene);
    agent.innerHTML = finalLeftHtml(scene);
    hist.innerHTML = rowsHtml(model);
    strip.innerHTML = stripHtml(model.tool);
    strip.classList.toggle('is-set', !!model.tool);
    actions.classList.toggle('is-live', model.actionsLive);
    agent.scrollTop = agent.scrollHeight;
    hist.scrollTop = 0;
    setProgress(1, 0);
  }

  async function typeInto(node: HTMLElement, text: string, ms: number, jitter: number, tok: number): Promise<boolean> {
    const tx = q<HTMLElement>(node, '.tx');
    node.classList.add('is-typing');
    for (const ch of text) {
      tx.textContent += ch;
      requestScroll();
      const wait = ch === ' ' || ch === '\n' ? ms * 0.6 : ms + (Math.random() - 0.5) * jitter;
      if (!(await hold(wait, tok))) return false;
    }
    node.classList.remove('is-typing');
    return true;
  }

  function row(hid: number): HTMLElement | null {
    return hist.querySelector<HTMLElement>(`[data-hid="${hid}"]`);
  }

  /** Re-run the entrance animation on an element that already exists. */
  function reenter(el: HTMLElement) {
    el.classList.remove('stk-in');
    void el.offsetWidth;
    el.classList.add('stk-in');
  }

  async function runHist(line: HistLine, tok: number): Promise<boolean> {
    switch (line.op) {
      case 'tool':
        strip.innerHTML = stripHtml({ name: line.name, version: line.version });
        strip.classList.add('is-set');
        reenter(strip);
        return hold(HIST_MS - GAP_MS, tok);
      case 'add':
        hist.prepend(nodeFrom(histRowHtml({ hid: line.hid, name: line.name, state: line.state })));
        histTop();
        return hold(HIST_MS - GAP_MS, tok);
      case 'state': {
        const r = row(line.hid);
        if (r) {
          r.dataset.state = line.state;
          q<HTMLElement>(r, '.gx-state').textContent = stateLabel({
            hid: line.hid,
            name: '',
            state: line.state,
            note: line.note,
          });
        }
        return hold(HIST_MS - GAP_MS + (line.hold ?? 0), tok);
      }
      case 'expand': {
        const r = row(line.hid);
        if (r) {
          const meta = document.createElement('span');
          meta.className = 'gx-meta stk-in';
          meta.textContent = line.meta;
          r.appendChild(meta);
        }
        return hold(HIST_MS - GAP_MS, tok);
      }
      case 'info': {
        const r = row(line.hid);
        if (!r) return hold(line.fields.length * INFO_PAIR_MS + INFO_TAIL_MS - GAP_MS, tok);
        const card = nodeFrom(infoHtml(line.fields, false));
        card.classList.add('stk-in');
        r.appendChild(card);
        const dl = q<HTMLElement>(card, 'dl');
        for (const pair of line.fields) {
          if (!(await hold(INFO_PAIR_MS, tok))) return false;
          const node = nodeFrom(pairHtml(pair));
          node.classList.add('stk-in');
          dl.appendChild(node);
        }
        // The single gold moment inside the window.
        card.classList.add('is-pulse');
        return hold(INFO_TAIL_MS - GAP_MS, tok);
      }
      case 'actions':
        actions.classList.add('is-live');
        return hold(HIST_MS - GAP_MS, tok);
      default:
        return true;
    }
  }

  async function runLine(line: Line, tok: number): Promise<boolean> {
    switch (line.kind) {
      case 'pause':
        return hold(line.ms, tok);
      case 'hist':
        return runHist(line, tok);
      case 'out':
        if (!(await hold(line.delay ?? 0, tok))) return false;
        addLeft(leftLineHtml(line, true));
        return true;
      case 'user': {
        const node = addLeft(leftLineHtml(line, false));
        if (!(await typeInto(node, line.text, TYPE_MS, 30, tok))) return false;
        return hold(ENTER_MS, tok);
      }
      case 'assistant': {
        const node = addLeft(leftLineHtml(line, false));
        node.classList.add('is-streaming');
        if (!(await hold(STREAM_LEAD_MS, tok))) return false;
        if (!(await typeInto(node, line.text, STREAM_MS, 6, tok))) return false;
        node.classList.remove('is-streaming');
        return hold(ENTER_MS, tok);
      }
      case 'tool': {
        const node = addLeft(leftLineHtml(line, false));
        if (!(await hold(line.delay ?? TOOL_MS, tok))) return false;
        node.classList.add('is-done');
        requestScroll();
        return true;
      }
      case 'yaml': {
        const node = addLeft(leftLineHtml(line, false));
        const body = q<HTMLElement>(node, '.yaml-body');
        for (const text of line.lines) {
          const yl = nodeFrom(yamlLineHtml(text));
          yl.classList.add('stk-in');
          body.appendChild(yl);
          requestScroll();
          if (!(await hold(YAML_LINE_MS, tok))) return false;
        }
        return hold(YAML_TAIL_MS - GAP_MS, tok);
      }
      default:
        return true;
    }
  }

  async function play(tok: number) {
    showInitial();
    setState('playing');
    void bar.offsetWidth;
    const total = scene.lines.reduce((n, l) => n + lineMs(l), 0);
    let acc = 0;
    for (const line of scene.lines) {
      if (tok !== token) return;
      const est = lineMs(line);
      acc += est;
      setProgress(acc / total, est);
      if (!(await runLine(line, tok))) return;
      if (line.kind !== 'pause' && !(await hold(GAP_MS, tok))) return;
    }
    if (tok !== token) return;
    setProgress(1, 0);
    done = true;
    started = false;
    setState('done');
  }

  function start() {
    token += 1;
    wake();
    started = true;
    done = false;
    void play(token);
  }

  playBtn.addEventListener('click', () => {
    userPaused = !userPaused;
    setPlayLabel();
    if (!userPaused && !started && !done) {
      inView = true;
      start();
    }
    updatePaused();
  });

  replayBtn.addEventListener('click', () => {
    userPaused = false;
    setPlayLabel();
    if (reduce) {
      showFinal();
      return;
    }
    inView = true;
    start();
    updatePaused();
  });

  const onVisibility = () => {
    pageVisible = !document.hidden;
    updatePaused();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        inView = e.isIntersecting;
        if (inView && !started && !done && !reduce && !userPaused) start();
        updatePaused();
      });
    },
    { threshold: 0.3 }
  );
  io.observe(win);

  // Mount: reduced motion keeps the server-rendered final state; otherwise
  // the window rests in its initial state until it scrolls into view.
  setPlayLabel();
  if (reduce) {
    showFinal();
    done = true;
    setState('done');
  } else {
    showInitial();
    setState('idle');
  }

  return () => {
    token += 1;
    wake();
    io.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    agent.removeEventListener('scroll', onAgentScroll);
    hist.removeEventListener('scroll', onHistScroll);
    delete root.dataset.mounted;
  };
}
