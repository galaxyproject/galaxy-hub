<template>
    <Layout>
        <Redirect
            v-if="redirectUrl"
            :pre-text="redirectPreText"
            :url="redirectUrl"
            :post-text="redirectPostText"
            :location="location"
        >
        </Redirect>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
    </Layout>
</template>

<script>
import Redirect from "@/components/Redirect";
import { repr, gridifyPath } from "~/lib/utils.js";
export default {
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
    components: {
        Redirect,
    },
    data() {
        return {
            location: undefined,
            redirectUrl: undefined,
            redirectPreText: "This url is no longer valid. Perhaps you meant ",
            redirectPostText: "?",
        };
    },
    mounted() {
        // This has to be set in mounted() because window does not exist when building.
        // This will execute in the browser on page load.
        this.location = window.location;

        // Check if this is an old blog URL and redirect to news
        const blogRedirect = checkBlogRedirect(window.location.pathname);
        if (blogRedirect) {
            this.redirectUrl = blogRedirect;
            this.redirectPreText =
                "Blog posts have been merged into the news section of the hub. You will be redirected to ";
            this.redirectPostText = ".";
            return;
        }

        // If the url is different under Gridsome's slugification rules, redirect to that.
        this.redirectUrl = doRedirectIfNeeded(window.location.href);
    },
};
function checkBlogRedirect(pathname) {
    // Check if this is an old /blog/ URL pattern
    if (pathname.startsWith("/blog/")) {
        // Replace /blog/ with /news/ in the pathname
        const newsPath = pathname.replace(/^\/blog\//, "/news/");

        // Return the full URL with the new path
        return window.location.origin + newsPath + window.location.search + window.location.hash;
    }
    return null;
}
function doRedirectIfNeeded(currentUrl) {
    let url = new URL(currentUrl);
    if (isFilenamePath(url.pathname)) {
        console.log("Current url path looks like a filename.");
        return;
    }
    url.pathname = gridifyPath(url.pathname);
    if (url.href !== currentUrl) {
        console.log(repr`Slugified url ${url.href} is different from current one.`);
        return url.href;
    }
}
/** Does the path look like it ends with a filename?
 * Returns `true` if the filename at the end of the path has a file extension no longer than `maxExtLen`.
 * Note: Paths that end in "/" or that have no "." after the last "/" will return `false`.
 */
function isFilenamePath(path, maxExtLen = 6) {
    let pathParts = path.split("/");
    let filename = pathParts[pathParts.length - 1];
    let fileParts = filename.split(".");
    let ext = fileParts[fileParts.length - 1];
    if (ext && ext.length <= maxExtLen) {
        return true;
    }
    return false;
}
</script>

<page-query>
query {
    main: insert(path: "/insert:/404/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
}
</page-query>
