<template>
    <Layout>
        <ArticleHeader :article="$page.main" />
        <div :class="['content', 'markdown', ...mdClasses]" v-html="$page.main.content" />
        <ArticleFooter :article="$page.main" />
    </Layout>
</template>

<page-query>
query Article ($path: String!) {
   main: article (path: $path) {
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
    autotoc
    links {
      url
      text
    }
    external_url
    image
    images
    fileInfo {
        path
    }
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
            title: this.$page.main.title,
        };
    },
    computed: {
        mdClasses() {
            let classes = [];
            if (this.$page.main.autotoc === true) {
                classes.push("toc");
            } else if (this.$page.main.autotoc === false) {
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
