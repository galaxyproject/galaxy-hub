/**
 * Client runtime for the animated agent shells: replays each scene's lines
 * into the window, drives the tab strip, progress bar and controls.
 */
import type { Line, Scene } from './types';
import { SPIN_FRAMES, finalBodyHtml, isDialogLine, lineHtml, sceneSummary, typedText } from './render';

const TYPE_MS = 35;
const STREAM_MS = 12;
const GAP_MS = 140;
const ENTER_MS = 260;
const DWELL_MS = 2400;
const TOOL_MS = 900;

/** Rough duration of a line, used to pace the progress bar. */
function lineMs(line: Line): number {
  switch (line.kind) {
    case 'cmd':
    case 'slash':
    case 'user':
    case 'field':
      return typedText(line).length * TYPE_MS + ENTER_MS + GAP_MS;
    case 'assistant':
      return line.text.length * STREAM_MS + ENTER_MS + GAP_MS;
    case 'out':
      return (line.delay ?? 0) + GAP_MS;
    case 'tool':
      return (line.delay ?? TOOL_MS) + GAP_MS;
    case 'spinner':
      return line.ms + GAP_MS;
    case 'pause':
      return line.ms;
    case 'ui':
      return 320 + GAP_MS;
    case 'clear':
      return 220;
    default:
      return 0;
  }
}

function q<T extends Element>(root: Element, sel: string): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`agent-shells: missing ${sel}`);
  return el;
}

export function mountAgentShells(root: HTMLElement, scenes: Scene[]): () => void {
  if (root.dataset.mounted === '1' || scenes.length === 0) return () => {};
  root.dataset.mounted = '1';

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const win = q<HTMLElement>(root, '[data-window]');
  const body = q<HTMLElement>(root, '[data-body]');
  const title = q<HTMLElement>(root, '[data-title]');
  const bar = q<HTMLElement>(root, '[data-progress]');
  const playBtn = q<HTMLButtonElement>(root, '[data-play]');
  const replayBtn = q<HTMLButtonElement>(root, '[data-replay]');
  const copyBtn = q<HTMLButtonElement>(root, '[data-copy]');
  const setupLink = q<HTMLAnchorElement>(root, '[data-setup]');
  const summary = q<HTMLElement>(root, '[data-summary]');
  const sideItems = Array.from(root.querySelectorAll<HTMLElement>('[data-side-item]'));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.toggle('is-static', reduce);

  let token = 0;
  let current = 0;
  let started = false;
  let userPaused = false;
  let inView = false;
  let pageVisible = !document.hidden;
  let paused = false;
  let waiters: Array<() => void> = [];
  let barTarget = 0;
  let barDur = 0;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  const wake = () => {
    const w = waiters;
    waiters = [];
    w.forEach((fn) => fn());
  };

  /** Wait `ms`, then stall while paused. Resolves false when superseded. */
  async function hold(ms: number, tok: number): Promise<boolean> {
    if (ms > 0) await sleep(ms);
    while (paused && tok === token) await new Promise<void>((r) => waiters.push(r));
    return tok === token;
  }

  const scrollDown = () => {
    body.scrollTop = body.scrollHeight;
  };

  function nodeFrom(html: string): HTMLElement {
    const t = document.createElement('template');
    t.innerHTML = html;
    return t.content.firstElementChild as HTMLElement;
  }

  function add(line: Line, scene: Scene, final: boolean): HTMLElement {
    const node = nodeFrom(lineHtml(line, scene, final));
    if (isDialogLine(line)) {
      let dlg = body.lastElementChild;
      if (!dlg || !dlg.classList.contains('dlg')) {
        dlg = document.createElement('div');
        dlg.className = 'dlg';
        body.appendChild(dlg);
      }
      dlg.appendChild(node);
    } else {
      body.appendChild(node);
    }
    scrollDown();
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
    // Re-issue the pending target; the remaining distance is short enough that
    // reusing the original duration reads as continuous.
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

  function setPlayLabel() {
    playBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
    playBtn.dataset.state = userPaused ? 'paused' : 'playing';
    q<HTMLElement>(playBtn, '.lbl').textContent = userPaused ? 'Play' : 'Pause';
  }

  /** Light up the sidebar item named by the last matching breadcrumb of a `ui` line. */
  function highlightSidebar(text: string | null) {
    const keys = sideItems.map((item) => (item.dataset.sideItem ?? '').toLowerCase());
    const crumbs = (text ?? '')
      .toLowerCase()
      .split(/\s*[›>]\s*/)
      .reverse();
    let hit: string | undefined;
    for (const crumb of crumbs) {
      hit = keys.find((k) => k && crumb.includes(k));
      if (hit) break;
    }
    sideItems.forEach((item, i) => item.classList.toggle('is-active', keys[i] === hit));
  }

  function applyScene(i: number) {
    const scene = scenes[i];
    current = i;
    tabs.forEach((t, j) => {
      const active = j === i;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });
    win.dataset.kind = scene.kind;
    win.style.setProperty('--accent', scene.accent);
    win.setAttribute('aria-label', `${scene.name} window`);
    title.textContent = scene.title;
    setupLink.href = scene.href;
    q<HTMLElement>(setupLink, '.lbl').textContent = `Set up ${scene.name}`;
    copyBtn.dataset.copyText = scene.copy;
    summary.textContent = sceneSummary(scene);
    highlightSidebar(null);
    body.innerHTML = '';
  }

  async function typeInto(node: HTMLElement, text: string, ms: number, jitter: number, tok: number): Promise<boolean> {
    const tx = q<HTMLElement>(node, '.tx');
    node.classList.add('is-typing');
    for (const ch of text) {
      tx.textContent += ch;
      scrollDown();
      const wait = ch === ' ' || ch === '\n' ? ms * 0.6 : ms + (Math.random() - 0.5) * jitter;
      if (!(await hold(wait, tok))) return false;
    }
    node.classList.remove('is-typing');
    return true;
  }

  async function runLine(line: Line, scene: Scene, tok: number): Promise<boolean> {
    switch (line.kind) {
      case 'pause':
        return hold(line.ms, tok);
      case 'clear':
        body.innerHTML = '';
        highlightSidebar(null);
        return hold(220, tok);
      case 'out':
        if (!(await hold(line.delay ?? 0, tok))) return false;
        add(line, scene, true);
        return true;
      case 'ui':
        add(line, scene, true);
        highlightSidebar(line.text);
        return hold(320, tok);
      case 'cmd':
      case 'slash':
      case 'user':
      case 'field': {
        const node = add(line, scene, false);
        if (!(await typeInto(node, typedText(line), TYPE_MS, 30, tok))) return false;
        return hold(ENTER_MS, tok);
      }
      case 'assistant': {
        const node = add(line, scene, false);
        node.classList.add('is-streaming');
        if (!(await hold(360, tok))) return false;
        if (!(await typeInto(node, line.text, STREAM_MS, 6, tok))) return false;
        node.classList.remove('is-streaming');
        return hold(ENTER_MS, tok);
      }
      case 'tool': {
        const node = add(line, scene, false);
        if (!(await hold(line.delay ?? TOOL_MS, tok))) return false;
        node.classList.add('is-done');
        scrollDown();
        return true;
      }
      case 'spinner': {
        const node = add(line, scene, false);
        const spin = q<HTMLElement>(node, '.spin');
        const tx = q<HTMLElement>(node, '.tx');
        let frame = 0;
        const iv = setInterval(() => {
          if (!paused) spin.textContent = SPIN_FRAMES[++frame % SPIN_FRAMES.length];
        }, 80);
        const ok = await hold(line.ms, tok);
        clearInterval(iv);
        if (!ok) return false;
        node.classList.add('is-done');
        spin.textContent = '✓';
        tx.textContent = line.done;
        return true;
      }
      default:
        return true;
    }
  }

  async function play(i: number, tok: number) {
    const scene = scenes[i];
    applyScene(i);

    if (reduce) {
      body.innerHTML = finalBodyHtml(scene);
      const lastUi = [...scene.lines].reverse().find((l) => l.kind === 'ui');
      highlightSidebar(lastUi && lastUi.kind === 'ui' ? lastUi.text : null);
      setProgress(1, 0);
      return;
    }

    setProgress(0, 0);
    void bar.offsetWidth;
    const total = scene.lines.reduce((n, l) => n + lineMs(l), 0) + DWELL_MS;
    let acc = 0;
    for (const line of scene.lines) {
      if (tok !== token) return;
      const est = lineMs(line);
      acc += est;
      setProgress(acc / total, est);
      if (!(await runLine(line, scene, tok))) return;
      if (line.kind !== 'pause' && line.kind !== 'clear' && !(await hold(GAP_MS, tok))) return;
    }
    setProgress(1, DWELL_MS);
    if (!(await hold(DWELL_MS, tok))) return;
    start((i + 1) % scenes.length);
  }

  function start(i: number) {
    token += 1;
    wake();
    void play(i, token);
  }

  // Tabs: click + roving arrow keys.
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      userPaused = false;
      setPlayLabel();
      updatePaused();
      started = true;
      start(i);
    });
    t.addEventListener('keydown', (e) => {
      const n = tabs.length;
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % n;
      else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = n - 1;
      if (next < 0) return;
      e.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
  });

  playBtn.addEventListener('click', () => {
    userPaused = !userPaused;
    setPlayLabel();
    if (!started && !userPaused) {
      started = true;
      inView = true;
      start(current);
    }
    updatePaused();
  });

  replayBtn.addEventListener('click', () => {
    userPaused = false;
    setPlayLabel();
    updatePaused();
    started = true;
    start(current);
  });

  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.copyText ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    copyBtn.classList.add('is-copied');
    q<HTMLElement>(copyBtn, '.lbl').textContent = 'Copied ✓';
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyBtn.classList.remove('is-copied');
      q<HTMLElement>(copyBtn, '.lbl').textContent = 'Copy install commands';
    }, 1600);
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
        if (inView && !started && !reduce) {
          started = true;
          start(0);
        }
        updatePaused();
      });
    },
    { threshold: 0.3 }
  );
  io.observe(win);

  setPlayLabel();
  applyScene(0);
  body.innerHTML = finalBodyHtml(scenes[0]);
  if (reduce) setProgress(1, 0);

  return () => {
    token += 1;
    wake();
    io.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    clearTimeout(copyTimer);
    delete root.dataset.mounted;
  };
}
