<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { parseTweetId, parseTweetUrl } from '@/utils/tweet-url';

const props = defineProps<{
  tweetUrl?: string;
  id?: string | number;
  tweet?: string | number;
}>();

const container = ref<HTMLElement | null>(null);
const loaded = ref(false);

const parsedUrl = computed(() => parseTweetUrl(props.tweetUrl));

const tweetId = computed(() => parseTweetId(props.id) ?? parseTweetId(props.tweet) ?? parsedUrl.value?.id);

const href = computed(
  () => parsedUrl.value?.href || (tweetId.value ? `https://twitter.com/i/status/${tweetId.value}` : undefined)
);

const user = computed(() => parsedUrl.value?.user);

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

// createTweet never settles for deleted, private or non-embeddable tweets (the frame only
// shows "Not found"), so clear the frame and fall back to the link if it has not rendered
const RENDER_TIMEOUT_MS = 10000;
let timer: ReturnType<typeof setTimeout> | undefined;

onMounted(async () => {
  const target = container.value;
  const id = tweetId.value;
  if (!target || !id) return;

  const twttr = await loadWidgets();
  timer = setTimeout(() => {
    if (!loaded.value) target.replaceChildren();
  }, RENDER_TIMEOUT_MS);

  try {
    const element = await twttr.widgets.createTweet(id, target, {
      theme: 'light',
      dnt: true,
    });
    loaded.value = !!element && target.contains(element);
    if (!loaded.value) target.replaceChildren();
  } catch (e) {
    console.error('Failed to load tweet:', e);
    target.replaceChildren();
  } finally {
    clearTimeout(timer);
  }
});

onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <div class="twitter-embed my-4">
    <div v-if="href && !loaded" class="p-4 bg-ebony-clay-50 rounded-lg text-center">
      <a :href="href" target="_blank" rel="noopener noreferrer" class="text-galaxy-primary hover:underline">
        {{ user ? `View tweet by @${user} on X` : 'View tweet on X' }}
        <span class="sr-only">(opens in a new tab)</span>
      </a>
    </div>
    <div ref="container" class="flex justify-center"></div>
  </div>
</template>
