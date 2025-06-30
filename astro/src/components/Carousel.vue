<template>
  <div class="carousel slide" :id="carouselId" :data-bs-ride="autoplay ? 'carousel' : false">
    <div class="carousel-indicators" v-if="indicators">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        type="button"
        :data-bs-target="`#${carouselId}`"
        :data-bs-slide-to="index"
        :class="{ active: index === activeIndex }"
        :aria-current="index === activeIndex"
        :aria-label="`Slide ${index + 1}`"
        @click="goToSlide(index)"
      ></button>
    </div>
    
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-item"
        :class="{ active: index === activeIndex }"
      >
        <a v-if="slide.link" :href="slide.link" target="_blank" rel="noopener">
          <img
            v-if="slide.image"
            :src="slide.image"
            class="d-block w-100"
            :alt="slide.alt || slide.caption"
          >
        </a>
        <img
          v-else-if="slide.image"
          :src="slide.image"
          class="d-block w-100"
          :alt="slide.alt || slide.caption"
        >
        <div v-if="slide.caption || slide.text" class="carousel-caption d-none d-md-block">
          <h5 v-if="slide.caption">{{ slide.caption }}</h5>
          <p v-if="slide.text">{{ slide.text }}</p>
        </div>
      </div>
    </div>
    
    <button
      v-if="controls"
      class="carousel-control-prev"
      type="button"
      :data-bs-target="`#${carouselId}`"
      data-bs-slide="prev"
      @click="prevSlide"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      v-if="controls"
      class="carousel-control-next"
      type="button"
      :data-bs-target="`#${carouselId}`"
      data-bs-slide="next"
      @click="nextSlide"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    validator: (slides) => slides.length > 0
  },
  interval: {
    type: Number,
    default: 5000
  },
  indicators: {
    type: Boolean,
    default: true
  },
  controls: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  fade: {
    type: Boolean,
    default: false
  }
});

// Generate unique ID for this carousel instance
const carouselId = computed(() => `carousel-${Math.random().toString(36).substr(2, 9)}`);

const activeIndex = ref(0);
let intervalId = null;

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % props.slides.length;
}

function prevSlide() {
  activeIndex.value = activeIndex.value === 0 
    ? props.slides.length - 1 
    : activeIndex.value - 1;
}

function goToSlide(index) {
  activeIndex.value = index;
  resetInterval();
}

function startAutoplay() {
  if (props.autoplay && props.interval > 0) {
    intervalId = setInterval(nextSlide, props.interval);
  }
}

function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resetInterval() {
  stopAutoplay();
  startAutoplay();
}

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.carousel {
  position: relative;
}

.carousel-inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  display: none;
  float: left;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
  transition: transform 0.6s ease-in-out;
}

.carousel-item.active {
  display: block;
}

.carousel-item img {
  width: 100%;
  height: auto;
}

.carousel-indicators {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-right: 15%;
  margin-bottom: 1rem;
  margin-left: 15%;
  list-style: none;
}

.carousel-indicators button {
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 3px;
  padding: 0;
  margin-right: 3px;
  margin-left: 3px;
  text-indent: -999px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  background-clip: padding-box;
  border: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
}

.carousel-indicators button.active {
  opacity: 1;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  padding: 0;
  color: #fff;
  text-align: center;
  background: none;
  border: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease;
  cursor: pointer;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 0.9;
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
}

.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.carousel-caption {
  position: absolute;
  right: 15%;
  bottom: 1.25rem;
  left: 15%;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  color: #fff;
  text-align: center;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>