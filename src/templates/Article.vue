<template>
    <Layout>
        <ArticleHeader :article="$page.article" />
        <div class="content markdown" v-html="$page.article.content" />
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
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
