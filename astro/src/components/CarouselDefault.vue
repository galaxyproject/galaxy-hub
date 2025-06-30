<template>
  <div class="carousel-container">
    <Carousel
      :slides="defaultSlides"
      :interval="5000"
      :indicators="true"
      :controls="true"
      :autoplay="true"
    />
  </div>
</template>

<script setup>
import Carousel from './Carousel.vue'

// Default slides matching the original Gridsome carousel content
const defaultSlides = [
  {
    image: '/images/usegalaxy-welcome/GBCC_hub_splash_screen-13x9.png',
    alt: 'Attend GBCC2025',
    link: 'https://gbcc2025.org/'
  },
  {
    image: '/images/jxtx/jxtx-jumbotron.png',
    alt: 'Donate to the James P. Taylor Foundation for Open Science',
    link: 'https://jxtxfoundation.org'
  }
]
</script>

<style scoped>
.carousel-container {
  padding-top: 2rem;
  max-width: 650px;
  margin: 0 auto;
}

/* Override carousel styles to match original */
:deep(.carousel) {
  background: #ababab;
}

:deep(.carousel-item) {
  text-shadow: 1px 1px 2px #333;
}

:deep(.carousel-item img) {
  width: 650px;
  height: 450px;
  object-fit: cover;
}

/* Make carousel links work */
:deep(.carousel-item) {
  cursor: pointer;
}
</style>