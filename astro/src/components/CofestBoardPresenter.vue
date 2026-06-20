<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Project } from './CofestBoard.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const props = withDefaults(
  defineProps<{
    dateString: string;
    error: string | null;
    isLoading: boolean;
    lastUpdated: Date | null;
    locationString: string;
    projects: Project[];
    cardsPerSlide?: number;
    eventName?: string;
    slideIntervalMs?: number;
    footerText?: string;
  }>(),
  {
    cardsPerSlide: 6,
    eventName: 'GCC',
    slideIntervalMs: 12000,
  }
);

const currentSlide = ref(0);
const paused = ref(false);
const isLight = ref(false);
let slideTimer: ReturnType<typeof setInterval> | null = null;

const localCardsPerSlide = ref(props.cardsPerSlide);
function decreaseCards() {
  if (localCardsPerSlide.value > 4) {
    localCardsPerSlide.value--;
    currentSlide.value = 0;
  }
}
function increaseCards() {
  if (localCardsPerSlide.value < 8) {
    localCardsPerSlide.value++;
    currentSlide.value = 0;
  }
}

const totalSlides = computed(() => Math.max(1, Math.ceil(props.projects.length / localCardsPerSlide.value)));

const visibleProjects = computed(() => {
  const start = currentSlide.value * localCardsPerSlide.value;
  return props.projects.slice(start, start + localCardsPerSlide.value);
});

function advance() {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
}

function prev() {
  currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
}

function next() {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
}

function togglePause() {
  paused.value = !paused.value;
}

function startTimer() {
  stopTimer();
  slideTimer = setInterval(() => {
    if (!paused.value) advance();
  }, props.slideIntervalMs);
}

function stopTimer() {
  if (slideTimer) clearInterval(slideTimer);
}

onMounted(startTimer);
onUnmounted(stopTimer);

const formattedTime = computed(() => (props.lastUpdated ? props.lastUpdated.toLocaleTimeString() : ''));
</script>

<template>
  <div class="presenter-body" :class="{ 'presenter-light': isLight }">
    <header class="presenter-header">
      <div class="presenter-header-inner">
        <img src="/images/galaxy_logo_hub_white.svg" alt="Galaxy" class="presenter-logo" />
        <div class="presenter-title-group">
          <h1 class="presenter-title">{{ props.eventName }} CoFest Projects</h1>
          <p class="presenter-subtitle">{{ props.dateString }} &middot; {{ props.locationString }}</p>
        </div>
        <div class="presenter-meta">
          <div class="presenter-meta-row">
            <Button
              variant="outline"
              size="icon-sm"
              class="presenter-nav-btn"
              :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
              @click="isLight = !isLight"
            >
              <svg
                v-if="isLight"
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </Button>
            <div class="cards-control">
              <Button
                variant="outline"
                size="icon-sm"
                class="presenter-nav-btn"
                :disabled="localCardsPerSlide <= 4"
                aria-label="Fewer cards"
                @click="decreaseCards"
              >
                −
              </Button>
              <span class="cards-label">{{ localCardsPerSlide }} / slide</span>
              <Button
                variant="outline"
                size="icon-sm"
                class="presenter-nav-btn"
                :disabled="localCardsPerSlide >= 8"
                aria-label="More cards"
                @click="increaseCards"
              >
                +
              </Button>
            </div>
            <span v-if="props.projects.length > 0" class="presenter-counter"
              >Slide {{ currentSlide + 1 }} / {{ totalSlides }}</span
            >
            <span v-if="props.lastUpdated" class="presenter-updated">Updated {{ formattedTime }}</span>
          </div>
        </div>
      </div>
    </header>

    <main class="presenter-main">
      <div v-if="props.isLoading" class="presenter-status">Loading projects…</div>
      <div v-else-if="props.error" class="presenter-status">Could not load projects: {{ props.error }}</div>
      <div v-else-if="props.projects.length === 0" class="presenter-status">No projects found yet.</div>
      <Transition v-else name="slide-fade" mode="out-in">
        <div
          :key="currentSlide"
          class="presenter-grid"
          :style="{ gridTemplateColumns: `repeat(${Math.ceil(localCardsPerSlide / 2)}, 1fr)` }"
        >
          <div v-for="p in visibleProjects" :key="p.project" class="presenter-card">
            <div class="presenter-card-title">{{ p.project }}</div>
            <div v-if="p.description" class="presenter-card-desc">{{ p.description }}</div>
            <div v-if="p.lead" class="presenter-card-lead">
              <span class="presenter-card-lead-label">Lead: </span>{{ p.lead }}
            </div>
            <div v-if="p.assignees.length > 0" class="presenter-card-assignees">
              <Badge v-for="name in p.assignees" :key="name" variant="outline" class="presenter-tag">{{ name }}</Badge>
            </div>
          </div>
        </div>
      </Transition>
    </main>

    <footer class="presenter-footer">
      <Button variant="outline" size="icon-sm" class="presenter-nav-btn" aria-label="Previous slide" @click="prev">
        &#8592;
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        class="presenter-nav-btn"
        :aria-label="paused ? 'Resume' : 'Pause'"
        @click="togglePause"
      >
        {{ paused ? '▶' : '⏸' }}
      </Button>
      <Button variant="outline" size="icon-sm" class="presenter-nav-btn" aria-label="Next slide" @click="next">
        &#8594;
      </Button>
      <span class="footer-text">
        <span v-if="props.footerText">{{ props.footerText }}</span>
        <a v-else href="/">galaxyproject.org</a>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.presenter-body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #0f1b2d;
  color: #f0f4f8;
  font-family: system-ui, sans-serif;
}

.presenter-header {
  background: linear-gradient(135deg, #1a2e4a 0%, #0f1b2d 100%);
  border-bottom: 2px solid #ffd700;
  padding: 0.75rem 2rem;
  flex-shrink: 0;
}

.presenter-header-inner {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.presenter-logo {
  height: 2.5rem;
  width: auto;
  flex-shrink: 0;
}

.presenter-title-group {
  flex: 1;
}

.presenter-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.presenter-subtitle {
  font-size: 0.9rem;
  color: #ffd700;
  margin-top: 0.15rem;
}

.presenter-meta {
  flex-shrink: 0;
}

.presenter-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cards-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  padding: 0.2rem 0.4rem;
}

.cards-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
  min-width: 3.5rem;
  text-align: center;
}

.presenter-counter {
  font-size: 0.95rem;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
}

.presenter-updated {
  font-size: 0.75rem;
  color: #64748b;
}

.presenter-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem;
  overflow: hidden;
}

.presenter-status {
  font-size: 1.25rem;
  color: #94a3b8;
  text-align: center;
}

.presenter-grid {
  display: grid;
  gap: 1.25rem;
  width: 100%;
  max-width: 1600px;
}

.presenter-card {
  background: #1e2d42;
  border: 1px solid #2d4a6e;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;
  transition: border-color 0.2s;
}

.presenter-card:hover {
  border-color: #ffd700;
}

.presenter-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.presenter-card-desc {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.55;
  flex: 1;
}

.presenter-card-lead {
  font-size: 0.85rem;
  color: #ffd700;
  font-weight: 600;
}

.presenter-card-lead-label {
  color: #64748b;
  font-weight: 400;
}

.presenter-card-assignees {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

/* Badge override for dark background */
.presenter-tag {
  background: rgba(255, 215, 0, 0.08) !important;
  color: #cbd5e1 !important;
  border-color: rgba(255, 215, 0, 0.2) !important;
}

/* ── Footer ── */
.presenter-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid #1e2d42;
  flex-shrink: 0;
}

.presenter-nav-btn {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  color: #94a3b8 !important;
}

.presenter-nav-btn:hover {
  background: rgba(255, 215, 0, 0.15) !important;
  border-color: #ffd700 !important;
  color: #ffd700 !important;
}

.footer-text {
  font-size: 0.75rem;
  color: #475569;
  margin-left: 0.5rem;
}

.footer-text a {
  color: #475569;
  text-decoration: none;
}

.footer-text a:hover {
  color: #94a3b8;
}

/* ── Light mode overrides ── */
.presenter-light {
  background: #f8fafc;
  color: #1e293b;
}

.presenter-light .presenter-header {
  background: linear-gradient(135deg, #25537b 0%, #1a3a54 100%);
}

.presenter-light .presenter-card {
  background: #ffffff;
  border-color: color-mix(in srgb, #25537b 15%, transparent);
}

.presenter-light .presenter-card:hover {
  border-color: #25537b;
}

.presenter-light .presenter-card-title {
  color: #1e293b;
}

.presenter-light .presenter-card-desc {
  color: #475569;
}

.presenter-light .presenter-footer {
  border-top-color: #e2e8f0;
  background: #f1f5f9;
}

.presenter-light .presenter-tag {
  background: color-mix(in srgb, #25537b 8%, transparent) !important;
  color: #25537b !important;
  border-color: color-mix(in srgb, #25537b 25%, transparent) !important;
}

.presenter-light .presenter-card-lead {
  color: #25537b;
}

.presenter-light .presenter-card-lead-label {
  color: #94a3b8;
}

.presenter-light .presenter-footer .presenter-nav-btn {
  background: rgba(0, 0, 0, 0.04) !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
  color: #475569 !important;
}

.presenter-light .presenter-footer .presenter-nav-btn:hover {
  background: color-mix(in srgb, #25537b 10%, transparent) !important;
  border-color: #25537b !important;
  color: #25537b !important;
}

.presenter-light .cards-control {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.1);
}

.presenter-light .presenter-counter,
.presenter-light .cards-label {
  color: rgba(255, 255, 255, 0.8);
}

.presenter-light .presenter-updated,
.presenter-light .footer-text,
.presenter-light .footer-text a {
  color: rgba(255, 255, 255, 0.5);
}

/* Slide transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
