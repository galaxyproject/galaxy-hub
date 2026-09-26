/**
 * Rehype plugin: wrap every top-level content table in a keyboard-focusable
 * region that scrolls horizontally, so wide tables scroll inside the prose
 * column instead of being clipped on narrow screens. Nested tables are left
 * alone: a scroll container inside a table cell never scrolls.
 *
 * In Markdown, Astro runs rehype-raw after user plugins, so tables written as
 * raw HTML are still strings here; their tags are wrapped textually, skipping
 * HTML comments. A `<table` inside an attribute value or a script string would
 * be misread; no content does that.
 */

const WRAPPER_CLASS = 'table-wrapper';
const RAW_TOKEN = /<!--|-->|<table\b|<\/table\s*>/gi;

function isWrapper(node) {
  return node?.type === 'element' && node.tagName === 'div' && node.properties?.className?.includes(WRAPPER_CLASS);
}

/**
 * Walk the tree in document order, tracking table nesting across element and
 * raw nodes. `onTable(parent, index)` is called for each top-level element
 * table; `onRaw(node, state)` for each raw node, which updates `state`.
 */
function walk(node, state, onTable, onRaw) {
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === 'raw') {
      onRaw(child, state);
    } else if (child.type === 'element' && child.tagName === 'table') {
      if (state.depth === 0 && !isWrapper(node)) onTable(node, i);
      state.depth++;
      walk(child, state, onTable, onRaw);
      state.depth--;
    } else {
      walk(child, state, onTable, onRaw);
    }
  }
}

/**
 * Scan raw HTML for table tags outside comments. Calls `onOpen(index)` for each
 * top-level `<table` and `onClose(end)` after the `</table>` that closes it.
 */
function scanRaw(value, state, onOpen = () => {}, onClose = () => {}) {
  for (const match of value.matchAll(RAW_TOKEN)) {
    const token = match[0].toLowerCase();
    if (state.inComment) {
      if (token === '-->') state.inComment = false;
    } else if (token === '<!--') {
      state.inComment = true;
    } else if (token.startsWith('<table')) {
      state.open.push(state.depth === 0);
      if (state.depth === 0) onOpen(match.index);
      state.depth++;
    } else if (token.startsWith('</table')) {
      if (state.depth === 0) {
        state.stray = true;
        continue;
      }
      state.depth--;
      if (state.open.pop()) onClose(match.index + match[0].length);
    }
  }
}

const newState = () => ({ depth: 0, open: [], inComment: false, stray: false });

export default function rehypeScrollableTables() {
  return (tree) => {
    let elementTables = 0;
    let rawTables = 0;
    const counting = newState();
    walk(
      tree,
      counting,
      () => elementTables++,
      (node, state) => scanRaw(node.value, state, () => rawTables++)
    );

    // Unbalanced raw markup (an unclosed table or a stray </table>) means the source nesting
    // does not match what the browser builds; leave raw tables alone then.
    const wrapRaw = rawTables > 0 && counting.depth === 0 && !counting.stray;
    const total = elementTables + (wrapRaw ? rawTables : 0);
    if (total === 0) return;

    let count = 0;
    const nextLabel = () => (total > 1 ? `Table ${++count}` : 'Table');

    walk(
      tree,
      newState(),
      (parent, index) => {
        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: { className: [WRAPPER_CLASS], role: 'region', tabIndex: 0, ariaLabel: nextLabel() },
          children: [parent.children[index]],
        };
      },
      (node, state) => {
        if (!wrapRaw) {
          scanRaw(node.value, state);
          return;
        }
        const value = node.value;
        let out = '';
        let last = 0;
        scanRaw(
          value,
          state,
          (start) => {
            out += `${value.slice(last, start)}<div class="${WRAPPER_CLASS}" role="region" tabindex="0" aria-label="${nextLabel()}">`;
            last = start;
          },
          (end) => {
            out += `${value.slice(last, end)}</div>`;
            last = end;
          }
        );
        node.value = out + value.slice(last);
      }
    );
  };
}
