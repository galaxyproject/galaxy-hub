/**
 * Theme choice (DESIGN.md "Dark mode"): System (the default), Light or Dark.
 *
 * Light and Dark show as `data-theme` on <html> and are kept in localStorage; System removes
 * both, so global.css follows `prefers-color-scheme`. THEME_PREPAINT_SCRIPT runs inline in
 * <head> before the first paint and again after every view-transition swap, because Astro
 * replaces the <html> attributes with the new page's.
 */

export type ThemeMode = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'hub-theme';

/** Fired on `document` after the choice changes, so every switch on the page can follow. */
export const THEME_CHANGE_EVENT = 'hub:theme-change';

type ThemeStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
type ThemeRoot = Pick<Element, 'setAttribute' | 'removeAttribute'>;

export function parseThemeMode(value: unknown): ThemeMode {
  return value === 'light' || value === 'dark' ? value : 'system';
}

/** localStorage, or null where it is missing or blocked (private mode, sandboxed iframes). */
function browserStorage(): ThemeStorage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function readThemeMode(storage: ThemeStorage | null = browserStorage()): ThemeMode {
  try {
    return parseThemeMode(storage?.getItem(THEME_STORAGE_KEY));
  } catch {
    return 'system';
  }
}

export function applyThemeMode(mode: ThemeMode, root: ThemeRoot = document.documentElement): void {
  if (mode === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', mode);
}

export function setThemeMode(
  mode: ThemeMode,
  {
    storage = browserStorage(),
    root = document.documentElement,
    target = document,
  }: { storage?: ThemeStorage | null; root?: ThemeRoot; target?: EventTarget } = {}
): void {
  try {
    if (mode === 'system') storage?.removeItem(THEME_STORAGE_KEY);
    else storage?.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Blocked storage: the choice still applies to this page.
  }
  applyThemeMode(mode, root);
  target.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: mode }));
}

/** Inline <head> script: same rules as readThemeMode + applyThemeMode, without imports. */
export const THEME_PREPAINT_SCRIPT = `(function(){var d=document;function a(){var t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}if(t==='light'||t==='dark')d.documentElement.setAttribute('data-theme',t);else d.documentElement.removeAttribute('data-theme')}a();d.addEventListener('astro:after-swap',a)})();`;
