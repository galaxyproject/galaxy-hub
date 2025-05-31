#!/usr/bin/env node

/*
Use linkinator to look at all internal links, printing out in a format
suitable for github issue content.
*/
import { LinkChecker } from "linkinator";
import fs from "fs";

// TODO: Make this configurable, or yagni?
const siteURL = "http://127.0.0.1:8080";
// const siteURL = "./dist/";
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

    // Track broken links by page
    const brokenLinksByPage = {};
    let brokenCount = 0;
    let totalCount = 0;
    let pagesChecked = new Set();

    try {
        console.log(`Checking links starting from ${siteURL}`);

        // Create a new LinkChecker instance with proper config
        const checker = new LinkChecker();

        // Listen to the "link" event to get data on each link
        checker.on("link", (result) => {
            totalCount++;

            if (result.state === "BROKEN") {
                brokenCount++;

                // Extract the parent page URL
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

        // Started event for logging
        checker.on("pagestart", (url) => {
            pagesChecked.add(url);
            console.log(`Checking: ${url}`);
        });

        const skipLinkChecker = async (url) => {
            // Skip external links
            if (url.startsWith("http") && !url.startsWith(siteURL)) {
                console.debug("Skipping external link:", url);
                return true;
            }
            return false;
        };

        // Start the check with configuration as parameter
        const result = await checker.check({
            path: siteURL,
            recurse: true,
            // Only check local links - exclude external links
            excludeExternalLinks: true,
            // Focus only on links within the localhost domain
            linksToSkip: skipLinkChecker,
            timeout: 30000, // 30 seconds
            concurrency: 100, // Number of concurrent requests
        });

        console.log(`Completed checking ${result.links.length} links`);

        // Generate markdown report
        let markdownReport = "";

        for (const [page, links] of Object.entries(brokenLinksByPage)) {
            markdownReport += `#### ${page}\n`;
            for (const link of links) {
                markdownReport += `- [ ] ${link.url} (${link.status}: ${link.statusText || "Unknown error"})\n`;
            }
            markdownReport += "\n";
        }

        const output = outTemplate(pagesChecked.size, totalCount, brokenCount) + markdownReport;

        // Write report to file
        fs.writeFileSync(outputFile, output);

        // Print the report to console
        console.log(output);

        // Set exit code if there are broken links
        if (brokenCount > 0) {
            process.exitCode = 1;
        }

        console.log("Link checker completed successfully");
    } catch (error) {
        console.error("Error during link checking:", error);
        process.exitCode = 1;
    }
}

// Run the async function
checkLinks();
