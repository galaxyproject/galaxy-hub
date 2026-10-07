<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import CofestBoardInline from './CofestBoardInline.vue';
import CofestBoardPresenter from './CofestBoardPresenter.vue';
import { parseCsv, type Project } from '@/utils/cofest-csv';

const props = withDefaults(
  defineProps<{
    csvUrl: string;
    dateString: string;
    locationString: string;
    presenterView?: boolean;
    refreshIntervalMs?: number;
    cardsPerSlide?: number;
    eventName?: string;
    footerText?: string;
    slideIntervalMs?: number;
    qrImagePath?: string;
    qrUrl?: string;
  }>(),
  {
    cardsPerSlide: 6,
    eventName: 'GCC',
    slideIntervalMs: 12000,
    refreshIntervalMs: 30000,
  }
);

const projects = ref<Project[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const lastUpdated = ref<Date | null>(null);

let refreshTimer: ReturnType<typeof setInterval> | null = null;

async function loadProjects() {
  try {
    const res = await fetch(props.csvUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const parsed = parseCsv(text);
    if (parsed.length > 0) projects.value = parsed;
    error.value = null;
    lastUpdated.value = new Date();
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadProjects();
  refreshTimer = setInterval(loadProjects, props.refreshIntervalMs);
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<template>
  <CofestBoardPresenter
    v-if="presenterView"
    :projects="projects"
    :is-loading="isLoading"
    :error="error"
    :cards-per-slide="props.cardsPerSlide"
    :date-string="props.dateString"
    :footer-text="props.footerText"
    :event-name="props.eventName"
    :last-updated="lastUpdated"
    :location-string="props.locationString"
    :slide-interval-ms="props.slideIntervalMs"
    :qr-image-path="props.qrImagePath"
    :qr-url="props.qrUrl"
  />

  <CofestBoardInline v-else :projects="projects" :is-loading="isLoading" :error="error" />
</template>
