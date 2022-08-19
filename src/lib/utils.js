const util = require("util");
const remark = require("remark");
const remarkHtml = require("remark-html");
const slugify = require("@sindresorhus/slugify");
const urlParse = require("url-parse");
const CONFIG = require("../../config.json");
const TO_STRING = {}.toString;

/* Using a kludge here to allow:
 * 1) importing this as a module with the `import` statement
 * 2) importing this into non-modules with the `require` function
 * 3) easily referencing these functions from other functions in the same file
 * That's the `module.exports.repr = repr` pattern.
 */

/** Template literal tag that converts all embedded values to their literal representations.
 *  Uses `util.inspect()` for the conversions.
 *  Alternatively, this can be used as a (single-argument) alias for `util.inspect`.
 *  Just call it as a regular function with one argument (E.g. `repr(obj)`).
 */
function repr(strParts, ...values) {
    if (strParts.length === undefined && values.length === 0) {
        // Being used as a util.inspect alias.
        return util.inspect(strParts, { breakLength: Infinity });
    }
    let outParts = [];
    for (let i = 0; i < strParts.length || i < values.length; i++) {
        if (i < strParts.length) {
            outParts.push(strParts[i]);
        }
        if (i < values.length) {
            outParts.push(util.inspect(values[i]));
        }
    }
    return outParts.join("");
}
module.exports.repr = repr;

/** Truncate long strings with an ellipsis, and leave alone strings that are already short enough. */
function trunc(str, maxLen, endChar = "…") {
    if (str.length > maxLen) {
        return str.slice(0, maxLen) + endChar;
    } else {
        return str;
    }
}
module.exports.trunc = trunc;

function splitlines(text) {
    return text.split(/\r\n|\r|\n/);
}
module.exports.splitlines = splitlines;

function mdToHtml(md, rmP = true) {
    let rawHtml;
    remark()
        .use(remarkHtml, { sanitize: false })
        .process(md, (err, file) => {
            if (err) {
                console.error(err);
            } else {
                rawHtml = String(file).trim();
            }
        });
    if (rmP) {
        return rmPrefix(rmSuffix(rawHtml, "</p>"), "<p>");
    } else {
        return rawHtml;
    }
}
module.exports.mdToHtml = mdToHtml;

function gridifyPath(rawPath) {
    let decodedPath = decodeURI(rawPath);
    let rawParts = decodedPath.split("/");
    let lastPart = rawParts[rawParts.length - 1];
    if (lastPart.endsWith(".html")) {
        rawParts[rawParts.length - 1] = rmSuffix(lastPart, ".html");
        rawParts.push("");
    }
    let sluggedParts = rawParts.map(slugify);
    let fixedPath = sluggedParts.join("/");
    return ensureSuffix(fixedPath, "/");
}
module.exports.gridifyPath = gridifyPath;

/** Does the given string start with any of the given prefixes?
 * @param {String} string  String that may or may not contain the prefixes.
 * @param {Array} prefixes An array of strings - the prefixes.
 * @returns {Boolean} `true` if `string` starts with any of the given `prefixes`, `false` otherwise.
 */
function matchesPrefixes(string, prefixes) {
    for (let prefix of prefixes) {
        if (string.startsWith(prefix)) {
            return true;
        }
    }
    return false;
}
module.exports.matchesPrefixes = matchesPrefixes;

function ensurePrefix(string, prefix) {
    if (string.startsWith(prefix)) {
        return string;
    } else {
        return prefix + string;
    }
}
module.exports.ensurePrefix = ensurePrefix;

function ensureSuffix(string, suffix) {
    if (string.endsWith(suffix)) {
        return string;
    } else {
        return string + suffix;
    }
}
module.exports.ensureSuffix = ensureSuffix;

function rmPrefix(rawString, prefix) {
    if (rawString.startsWith(prefix)) {
        return rawString.slice(prefix.length);
    } else {
        return rawString;
    }
}
module.exports.rmPrefix = rmPrefix;

function rmSuffix(rawString, suffix) {
    let suffixIndex = rawString.length - suffix.length;
    if (rawString.slice(suffixIndex) === suffix) {
        return rawString.slice(0, suffixIndex);
    } else {
        return rawString;
    }
}
module.exports.rmSuffix = rmSuffix;

function rmPathPrefix(path, depth, absolute = null) {
    let inputIsAbsolute = path.startsWith("/");
    if (inputIsAbsolute) {
        depth++;
    }
    if (absolute === null) {
        absolute = inputIsAbsolute;
    }
    let fields = path.split("/");
    let newPath = fields.slice(depth).join("/");
    if (absolute) {
        return "/" + newPath;
    } else {
        return newPath;
    }
}
module.exports.rmPathPrefix = rmPathPrefix;

/**
 * Make sure a url includes a domain name.
 * @param {String} rawUrl The input url. Currently this only handles two types of urls: (1) fully qualified ones
 *                        including a scheme and domain and (2) absolute urls (without a domain, starting with a slash).
 * @param {String} defaultDomain
 * @param {String} defaultScheme
 */
function ensureDomain(rawUrl, defaultDomain = CONFIG.host, defaultScheme = "https") {
    // Note: url-parse doesn't handle urls missing only the scheme, like google.com/path.
    // Handling these is tricky anyway, since that could also be a valid relative url.
    let url = urlParse(rawUrl, {});
    if (!url.protocol) {
        url.set("protocol", defaultScheme);
    }
    if (!url.hostname) {
        url.set("hostname", defaultDomain);
    }
    return url.href;
}
module.exports.ensureDomain = ensureDomain;

/** Human readable format of a date span
 * @param {Object} dayjs startDate
 * @param {Object} dayjs endDate
 */
function humanDateSpan(startDate, endDate) {
    if (startDate.year() === endDate.year()) {
        if (startDate.month() === endDate.month()) {
            // Same month
            // January 5 - 8, 2021
            return `${startDate.format("MMMM DD")} - ${endDate.format("DD")}, ${endDate.format("YYYY")}`;
        } else {
            // Same year.
            // January 5 - February 8, 2021
            return `${startDate.format("MMMM D")} - ${endDate.format("MMMM D")}, ${endDate.format("YYYY")}`;
        }
    } else {
        // January 5 2021 - February 8, 2022
        return `${startDate.format("MMMM D YYYY")} - ${endDate.format("MMMM D YYYY")}`;
    }
}
module.exports.humanDateSpan = humanDateSpan;

/** Create a human-readable summary of a Markdown document tree.
 * @param {Array} nodes          A list of [mdast](https://github.com/syntax-tree/mdast) nodes.
 * @param {String} [indent="  "] A string to prefix each line with.
 * @returns {String} The summary as several lines concatenated with '\n'.
 */
function summarizeMdNodes(nodes, indent = "  ") {
    let lines = [];
    for (let node of nodes) {
        let line = indent + node.type;
        switch (node.type) {
            case "html":
                line += ": " + trunc(util.inspect(node.value, { breakLength: Infinity }), 80);
                break;
            case "heading":
                line += " " + node.depth;
                if (node.data && node.data.id) {
                    line += ": " + node.data.id;
                }
                break;
            case "list":
                line += `: ${node.children.length} items`;
                break;
            default:
                if (node.children) {
                    line += `: ${node.children.length} children`;
                }
        }
        lines.push(line);
    }
    return lines.join("\n");
}
module.exports.summarizeMdNodes = summarizeMdNodes;

/** A better alternative to `typeof`.
 * Adapted from https://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
 * @param {*} value  Any value, including `null` and `undefined`.
 * @returns {String} The type of value passed:
 *   undefined  "Undefined"
 *   null       "Null"
 *   1          "Number"
 *   NaN        "Number" (sorry)
 *   Infinity   "Number"
 *   false      "Boolean"
 *   'string'   "String"
 *   []         "Array"
 *   {}         "Object"
 *   isNaN      "Function"
 *   _ => {}    "Function"
 *   new Date() "Date"
 */
function getType(value) {
    let rawToString = TO_STRING.call(value);
    let fields = rawToString.split(" ");
    if (fields.length !== 2) {
        console.error(repr`Wrong number of fields in toString: ${fields}`);
        return null;
    }
    if (!fields[1].endsWith("]")) {
        console.error(repr`Unexpected toString value - no ending ']': ${rawToString}`);
        return null;
    }
    return fields[1].slice(0, fields[1].length - 1);
}
module.exports.getType = getType;
