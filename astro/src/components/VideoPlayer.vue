<template>
  <div class="video-player-wrapper">
    <video 
      :src="src" 
      ref="videoPlayer" 
      controls
      :poster="poster"
      :width="width"
      :height="height"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      @loadedmetadata="onLoadedMetadata"
      @error="onError"
    >
      <p>Your browser doesn't support HTML5 video.</p>
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: { 
    type: String, 
    required: true 
  },
  poster: {
    type: String,
    default: null
  },
  width: {
    type: [String, Number],
    default: null
  },
  height: {
    type: [String, Number],
    default: null
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  muted: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['loadedmetadata', 'error']);

const videoPlayer = ref(null);

onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.load();
  }
});

const onLoadedMetadata = (event) => {
  emit('loadedmetadata', event);
};

const onError = (event) => {
  console.error('Video loading error:', event);
  emit('error', event);
};
</script>

<style scoped>
.video-player-wrapper {
  max-width: 100%;
  margin: 1rem 0;
}

video {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>