/**
 * Rehype plugin: wrap every content table in a keyboard-focusable region that
 * scrolls horizontally, so wide tables scroll inside the prose column instead
 * of being clipped on narrow screens.
 *
 * Astro runs rehype-raw after user plugins, so tables written as raw HTML in
 * Markdown are still strings here; their tags are wrapped textually.
 */
import { visit } from 'unist-util-visit';

const WRAPPER_CLASS = 'table-wrapper';
const RAW_TABLE_OPEN = /<table\b/gi;
const RAW_TABLE_CLOSE = /<\/table\s*>/gi;

function countMatches(value, pattern) {
  return value.match(pattern)?.length ?? 0;
}

function isWrapper(node) {
  return node?.type === 'element' && node.tagName === 'div' && node.properties?.className?.includes(WRAPPER_CLASS);
}

export default function rehypeScrollableTables() {
  return (tree) => {
    let elementTables = 0;
    let rawOpen = 0;
    let rawClose = 0;
    visit(tree, (node, _index, parent) => {
      if (node.type === 'element' && node.tagName === 'table' && !isWrapper(parent)) {
        elementTables++;
      } else if (node.type === 'raw') {
        rawOpen += countMatches(node.value, RAW_TABLE_OPEN);
        rawClose += countMatches(node.value, RAW_TABLE_CLOSE);
      }
    });

    // Unbalanced raw markup would leave a wrapper open; leave such pages alone.
    const wrapRaw = rawOpen > 0 && rawOpen === rawClose;
    const total = elementTables + (wrapRaw ? rawOpen : 0);
    if (total === 0) return;

    let count = 0;
    const nextLabel = () => (total > 1 ? `Table ${++count}` : 'Table');

    visit(tree, (node, index, parent) => {
      if (node.type === 'raw' && wrapRaw) {
        node.value = node.value
          .replace(
            RAW_TABLE_OPEN,
            (tag) => `<div class="${WRAPPER_CLASS}" role="region" tabindex="0" aria-label="${nextLabel()}">${tag}`
          )
          .replace(RAW_TABLE_CLOSE, (tag) => `${tag}</div>`);
        return;
      }
      if (node.type !== 'element' || node.tagName !== 'table' || !parent || index === undefined || isWrapper(parent)) {
        return;
      }
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: [WRAPPER_CLASS], role: 'region', tabIndex: 0, ariaLabel: nextLabel() },
        children: [node],
      };
    });
  };
}
