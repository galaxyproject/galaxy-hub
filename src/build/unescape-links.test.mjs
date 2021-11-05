import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unescapeLink, isAutolink } from "./unescape-links.mjs";

// unescapeLink()

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

// isAutolink()

const POSSIBLE_AUTOLINKS = {
    "https://google.com": true,
    "http://google.org/full/path/with:colon": true,
    "mailto:person@email.com": true,
    "ftp:server.com": true,
    "localhost:8080/path?query=string&lang=en": true,
    "made-up-scheme://foo,bar": true,
    "relative/path": false,
    "/absolute/path": false,
    "path/with:colon": false,
};
test("Autolink detection", () => {
    let link = {
        type: "link",
        children: [{ type: "text" }],
    };
    for (let [url, expectedResult] of Object.entries(POSSIBLE_AUTOLINKS)) {
        link.url = url;
        link.children[0].value = url;
        expect(isAutolink(link)).toBe(expectedResult);
    }
});
