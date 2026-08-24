<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@/lib/utils';

interface HeroSlide {
  image: string;
  link: string;
  alt: string;
}

const props = withDefaults(
  defineProps<{
    items: HeroSlide[];
    interval?: number;
    class?: string;
  }>(),
  {
    interval: 5000,
  }
);

const current = ref(0);
const paused = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const isCarousel = computed(() => props.items.length > 1);

function goTo(index: number) {
  current.value = index;
}

function advance() {
  if (!paused.value && isCarousel.value) {
    current.value = (current.value + 1) % props.items.length;
  }
}

function startTimer() {
  stopTimer();
  if (isCarousel.value) {
    timer = setInterval(advance, props.interval);
  }
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

onMounted(startTimer);
onUnmounted(stopTimer);
</script>

<template>
  <div
    :class="cn('relative w-[520px] max-w-full', props.class)"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- Slides -->
    <div class="relative">
      <a
        v-for="(item, i) in items"
        :key="i"
        :href="item.link"
        :class="
          cn(
            'hero-carousel-slide block w-full rounded-lg overflow-hidden',
            'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
            'transition-all duration-200 ease-in-out',
            'hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
            isCarousel && i !== current
              ? 'absolute top-0 left-0 opacity-0 pointer-events-none'
              : 'relative opacity-100',
            isCarousel && 'transition-opacity duration-500 ease-in-out'
          )
        "
      >
        <img :src="item.image" :alt="item.alt" class="block w-full h-auto" />
      </a>
    </div>

    <!-- Dot indicators -->
    <div v-if="isCarousel" class="flex justify-center gap-2 mt-3">
      <button
        v-for="(_, i) in items"
        :key="i"
        :class="
          cn(
            'hero-carousel-dot size-2.5 rounded-full cursor-pointer p-0',
            'transition-colors duration-200',
            i === current ? 'active' : ''
          )
        "
        :aria-label="`Show highlight ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.hero-carousel-slide {
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.hero-carousel-slide:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-carousel-dot {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.hero-carousel-dot:hover {
  background: rgba(255, 255, 255, 0.4);
}

.hero-carousel-dot.active {
  background: #ffd700;
  border-color: #ffd700;
}
</style>
