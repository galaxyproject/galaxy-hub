import { describe, expect, it } from 'vitest';
import rehypeScrollableTables from './rehype-scrollable-tables.mjs';

const table = () => ({ type: 'element', tagName: 'table', properties: {}, children: [] });
const root = (...children) => ({ type: 'root', children });

function run(tree) {
  rehypeScrollableTables()(tree);
  return tree;
}

describe('rehypeScrollableTables', () => {
  it('wraps a table in a focusable, labelled scroll region', () => {
    const tree = run(root(table()));
    const [wrapper] = tree.children;

    expect(wrapper.tagName).toBe('div');
    expect(wrapper.properties).toEqual({
      className: ['table-wrapper'],
      role: 'region',
      tabIndex: 0,
      ariaLabel: 'Table',
    });
    expect(wrapper.children[0].tagName).toBe('table');
  });

  it('numbers the labels when a page has several tables, raw HTML included', () => {
    const tree = run(root(table(), { type: 'raw', value: '<table><tr><td>a</td></tr></table>' }, table()));

    expect(tree.children[0].properties.ariaLabel).toBe('Table 1');
    expect(tree.children[1].value).toBe(
      '<div class="table-wrapper" role="region" tabindex="0" aria-label="Table 2"><table><tr><td>a</td></tr></table></div>'
    );
    expect(tree.children[2].properties.ariaLabel).toBe('Table 3');
  });

  it('wraps raw tables whose tags are split across nodes', () => {
    const tree = run(root({ type: 'raw', value: '<TABLE class="x">' }, { type: 'raw', value: '</TABLE>' }));

    expect(tree.children[0].value).toBe(
      '<div class="table-wrapper" role="region" tabindex="0" aria-label="Table"><TABLE class="x">'
    );
    expect(tree.children[1].value).toBe('</TABLE></div>');
  });

  it('leaves unbalanced raw table markup alone', () => {
    const tree = run(root({ type: 'raw', value: '<table><tr><td>a</td></tr>' }));

    expect(tree.children[0].value).toBe('<table><tr><td>a</td></tr>');
  });

  it('leaves raw tables alone when there is a stray closing tag', () => {
    const value = '</table><table><tr><td>a</td></tr></table>';
    const tree = run(root({ type: 'raw', value }));

    expect(tree.children[0].value).toBe(value);
  });

  it('does not wrap a table twice', () => {
    const tree = run(run(root(table())));

    expect(tree.children[0].children[0].tagName).toBe('table');
  });

  it('wraps only the outer table when tables are nested', () => {
    const outer = { ...table(), children: [{ type: 'element', tagName: 'tr', properties: {}, children: [table()] }] };
    const tree = run(root(outer));

    expect(tree.children[0].properties.ariaLabel).toBe('Table');
    expect(tree.children[0].children[0].children[0].children[0].tagName).toBe('table');
  });

  it('wraps only the outer raw table when tables are nested', () => {
    const tree = run(
      root({ type: 'raw', value: '<table><tr><td><table><tr><td>a</td></tr></table></td></tr></table>' })
    );

    expect(tree.children[0].value).toBe(
      '<div class="table-wrapper" role="region" tabindex="0" aria-label="Table"><table><tr><td><table><tr><td>a</td></tr></table></td></tr></table></div>'
    );
  });

  it('does not open a region for a table the parser would move out of its parent', () => {
    // A cell closed before a nested <table> (as on /events/gcc2013/program/): the
    // nested table is still at depth 1 in the source, so it gets no wrapper of its own.
    const value = '<table class="table"><tr><td>Day 2</td>\n<table><tr><td>Talk</td></tr></table>\n</tr></table>';
    const tree = run(root({ type: 'raw', value }));

    expect(tree.children[0].value.match(/class="table-wrapper"/g)).toHaveLength(1);
    expect(tree.children[0].value.startsWith('<div class="table-wrapper"')).toBe(true);
    expect(tree.children[0].value.endsWith('</table></div>')).toBe(true);
  });

  it('ignores tables inside HTML comments', () => {
    const tree = run(
      root(
        { type: 'raw', value: '<!-- <table><tr><td>old</td></tr></table> -->' },
        { type: 'raw', value: '<!--\n<table>' },
        { type: 'raw', value: '-->' },
        { type: 'raw', value: '<table><tr><td>a</td></tr></table>' }
      )
    );

    expect(tree.children[0].value).toBe('<!-- <table><tr><td>old</td></tr></table> -->');
    expect(tree.children[1].value).toBe('<!--\n<table>');
    expect(tree.children[3].value).toBe(
      '<div class="table-wrapper" role="region" tabindex="0" aria-label="Table"><table><tr><td>a</td></tr></table></div>'
    );
  });

  it('does not wrap element tables inside a raw table', () => {
    const tree = run(
      root({ type: 'raw', value: '<table><tr><td>' }, table(), { type: 'raw', value: '</td></tr></table>' })
    );

    expect(tree.children[1].tagName).toBe('table');
    expect(tree.children[0].value).toBe(
      '<div class="table-wrapper" role="region" tabindex="0" aria-label="Table"><table><tr><td>'
    );
  });
});

describe('rehypeScrollableTables short cells', () => {
  const text = (value) => ({ type: 'text', value });
  const el = (tagName, children = [], properties = {}) => ({ type: 'element', tagName, properties, children });
  const cellsOf = (...cells) => el('table', [el('tbody', [el('tr', cells)])]);
  const classOf = (cell) => cell.properties.className;

  it('keeps cells with short inline text on one line', () => {
    const date = el('td', [text('12 May 2025')]);
    const link = el('td', [el('a', [el('strong', [text('Slides')])], { href: '/x/' })]);
    run(root(cellsOf(date, link)));

    expect(classOf(date)).toEqual(['whitespace-nowrap']);
    expect(classOf(link)).toEqual(['whitespace-nowrap']);
  });

  it('marks short header cells and keeps their existing classes', () => {
    const head = el('th', [text('Start date')], { className: ['text-left'] });
    run(root(el('table', [el('thead', [el('tr', [head])])])));

    expect(classOf(head)).toEqual(['text-left', 'whitespace-nowrap']);
  });

  it('lets long text, block content, raw HTML and empty cells wrap as before', () => {
    const long = el('td', [text('A sentence that is clearly longer than a short label.')]);
    const block = el('td', [el('p', [text('Short')])]);
    const lineBreak = el('td', [text('a'), el('br'), text('b')]);
    const raw = el('td', [text('a'), { type: 'raw', value: '<br>' }]);
    const empty = el('td', [text('  ')]);
    run(root(cellsOf(long, block, lineBreak, raw, empty)));

    for (const cell of [long, block, lineBreak, raw, empty]) expect(cell.properties.className).toBeUndefined();
  });

  it('counts the visible text, not the markup, and allows inline icons', () => {
    const icon = el('svg', [el('path', [], { d: 'M0 0h24v24H0z' })]);
    const cell = el('td', [icon, text('  Hands-on  ')]);
    run(root(cellsOf(cell)));

    expect(classOf(cell)).toEqual(['whitespace-nowrap']);
  });

  it('leaves cells of nested and classed tables alone', () => {
    const inner = el('td', [text('Talk')]);
    const outer = el('td', [cellsOf(inner)]);
    const legacy = el('td', [text('Day 1')]);
    run(root(cellsOf(outer), el('table', [el('tr', [legacy])], { className: ['bs-compat', 'table'] })));

    expect(outer.properties.className).toBeUndefined();
    expect(inner.properties.className).toBeUndefined();
    expect(legacy.properties.className).toBeUndefined();
  });

  it('skips a table that sits directly in a row group', () => {
    const inner = el('td', [text('Talk')]);
    run(root(el('table', [el('tbody', [cellsOf(inner)])])));

    expect(inner.properties.className).toBeUndefined();
  });

  it('lets cells wrap when an inline tag holds block content', () => {
    const imageLink = el('td', [el('a', [el('img', [], { src: '/x.png', alt: 'x' })], { href: '/x/' })]);
    const emphasisBreak = el('td', [el('em', [text('a'), el('br')])]);
    run(root(cellsOf(imageLink, emphasisBreak)));

    expect(imageLink.properties.className).toBeUndefined();
    expect(emphasisBreak.properties.className).toBeUndefined();
  });

  it('ignores comments when measuring a cell', () => {
    const cell = el('td', [{ type: 'comment', value: ' note ' }, text('Day 1')]);
    run(root(cellsOf(cell)));

    expect(classOf(cell)).toEqual(['whitespace-nowrap']);
  });
});
