<template>
    <Layout>
        <ArticleHeader :article="$page.article" />
        <article class="content markdown">
            <VueRemarkContent>
                <!--
                    Insert the content for each `<slot>` in the Markdown.
                    `#[insert.name]` (shorthand for `v-slot:[insert.name]`) identifies which slot each `<template>`
                    replaces. `[insert.name]` allows the slot name to be dynamic, based on the value of the
                    `insert.name` variable: https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names
                -->
                <template v-for="insert of $page.article.inserts" #[insert.name]>
                    <p class="markdown" :key="insert.name + ':md'" v-html="mdToHtml(insert.content)" />
                    <p class="d-none" :key="insert.name + ':p'">Issue #758 workaround</p>
                </template>
            </VueRemarkContent>
        </article>
        <ArticleFooter :article="$page.article" />
    </Layout>
</template>

<page-query>
query VueArticle($path: String!) {
   article: vueArticle(path: $path) {
    id
    title
    tease
    category
    date (format: "YYYY-MM-DD")
    days
    contact
    contact_url
    authors
    location
    location_url
    source_blog
    source_blog_url
    skip_title_render
    redirect
    links {
      url
      text
    }
    image
    images
    inserts {
      name
      content
    }
    external_url
    content
  }
}
</page-query>

<script>
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
import { mdToHtml } from "~/utils.js";
export default {
    components: {
        ArticleHeader,
        ArticleFooter,
    },
    metaInfo() {
        return {
            title: this.$page.article.title,
        };
    },
    methods: {
        mdToHtml,
    },
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
