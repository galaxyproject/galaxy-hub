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
    image
    images
    category
    contact
    date (format: "D MMMM YYYY")
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
