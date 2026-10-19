/**
 * Shared URL query-param sync for list filters (news, events, citations, platforms, search).
 *
 * A schema maps each managed param to its default value (`null` = no default). Values equal to
 * their default, empty strings and `null` are left out of the URL, so the clean state is a bare URL.
 * Writes keep `history.state` (Astro's ClientRouter stores its navigation index there) and
 * `location.hash`, and are skipped when the URL would not change.
 */

export type ParamSchema = Record<string, string | null>;
export type ParamValue = string | number | null | undefined;
export type ParamValues<S extends ParamSchema = ParamSchema> = { [K in keyof S]?: ParamValue };
export type ParsedParams<S extends ParamSchema> = { [K in keyof S]: string | null };

export interface WriteOptions {
  /** Defaults per param; a value equal to its default is dropped from the URL. */
  defaults?: ParamSchema;
}

const isBrowser = () => typeof window !== 'undefined';

/** Read the managed params from a search string; missing or empty params fall back to the default. */
export function parseParams<S extends ParamSchema>(search: string, schema: S): ParsedParams<S> {
  const params = new URLSearchParams(search);
  const out = {} as ParsedParams<S>;
  for (const key of Object.keys(schema) as (keyof S & string)[]) {
    const value = params.get(key);
    out[key] = value === null || value === '' ? schema[key] : value;
  }
  return out;
}

/**
 * Build a search string (`''` or `?a=b`) from the current one. Keys present in `values` are
 * written first, in the order given, unless empty or equal to their default; params not named in
 * `values` keep their original order after them.
 */
export function buildSearch(search: string, values: ParamValues, defaults: ParamSchema = {}): string {
  const current = new URLSearchParams(search);
  const next = new URLSearchParams();
  const managed = new Set(Object.keys(values));
  for (const key of managed) {
    const raw = values[key];
    if (raw === null || raw === undefined) continue;
    const value = String(raw);
    if (value === '' || value === defaults[key]) continue;
    next.append(key, value);
  }
  for (const [key, value] of current) {
    if (!managed.has(key)) next.append(key, value);
  }
  const query = next.toString();
  return query ? `?${query}` : '';
}

/** Read the managed params from `window.location`; all defaults outside the browser. */
export function readParams<S extends ParamSchema>(schema: S): ParsedParams<S> {
  return parseParams(isBrowser() ? window.location.search : '', schema);
}

/** Write filter values to the URL. Returns `true` when the URL changed. */
export function writeParams(values: ParamValues, options: WriteOptions = {}): boolean {
  if (!isBrowser()) return false;
  const { defaults = {} } = options;
  const { pathname, search, hash } = window.location;
  const nextSearch = buildSearch(search, values, defaults);
  if (nextSearch === search) return false;
  // Keep the existing state: Astro's ClientRouter stores its navigation index there
  window.history.replaceState(window.history.state, '', `${pathname}${nextSearch}${hash}`);
  return true;
}

/**
 * Run `callback` on back/forward navigation within the page. Astro's ClientRouter re-renders the
 * page itself for entries it created; this covers the rest (entries without router state).
 * The callback only runs while the URL is still on the page that subscribed, so a page being
 * swapped out never rewrites the next page's URL. Returns a function that removes the listener.
 */
export function onPopState(callback: (event: PopStateEvent) => void): () => void {
  if (!isBrowser()) return () => {};
  const pathname = window.location.pathname;
  const listener = (event: PopStateEvent) => {
    if (window.location.pathname !== pathname) return;
    callback(event);
  };
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
}
