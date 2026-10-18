import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildSearch, onPopState, parseParams, readParams, writeParams } from './urlFilters';

describe('parseParams', () => {
  it('returns values for managed keys and defaults for missing or empty ones', () => {
    expect(parseParams('?year=2024&q=&utm=x', { year: null, q: null, tab: 'hub' })).toEqual({
      year: '2024',
      q: null,
      tab: 'hub',
    });
  });

  it('decodes encoded values', () => {
    expect(parseParams('?q=single%20cell+rna', { q: null })).toEqual({ q: 'single cell rna' });
  });
});

describe('buildSearch', () => {
  it('drops null, empty and default values', () => {
    expect(buildSearch('?year=2024&tab=hub', { year: null, tab: 'hub', q: '' }, { tab: 'hub' })).toBe('');
  });

  it('writes managed keys in the given order, then unrelated params in their original order', () => {
    expect(buildSearch('?utm=a&tag=x&ref=b', { q: 'cell', year: 2024, tag: 'x' })).toBe(
      '?q=cell&year=2024&tag=x&utm=a&ref=b'
    );
  });

  it('gives the same output whatever order the current params are in', () => {
    const values = { scope: 'domain', platform_group: 'public-servers' };
    expect(buildSearch('?platform_group=vms&scope=general', values)).toBe(
      buildSearch('?scope=general&platform_group=vms', values)
    );
  });

  it('keeps params that are not named in values', () => {
    expect(buildSearch('?scope=domain&platform_group=vms', { scope: null })).toBe('?platform_group=vms');
  });

  it('encodes values', () => {
    expect(buildSearch('', { q: 'a&b c' })).toBe('?q=a%26b+c');
  });
});

describe('browser wrappers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubWindow(href: string, state: unknown = { index: 3, scrollX: 0, scrollY: 0 }) {
    const url = new URL(href);
    const listeners = new Map<string, Set<(e: unknown) => void>>();
    const history = {
      state,
      replaceState: vi.fn((next: unknown, _title: string, path: string) => {
        history.state = next;
        const u = new URL(path, url);
        url.search = u.search;
        url.hash = u.hash;
      }),
    };
    const win = {
      location: url,
      history,
      addEventListener: vi.fn((type: string, cb: (e: unknown) => void) => {
        if (!listeners.has(type)) listeners.set(type, new Set());
        listeners.get(type)!.add(cb);
      }),
      removeEventListener: vi.fn((type: string, cb: (e: unknown) => void) => listeners.get(type)?.delete(cb)),
      dispatch: (type: string) => listeners.get(type)?.forEach((cb) => cb({ type })),
    };
    vi.stubGlobal('window', win);
    return win;
  }

  it('readParams reads window.location.search', () => {
    stubWindow('https://hub.test/news/?year=2023');
    expect(readParams({ year: null, q: null })).toEqual({ year: '2023', q: null });
  });

  it('writeParams keeps history.state and the hash', () => {
    const win = stubWindow('https://hub.test/news/?utm=a#keep');
    const state = win.history.state;
    expect(writeParams({ year: 2024 })).toBe(true);
    expect(win.history.replaceState).toHaveBeenCalledWith(state, '', '/news/?year=2024&utm=a#keep');
  });

  it('writeParams skips the write when the URL would not change', () => {
    const win = stubWindow('https://hub.test/search/?q=galaxy');
    expect(writeParams({ q: 'galaxy', tab: 'hub' }, { defaults: { tab: 'hub' } })).toBe(false);
    expect(win.history.replaceState).not.toHaveBeenCalled();
  });

  it('onPopState subscribes and unsubscribes', () => {
    const win = stubWindow('https://hub.test/news/');
    const cb = vi.fn();
    const off = onPopState(cb);
    win.dispatch('popstate');
    expect(cb).toHaveBeenCalledTimes(1);
    off();
    win.dispatch('popstate');
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('onPopState ignores popstate once the URL is on another page', () => {
    const win = stubWindow('https://hub.test/elixir-it/citations/');
    const cb = vi.fn();
    onPopState(cb);
    // ClientRouter traverse to another page: the old page's listener must not touch the new URL
    win.location.pathname = '/news/';
    win.location.search = '?year=2025';
    win.dispatch('popstate');
    expect(cb).not.toHaveBeenCalled();

    win.location.pathname = '/elixir-it/citations/';
    win.dispatch('popstate');
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('outside the browser', () => {
  it('reads defaults and never writes', () => {
    expect(readParams({ year: null, tab: 'hub' })).toEqual({ year: null, tab: 'hub' });
    expect(writeParams({ year: 2024 })).toBe(false);
    expect(onPopState(() => {})).toBeTypeOf('function');
  });
});
