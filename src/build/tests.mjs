// fix-links.mjs

import { fixHyperLink } from "./fix-links.mjs";

const WHITELISTED_HREFS = [
    "http://google.com/search/index.md?q=query",
    "mailto:dave@galaxy.org/index.md",
    "/images/logos/index.md",
    "//protocol/relative/index.md",
    "#anchor-link/index.md",
];
test("Prefix whitelist", () => {
    for (let rawHref of WHITELISTED_HREFS) {
        let result = fixHyperLink(rawHref);
        expect(result).toBe(rawHref);
    }
});

const ABSOLUTE_HREFS = {
    "/src/index.md": "/",
    "/src/admin/index.md": "/admin/",
    "/src/tutorials/ngs/index.md": "/tutorials/ngs/",
    "/src/tutorials/ngs/index.md#anchor-link": "/tutorials/ngs/#anchor-link",
    "/src/tutorials/ngs/index.md?q=query#anchor-link": "/tutorials/ngs/?q=query#anchor-link",
    "/src/images/logos/gxy.jpg": "/images/logos/gxy.jpg",
};
test("Fix absolute urls", () => {
    for (let [rawHref, expectedValue] of Object.entries(ABSOLUTE_HREFS)) {
        let result = fixHyperLink(rawHref);
        expect(result).toBe(expectedValue);
    }
});

const RELATIVE_HREFS = {
    sibling: "sibling",
    "sibling/index.md": "sibling/",
    "sibling/index.md#anchor": "sibling/#anchor",
    "./sibling": "./sibling",
    "grand/nephew": "grand/nephew",
    "../uncle": "../uncle",
};
test("Fix relative urls", () => {
    for (let [rawHref, expectedValue] of Object.entries(RELATIVE_HREFS)) {
        let result = fixHyperLink(rawHref);
        expect(result).toBe(expectedValue);
    }
});

// unescape-links.mjs
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import unescapeLink from "./unescape-links.mjs";

const UNALTERED_LINKS = [
    "[Google](https://google.com/search?channel=fs&q=query)",
    "[](https://google.com/search?channel=fs&q=query)",
    "[ ](https://google.com/search?channel=fs&q=query)",
    "[Search](https://galaxyproject.org/search/?q=query#gsc.tab=0&gsc.q=query&gsc.page=1)",
    '[Google *search*](https://google.com/search?channel=fs&q=query "This is a title"))',
    `[Google](https://google.com/search?channel=fs&q=query 'A "title"')`,
    "[![Google](https://google.com/logo.jpg)](https://google.com/search?channel=fs&q=query)",
    '[\nGoogle *search*\n![alt](img.jpg)\n](https://google.com/search?channel=fs&q=query "Title text")',
    "<https://google.com/search?channel=fs&q=query>",
];
const ALTERED_LINKS = {
    '[Google *search*](https://google.com/search?channel=fs&q=query ""))':
        "[Google *search*](https://google.com/search?channel=fs&q=query))",
    "[ Google ]( https://google.com/search?channel=fs&q=query )":
        "[ Google ](https://google.com/search?channel=fs&q=query)",
};
test("Unescape links", () => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkStringify, { resourceLink: false, handlers: { link: unescapeLink } });
    let testCases = {};
    Object.assign(testCases, ALTERED_LINKS);
    for (let input of UNALTERED_LINKS) {
        testCases[input] = input;
    }
    for (let [input, expectedValue] of Object.entries(testCases)) {
        let tree = processor.parse(input);
        let result = processor.stringify(tree);
        expect(result).toBe(expectedValue + "\n");
    }
});
