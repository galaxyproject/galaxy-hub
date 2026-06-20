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
let slideTimer: ReturnType<typeof setInterval> | null = null;

const totalSlides = computed(() => Math.max(1, Math.ceil(props.projects.length / props.cardsPerSlide)));

const visibleProjects = computed(() => {
  const start = currentSlide.value * props.cardsPerSlide;
  return props.projects.slice(start, start + props.cardsPerSlide);
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
  <div class="presenter-body">
    <header class="presenter-header">
      <div class="presenter-header-inner">
        <img src="/images/galaxy_logo_hub_white.svg" alt="Galaxy" class="presenter-logo" />
        <div class="presenter-title-group">
          <h1 class="presenter-title">{{ props.eventName }} CoFest Projects</h1>
          <p class="presenter-subtitle">{{ props.dateString }} &middot; {{ props.locationString }}</p>
        </div>
        <div class="presenter-meta">
          <span v-if="props.projects.length > 0" class="presenter-counter">
            Slide {{ currentSlide + 1 }} / {{ totalSlides }}
          </span>
          <span v-if="props.lastUpdated" class="presenter-updated">Updated {{ formattedTime }}</span>
        </div>
      </div>
    </header>

    <main class="presenter-main">
      <div v-if="props.isLoading" class="presenter-status">Loading projects…</div>
      <div v-else-if="props.error" class="presenter-status">Could not load projects: {{ props.error }}</div>
      <div v-else-if="props.projects.length === 0" class="presenter-status">No projects found yet.</div>
      <Transition v-else name="slide-fade" mode="out-in">
        <div :key="currentSlide" class="presenter-grid">
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  flex-shrink: 0;
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
  grid-template-columns: repeat(3, 1fr);
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
