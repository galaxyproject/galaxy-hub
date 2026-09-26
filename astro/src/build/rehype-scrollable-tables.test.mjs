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
