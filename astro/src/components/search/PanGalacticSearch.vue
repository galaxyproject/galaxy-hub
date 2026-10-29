<script lang="ts">
// Shared by all instances; ClientRouter mounts a new one on each /search/ visit
let instanceCount = 0;

// CSE keeps elements by gname; a new name lets each instance render into its own container
function nextElementName() {
  instanceCount += 1;
  return `galaxySearch${instanceCount}`;
}

// One load per page: a panel mounted while cse.js is still loading waits for the same script
let cseLoad: Promise<void> | null = null;

function loadCSEScript(): Promise<void> {
  cseLoad ??= new Promise<void>((resolve, reject) => {
    (window as any).__gcse = { parsetags: 'explicit', callback: resolve };

    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=007594916903876912968:w0nrox8rzzy';
    script.async = true;
    script.onerror = () => {
      cseLoad = null;
      reject(new Error('Failed to load Google CSE'));
    };
    document.head.appendChild(script);
  });
  return cseLoad;
}
</script>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

const props = defineProps<{ query: string; active: boolean }>();

const cseLoaded = ref(false);
const cseError = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const gname = nextElementName();

function executeSearch(query: string) {
  const google = (window as any).google;
  if (!google?.search?.cse?.element) return;

  const element = google.search.cse.element.getElement(gname);
  if (element) {
    if (query.trim()) {
      element.execute(query);
    } else {
      element.clearAllResults();
    }
  }
}

function renderAndSearch() {
  const google = (window as any).google;
  if (!google?.search?.cse?.element || !containerRef.value) return;

  const existing = google.search.cse.element.getElement(gname);
  if (!existing) {
    google.search.cse.element.render({
      div: containerRef.value,
      tag: 'searchresults-only',
      gname,
      // CSE history management calls replaceState(null), wiping Astro's ClientRouter state
      attributes: { enableHistory: false },
    });
  }

  if (props.query.trim()) {
    // Small delay to let the element initialize
    setTimeout(() => executeSearch(props.query), 100);
  }
}

// Load the third-party script only once the tab is opened, not on every /search/ visit
let cseRequested = false;
watch(
  () => props.active,
  async (active) => {
    if (!active || cseRequested) return;
    cseRequested = true;
    try {
      await loadCSEScript();
      cseLoaded.value = true;
      await nextTick();
      renderAndSearch();
    } catch {
      cseError.value = true;
    }
  },
  { immediate: true }
);

watch(
  () => props.query,
  (newQuery) => {
    if (cseLoaded.value) {
      executeSearch(newQuery);
    }
  }
);
</script>

<template>
  <div>
    <p class="text-sm text-chicago-600 mb-4">
      Search across the Galaxy ecosystem: Hub pages, codebase, mailing lists, help forum, and more.
    </p>

    <div v-if="cseError" role="alert" class="text-center py-12">
      <p class="text-chicago-500 mb-2">Could not load Google Search.</p>
      <p class="text-sm text-chicago-400">
        This may be due to an ad blocker or network issue. Try the Hub Search tab instead.
      </p>
    </div>

    <div v-else-if="!cseLoaded" role="status" class="text-center py-12">
      <p class="text-chicago-500">Loading Google Search...</p>
    </div>

    <div v-else-if="!query.trim()" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-chicago-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <p class="text-chicago-500">Enter a search term to search across the Galaxy ecosystem</p>
    </div>

    <div ref="containerRef" class="gcse-results"></div>
  </div>
</template>

<style>
/* Override Google CSE default styles to blend with the site */
.gsc-control-cse {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  font-family: inherit !important;
}
.gsc-results-wrapper-overlay,
.gsc-results-wrapper-visible {
  box-shadow: none !important;
  border: none !important;
}
.gsc-webResult.gsc-result {
  border-bottom: 1px solid #e5e7eb !important;
  padding: 12px 0 !important;
}
.gs-title a {
  color: #25537b !important;
}
.gs-title a:hover {
  color: #1a3a57 !important;
}
</style>
