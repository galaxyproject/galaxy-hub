<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { loadEmbeddedMarkdown, resolveEmbedUrl } from '@/utils/markdown-embed';

const props = defineProps<{
  url?: string;
  src?: string;
  href?: string;
}>();

const content = ref('');
const loading = ref(true);
const error = ref<string | null>(null);

async function loadContent() {
  const url = resolveEmbedUrl(props);
  if (!url) {
    error.value = props.url || props.src || props.href ? 'Only http(s) URLs can be embedded' : 'No URL provided';
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    content.value = await loadEmbeddedMarkdown(url);
    error.value = null;
  } catch (e) {
    console.error('Failed to load markdown:', e);
    error.value = e instanceof Error ? e.message : 'Failed to load content';
  } finally {
    loading.value = false;
  }
}

onMounted(loadContent);
watch(() => props.url || props.src || props.href, loadContent);
</script>

<template>
  <div class="markdown-embed my-4">
    <div v-if="loading" class="p-4 bg-ebony-clay-50 rounded animate-pulse motion-reduce:animate-none">
      <div class="h-4 bg-ebony-clay-100 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-ebony-clay-100 rounded w-1/2"></div>
    </div>
    <div v-else-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg">
      <p class="font-medium">Failed to load embedded content</p>
      <p class="text-sm">{{ error }}</p>
    </div>
    <div v-else class="prose prose-galaxy max-w-none" v-html="content"></div>
  </div>
</template>
