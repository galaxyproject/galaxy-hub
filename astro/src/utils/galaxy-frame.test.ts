import { describe, it, expect } from 'vitest';
import { resolveGalaxyRouter, isPlainNavigationClick } from './galaxy-frame';

const plainClick = {
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
} as MouseEvent;

describe('resolveGalaxyRouter', () => {
  it('finds the router published by an embedding Galaxy client', () => {
    const push = () => undefined;
    const parent = { Galaxy: { router: { push } } };
    expect(resolveGalaxyRouter(parent, {})).toEqual({ push });
  });

  it('ignores a page that is not embedded', () => {
    const self = { Galaxy: { router: { push: () => undefined } } };
    expect(resolveGalaxyRouter(self, self)).toBeNull();
  });

  it('ignores a parent without a Galaxy client or router', () => {
    expect(resolveGalaxyRouter({}, {})).toBeNull();
    expect(resolveGalaxyRouter({ Galaxy: {} }, {})).toBeNull();
    expect(resolveGalaxyRouter({ Galaxy: { router: {} } }, {})).toBeNull();
  });

  it('ignores a cross-origin parent', () => {
    const parent = {
      get Galaxy(): never {
        throw new DOMException('Blocked a frame from accessing a cross-origin frame.');
      },
    };
    expect(resolveGalaxyRouter(parent, {})).toBeNull();
  });
});

describe('isPlainNavigationClick', () => {
  it('accepts an unmodified left click', () => {
    expect(isPlainNavigationClick(plainClick)).toBe(true);
  });

  it('leaves new-tab and new-window clicks to the browser', () => {
    expect(isPlainNavigationClick({ ...plainClick, button: 1 } as MouseEvent)).toBe(false);
    expect(isPlainNavigationClick({ ...plainClick, metaKey: true } as MouseEvent)).toBe(false);
    expect(isPlainNavigationClick({ ...plainClick, ctrlKey: true } as MouseEvent)).toBe(false);
    expect(isPlainNavigationClick({ ...plainClick, shiftKey: true } as MouseEvent)).toBe(false);
    expect(isPlainNavigationClick({ ...plainClick, altKey: true } as MouseEvent)).toBe(false);
  });

  it('leaves an already-handled click alone', () => {
    expect(isPlainNavigationClick({ ...plainClick, defaultPrevented: true } as MouseEvent)).toBe(false);
  });
});
