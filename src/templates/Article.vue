<template>
  <Layout>
    <g-link v-if="$page.article.category" :to="`/${$page.article.category}/`" class="link">
      &larr; {{ $page.article.category }}
    </g-link>
    <g-link v-else to="/" class="link"> &larr; Home</g-link>
    <header>
      <g-image v-if="this.$page.article.image" class="img-fluid main-image"
        :src="getImage(this.$page.article.image)" />
      <h1 class="title">{{ $page.article.title }}</h1>
      <div class="metadata">
        <p class="subtitle" v-if="$page.article.tease">{{ $page.article.tease }}</p>
        <div class="contact" v-if="$page.article.contact">
          Contact: {{ $page.article.contact }}
        </div>
        <p class="date" v-if="$page.article.date">{{ $page.article.date }}</p>
      </div>
    </header>
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
import { getImage } from '~/utils.js';
export default {
  metaInfo() {
    return {
      title: this.$page.article.title
    }
  },
  methods: {
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
