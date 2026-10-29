import { describe, expect, it } from 'vitest';
import {
  THEME_CHANGE_EVENT,
  THEME_PREPAINT_SCRIPT,
  THEME_STORAGE_KEY,
  applyThemeMode,
  parseThemeMode,
  readThemeMode,
  setThemeMode,
} from './theme';

class FakeRoot {
  attrs = new Map<string, string>();
  setAttribute(name: string, value: string) {
    this.attrs.set(name, value);
  }
  removeAttribute(name: string) {
    this.attrs.delete(name);
  }
}

class FakeStorage {
  items = new Map<string, string>();
  getItem(key: string) {
    return this.items.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.items.set(key, value);
  }
  removeItem(key: string) {
    this.items.delete(key);
  }
}

const blockedStorage = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('SecurityError');
  },
  removeItem: () => {
    throw new Error('SecurityError');
  },
};

describe('parseThemeMode', () => {
  it('keeps light and dark and maps anything else to system', () => {
    expect(parseThemeMode('light')).toBe('light');
    expect(parseThemeMode('dark')).toBe('dark');
    for (const value of ['system', 'DARK', '', null, undefined, 1]) expect(parseThemeMode(value)).toBe('system');
  });
});

describe('readThemeMode', () => {
  it('reads the stored choice and falls back to system', () => {
    const storage = new FakeStorage();
    expect(readThemeMode(storage)).toBe('system');
    storage.setItem(THEME_STORAGE_KEY, 'dark');
    expect(readThemeMode(storage)).toBe('dark');
    expect(readThemeMode(blockedStorage)).toBe('system');
    expect(readThemeMode(null)).toBe('system');
  });
});

describe('applyThemeMode', () => {
  it('sets data-theme for light and dark and removes it for system', () => {
    const root = new FakeRoot();
    applyThemeMode('dark', root);
    expect(root.attrs.get('data-theme')).toBe('dark');
    applyThemeMode('light', root);
    expect(root.attrs.get('data-theme')).toBe('light');
    applyThemeMode('system', root);
    expect(root.attrs.has('data-theme')).toBe(false);
  });
});

describe('setThemeMode', () => {
  it('stores the choice, applies it and announces it', () => {
    const storage = new FakeStorage();
    const root = new FakeRoot();
    const target = new EventTarget();
    const seen: unknown[] = [];
    target.addEventListener(THEME_CHANGE_EVENT, (e) => seen.push((e as CustomEvent).detail));

    setThemeMode('dark', { storage, root, target });
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(root.attrs.get('data-theme')).toBe('dark');

    setThemeMode('system', { storage, root, target });
    expect(storage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(root.attrs.has('data-theme')).toBe(false);
    expect(seen).toEqual(['dark', 'system']);
  });

  it('still applies the choice when storage is blocked', () => {
    const root = new FakeRoot();
    setThemeMode('light', { storage: blockedStorage, root, target: new EventTarget() });
    expect(root.attrs.get('data-theme')).toBe('light');
  });
});

describe('THEME_PREPAINT_SCRIPT', () => {
  function run(storage: unknown) {
    const root = new FakeRoot();
    const listeners: Record<string, () => void> = {};
    const doc = {
      documentElement: root,
      addEventListener: (type: string, fn: () => void) => (listeners[type] = fn),
    };
    new Function('document', 'localStorage', THEME_PREPAINT_SCRIPT)(doc, storage);
    return { root, listeners };
  }

  it('applies the stored choice before paint and again after a view-transition swap', () => {
    const storage = new FakeStorage();
    storage.setItem(THEME_STORAGE_KEY, 'dark');
    const { root, listeners } = run(storage);
    expect(root.attrs.get('data-theme')).toBe('dark');

    // Astro copies the new page's <html> attributes, which drops data-theme
    root.removeAttribute('data-theme');
    listeners['astro:after-swap']();
    expect(root.attrs.get('data-theme')).toBe('dark');
  });

  it('leaves data-theme off for system, unknown values and blocked storage', () => {
    const junk = new FakeStorage();
    junk.setItem(THEME_STORAGE_KEY, 'sepia');
    for (const storage of [new FakeStorage(), junk, blockedStorage]) {
      expect(run(storage).root.attrs.has('data-theme')).toBe(false);
    }
  });

  it('uses the same storage key as the helpers', () => {
    expect(THEME_PREPAINT_SCRIPT).toContain(`'${THEME_STORAGE_KEY}'`);
    expect(THEME_STORAGE_KEY).toBe('hub-theme');
  });
});
