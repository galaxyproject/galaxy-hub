/** Fix the links in Markdown `![](images.jpg)` and `[hyper](links)`, and HTML `<img>`s and `<a>`s
 *  - Remove `/src` prefixes.
 *  - Remove `index.md` suffixes.
 *  - Make image links relative to the current directory.
 */

import nodePath from "path";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import { visit } from "unist-util-visit";
import urlParse from "url-parse";
import { rmPrefix, rmSuffix, matchesPrefixes } from "../utils.js";

// `verbose: true` makes the parser include position information for each property of each element.
// This is required for `editProperty()` to work.
const htmlParser = unified().use(rehypeParse, { fragment: true, verbose: true });
const globals = {};
// Prefixes that denote that the path is absolute and does not need altering.
//TODO: How about urls that begin with a domain but no protocol?
//      Check if that happens in the codebase.
const PREFIX_WHITELIST = ["http://", "https://", "mailto:", "/images/", "//", "#"];
const LINK_PROPS = { img: "src", a: "href" };
const LINK_FIXERS = { img: fixImageLink, a: fixHyperLink };

export default function attacher(options) {
    if (options === undefined) {
        options = {};
    }
    globals.debug = options.debug;
    // Implement the Transformer interface:
    // https://github.com/unifiedjs/unified#function-transformernode-file-next
    function transformer(tree, file) {
        globals.filePathRaw = file.path;
        if (globals.filePathRaw && file.cwd && options.bases && options.bases.reduce((a, b) => a || b)) {
            globals.dirPath = getDirPath(options.bases, file.cwd, globals.filePathRaw);
        } else {
            console.error("No `bases` option received. Will not be able to convert image src paths to relative paths.");
        }
        visit(tree, "link", (node) => {
            node.url = fixHyperLink(node.url);
        });
        visit(tree, "image", (node) => {
            node.url = fixImageLink(node.url);
        });
        visit(tree, "html", fixHtmlLinks);
    }
    return transformer;
}

/** Get the relative path of this file from the base directory.
 *  Multiple bases can be given and this will chose the one which results in the shortest relative path.
 */
function getDirPath(bases, cwd, filePathRaw) {
    let dirPaths = [];
    for (let base of bases.filter((b) => b)) {
        let filePath = getRelFilePath(cwd, filePathRaw, base);
        dirPaths.push(nodePath.dirname(filePath));
    }
    return pickShortest(dirPaths);
}

function pickShortest(items) {
    let minLen = null;
    let shortest;
    for (let item of items) {
        if (minLen === null) {
            minLen = item.length;
            shortest = item;
        } else if (item.length < minLen) {
            minLen = item.length;
            shortest = item;
        }
    }
    return shortest;
}

function getRelFilePath(cwd, rawPath, base) {
    // Get the path to the file at `rawPath` relative to the root directory `base`.
    if (nodePath.isAbsolute(base)) {
        let absPath = nodePath.join(cwd, rawPath);
        return nodePath.relative(base, absPath);
    } else {
        return nodePath.relative(base, rawPath);
    }
}

function fixHtmlLinks(node) {
    let html = node.value;
    let dom = htmlParser.parse(node.value);
    let elems = getElementsByTagNames(dom, ["a", "img"]);
    // Sort the list of elements in reverse order of where they appear in the `html` string.
    // If we didn't process elements in reverse order, then the offsets of elements later in the
    // string would become invalid after we replace elements earlier in the string.
    elems.sort((elem1, elem2) => elem2.position.start.offset - elem1.position.start.offset);
    for (let elem of elems) {
        let propName = LINK_PROPS[elem.tagName];
        let url = elem.properties[propName];
        if (!url) {
            continue;
        }
        let newUrl = LINK_FIXERS[elem.tagName](url);
        if (url == newUrl) {
            continue;
        }
        html = editProperty(html, elem, propName, newUrl);
    }
    node.value = html;
}

/** Replace the value of HTML property `propName` in `elem` with the value `value` by directly
 *  editing `htmlStr`.
 *  Note: This requires `elem` to be parsed from `htmlStr` using `rehype-parse` with `verbose` set
 *  to `true`.
 */
function editProperty(htmlStr, elem, propName, value) {
    // Note: This does not check if there are double-quotes in `value`.
    // That would result in invalid HTML.
    let propData = elem.data.position.properties[propName];
    let prefix = htmlStr.slice(0, propData.start.offset);
    let replacement = `${propName}="${value}"`;
    let suffix = htmlStr.slice(propData.end.offset);
    return prefix + replacement + suffix;
}

/** Find all the elements of a given type in a `hast` tree rooted at `elem`.
 * NOTE: `elem` should be of type `element` or `root`. This does not check that.
 */
function getElementsByTagNames(elem, tagNames) {
    let results = [];
    if (tagNames.includes(elem.tagName)) {
        results.push(elem);
    }
    for (let child of elem.children) {
        if (child.type === "element") {
            results = results.concat(getElementsByTagNames(child, tagNames));
        }
    }
    return results;
}

/** Perform all the editing appropriate for a hyperlink url (whether in HTML or Markdown). */
export function fixHyperLink(rawUrl) {
    // Skip certain types of links like external (https?://), static (/images/), intrapage (#).
    if (matchesPrefixes(rawUrl, PREFIX_WHITELIST)) {
        return rawUrl;
    }
    // Full parsing is needed to take care of situations like a trailing url #fragment.
    let isAbs = rawUrl.startsWith("/");
    let urlObj = new urlParse(rawUrl);
    let newPath = rmSuffix(rmPrefix(urlObj.pathname, "/src"), "index.md");
    urlObj.set("pathname", newPath);
    let fixedUrl = urlObj.toString();
    if (!isAbs) {
        // url-parse always makes the path absolute. At least it doesn't trim trailing dots like `URL()`.
        fixedUrl = rmPrefix(fixedUrl, "/");
    }
    if (globals.debug) {
        if (fixedUrl === rawUrl) {
            console.log(`Link:  Kept   ${rawUrl}`);
        } else {
            console.log(`Link:  Edited ${rawUrl} to ${fixedUrl}`);
        }
    }
    return fixedUrl;
}

/** Perform all the editing appropriate for an image src url (whether in HTML or Markdown). */
export function fixImageLink(rawPath) {
    let path = rmPrefix(rawPath, "/src");
    if (globals.dirPath) {
        path = toRelImagePath(globals.dirPath, path, PREFIX_WHITELIST);
    }
    if (globals.debug) {
        if (rawPath === path) {
            console.log(`Image: Kept ${path}`);
        } else {
            console.log(`Image: Edited ${rawPath} to ${path}`);
        }
    }
    return path;
}

function toRelImagePath(src, dst, whitelist) {
    for (let prefix of whitelist) {
        if (dst.startsWith(prefix)) {
            return dst;
        }
    }
    // Find a relative path from this page to the image.
    let relPath;
    if (nodePath.isAbsolute(dst)) {
        relPath = nodePath.relative("/" + src, dst);
    } else {
        relPath = dst;
    }
    if (relPath[0] !== "/" && relPath[0] !== ".") {
        relPath = "./" + relPath;
    }
    return relPath;
}
