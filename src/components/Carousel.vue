<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="650"
      img-height="450"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <a href="https://galaxyproject.org/events/gcc2023/abstracts/" target="_blank">
        <b-carousel-slide
          img-src="/images/events/gcc2023/gcc2023-call-for-abstracts.png"
          img-alt="The Galaxy Community Conference is an annual gathering that brings together scientists, software developers, and trainers of Galaxy from a variety of disciplines to share their experiences, knowledge, and skills."
        ></b-carousel-slide>
      </a>
      <a href="https://galaxyproject.org/events/2023-admin-training/" target="_blank">
        <b-carousel-slide
          img-src="/images/events/2023-04-gat/gat23-logo-square.png"
          img-alt="The Galaxy Admin Training is a free, in-person intensive training workshop for prospective and experienced Galaxy server administrators from April 17 to April 21, 2023 in Ghent, Belgium"
        ></b-carousel-slide>
      </a>
      <a href="https://gxy.io/smorgasbord3" target="_blank">
        <b-carousel-slide
          img-src="/images/events/2023-05-smorgasbord3/smorgasbord3-square.png"
          img-alt="The Galaxy Training Network Smörgåsbord 3 is a free global online Galaxy training event from May 22 to May 26, 2023"
        ></b-carousel-slide>
      </a>
    </b-carousel>
  </div>
</template>

<script>
  import { CarouselPlugin } from 'bootstrap-vue';

  export default {
    name: "Carousel",
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
