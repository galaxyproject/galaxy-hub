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

// Load the widget script once and queue callbacks until it is ready
function loadWidgets(): Promise<any> {
  const w = window as any;
  if (!w.twttr) {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.head.appendChild(script);

    const twttr: any = { _e: [] };
    twttr.ready = (f: (t: any) => void) => twttr._e.push(f);
    w.twttr = twttr;
  }
  return new Promise((resolve) => w.twttr.ready(resolve));
}

onMounted(async () => {
  if (!container.value) return;

  if (!tweetId.value) {
    error.value = true;
    return;
  }

  try {
    const twttr = await loadWidgets();

    // Create tweet embed
    await twttr.widgets.createTweet(tweetId.value, container.value, {
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
