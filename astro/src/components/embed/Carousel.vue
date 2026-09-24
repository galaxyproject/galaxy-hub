<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface CarouselImage {
  src: string;
  alt?: string;
  link?: string;
  caption?: string;
}

const props = withDefaults(
  defineProps<{
    images?: CarouselImage[] | string[];
    src?: string;
    autoplay?: boolean;
    interval?: number;
  }>(),
  {
    autoplay: false,
    interval: 3000,
  }
);

const currentIndex = ref(0);
const isPaused = ref(false);
const isPlaying = ref(props.autoplay);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isPlaying.value = false;
  } else {
    startAutoplay();
  }
});

onUnmounted(() => {
  stopAutoplay();
});

const normalizedImages = computed<CarouselImage[]>(() => {
  if (!props.images && !props.src) {
    return [];
  }

  if (props.src) {
    return [{ src: props.src, alt: 'Image' }];
  }

  if (!props.images) {
    return [];
  }

  return props.images.map((img) => {
    if (typeof img === 'string') {
      return { src: img, alt: 'Image' };
    }
    return img;
  });
});

const canNavigate = computed(() => normalizedImages.value.length > 1);

function startAutoplay() {
  if (!props.autoplay || normalizedImages.value.length <= 1) {
    return;
  }

  stopAutoplay();

  autoplayTimer = setInterval(() => {
    if (!isPaused.value) {
      next();
    }
  }, props.interval);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function pauseAutoplay() {
  isPaused.value = true;
}

function resumeAutoplay() {
  isPaused.value = false;
}

function resetAutoplay() {
  if (isPlaying.value) {
    startAutoplay();
  }
}

function toggleAutoplay() {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
}

function next() {
  if (normalizedImages.value.length === 0) {
    return;
  }
  currentIndex.value = (currentIndex.value + 1) % normalizedImages.value.length;
}

function prev() {
  if (normalizedImages.value.length === 0) {
    return;
  }
  currentIndex.value = (currentIndex.value - 1 + normalizedImages.value.length) % normalizedImages.value.length;
  resetAutoplay();
}

function goTo(index: number) {
  currentIndex.value = index;
  resetAutoplay();
}
</script>

<template>
  <div class="carousel my-6 relative max-w-4xl mx-auto">
    <div v-if="normalizedImages.length === 0" class="p-4 bg-ebony-clay-50 rounded-lg text-center">
      <p class="text-chicago-600">No images available</p>
    </div>

    <template v-else>
      <!-- Main image -->
      <div
        class="relative aspect-video rounded-lg overflow-hidden carousel-image-container mx-auto"
        @mouseenter="props.autoplay ? pauseAutoplay() : null"
        @mouseleave="props.autoplay ? resumeAutoplay() : null"
      >
        <button
          v-if="props.autoplay && canNavigate"
          @click="toggleAutoplay"
          class="absolute right-2 top-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          :aria-label="isPlaying ? 'Pause slide show' : 'Play slide show'"
        >
          <svg v-if="isPlaying" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <a v-if="normalizedImages[currentIndex].link" :href="normalizedImages[currentIndex].link" target="_blank">
          <img
            :src="normalizedImages[currentIndex].src"
            :alt="normalizedImages[currentIndex].alt || ''"
            class="w-full h-full object-contain"
          />
        </a>
        <img
          v-else
          :src="normalizedImages[currentIndex].src"
          :alt="normalizedImages[currentIndex].alt || ''"
          class="w-full h-full object-contain"
        />

        <!-- Navigation arrows -->
        <template v-if="canNavigate">
          <button
            @click="prev"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="next"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </template>
      </div>

      <!-- Caption -->
      <p v-if="normalizedImages[currentIndex].caption" class="text-center text-sm text-chicago-600 mt-2">
        {{ normalizedImages[currentIndex].caption }}
      </p>

      <!-- Dots indicator -->
      <div v-if="canNavigate" class="flex justify-center gap-2 mt-3">
        <button
          v-for="(_, index) in normalizedImages"
          :key="index"
          @click="goTo(index)"
          :class="[
            'carousel-indicators transition-colors',
            index === currentIndex ? 'bg-galaxy-primary' : 'bg-ebony-clay-200 hover:bg-ebony-clay-300',
          ]"
          :aria-label="`Go to image ${index + 1}`"
        ></button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.carousel-image-container {
  position: relative;
  text-align: center;
  max-width: 450px;
  overflow: visible;
}

.carousel-indicators {
  width: 30px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
