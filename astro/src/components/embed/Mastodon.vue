<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  url: string;
}>();

// Check if URL is valid
const isValidUrl = computed(() => {
  try {
    new URL(props.url);
    return true;
  } catch {
    return false;
  }
});

// Extract embed URL from Mastodon post URL
const embedUrl = computed(() => {
  if (!isValidUrl.value) return '';
  // Mastodon embed URL format: https://instance/@user/postid/embed
  return `${props.url}/embed`;
});
</script>

<template>
  <div class="mastodon-embed my-4">
    <div v-if="!isValidUrl" class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">Unable to load Mastodon post</p>
      <a :href="url" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">
        View on Mastodon
      </a>
    </div>
    <iframe
      v-else
      :src="embedUrl"
      class="mastodon-embed-iframe w-full min-h-[200px] border-0"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-popups"
    ></iframe>
  </div>
</template>

<style scoped>
.mastodon-embed-iframe {
  max-width: 550px;
  margin: 0 auto;
  display: block;
}
</style>
