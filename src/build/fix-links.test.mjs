import { globals, fixImageLink, fixHyperLink } from "./fix-links.mjs";

// fixHyperLink()

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

// fixImageLink()

const IMAGE_LINKS = [
    {
        dirPath: "events/gcc2013/abstracts/talks",
        links: {
            "/events/gcc2013/abstracts/talks/ElvindHovig.jpg": "./ElvindHovig.jpg",
            "/events/gcc2013/abstracts/talks/subdir/img.jpg": "./subdir/img.jpg",
            "/src/events/gcc2012/abstracts/Cuccuru.jpg": "../../../gcc2012/abstracts/Cuccuru.jpg",
            "/events/gcc2012/abstracts/Cuccuru.jpg": "../../../gcc2012/abstracts/Cuccuru.jpg",
            "/news/post/image.png": "../../../../news/post/image.png",
            "relative/path.svg": "./relative/path.svg",
            "local-img.jpeg": "./local-img.jpeg",
            "/src/images/people/team/ross.jpg": "/images/people/team/ross.jpg",
            "/images/people/team/ross.jpg": "/images/people/team/ross.jpg",
            "https://example.com/image.jpg": "https://example.com/image.jpg",
        },
    },
];
test("Fix image links", () => {
    for (let page of IMAGE_LINKS) {
        globals.dirPath = page.dirPath;
        for (let [inputPath, expectedValue] of Object.entries(page.links)) {
            let result = fixImageLink(inputPath);
            expect(result).toBe(expectedValue);
        }
    }
});
