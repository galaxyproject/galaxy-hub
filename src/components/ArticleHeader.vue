<template>
  <header>
    <g-link v-if="article.category" :to="`/${article.category}/`" class="link">
      &larr; {{ article.category }}
    </g-link>
    <g-link v-else to="/" class="link"> &larr; Home</g-link>
    <g-image v-if="article.image" class="img-fluid main-image" :src="getImage(article)" />
    <h1 class="title" v-if="! article.skip_title_render">{{ article.title }}</h1>
    <section class="metadata">
      <p class="subtitle" v-if="article.tease">{{ article.tease }}</p>
      <p class="contact" v-if="article.contact">
        Contact: {{ article.contact }}
      </p>
      <p class="date" v-if="article.date">{{ article.date }}</p>
    </section>
  </header>
</template>

<script>
import { getImage } from '~/utils.js';
export default {
  props: ["article"],
  methods: {
    getImage(article) {
      return getImage(article.image, article.images);
    }
  }
};
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
</style>
