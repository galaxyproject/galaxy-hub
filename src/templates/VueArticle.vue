<template>
    <Layout :subsite="subsite">
        <ArticleHeader :article="$page.article" />
        <article :class="['content', 'markdown', ...mdClasses]">
            <VueRemarkContent>
                <!--
                    Insert the content for each `<slot>` in the Markdown.
                    `#[insert.name]` (shorthand for `v-slot:[insert.name]`) identifies which slot each `<template>`
                    replaces. `[insert.name]` allows the slot name to be dynamic, based on the value of the
                    `insert.name` variable: https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names
                -->
                <template v-for="insert of $page.article.inserts" #[insert.name]>
                    <div class="markdown" :key="insert.name + ':md'" v-html="insert.content">&nbsp;</div>
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
        subsites
        category
        date (format: "YYYY-MM-DD")
        end (format: "YYYY-MM-DD")
        contact
        contact_url
        authors
        location
        location_url
        source_blog
        source_blog_url
        skip_title_render
        redirect
        external_url
        autotoc
        links {
            url
            text
        }
        image
        images
        fileInfo {
            path
        }
        path
        inserts {
            name
            content
        }
        content
    }
}
</page-query>

<script>
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
import { subsiteFromPath } from "~/utils.js";
export default {
    components: {
        ArticleHeader,
        ArticleFooter,
    },
    computed: {
        mdClasses() {
            let classes = [];
            if (this.$page.article.autotoc === true) {
                classes.push("toc");
            } else if (this.$page.article.autotoc === false) {
                classes.push("notoc");
            }
            return classes;
        },
        subsite() {
            return subsiteFromPath(this.$page.article.path);
        },
    },
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
