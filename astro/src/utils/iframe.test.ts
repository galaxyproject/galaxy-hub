import { afterEach, describe, it, expect, vi } from 'vitest';
import { notifyParent } from './iframe';

describe('notifyParent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubWindow(parent: unknown) {
    const dispatched: Event[] = [];
    const win: Record<string, unknown> = {
      dispatchEvent: (event: Event) => dispatched.push(event),
      parent,
    };
    if (parent === undefined) win.parent = win;
    vi.stubGlobal('window', win);
    return dispatched;
  }

  it('dispatches mounted on the same-origin parent document', () => {
    const parentEvents: Event[] = [];
    const parent = { document: { dispatchEvent: (event: Event) => parentEvents.push(event) } };
    const own = stubWindow(parent);

    notifyParent();

    expect(own).toHaveLength(1);
    expect(own[0].type).toBe('mounted');
    expect(parentEvents).toHaveLength(1);
    expect(parentEvents[0].type).toBe('mounted');
  });

  it('does not throw when the parent is cross-origin', () => {
    const parent = {
      get document(): never {
        throw new DOMException('Blocked a frame from accessing a cross-origin frame.', 'SecurityError');
      },
    };
    const own = stubWindow(parent);

    expect(() => notifyParent()).not.toThrow();
    expect(own).toHaveLength(1);
  });

  it('only dispatches on its own window when not embedded', () => {
    const own = stubWindow(undefined);

    notifyParent();

    expect(own).toHaveLength(1);
  });
});
