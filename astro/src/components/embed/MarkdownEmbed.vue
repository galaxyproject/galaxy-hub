<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  url?: string;
  src?: string;
}>();

const content = ref('');
const loading = ref(true);
const error = ref<string | null>(null);

async function loadContent() {
  const url = props.url || props.src;
  if (!url) {
    error.value = 'No URL provided';
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    content.value = await response.text();
    error.value = null;
  } catch (e) {
    console.error('Failed to load markdown:', e);
    error.value = e instanceof Error ? e.message : 'Failed to load content';
  } finally {
    loading.value = false;
  }
}

onMounted(loadContent);
watch(() => props.url || props.src, loadContent);
</script>

<template>
  <div class="markdown-embed my-4">
    <div v-if="loading" class="p-4 bg-gray-50 rounded animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div v-else-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg">
      <p class="font-medium">Failed to load embedded content</p>
      <p class="text-sm">{{ error }}</p>
    </div>
    <div v-else class="prose prose-galaxy max-w-none" v-html="content"></div>
  </div>
</template>
