<template>
  <footer :class="article.category">
    <template v-if="article.external_url && article.source_blog">
      <p class="outlink">
        See <a :href="article.external_url">(external) blog entry</a>
      </p>
      <p class="blogref">
        From <a :href="article.source_blog_url">{{ article.source_blog }}</a>
      </p>
    </template>
    <p class="backlink" v-if="article.category === 'blog'">
      See this and other Galaxy-related posts in
      <g-link to="/blog/">The Galactic Blog</g-link>
    </p>
  </footer>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style scoped>
footer {
  font-size: 100%;
}
.outlink {
  font-weight: bolder;
}
.backlink {
  margin-top: 40px;
}
.blogref a, .backlink {
  font-style: italic;
}
</style>
