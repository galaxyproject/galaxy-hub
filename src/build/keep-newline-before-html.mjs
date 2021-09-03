/* This fixes the bug in remark-stringify where newlines get removed right before an `html` node,
 * even if you give a custom handler includes a newline in the output.
 * That apparently occurs here: https://github.com/syntax-tree/mdast-util-to-markdown/blob/f3df7410/lib/util/container-phrasing.js#L28
 * This implements a kludge where it inserts an empty `text` node just before the `html` node, which
 * seems to prevent the trimming of the newline.
 */
//TODO: Could properly extend `remark-stringify`. The documentation for `mdast-util-to-markdown` is
//      useless, but apparently `remark-gfm` is an example that does this.
//      Once you drill down through its code, it seems the heart of how `remark-gfm` extends it is:
//      https://github.com/syntax-tree/mdast-util-gfm/blob/main/to-markdown.js

import { visit } from "unist-util-visit";

const EXCLUDED = ["heading", "paragraph", "list", "thematicBreak", "html", "yaml"];

export default function attacher() {
    // Implement the Transformer interface:
    // https://github.com/unifiedjs/unified#function-transformernode-file-next
    function transformer(tree) {
        visit(tree, "html", fixer);
    }
    return transformer;
}

function fixer(node, index, parent) {
    let newChildren = [];
    let lastChild;
    for (let child of parent.children) {
        if (
            child.type == "html" &&
            lastChild &&
            !lastChild.keepNewlineKludge &&
            EXCLUDED.indexOf(lastChild.type) === -1
        ) {
            newChildren.push({ type: "text", value: "", keepNewlineKludge: true });
        }
        newChildren.push(child);
        lastChild = child;
    }
    parent.children = newChildren;
}
