<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@/lib/utils';

interface HeroSlide {
  image: string;
  link: string;
  alt: string;
  /**
   * Render the slide as a video card -- the thumbnail full-bleed under a
   * scrim with `title` over it, a play badge, and the link opened in a new
   * tab -- instead of a bare image.
   */
  video?: boolean;
  /** Headline for a video slide. */
  title?: string;
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
    <!-- Slides. All slides share one grid cell, so the box keeps the height of
         the tallest slide rather than resizing as aspect ratios rotate past. -->
    <div class="grid">
      <a
        v-for="(item, i) in items"
        :key="i"
        :href="item.link"
        :target="item.video ? '_blank' : undefined"
        :rel="item.video ? 'noopener noreferrer' : undefined"
        :aria-hidden="isCarousel && i !== current ? 'true' : undefined"
        :tabindex="isCarousel && i !== current ? -1 : undefined"
        :class="
          cn(
            'hero-carousel-slide relative col-start-1 row-start-1 self-center',
            'block w-full rounded-lg overflow-hidden',
            'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
            'transition-all duration-200 ease-in-out',
            'hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
            isCarousel && i !== current ? 'opacity-0 pointer-events-none' : 'opacity-100',
            isCarousel && 'transition-opacity duration-500 ease-in-out'
          )
        "
      >
        <!-- Video slide: a card built to sit next to the image slides, sized to
             their aspect ratio so the box never changes height. -->
        <div v-if="item.video" class="hero-video-card">
          <img :src="item.image" :alt="item.alt" class="hero-video-card__thumb" />
          <span class="hero-video-card__scrim" aria-hidden="true" />
          <span class="hero-carousel-play" aria-hidden="true">
            <svg viewBox="0 0 68 48" focusable="false">
              <path
                class="hero-carousel-play__bg"
                d="M66.5 7.7a8.6 8.6 0 0 0-6-6C55.2 0 34 0 34 0S12.8 0 7.5 1.6a8.6 8.6 0 0 0-6 6A89.6 89.6 0 0 0 0 24a89.6 89.6 0 0 0 1.5 16.3 8.6 8.6 0 0 0 6 6C12.8 48 34 48 34 48s21.2 0 26.5-1.7a8.6 8.6 0 0 0 6-6A89.6 89.6 0 0 0 68 24a89.6 89.6 0 0 0-1.5-16.3z"
              />
              <path d="M45 24 27 14v20z" fill="#fff" />
            </svg>
          </span>
          <div class="hero-video-card__body">
            <img src="/images/galaxy_logo_white.svg" alt="" class="hero-video-card__logo" />
            <p class="hero-video-card__kicker">Watch</p>
            <p class="hero-video-card__title">{{ item.title ?? item.alt }}</p>
          </div>
        </div>
        <img v-else :src="item.image" :alt="item.alt" class="block w-full h-auto" />
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

/* Matches the aspect ratio of the image slides (NAR card, 6250x4327), so a
   video slide fills the box exactly rather than floating inside it. */
.hero-video-card {
  container-type: inline-size;
  position: relative;
  aspect-ratio: 6250 / 4327;
  overflow: hidden;
  background: #0d1a2b;
}

.hero-video-card__thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Darkens the lower half so the burned-in subtitle on the source frame never
   competes with the headline, and the top edge so the corner of the animation's
   "NOT REPRODUCIBLE" stamp does not peek in. */
.hero-video-card__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgb(6, 14, 26) 0%, rgb(6, 14, 26) 20%, rgba(6, 14, 26, 0.82) 36%, rgba(6, 14, 26, 0) 62%),
    linear-gradient(to bottom, rgba(6, 14, 26, 0.92) 0%, rgba(6, 14, 26, 0.5) 9%, rgba(6, 14, 26, 0) 20%);
}

.hero-video-card__body {
  position: absolute;
  inset: auto 0 0 0;
  padding: 5cqw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5cqw;
  /* The hero centres its text below 900px; the card keeps its own alignment. */
  text-align: left;
}

.hero-video-card__logo {
  width: 22cqw;
  height: auto;
  opacity: 0.9;
}

.hero-video-card__kicker {
  margin: 0;
  font-size: 2.6cqw;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffd700;
}

.hero-video-card__title {
  margin: 0;
  font-size: 6cqw;
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  text-wrap: balance;
}

.hero-carousel-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hero-carousel-play svg {
  width: 17cqw;
  height: auto;
}

.hero-carousel-play__bg {
  fill: #212121;
  fill-opacity: 0.8;
  transition:
    fill 0.2s ease,
    fill-opacity 0.2s ease;
}

.hero-carousel-slide:hover .hero-carousel-play__bg,
.hero-carousel-slide:focus-visible .hero-carousel-play__bg {
  fill: #f00;
  fill-opacity: 1;
}
</style>
