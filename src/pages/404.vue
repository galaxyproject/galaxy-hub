<template>
    <Layout>
        <div v-if="this.redirectUrl" class="redirect alert alert-warning trim-p">
            <p>
                This url is no longer valid. Perhaps you meant
                <a :href="this.redirectUrl">{{ this.redirectUrl }}</a>
                ?
            </p>
            <p>You will be redirected in {{ redirectDelay }} seconds.</p>
        </div>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
    </Layout>
</template>

<script>
import { repr, gridifyPath, doRedirect } from "~/utils.js";
export default {
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
    data() {
        return {
            redirectDelay: 5,
            redirectUrl: undefined,
        };
    },
    mounted() {
        // If the url is different under Gridsome's slugification rules, redirect to that.
        this.redirectUrl = doRedirectIfNeeded(window.location.href, window.location.pathname, this.redirectDelay);
    },
};
function doRedirectIfNeeded(currentUrl, currentPath, redirectDelay) {
    let redirectUrl = currentUrl;
    let url = new URL(currentUrl);
    if (isFilenamePath(url.pathname)) {
        return;
    }
    url.pathname = gridifyPath(url.pathname);
    if (url.href !== currentUrl) {
        redirectUrl = url.href;
        console.log(repr`Redirecting to slugified url ${redirectUrl} in ${redirectDelay} seconds.`);
        setTimeout(() => doRedirect(redirectUrl, currentPath), redirectDelay * 1000);
        return redirectUrl;
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
