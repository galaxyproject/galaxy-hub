<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

const props = defineProps<{
  tweetUrl?: string;
  id?: string;
  tweet?: string;
}>();

const container = ref<HTMLElement | null>(null);
const loaded = ref(false);
const error = ref(false);

const tweetId = computed(() => props.id || props.tweet || props.tweetUrl?.match(/\/status(?:es)?\/(\d+)/)?.[1]);

const href = computed(
  () => props.tweetUrl || (tweetId.value ? `https://twitter.com/i/status/${tweetId.value}` : undefined)
);

onMounted(async () => {
  if (!container.value) return;

  if (!tweetId.value) {
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
    await (window as any).twttr.widgets.createTweet(tweetId.value, container.value, {
      theme: 'light',
      dnt: true,
    });

    loaded.value = true;
  } catch (e) {
    console.error('Failed to load tweet:', e);
    error.value = true;
  }
});
</script>

<template>
  <div class="twitter-embed my-4">
    <div v-if="error" class="p-4 bg-ebony-clay-50 rounded-lg text-center">
      <p class="text-chicago-600">Unable to load tweet</p>
      <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer" class="text-galaxy-primary hover:underline">
        View on Twitter
      </a>
    </div>
    <div v-show="!error" ref="container" class="flex justify-center"></div>
  </div>
</template>
