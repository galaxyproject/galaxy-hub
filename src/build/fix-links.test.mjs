import { fixImageLink } from "./fix-links.mjs";

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
        for (let [inputPath, expectedValue] of Object.entries(page.links)) {
            let result = fixImageLink(inputPath, page.dirPath);
            expect(result).toBe(expectedValue);
        }
    }
});
