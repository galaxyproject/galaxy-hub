import nodePath from "path";

export const HEADING_TEXT = "table-of-contents";
export const HEADING_ENDING = "end-table-of-contents";

/**
 * @param {Object}  [opts]
 * @param {boolean} [opts.onlyIfHeadings=false]
 *   Only add a table of contents if there is at least one heading present in the page.
 * @param {string}  [opts.includeFilename]
 *   Only add a table of contents to files with this filename.
 * @param {string}  [opts.position='start']
 *   Where to add the table of contents:
 *     'start': Before the page contents (default).
 *     'end':   After the page contents.
 */
export default function attacher(opts) {
    if (opts === undefined) {
        opts = {};
    }
    function transformer(tree, file) {
        if (opts.includeFilename) {
            let path = getPath(file);
            if (path && nodePath.basename(path) !== opts.includeFilename) {
                return;
            }
        }
        if (opts.onlyIfHeadings && !getHasHeadings(tree)) {
            return;
        }
        let hasMetadata = getHasMetadata(tree);
        if (!getHasContent(tree, hasMetadata)) {
            return;
        }
        let insertionIndex;
        if (opts.position === "end") {
            insertionIndex = tree.children.length;
        } else {
            if (hasMetadata) {
                insertionIndex = 1;
            } else {
                insertionIndex = 0;
            }
        }
        addToc(tree, insertionIndex);
    }
    return transformer;
}

function getPath(file) {
    if (file.fileInfo && file.fileInfo.path) {
        // file.fileInfo.path gives a relative path to the Markdown file.
        return file.fileInfo.path;
    } else if (file.data) {
        if (file.data.node && file.data.node.fileInfo) {
            // file.data.node.fileInfo.path gives the same sort of path as file.fileInfo.path.
            return file.data.node.fileInfo.path;
        } else if (file.data.resourcePath) {
            // file.data.resourcePath gives an absolute, symlink resolved path.
            return file.data.resourcePath;
        } else if (file.history && file.history.length > 0) {
            return file.history[0];
        } else {
            console.error("toc-add.mjs error: No path found.");
        }
    }
}

function getHasMetadata(tree) {
    if (tree.children.length >= 1 && tree.children[0].type === "yaml") {
        return true;
    } else {
        return false;
    }
}

function getHasContent(tree, hasMetadata) {
    if (hasMetadata) {
        if (tree.children.length >= 2) {
            return true;
        }
    } else {
        if (tree.children.length >= 1) {
            return true;
        }
    }
    return false;
}

function getHasHeadings(tree) {
    for (let node of tree.children) {
        if (node.type === "heading") {
            return true;
        }
    }
    return false;
}

function addToc(tree, insertionIndex) {
    let tocHeading = makeHeading(HEADING_TEXT);
    tree.children.splice(insertionIndex, 0, tocHeading);
    if (insertionIndex + 1 < tree.children.length) {
        // If we're adding it to the very end, we don't need an ending heading.
        let tocEnding = makeHeading(HEADING_ENDING);
        tree.children.splice(insertionIndex + 1, 0, tocEnding);
    }
}

function makeHeading(text) {
    return {
        type: "heading",
        depth: 1,
        children: [
            {
                type: "text",
                value: text,
            },
        ],
    };
}

export function rmToc(inputLines) {
    let outputLines = [];
    let state = "start";
    let omit = false;
    for (let line of inputLines) {
        switch (state) {
            case "start":
                if (line.startsWith(HEADING_TEXT)) {
                    state = "in start heading";
                    omit = true;
                } else {
                    omit = false;
                }
                break;
            case "in start heading":
                if (line.startsWith("===")) {
                    state = "after start heading";
                    omit = true;
                } else {
                    //TODO: Go back and include the previous line if we don't see a "===" after the start heading.
                    //      Just in case a page coincidentally includes the start heading text.
                    omit = false;
                }
                break;
            case "after start heading":
                if (line.startsWith(HEADING_ENDING)) {
                    state = "in end heading";
                    omit = true;
                } else {
                    omit = false;
                }
                break;
            case "in end heading":
                if (line.startsWith("===")) {
                    state = "after end heading";
                    omit = true;
                } else {
                    omit = false;
                    //TODO: Go back and include previous line here too.
                }
                break;
            case "after end heading":
                omit = false;
                break;
        }
        if (!omit) {
            outputLines.push(line);
        }
    }
    return outputLines;
}
