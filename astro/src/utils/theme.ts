/**
 * Theme choice (DESIGN.md "Dark mode"): System, Light or Dark; DEFAULT_THEME_MODE when nothing is stored.
 *
 * Light and Dark show as `data-theme` on <html>; System removes it, so global.css follows
 * `prefers-color-scheme`. A choice equal to the default is not stored. THEME_PREPAINT_SCRIPT
 * runs inline in <head> before the first paint and again after every view-transition swap,
 * because Astro replaces the <html> attributes with the new page's.
 */

export type ThemeMode = 'system' | 'light' | 'dark';

/**
 * What a visitor gets before choosing. 'system' follows the OS setting. Setting it to 'light'
 * makes dark opt-in: the pre-paint script then sets data-theme="light" for visitors without a
 * stored choice, which also switches off global.css's prefers-color-scheme branch. Only
 * visitors without JavaScript still follow the OS setting.
 */
export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export const THEME_STORAGE_KEY = 'hub-theme';

/** Fired on `document` after the choice changes, so every switch on the page can follow. */
export const THEME_CHANGE_EVENT = 'hub:theme-change';

type ThemeStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
type ThemeRoot = Pick<Element, 'setAttribute' | 'removeAttribute'>;

export function parseThemeMode(value: unknown, fallback: ThemeMode = DEFAULT_THEME_MODE): ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system' ? value : fallback;
}

/** localStorage, or null where it is missing or blocked (private mode, sandboxed iframes). */
function browserStorage(): ThemeStorage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function readThemeMode(
  storage: ThemeStorage | null = browserStorage(),
  fallback: ThemeMode = DEFAULT_THEME_MODE
): ThemeMode {
  try {
    return parseThemeMode(storage?.getItem(THEME_STORAGE_KEY), fallback);
  } catch {
    return fallback;
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
    fallback = DEFAULT_THEME_MODE,
  }: { storage?: ThemeStorage | null; root?: ThemeRoot; target?: EventTarget; fallback?: ThemeMode } = {}
): void {
  try {
    if (mode === fallback) storage?.removeItem(THEME_STORAGE_KEY);
    else storage?.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Blocked storage: the choice still applies to this page.
  }
  applyThemeMode(mode, root);
  target.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: mode }));
}

/** Inline <head> script: same rules as readThemeMode + applyThemeMode, without imports. */
export function themePrepaintScript(fallback: ThemeMode = DEFAULT_THEME_MODE): string {
  return `(function(){var d=document;function a(){var t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'&&t!=='system')t='${fallback}';if(t==='system')d.documentElement.removeAttribute('data-theme');else d.documentElement.setAttribute('data-theme',t)}a();d.addEventListener('astro:after-swap',a)})();`;
}

export const THEME_PREPAINT_SCRIPT = themePrepaintScript();
