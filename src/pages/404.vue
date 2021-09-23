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
        let currentUrl = window.location.href;
        let url = new URL(currentUrl);
        url.pathname = gridifyPath(url.pathname);
        if (url.href !== currentUrl) {
            this.redirectUrl = url.href;
            console.log(repr`Redirecting to slugified url ${this.redirectUrl} in ${this.redirectDelay} seconds.`);
            let currentPath = window.location.pathname;
            setTimeout(() => doRedirect(this.redirectUrl, currentPath), this.redirectDelay * 1000);
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
