<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  photoId?: string;
  albumId?: string;
  userId?: string;
  url?: string;
}>();

const embedUrl = computed(() => {
  if (props.url) return props.url;

  if (props.photoId) {
    return `https://www.flickr.com/photos/${props.userId || 'galaxyproject'}/${props.photoId}/`;
  }

  if (props.albumId) {
    return `https://www.flickr.com/photos/${props.userId || 'galaxyproject'}/albums/${props.albumId}`;
  }

  return '';
});
</script>

<template>
  <div class="flickr-embed my-6">
    <div v-if="embedUrl" class="text-center">
      <a
        :href="embedUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <div class="flex items-center gap-2 text-gray-700">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="7" cy="12" r="5" fill="#0063DC" />
            <circle cx="17" cy="12" r="5" fill="#FF0084" />
          </svg>
          <span>View on Flickr</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </a>
    </div>
    <div v-else class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">No Flickr content specified</p>
    </div>
  </div>
</template>
