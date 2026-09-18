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
const SPIN_FRAME_MS = 80;
const COPY_LABEL_DEFAULT = 'Copy install commands';
const COPY_FEEDBACK_MS = 1600;
/** Fired on `document` when a harness is chosen here or in the guide tabs. */
const SELECT_EVENT = 'agent-shells:select';

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

/** Copy text to the clipboard; resolves to whether it actually worked. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function mountAgentShells(root: HTMLElement, scenes: Scene[]): () => void {
  if (root.dataset.mounted === '1' || scenes.length === 0) return () => {};
  root.dataset.mounted = '1';

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const tabList = q<HTMLElement>(root, '[role="tablist"]');
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
  let focusInTabs = false;
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
  const waitForWake = () => new Promise<void>((r) => waiters.push(r));

  /** Wait `ms`, then stall while paused. Resolves false when superseded. */
  async function hold(ms: number, tok: number): Promise<boolean> {
    if (ms > 0) await sleep(ms);
    while (paused && tok === token) await waitForWake();
    return tok === token;
  }

  // ── Scrolling: follow the newest line unless the visitor scrolled up. ──
  let follow = true;
  let scrollQueued = false;
  body.addEventListener('scroll', () => {
    follow = body.scrollHeight - body.scrollTop - body.clientHeight < 24;
  });
  const scrollNow = () => {
    follow = true;
    body.scrollTop = body.scrollHeight;
  };
  const requestScroll = () => {
    if (!follow || scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      if (follow) body.scrollTop = body.scrollHeight;
    });
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
    requestScroll();
    return node;
  }

  function clearBody() {
    body.innerHTML = '';
    follow = true;
    highlightSidebar(null);
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
    playBtn.dataset.state = userPaused ? 'paused' : 'playing';
    q<HTMLElement>(playBtn, '.lbl').textContent = userPaused ? 'Play' : 'Pause';
  }

  /** Light up the sidebar item named by the last matching breadcrumb of a `ui` line. */
  function highlightSidebar(text: string | null) {
    if (sideItems.length === 0) return;
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

  /** Keep the active tab visible by scrolling the strip only (never the page). */
  function revealTab(tab: HTMLElement) {
    const left = tab.offsetLeft;
    const right = left + tab.offsetWidth;
    const viewLeft = tabList.scrollLeft;
    const viewRight = viewLeft + tabList.clientWidth;
    if (left < viewLeft) tabList.scrollLeft = left;
    else if (right > viewRight) tabList.scrollLeft = right - tabList.clientWidth;
  }

  /** Point the window, controls and summary at scene `i` (does not touch the body). */
  function applyScene(i: number) {
    const scene = scenes[i];
    current = i;
    tabs.forEach((t, j) => {
      const active = j === i;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });
    revealTab(tabs[i]);
    root.style.setProperty('--ash-accent', scene.accent);
    win.dataset.kind = scene.kind;
    win.style.setProperty('--ash-accent', scene.accent);
    win.setAttribute('aria-labelledby', `ash-tab-${scene.id}`);
    title.textContent = scene.title;
    setupLink.href = scene.href;
    q<HTMLElement>(setupLink, '.lbl').textContent = `Set up ${scene.name}`;
    copyBtn.dataset.copyText = scene.copy;
    copyBtn.dataset.copyLabel = scene.copyLabel ?? COPY_LABEL_DEFAULT;
    if (!copyBtn.classList.contains('is-copied'))
      q<HTMLElement>(copyBtn, '.lbl').textContent = copyBtn.dataset.copyLabel;
    summary.textContent = sceneSummary(scene);
  }

  /** Render a scene's finished transcript without animation. */
  function showFinal(i: number) {
    const scene = scenes[i];
    body.innerHTML = finalBodyHtml(scene);
    const lastUi = [...scene.lines].reverse().find((l) => l.kind === 'ui');
    highlightSidebar(lastUi && lastUi.kind === 'ui' ? lastUi.text : null);
    scrollNow();
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

  async function runLine(line: Line, scene: Scene, tok: number): Promise<boolean> {
    switch (line.kind) {
      case 'pause':
        return hold(line.ms, tok);
      case 'clear':
        clearBody();
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
        requestScroll();
        return true;
      }
      case 'spinner': {
        // Frames advance from the same hold() loop, so pause and supersession
        // stop them for free (no interval to leak).
        const node = add(line, scene, false);
        const spin = q<HTMLElement>(node, '.spin');
        const tx = q<HTMLElement>(node, '.tx');
        const frames = Math.max(1, Math.round(line.ms / SPIN_FRAME_MS));
        for (let f = 1; f <= frames; f++) {
          if (!(await hold(SPIN_FRAME_MS, tok))) return false;
          spin.textContent = SPIN_FRAMES[f % SPIN_FRAMES.length];
        }
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
      showFinal(i);
      return;
    }

    clearBody();
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
    // Do not move the selection out from under a keyboard user browsing the tabs.
    while (focusInTabs && tok === token) await waitForWake();
    if (tok !== token) return;
    start((i + 1) % scenes.length);
  }

  function start(i: number) {
    token += 1;
    wake();
    started = true;
    void play(i, token);
  }

  /** Select a scene without playing it (used while the visitor has paused). */
  function select(i: number) {
    token += 1;
    wake();
    started = false;
    applyScene(i);
    showFinal(i);
  }

  /** Show scene `i` the way a visitor would expect right now: static if paused or idle, else playing. */
  function choose(i: number) {
    if (userPaused || (!started && !inView)) select(i);
    else start(i);
  }

  // Tabs: click + roving arrow keys. Selecting a tab respects an explicit pause.
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      choose(i);
      document.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: { id: scenes[i].id, source: 'shells' } }));
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

  const onTabFocusIn = () => {
    focusInTabs = true;
  };
  const onTabFocusOut = (e: FocusEvent) => {
    if (tabList.contains(e.relatedTarget as Node | null)) return;
    focusInTabs = false;
    wake();
  };
  tabList.addEventListener('focusin', onTabFocusIn);
  tabList.addEventListener('focusout', onTabFocusOut);

  playBtn.addEventListener('click', () => {
    userPaused = !userPaused;
    setPlayLabel();
    if (!userPaused && !started) {
      inView = true;
      start(current);
    }
    updatePaused();
  });

  replayBtn.addEventListener('click', () => {
    userPaused = false;
    setPlayLabel();
    updatePaused();
    start(current);
  });

  copyBtn.addEventListener('click', async () => {
    const ok = await copyText(copyBtn.dataset.copyText ?? '');
    const lbl = q<HTMLElement>(copyBtn, '.lbl');
    copyBtn.classList.toggle('is-copied', ok);
    lbl.textContent = ok ? 'Copied ✓' : 'Copy failed';
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyBtn.classList.remove('is-copied');
      lbl.textContent = copyBtn.dataset.copyLabel ?? COPY_LABEL_DEFAULT;
    }, COPY_FEEDBACK_MS);
  });

  const onVisibility = () => {
    pageVisible = !document.hidden;
    updatePaused();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const onExternalSelect = (e: Event) => {
    const { id, source } = (e as CustomEvent<{ id: string; source: string }>).detail;
    if (source === 'shells') return;
    const i = scenes.findIndex((s) => s.id === id);
    if (i >= 0 && i !== current) choose(i);
  };
  document.addEventListener(SELECT_EVENT, onExternalSelect);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        inView = e.isIntersecting;
        if (inView && !started && !reduce && !userPaused) start(current);
        updatePaused();
      });
    },
    { threshold: 0.3 }
  );
  io.observe(win);

  // Mount: keep the server-rendered final state of scene 0 until playback starts.
  setPlayLabel();
  applyScene(0);
  if (reduce) {
    scrollNow();
    setProgress(1, 0);
  }

  return () => {
    token += 1;
    wake();
    io.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    document.removeEventListener(SELECT_EVENT, onExternalSelect);
    tabList.removeEventListener('focusin', onTabFocusIn);
    tabList.removeEventListener('focusout', onTabFocusOut);
    clearTimeout(copyTimer);
    delete root.dataset.mounted;
  };
}
