<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  url: string;
}>();

const error = ref(false);

// Extract embed URL from Mastodon post URL
const embedUrl = computed(() => {
  try {
    const url = new URL(props.url);
    // Mastodon embed URL format: https://instance/@user/postid/embed
    return `${props.url}/embed`;
  } catch {
    error.value = true;
    return '';
  }
});
</script>

<template>
  <div class="mastodon-embed my-4">
    <div v-if="error" class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">Unable to load Mastodon post</p>
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-purple-600 hover:underline"
      >
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
