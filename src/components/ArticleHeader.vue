<template>
  <header :class="article.category">
    <g-link v-if="article.category" :to="`/${article.category}/`" class="link">
      &larr; Back to {{ titlecase(article.category) }}
    </g-link>
    <g-link v-else to="/" class="link">&larr; Back to Home</g-link>
    <g-image v-if="article.image" class="img-fluid main-image" :src="getImage(article)" />
    <h1 class="title" v-if="! article.skip_title_render">{{ article.title }}</h1>
    <p class="subtitle" v-if="article.tease">{{ article.tease }}</p>
    <ul class="metadata list-unstyled" v-if="article.category === 'events'">
      <li v-if="article.date">
        <span class="metakey">Date:</span> {{ dateSpan(article.date, article.days) }}
      </li>
      <li v-if="article.location">
        <span class="metakey">Location: </span>
        <a v-if="article.location_url" :href="article.location_url">{{ article.location }}</a>
        <template v-else>{{ article.location }}</template>
      </li>
      <li v-if="article.contact">
        <span class="metakey">Contact: </span>
        <a v-if="article.contact_url" :href="article.contact_url">{{ article.contact }}</a>
        <template v-else>{{ article.contact }}</template>
      </li>
      <li v-if="article.links.length > 0">
        <span class="metakey">Links: </span>
        <template v-for="link in article.links">
          <a :href="link.url" :key="link.url">{{ link.text }}</a>. 
        </template>
      </li>
    </ul>
    <section class="metadata freetext" v-else>
      <p class="contact" v-if="article.contact">
        Contact: {{ article.contact }}
      </p>
      <p class="authors" v-if="article.authors">
        By {{ article.authors }}
      </p>
      <p class="date" v-if="article.date">
        {{ dateToStr(strToDate(article.date), 'D MMMM YYYY') }}
      </p>
    </section>
    <p class="outlink" v-if="article.external_url">
      See <a :href="article.external_url">(external) blog entry</a>
    </p>
    <p class="blogref" v-if="article.source_blog">
      From <a :href="article.source_blog_url">{{ article.source_blog }}</a>
    </p>
  </header>
</template>

<script>
import { getImage, titlecase, strToDate, dateToStr } from '~/utils.js';
export default {
  props: ["article"],
  methods: {
    getImage(article) {
      return getImage(article.image, article.images);
    },
    dateSpan(start, days, format='D MMMM YYYY') {
      let startDate = strToDate(start);
      if (days && days > 1) {
        let endTimestamp = startDate.getTime() + (days-1)*24*60*60*1000;
        let endDate = new Date(endTimestamp);
        return dateToStr(startDate, format)+' - '+dateToStr(endDate, format);
      } else {
        return dateToStr(startDate, format);
      }
    },
    titlecase,
    strToDate,
    dateToStr,
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
.subtitle {
  font-weight: 400;
  font-style: italic;
}
.metadata {
  font-size: 14px;
}
.metakey {
  font-weight: bolder;
}
.authors {
  font-size: 1.09375rem;
  font-weight: 300;
}
.news .date {
  font-size: 80%;
}
.blog .date {
  font-weight: bolder;
}
.outlink {
  font-weight: bolder;
}
.blogref a {
  font-style: italic;
}
</style>
