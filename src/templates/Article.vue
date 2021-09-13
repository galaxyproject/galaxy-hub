<template>
    <Layout>
        <ArticleHeader :article="$page.article" />
        <div :class="['content', 'markdown', ...mdClasses]" v-html="$page.article.content" />
        <ArticleFooter :article="$page.article" />
    </Layout>
</template>

<page-query>
query Article ($path: String!) {
   article: article (path: $path) {
    id
    title
    tease
    category
    date (format: "YYYY-MM-DD")
    days
    contact
    contact_url
    fileInfo {
        path
    }
    authors
    location
    location_url
    source_blog
    source_blog_url
    skip_title_render
    redirect
    autotoc
    links {
      url
      text
    }
    image
    images
    external_url
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
    metaInfo() {
        return {
            title: this.$page.article.title,
        };
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
