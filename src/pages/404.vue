<template>
    <Layout>
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
    mounted() {
        // Try seeing if the url is different under Gridsome's slugification rules.
        // If so, try redirecting to that.
        let url = new URL(window.location.href);
        url.pathname = gridifyPath(url.pathname);
        if (window.location.href !== url.href) {
            console.log(repr`Redirecting to slugified url ${url.href}`);
            doRedirect(url.href);
        }
    },
};
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
