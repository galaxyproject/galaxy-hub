import { describe, it, expect, vi } from 'vitest';
import {
  isSearchShortcut,
  isEditableTarget,
  shortcutLabel,
  findSearchTarget,
  handleSearchShortcut,
  initSearchShortcut,
} from './searchShortcut';

function keyEvent(overrides: Partial<KeyboardEvent> = {}) {
  return {
    key: 'k',
    code: 'KeyK',
    metaKey: false,
    ctrlKey: true,
    altKey: false,
    shiftKey: false,
    defaultPrevented: false,
    isComposing: false,
    target: null,
    preventDefault: vi.fn(),
    ...overrides,
  } as unknown as KeyboardEvent;
}

interface FakeOptions {
  kind: string;
  visible: boolean;
  opener?: string;
}

function fakeInput({ kind, visible, opener }: FakeOptions) {
  return {
    kind,
    visible,
    getAttribute: (name: string) =>
      name === 'data-search-shortcut' ? kind : name === 'data-search-shortcut-opener' ? (opener ?? null) : null,
    getClientRects: () => (visible ? [{}] : []),
    focus: vi.fn(),
    select: vi.fn(),
  };
}

function fakeOpener(visible: boolean, onClick: () => void = () => undefined) {
  return { getClientRects: () => (visible ? [{}] : []), click: vi.fn(onClick) };
}

function fakeDoc(inputs: ReturnType<typeof fakeInput>[], byId: Record<string, unknown> = {}) {
  return {
    querySelectorAll: () => inputs,
    getElementById: (id: string) => byId[id] ?? null,
  } as unknown as Document;
}

describe('isSearchShortcut', () => {
  it('accepts Ctrl+K and Cmd+K', () => {
    expect(isSearchShortcut(keyEvent({ ctrlKey: true }))).toBe(true);
    expect(isSearchShortcut(keyEvent({ ctrlKey: false, metaKey: true }))).toBe(true);
  });

  it('accepts an upper-case K (Caps Lock)', () => {
    expect(isSearchShortcut(keyEvent({ key: 'K' }))).toBe(true);
  });

  it('rejects K without Ctrl or Cmd', () => {
    expect(isSearchShortcut(keyEvent({ ctrlKey: false }))).toBe(false);
  });

  it('rejects Alt or Shift combinations', () => {
    expect(isSearchShortcut(keyEvent({ altKey: true }))).toBe(false);
    expect(isSearchShortcut(keyEvent({ shiftKey: true }))).toBe(false);
  });

  it('rejects other keys', () => {
    expect(isSearchShortcut(keyEvent({ key: 'j' }))).toBe(false);
  });

  it('matches the physical K key on non-Latin layouts', () => {
    expect(isSearchShortcut(keyEvent({ key: 'л', code: 'KeyK' }))).toBe(true);
    expect(isSearchShortcut(keyEvent({ key: 'л', code: 'KeyL' }))).toBe(false);
  });

  it('follows the produced letter on Latin layouts such as Dvorak', () => {
    // Dvorak: the physical K key types "t", the physical V key types "k".
    expect(isSearchShortcut(keyEvent({ key: 't', code: 'KeyK' }))).toBe(false);
    expect(isSearchShortcut(keyEvent({ key: 'k', code: 'KeyV' }))).toBe(true);
  });
});

describe('isEditableTarget', () => {
  it.each(['INPUT', 'TEXTAREA', 'SELECT'])('treats %s as editable', (tagName) => {
    expect(isEditableTarget({ tagName } as unknown as EventTarget)).toBe(true);
  });

  it('treats contenteditable elements as editable', () => {
    expect(isEditableTarget({ tagName: 'DIV', isContentEditable: true } as unknown as EventTarget)).toBe(true);
  });

  it('does not treat other elements or a missing target as editable', () => {
    expect(isEditableTarget({ tagName: 'BUTTON', isContentEditable: false } as unknown as EventTarget)).toBe(false);
    expect(isEditableTarget(null)).toBe(false);
  });
});

describe('shortcutLabel', () => {
  it.each(['MacIntel', 'macOS', 'iPhone', 'iPad'])('shows the Command glyph on %s', (platform) => {
    expect(shortcutLabel(platform)).toBe('⌘K');
  });

  it.each(['Win32', 'Linux x86_64', 'Windows', ''])('shows Ctrl K on %s', (platform) => {
    expect(shortcutLabel(platform)).toBe('Ctrl K');
  });
});

describe('findSearchTarget', () => {
  it('prefers a visible page search box over the sidebar', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    const page = fakeInput({ kind: 'page', visible: true });
    expect(findSearchTarget(fakeDoc([sidebar, page]))).toEqual({ input: page });
  });

  it('skips hidden inputs', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: false });
    const page = fakeInput({ kind: 'page', visible: false });
    expect(findSearchTarget(fakeDoc([sidebar, page]))).toBeNull();
  });

  it('uses a visible opener for a hidden input', () => {
    const overlay = fakeInput({ kind: 'overlay', visible: false, opener: 'search-toggle' });
    const opener = fakeOpener(true);
    expect(findSearchTarget(fakeDoc([overlay], { 'search-toggle': opener }))).toEqual({ input: overlay, opener });
  });

  it('ignores an opener that is hidden too (mobile)', () => {
    const overlay = fakeInput({ kind: 'overlay', visible: false, opener: 'search-toggle' });
    expect(findSearchTarget(fakeDoc([overlay], { 'search-toggle': fakeOpener(false) }))).toBeNull();
  });
});

describe('handleSearchShortcut', () => {
  it('focuses and selects the visible search input', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    const event = keyEvent();
    expect(handleSearchShortcut(event, fakeDoc([sidebar]))).toBe(true);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(sidebar.focus).toHaveBeenCalled();
    expect(sidebar.select).toHaveBeenCalled();
  });

  it('clicks the opener before focusing a hidden input', () => {
    const overlay = fakeInput({ kind: 'overlay', visible: false, opener: 'search-toggle' });
    const opener = fakeOpener(true);
    expect(handleSearchShortcut(keyEvent(), fakeDoc([overlay], { 'search-toggle': opener }))).toBe(true);
    expect(opener.click).toHaveBeenCalled();
    expect(overlay.focus).toHaveBeenCalled();
  });

  it('leaves the event alone when the user is typing in a field', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    const event = keyEvent({ target: { tagName: 'TEXTAREA' } as unknown as EventTarget });
    expect(handleSearchShortcut(event, fakeDoc([sidebar]))).toBe(false);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(sidebar.focus).not.toHaveBeenCalled();
  });

  it('keeps focus and selects the query when the search box already has focus', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    const page = fakeInput({ kind: 'page', visible: true });
    const event = keyEvent({
      target: { tagName: 'INPUT', closest: () => sidebar } as unknown as EventTarget,
    });
    expect(handleSearchShortcut(event, fakeDoc([sidebar, page]), false)).toBe(true);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(sidebar.select).toHaveBeenCalled();
    expect(page.focus).not.toHaveBeenCalled();
  });

  it('leaves Ctrl+K to the text field inside the search box on Apple platforms', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    const target = { tagName: 'INPUT', closest: () => sidebar } as unknown as EventTarget;
    const ctrl = keyEvent({ target, ctrlKey: true, metaKey: false });
    expect(handleSearchShortcut(ctrl, fakeDoc([sidebar]), true)).toBe(false);
    expect(ctrl.preventDefault).not.toHaveBeenCalled();
    expect(sidebar.select).not.toHaveBeenCalled();

    const cmd = keyEvent({ target, ctrlKey: false, metaKey: true });
    expect(handleSearchShortcut(cmd, fakeDoc([sidebar]), true)).toBe(true);
    expect(cmd.preventDefault).toHaveBeenCalled();
    expect(sidebar.select).toHaveBeenCalled();
  });

  it('leaves the event alone when another handler already took it', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    expect(handleSearchShortcut(keyEvent({ defaultPrevented: true }), fakeDoc([sidebar]))).toBe(false);
    expect(sidebar.focus).not.toHaveBeenCalled();
  });

  it('leaves the event alone during IME composition', () => {
    const sidebar = fakeInput({ kind: 'sidebar', visible: true });
    expect(handleSearchShortcut(keyEvent({ isComposing: true }), fakeDoc([sidebar]))).toBe(false);
  });

  it('keeps the browser default when no search input is reachable', () => {
    const event = keyEvent();
    expect(handleSearchShortcut(event, fakeDoc([]))).toBe(false);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});

describe('initSearchShortcut', () => {
  it('binds one keydown listener per document however often it runs', () => {
    const addEventListener = vi.fn();
    const doc = {
      addEventListener,
      querySelectorAll: () => [],
    } as unknown as Document;
    initSearchShortcut(doc, '');
    initSearchShortcut(doc, '');
    expect(addEventListener.mock.calls.filter(([type]) => type === 'keydown')).toHaveLength(1);
  });

  it('fills the shortcut hints and reveals them', () => {
    const hint = { textContent: '', removeAttribute: vi.fn() };
    const doc = {
      addEventListener: vi.fn(),
      querySelectorAll: (selector: string) => (selector === '[data-search-shortcut-hint]' ? [hint] : []),
    } as unknown as Document;
    initSearchShortcut(doc, 'MacIntel');
    expect(hint.textContent).toBe('⌘K');
    expect(hint.removeAttribute).toHaveBeenCalledWith('hidden');
  });

  it('fills the hints of each page Astro swaps in', () => {
    const listeners: Record<string, () => void> = {};
    let hints: { textContent: string; removeAttribute: ReturnType<typeof vi.fn> }[] = [];
    const doc = {
      addEventListener: (type: string, listener: () => void) => {
        listeners[type] = listener;
      },
      querySelectorAll: (selector: string) => (selector === '[data-search-shortcut-hint]' ? hints : []),
    } as unknown as Document;
    initSearchShortcut(doc, 'Win32');

    const next = { textContent: '', removeAttribute: vi.fn() };
    hints = [next];
    listeners['astro:page-load']();
    expect(next.textContent).toBe('Ctrl K');
    expect(next.removeAttribute).toHaveBeenCalledWith('hidden');
  });
});
