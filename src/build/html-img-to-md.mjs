/* This replaces raw `<img>` tags with Markdown `![image](syntax.jpg)`, preserving attributes and
 * styling as much as possible.
 */
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import hastUtilToHtml from "hast-util-to-html";
import { visit } from "unist-util-visit";

const htmlParser = unified().use(rehypeParse, { fragment: true });
const globals = { visits: 0 };

export default function attacher(options) {
    if (options === undefined) {
        options = {};
    }
    // Implement the Transformer interface:
    // https://github.com/unifiedjs/unified#function-transformernode-file-next
    function transformer(tree) {
        globals.limit = options.limit;
        visit(tree, "html", replaceImgs);
    }
    return transformer;
}

function replaceImgs(rootNode, index, parent) {
    // `rootNode` is an `mdast` node of type `html`.
    globals.visits++;
    if (globals.limit && globals.visits > globals.limit) {
        return;
    }
    let html = rootNode.value;
    let dom = htmlParser.parse(html);
    let imgElems = findImgElems(dom);
    if (imgElems.length === 0) {
        return null;
    }
    //TODO: Sorting may not be necessary, but I'd have to verify that `findImgElems` always returns
    //      them in the right order.
    imgElems.sort((elem1, elem2) => elem1.position.start.offset - elem2.position.start.offset);
    // Only handle cases where the HTML is composed solely of `<img>` elements.
    // This avoids invalid HTML generated when this produces lone lines containing HTML with tags that
    // close elements opened in earlier lines. Markdown parsers enclose these lone lines with `<p>`
    // tags which interrupt the open elements and create tag soup.
    //TODO: Handle more complex cases.
    if (!containsOnlyImgs(imgElems, html.length)) {
        return null;
    }
    let replacements = [];
    for (let imgElem of imgElems) {
        // Replace the `<img>` itself with as many nodes as `convertImg()` decides is necessary.
        let imgElemReplacements = convertImg(imgElem);
        imgElemReplacements.forEach((node) => replacements.push(node));
    }
    // Replace the original node with the new set of nodes.
    parent.children.splice(index, 1, ...replacements);
}

/** Does this HTML fragment contain only `<img>` elements?
 * `imgElems`: The `<img>` elements parsed from the HTML using `rehype-parse`
 *   (the output of `findImgElems()`).
 * `htmlLength`: The length of the HTML string parsed by `rehype-parse`.
 */
function containsOnlyImgs(imgElems, htmlLength) {
    let lastImgEnd = 0;
    for (let imgElem of imgElems) {
        if (imgElem.position.start.offset !== lastImgEnd) {
            return false;
        }
        lastImgEnd = imgElem.position.end.offset;
    }
    if (lastImgEnd !== htmlLength) {
        return false;
    }
    return true;
}

function findImgElems(elem) {
    // `elem` should be of type `element` or `root`. This does not check that.
    if (elem.tagName === "img") {
        return [elem];
    } else {
        let imgElems = [];
        for (let child of elem.children) {
            if (child.type === "element") {
                imgElems = imgElems.concat(findImgElems(child));
            }
        }
        return imgElems;
    }
}

function convertImg(img) {
    let divStart = makeImgWrapper(img);
    // See the mdast spec for representing Markdown nodes: https://github.com/syntax-tree/mdast#image
    let imgMd = {
        type: "image",
        title: img.properties.title || null,
        url: img.properties.src,
        alt: img.properties.alt,
        // `position` intentionally omitted: it should not be included for generated nodes:
        // https://github.com/syntax-tree/unist#position
    };
    if (divStart) {
        let divEnd = { type: "html", value: "</div>" };
        return [divStart, imgMd, divEnd];
    } else {
        return [imgMd];
    }
}

function makeImgWrapper(img) {
    let wrapperNeeded = false;
    // class
    let classes = ["img-sizer"];
    if (img.properties.className) {
        classes = classes.concat(img.properties.className);
        wrapperNeeded = true;
    }
    // align
    if (img.properties.align) {
        if (img.properties.align === "right") {
            classes.push("float-right");
            wrapperNeeded = true;
        } else {
            console.error(`<img> found with unrecognized "align" property "${img.properties.align}"`);
        }
    }
    // width, height
    let styles = {};
    let width = translateCssDimension(img.properties.width);
    let height = translateCssDimension(img.properties.height);
    if (width) {
        styles["width"] = width;
        wrapperNeeded = true;
    }
    if (height) {
        styles["height"] = height;
        wrapperNeeded = true;
    }
    // style
    let styleStrs = [];
    if (img.properties.style) {
        //TODO: Double-check if any types of styles need special handling.
        styleStrs.push(img.properties.style);
        wrapperNeeded = true;
    }
    if (Object.keys(styles).length > 0) {
        styleStrs.push(stringifyStyles(styles));
        wrapperNeeded = true;
    }
    if (!wrapperNeeded) {
        return;
    }
    let wrapper = {
        type: "element",
        tagName: "div",
        properties: {
            className: classes,
        },
    };
    if (styleStrs.length > 0) {
        wrapper.properties.style = styleStrs.join(";");
    }
    let wrapperStrRaw = hastUtilToHtml(wrapper);
    // Remove the closing `</div>`.
    let wrapperStr = wrapperStrRaw.slice(0, wrapperStrRaw.length - 6);
    return { type: "html", value: wrapperStr };
}

function translateCssDimension(cssDimension) {
    if (cssDimension) {
        let [value, unit] = parseCssDimension(cssDimension);
        if (value) {
            return `${value}${unit}`;
        }
    }
}

function parseCssDimension(rawValue) {
    if (Number.isInteger(rawValue)) {
        return [rawValue, "px"];
    }
    let value = parseInt(rawValue);
    let unit;
    if (isNaN(value)) {
        console.error(`Non-integer value found in CSS dimension ${JSON.stringify(rawValue)}`);
    } else {
        let intLen = String(value).length;
        unit = rawValue.slice(intLen).trim();
    }
    if (unit === "") {
        unit = "px";
    } else if (!(unit === "px" || unit === "%")) {
        console.error(`Unrecognized CSS unit ${JSON.stringify(unit)}`);
    }
    return [value, unit];
}

function stringifyStyles(styles) {
    let styleStrs = [];
    for (let [key, value] of Object.entries(styles)) {
        styleStrs.push(`${key}: ${value}`);
    }
    return styleStrs.join(";");
}
