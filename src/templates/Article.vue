<template>
    <Layout :subsite="$page.article.main_subsite || undefined">
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
        subsites
        main_subsite
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
        content
    }
}
</page-query>

<script>
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
            if (this.$page.article.autotoc === true) {
                classes.push("toc");
            } else if (this.$page.article.autotoc === false) {
                classes.push("notoc");
            }
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
