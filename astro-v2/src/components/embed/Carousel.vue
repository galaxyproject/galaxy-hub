<script setup lang="ts">
import { ref, computed } from 'vue';

interface CarouselImage {
  src: string;
  alt?: string;
  caption?: string;
}

const props = defineProps<{
  images?: CarouselImage[] | string[];
  src?: string;
}>();

const currentIndex = ref(0);

// Normalize images to consistent format
const normalizedImages = computed<CarouselImage[]>(() => {
  if (!props.images && !props.src) return [];

  if (props.src) {
    return [{ src: props.src, alt: 'Image' }];
  }

  if (!props.images) return [];

  return props.images.map((img) => {
    if (typeof img === 'string') {
      return { src: img, alt: 'Image' };
    }
    return img;
  });
});

const canNavigate = computed(() => normalizedImages.value.length > 1);

function next() {
  if (normalizedImages.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % normalizedImages.value.length;
}

function prev() {
  if (normalizedImages.value.length === 0) return;
  currentIndex.value =
    (currentIndex.value - 1 + normalizedImages.value.length) %
    normalizedImages.value.length;
}

function goTo(index: number) {
  currentIndex.value = index;
}
</script>

<template>
  <div class="carousel my-6 relative max-w-4xl mx-auto">
    <div v-if="normalizedImages.length === 0" class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">No images available</p>
    </div>

    <template v-else>
      <!-- Main image -->
      <div class="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
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
      <p v-if="normalizedImages[currentIndex].caption" class="text-center text-sm text-gray-600 mt-2">
        {{ normalizedImages[currentIndex].caption }}
      </p>

      <!-- Dots indicator -->
      <div v-if="canNavigate" class="flex justify-center gap-2 mt-3">
        <button
          v-for="(_, index) in normalizedImages"
          :key="index"
          @click="goTo(index)"
          :class="[
            'w-2.5 h-2.5 rounded-full transition-colors',
            index === currentIndex ? 'bg-galaxy-primary' : 'bg-gray-300 hover:bg-gray-400'
          ]"
          :aria-label="`Go to image ${index + 1}`"
        ></button>
      </div>

      <!-- Counter -->
      <p v-if="canNavigate" class="text-center text-xs text-gray-500 mt-1">
        {{ currentIndex + 1 }} / {{ normalizedImages.length }}
      </p>
    </template>
  </div>
</template>
