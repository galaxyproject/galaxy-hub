<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  tweetUrl?: string;
  id?: string;
}>();

const container = ref<HTMLElement | null>(null);
const loaded = ref(false);
const error = ref(false);

onMounted(async () => {
  if (!container.value) return;

  // Get tweet URL from props or construct from ID
  let url = props.tweetUrl;
  if (!url && props.id) {
    url = `https://twitter.com/i/status/${props.id}`;
  }

  if (!url) {
    error.value = true;
    return;
  }

  try {
    // Load Twitter widget script
    if (!(window as any).twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.head.appendChild(script);

      await new Promise<void>((resolve) => {
        script.onload = () => resolve();
      });
    }

    // Create tweet embed
    await (window as any).twttr.widgets.createTweet(
      props.id || url.split('/').pop(),
      container.value,
      {
        theme: 'light',
        dnt: true,
      }
    );

    loaded.value = true;
  } catch (e) {
    console.error('Failed to load tweet:', e);
    error.value = true;
  }
});
</script>

<template>
  <div class="twitter-embed my-4">
    <div v-if="error" class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">Unable to load tweet</p>
      <a
        v-if="tweetUrl || id"
        :href="tweetUrl || `https://twitter.com/i/status/${id}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:underline"
      >
        View on Twitter
      </a>
    </div>
    <div v-show="!error" ref="container" class="flex justify-center"></div>
  </div>
</template>
