#!/usr/bin/env node
import { unified } from "unified";
import remarkStringify from "remark-stringify";

const QUOTE_MAP = { '"': "'", "'": '"' };
const remarkCompiler = unified().use(remarkStringify);

export function unescapeLink(node, parent, context) {
    /** Custom handler for Link mdast nodes. This prevents special characters like `&` and `_` from being escaped in
     * link urls.
     */
    /* We can't just compile the node with the default handler, then use the
     * node's position data to replace the url in the resulting string.
     * Firstly, the input node's position data refers to the position in the originally parsed file,
     * but different plugins may have altered it between parsing the file and receiving it here.
     * Second, there's no position data on where the individual elements of the link are (the url, the title, etc).
     * So instead we stringify it manually, except the child elements which we use remark to stringify separately.
     */
    if (!context.options.resourceLink && isAutolink(node)) {
        return `<${node.url}>`;
    }
    let childrenStrRaw;
    if (node.children.length === 0) {
        childrenStrRaw = "";
    } else if (node.children.length === 1) {
        childrenStrRaw = remarkCompiler.stringify(node.children[0]);
    } else {
        // Make a copy of the original node, but replace the url with a simple dummy one of known length ("/") and remove
        // any title.
        let dummyNode = {};
        Object.assign(dummyNode, node);
        dummyNode.url = "/";
        dummyNode.title = null;
        let dummyStr = remarkCompiler.stringify(dummyNode);
        childrenStrRaw = dummyStr.slice(1, dummyStr.length - 4);
    }
    let childrenStr = "";
    if (childrenStrRaw) {
        // Remove the trailing newline inserted by remark.
        childrenStr = childrenStrRaw.slice(0, childrenStrRaw.length - 1);
    }
    let titleStr = "";
    if (node.title !== null) {
        // Quote the title with the user-preferred quote character, if possible.
        let quote = context.options.quote || '"';
        if (node.title.includes(quote)) {
            let otherQuote = QUOTE_MAP[quote];
            titleStr = ` ${otherQuote}${node.title}${otherQuote}`;
        } else {
            titleStr = ` ${quote}${node.title}${quote}`;
        }
    }
    //TODO: A url shouldn't ever have parentheses in it, but double-check this is impossible.
    return `[${childrenStr}](${node.url}${titleStr})`;
}

export function isAutolink(node) {
    // Autolinks have only a simple text node as their only child.
    if (!(node.children.length === 1 && node.children[0].type === "text")) {
        return false;
    }
    let text = node.children[0].value;
    // Their `url` field is the same as the value of their child text node.
    if (text !== node.url) {
        return false;
    }
    // The url must be absolute (containing a scheme).
    let parts = node.url.split(":");
    if (parts.length < 2 || ! parts[1]) {
        return false;
    }
    // But the scheme can't contain a slash. This excludes urls which are actually relative paths with a colon in them.
    let scheme = parts[0];
    if (scheme.includes("/")) {
        return false;
    }
    return true;
}
