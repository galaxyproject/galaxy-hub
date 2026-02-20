#!/usr/bin/env node

/*
Use linkinator to crawl all internal links on the built Astro site,
producing a markdown report suitable for posting to a GitHub issue.
*/
import { LinkChecker } from "linkinator";
import fs from "fs";

const port = process.env.PORT || 4321;
const siteURL = `http://localhost:${port}`;
const outputFile = "./broken-links.md";

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

async function checkLinks() {
    console.log("Starting link checking process...");

    const brokenLinksByPage = {};
    let brokenCount = 0;
    let totalCount = 0;
    let pagesChecked = new Set();

    try {
        console.log(`Checking links starting from ${siteURL}`);

        const checker = new LinkChecker();

        checker.on("link", (result) => {
            totalCount++;

            if (result.state === "BROKEN") {
                brokenCount++;

                const parentPage = result.parent || siteURL;
                pagesChecked.add(parentPage);

                if (!brokenLinksByPage[parentPage]) {
                    brokenLinksByPage[parentPage] = [];
                }

                brokenLinksByPage[parentPage].push({
                    url: result.url,
                    status: result.status,
                    statusText: result.statusText,
                });
            }
        });

        checker.on("pagestart", (url) => {
            pagesChecked.add(url);
            console.log(`Checking: ${url}`);
        });

        const skipLinkChecker = async (url) => {
            if (url.startsWith("http") && !url.startsWith(siteURL)) {
                console.debug("Skipping external link:", url);
                return true;
            }
            return false;
        };

        const result = await checker.check({
            path: siteURL,
            recurse: true,
            excludeExternalLinks: true,
            linksToSkip: skipLinkChecker,
            timeout: 30000,
            concurrency: 100,
        });

        console.log(`Completed checking ${result.links.length} links`);

        let markdownReport = "";

        for (const [page, links] of Object.entries(brokenLinksByPage)) {
            markdownReport += `#### ${page}\n`;
            for (const link of links) {
                markdownReport += `- [ ] ${link.url} (${link.status}: ${link.statusText || "Unknown error"})\n`;
            }
            markdownReport += "\n";
        }

        const output = outTemplate(pagesChecked.size, totalCount, brokenCount) + markdownReport;

        fs.writeFileSync(outputFile, output);

        console.log(output);

        if (brokenCount > 0) {
            process.exitCode = 1;
        }

        console.log("Link checker completed successfully");
    } catch (error) {
        console.error("Error during link checking:", error);
        process.exitCode = 1;
    }
}

checkLinks();
