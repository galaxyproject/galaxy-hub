<template>
  <Layout>
    <g-link to="/" class="link"> &larr; Home</g-link>
    <header>
      <g-image v-if="$page.article.image" class="img-fluid main-image"
        :src="getImage($page.article.image)" />
      <h1 class="title" v-if="! $page.article.skip_title_render">{{ $page.article.title }}</h1>
      <section class="metadata">
        <p class="subtitle" v-if="$page.article.tease">{{ $page.article.tease }}</p>
        <p class="contact" v-if="$page.article.contact">
          Contact: {{ $page.article.contact }}
        </p>
        <p class="date" v-if="$page.article.date">{{ $page.article.date }}</p>
      </section>
    </header>
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
import { mdToHtml, getImage } from '~/utils.js';
export default {
  metaInfo() {
    return {
      title: this.$page.article.title
    }
  },
  methods: {
    mdToHtml,
    getImage(imagePath) {
      return getImage(imagePath, this.$page.article.images);
    }
  }
}
</script>

<style scoped>
.main-image {
  float: right;
  margin: 20px 0px 5px 10px;
  padding: 2px;
  border: 1px solid #666;
}
.title {
  font-size: 28px;
  font-weight: 300;
  line-height: 1.4em;
  padding: 0.5em 0;
}
.metadata {
  font-size: 14px;
}
.subtitle {
  font-weight: 400;
  font-style: italic;
}
.content {
  font-size: 14px;
}
</style>
