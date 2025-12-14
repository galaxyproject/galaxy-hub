<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src?: string;
  url?: string;
  youtube?: string;
  vimeo?: string;
  title?: string;
}>();

// Determine video type and generate embed URL
const videoInfo = computed(() => {
  const url = props.src || props.url || '';

  // YouTube
  if (props.youtube) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${props.youtube}`,
    };
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else {
      const match = url.match(/[?&]v=([^&]+)/);
      videoId = match?.[1] || '';
    }
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  }

  // Vimeo
  if (props.vimeo) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${props.vimeo}`,
    };
  }

  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop()?.split('?')[0] || '';
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
    };
  }

  // Direct video file
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return {
      type: 'native',
      src: url,
    };
  }

  return { type: 'unknown', src: url };
});
</script>

<template>
  <div class="video-player my-6">
    <!-- YouTube/Vimeo iframe embed -->
    <div
      v-if="videoInfo.type === 'youtube' || videoInfo.type === 'vimeo'"
      class="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg"
    >
      <iframe
        :src="videoInfo.embedUrl"
        :title="title || 'Video'"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Native video player -->
    <video
      v-else-if="videoInfo.type === 'native'"
      :src="videoInfo.src"
      controls
      class="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
    >
      <p>Your browser does not support the video element.</p>
    </video>

    <!-- Unknown/unsupported -->
    <div v-else class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">Unable to embed video</p>
      <a
        v-if="src || url"
        :href="src || url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:underline"
      >
        Open video
      </a>
    </div>

    <!-- Caption -->
    <p v-if="title" class="text-center text-sm text-gray-600 mt-2">{{ title }}</p>
  </div>
</template>
