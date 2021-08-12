<template>
  <Layout>
    <ArticleHeader :article="$page.article" />
    <div class="content markdown" v-html="$page.article.content" />
  </Layout>
</template>

<page-query>
query Article ($path: String!) {
   article: article (path: $path) {
    id
    title
    tease
    category
    date (format: "D MMMM YYYY")
    contact
    authors
    skip_title_render
    image
    images
    content
  }
}
</page-query>

<script>
import ArticleHeader from '@/components/ArticleHeader';
export default {
  components: {
    ArticleHeader,
  },
  metaInfo() {
    return {
      title: this.$page.article.title
    }
  }
}
</script>

<style scoped>
.content {
  font-size: 14px;
}
</style>
