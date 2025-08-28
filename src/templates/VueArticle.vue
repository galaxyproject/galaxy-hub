<template>
    <Layout :subsite="$page.article.main_subsite || undefined" class="collection-vue-article">
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
                    <div class="insert" :data-name="insert.name" :key="insert.name + ':md'" v-html="insert.content">
                        &nbsp;
                    </div>
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
        hide_tease
        hide_metadata
        pretitle
        subsites
        main_subsite
        category
        date (format: "YYYY-MM-DD")
        end (format: "YYYY-MM-DD")
        contact
        contacts {
            name
            email
            url
        }
        authors
        location {
            name
            url
        }
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
import { resizeIFrames } from "~/lib/client.mjs";
import { addTocClass } from "~/lib/pages.mjs";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
export default {
    components: {
        ArticleHeader,
        ArticleFooter,
    },
    computed: {
        mdClasses() {
            let classes = [];
            addTocClass(classes, this.$page.article);
            return classes;
        },
    },
    mounted() {
        resizeIFrames(document);
    },
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
