<template>
  <Layout>
    <ArticleHeader :article="$page.article" />
    <article class="content markdown">
      <VueRemarkContent>
        <template v-for="insert of $page.article.inserts" v-slot:[insert.name]>
          <p class="markdown" :key="insert.name" v-html="mdToHtml(insert.content)" />
        </template>
      </VueRemarkContent>
    </article>
  </Layout>
</template>

<page-query>
query VueArticle($path: String!) {
   article: vueArticle(path: $path) {
    id
    title
    tease
    skip_title_render
    image
    images
    contact
    category
    inserts {
      name
      content
    }
    date (format: "D MMMM YYYY")
    content
  }
}
</page-query>

<script>
import ArticleHeader from '@/components/ArticleHeader';
import { mdToHtml } from '~/utils.js';
export default {
  components: {
    ArticleHeader,
  },
  metaInfo() {
    return {
      title: this.$page.article.title
    }
  },
  methods: {
    mdToHtml,
  }
}
</script>

<style scoped>
.content {
  font-size: 14px;
}
</style>
