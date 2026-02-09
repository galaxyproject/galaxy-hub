<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ query: string }>();

interface ZoteroItem {
  data: {
    title: string;
    url: string;
    abstractNote?: string;
  };
}

const results = ref<ZoteroItem[] | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

async function search(query: string) {
  if (!query.trim()) {
    results.value = null;
    return;
  }

  isLoading.value = true;
  error.value = null;
  results.value = null;

  try {
    const response = await fetch(
      `https://api.zotero.org/groups/1732893/items/top?start=0&limit=25&q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error(`Zotero API error: ${response.status}`);
    results.value = await response.json();
  } catch (e) {
    error.value = 'Failed to search the Galaxy publication library. Please try again.';
    console.error('Zotero search failed:', e);
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => props.query,
  (newQuery) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => search(newQuery), 400);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <p class="text-sm text-gray-600 mb-4">
      Search the
      <a href="https://www.zotero.org/groups/1732893/galaxy" target="_blank" class="text-galaxy-primary hover:underline"
        >Galaxy publication library</a
      >
      on Zotero.
    </p>

    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {{ error }}
    </div>

    <div v-else-if="isLoading" class="text-center py-12">
      <svg class="w-8 h-8 mx-auto text-gray-400 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <p class="text-gray-500">Searching publications...</p>
    </div>

    <div v-else-if="results && results.length > 0" class="space-y-4">
      <article
        v-for="item in results"
        :key="item.data.url || item.data.title"
        class="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
      >
        <a v-if="item.data.url" :href="item.data.url" target="_blank" class="block">
          <h2 class="text-lg font-semibold text-gray-900 hover:text-galaxy-primary transition-colors mb-1">
            {{ item.data.title }}
          </h2>
          <p class="text-xs text-green-700 mb-2">{{ item.data.url }}</p>
          <p v-if="item.data.abstractNote" class="text-gray-600 text-sm">
            {{ item.data.abstractNote.slice(0, 450) }}{{ item.data.abstractNote.length > 450 ? '...' : '' }}
          </p>
        </a>
        <div v-else>
          <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ item.data.title }}</h2>
          <p v-if="item.data.abstractNote" class="text-gray-600 text-sm">
            {{ item.data.abstractNote.slice(0, 450) }}{{ item.data.abstractNote.length > 450 ? '...' : '' }}
          </p>
        </div>
      </article>
    </div>

    <div v-else-if="results && results.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-2">No publications found for "{{ query }}"</p>
      <p class="text-sm text-gray-400">Try different keywords or check your spelling</p>
    </div>

    <div v-else-if="!query.trim()" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <p class="text-gray-500">Enter a search term to search Galaxy publications</p>
    </div>
  </div>
</template>
