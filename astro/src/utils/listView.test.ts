import { describe, it, expect } from 'vitest';
import { LIST_VIEW_DEFAULT, LIST_VIEW_PARAM, parseListView } from './listView';
import { buildSearch, parseParams } from './urlFilters';

describe('parseListView', () => {
  it('defaults to rows', () => {
    expect(LIST_VIEW_DEFAULT).toBe('rows');
    expect(parseListView(null)).toBe('rows');
    expect(parseListView(undefined)).toBe('rows');
    expect(parseListView('')).toBe('rows');
  });

  it('reads both views', () => {
    expect(parseListView('rows')).toBe('rows');
    expect(parseListView('tiles')).toBe('tiles');
  });

  it('falls back to rows for unknown values', () => {
    expect(parseListView('grid')).toBe('rows');
    expect(parseListView('Tiles')).toBe('rows');
  });
});

describe('view param in the URL', () => {
  const defaults = { [LIST_VIEW_PARAM]: LIST_VIEW_DEFAULT };

  it('drops the default rows view', () => {
    expect(buildSearch('?view=tiles', { q: null, view: 'rows' }, defaults)).toBe('');
  });

  it('writes tiles after the filter params', () => {
    expect(buildSearch('', { q: 'galaxy', year: 2024, tag: 'training', view: 'tiles' }, defaults)).toBe(
      '?q=galaxy&year=2024&tag=training&view=tiles'
    );
    expect(buildSearch('', { year: 2024, view: 'tiles' }, defaults)).toBe('?year=2024&view=tiles');
  });

  it('round-trips through parseParams', () => {
    const { view } = parseParams('?year=2024&view=tiles', { year: null, view: LIST_VIEW_DEFAULT });
    expect(parseListView(view)).toBe('tiles');
  });
});
