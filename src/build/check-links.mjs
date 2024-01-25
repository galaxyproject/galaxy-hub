#!/usr/bin/env node

/*
Use broken-link-checker to look at all internal links, printing out in a format
suitable for github issue content.
*/
import blc from "broken-link-checker";
import fs from "fs";

// TODO: Make this configurable, or yagni?
const siteURL = "http://localhost:8080";
const outputFile = "./broken-links.md";
const options = {
    excludeExternalLinks: true,
};

const outTemplate = (pages, total, broken) => `
### 📝 Link summary of ${pages} pages checked

| 🔍 Checked | ✅ Successful | 🚫 Errors |
| ---------: | ------------: | --------: |
|    ${total}   |      ${total - broken}    |      ${broken}    |

### About this issue

This issue is automatically updated nightly by GitHub Actions CI.

For convenience in clicking through to a local development server to address these issues, links here are prefixed with the default local site URL -- these will also be viewable on galaxyproject.org.

Note that this list will get regenerated nightly, and any fixed links will get removed and new broken links will appear.  Checkmarks are included for a convenience in coordinating addressing these broken links, but their state will intentionally not survive the nightly re-check process in order to reflect an accurate state of the build.

### Individual Details

The following pages have broken links, which should be listed in the order they appear in the page source.

`;

// Our results blob
const customData = {
    pagesWithBrokenLinks: {},
    summary: {
        broken: 0,
        total: 0,
        pages: 0,
    },
    markdownReport: ``,
};

const siteChecker = new blc.SiteChecker(options, {
    link: function (result, customData) {
        /*
            This fires when a link is checked. If options.excludeExternalLinks
            is true, that exclusion happens prior to this callback.  

            Result object is structured like this:
            {
                url: {
                    original: "https://galaxyproject.eu/posts/2021/09/10/reports-ifb-elixir/",
                    resolved: "https://galaxyproject.eu/posts/2021/09/10/reports-ifb-elixir/",
                    redirected: null,
                },
                base: {
                    original: "http://localhost:8080",
                    resolved: "http://localhost:8080/",
                },
                html: {
                    index: 280,
                    offsetIndex: 31,
                    location: { line: 37, col: 478, startOffset: 37495, endOffset: 37563 },
                    selector:
                        "html > body > div:nth-child(1) > main:nth-child(2) > section:nth-child(3) > div:nth-child(2) > div:nth-child(1) > p:nth-child(3) > span:nth-child(1) > a:nth-child(1)",
                    tagName: "a",
                    attrName: "href",
                    attrs: {
                        href: "https://galaxyproject.eu/posts/2021/09/10/reports-ifb-elixir/",
                        "data-v-2c969a12": "",
                    },
                    text: "Annual reports 2020: ELIXIR and IFB",
                    tag: '<a href="https://galaxyproject.eu/posts/2021/09/10/reports-ifb-elixir/" data-v-2c969a12="">',
                },
                http: {
                    cached: false,
                    response: {
                        headers: [Object],
                        httpVersion: "1.1",
                        statusCode: 200,
                        statusMessage: "OK",
                        url: "https://galaxyproject.eu/posts/2021/09/10/reports-ifb-elixir/",
                        redirects: [],
                    },
                },
                broken: false,
                internal: false,
                samePage: false,
                excluded: false,
                brokenReason: null,
                excludedReason: null,
            };

            Here we increment summaries, and save the result to each page's list of broken links.
        */
        customData.summary.total++;
        if (result.broken) {
            customData.summary.broken++;
            let pageUrl = result.base.original;
            // Ensure source page ends with a slash for lookup.
            if (pageUrl[pageUrl.length - 1] !== "/") {
                pageUrl += "/";
            }
            customData.pagesWithBrokenLinks[pageUrl] = customData.pagesWithBrokenLinks[pageUrl] || [];
            customData.pagesWithBrokenLinks[pageUrl].push(result);
        }
    },
    page: function (error, pageUrl, customData) {
        /*
            This fires when a page is fully processed and links are checked.
            Page is done, go ahead and render out the page's report.
        */
        customData.summary.pages++;
        // If pageUrl doesn't end with a slash, add one for lookup.
        if (pageUrl[pageUrl.length - 1] !== "/") {
            pageUrl += "/";
        }
        if (customData.pagesWithBrokenLinks[pageUrl]) {
            customData.markdownReport += `#### ${pageUrl}\n`;
            for (const busted in customData.pagesWithBrokenLinks[pageUrl]) {
                customData.markdownReport += `- [ ] ${customData.pagesWithBrokenLinks[pageUrl][busted].url.original}\n`;
            }
            customData.markdownReport += `\n`;
        }
    },
    site: function (error, siteUrl, customData) {
        /* 
            Fires at the very end of site processing.  All there is to do now is
            close out the markdown report and write it out.
        */
        const output =
            outTemplate(customData.summary.pages, customData.summary.total, customData.summary.broken) +
            customData.markdownReport;
        fs.writeFileSync(outputFile, output);
        console.log(output);
        if (customData.summary.broken > 0) {
            process.exitCode = 1;
        }
    },
    // Unused hooks
    /* eslint-disable no-unused-vars */
    robots: function (robots, customData) {},
    html: function (tree, robots, response, pageUrl, customData) {},
    junk: function (result, customData) {},
    /* eslint-enable no-unused-vars */
    end: function () {},
});

siteChecker.enqueue(siteURL, customData);
