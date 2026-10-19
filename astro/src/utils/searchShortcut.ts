/**
 * Cmd+K (Apple) / Ctrl+K (others) focuses the site search.
 *
 * Search inputs opt in with `data-search-shortcut="page" | "sidebar" | "overlay"`; a visible
 * `page` input wins. An input that starts hidden can name the button that reveals it with
 * `data-search-shortcut-opener="<element id>"`. `[data-search-shortcut-hint]` elements get the
 * platform's key label. When nothing is reachable the event is left alone, so the browser's own
 * Ctrl+K keeps working.
 */

const INPUT_SELECTOR = '[data-search-shortcut]';
const HINT_SELECTOR = '[data-search-shortcut-hint]';
const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

type ShortcutKeys = Pick<KeyboardEvent, 'key' | 'code' | 'metaKey' | 'ctrlKey' | 'altKey' | 'shiftKey'>;

export interface SearchTarget {
  input: HTMLInputElement;
  opener?: HTMLElement;
}

export function isSearchShortcut(e: ShortcutKeys): boolean {
  if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return false;
  const key = e.key ?? '';
  // Latin layouts (incl. Dvorak) match the produced letter; others fall back to the physical K key.
  return /^[a-z]$/i.test(key) ? key.toLowerCase() === 'k' : e.code === 'KeyK';
}

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!target) return false;
  const el = target as Partial<HTMLElement>;
  return EDITABLE_TAGS.has(el.tagName ?? '') || el.isContentEditable === true;
}

function ownSearchInput(target: EventTarget | null): HTMLInputElement | null {
  const el = target as Partial<Element> | null;
  return typeof el?.closest === 'function' ? el.closest<HTMLInputElement>(INPUT_SELECTOR) : null;
}

export function isApplePlatform(platform: string): boolean {
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export function shortcutLabel(platform: string): string {
  return isApplePlatform(platform) ? '⌘K' : 'Ctrl K';
}

function isVisible(el: Element): boolean {
  return el.getClientRects().length > 0;
}

export function findSearchTarget(doc: Document): SearchTarget | null {
  const inputs = Array.from(doc.querySelectorAll<HTMLInputElement>(INPUT_SELECTOR));
  // Stable sort: the page's own search box first, then document order.
  inputs.sort(
    (a, b) =>
      Number(b.getAttribute('data-search-shortcut') === 'page') -
      Number(a.getAttribute('data-search-shortcut') === 'page')
  );

  const visible = inputs.find(isVisible);
  if (visible) return { input: visible };

  for (const input of inputs) {
    const openerId = input.getAttribute('data-search-shortcut-opener');
    const opener = openerId ? doc.getElementById(openerId) : null;
    if (opener && isVisible(opener)) return { input, opener };
  }
  return null;
}

export function handleSearchShortcut(
  e: KeyboardEvent,
  doc: Document = document,
  apple: boolean = isApplePlatform(currentPlatform())
): boolean {
  if (e.defaultPrevented || e.isComposing || !isSearchShortcut(e)) return false;

  // Already in a search box: keep the shortcut ours and select the query for retyping.
  // On Apple platforms Ctrl+K there is the text field's kill-to-end-of-line, so only Cmd+K counts.
  const current = ownSearchInput(e.target);
  if (current) {
    if (apple && !e.metaKey) return false;
    e.preventDefault();
    current.select();
    return true;
  }
  if (isEditableTarget(e.target)) return false;

  const target = findSearchTarget(doc);
  if (!target) return false;

  e.preventDefault();
  target.opener?.click();
  target.input.focus();
  target.input.select();
  return true;
}

function currentPlatform(): string {
  if (typeof navigator === 'undefined') return '';
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  return nav.userAgentData?.platform || nav.platform || '';
}

function applyHints(doc: Document, platform: string): void {
  const label = shortcutLabel(platform);
  doc.querySelectorAll<HTMLElement>(HINT_SELECTOR).forEach((hint) => {
    hint.textContent = label;
    hint.removeAttribute('hidden');
  });
}

const boundDocuments = new WeakSet<Document>();

/** Bind once per document; safe to call again after Astro view transitions. */
export function initSearchShortcut(doc: Document = document, platform: string = currentPlatform()): void {
  if (boundDocuments.has(doc)) return;
  boundDocuments.add(doc);

  const apple = isApplePlatform(platform);
  doc.addEventListener('keydown', (e) => handleSearchShortcut(e, doc, apple));
  // Astro swaps the page content on navigation; label the hints on each new page.
  doc.addEventListener('astro:page-load', () => applyHints(doc, platform));
  applyHints(doc, platform);
}
