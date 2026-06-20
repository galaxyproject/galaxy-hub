<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import CofestBoardInline from './CofestBoardInline.vue';
import CofestBoardPresenter from './CofestBoardPresenter.vue';

export interface Project {
  project: string;
  description: string;
  lead: string;
  assignees: string[];
}

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

function parseCsvRow(line: string): string[] {
  const cols: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      cols.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cols.push(current.trim());
  return cols;
}

function parseCsv(text: string): Project[] {
  const rows = text.trim().split('\n');
  return rows
    .slice(1)
    .map((line) => {
      const cols = parseCsvRow(line);
      return {
        project: cols[0] || '',
        description: cols[1] || '',
        lead: cols[2] || '',
        assignees: (cols[3] || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };
    })
    .filter((p) => p.project);
}

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
  />

  <CofestBoardInline v-else :projects="projects" :is-loading="isLoading" :error="error" />
</template>
