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

  it('does not wrap a table twice', () => {
    const tree = run(run(root(table())));

    expect(tree.children[0].children[0].tagName).toBe('table');
  });
});
