<template>
    <Layout :subsite="$page.article.main_subsite || undefined" class="collection-article">
        <ArticleHeader :article="$page.article" />
        <div :class="['content', 'markdown', ...mdClasses]" v-html="$page.article.content" />
        <ArticleFooter :article="$page.article" />
    </Layout>
</template>

<page-query>
query Article($path: String!) {
    article: article(path: $path) {
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
        content
    }
}
</page-query>

<script>
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
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
