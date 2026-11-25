<template>
  <div class="map-toggle-container">
    <Button
      type="button"
      variant="outline"
      class="h-10"
      :aria-expanded="isVisible"
      :aria-controls="mapId"
      @click="toggleMap"
    >
      <MapIcon :size="16" aria-hidden="true" />
      {{ isVisible ? 'Hide' : 'Show' }} Platform Map
    </Button>

    <transition name="slide-fade">
      <div v-if="isVisible" :id="mapId" class="pt-4">
        <PlatformMap :platforms="platforms" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Map as MapIcon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import PlatformMap from './PlatformMap.vue';

withDefaults(defineProps<{ platforms?: unknown[] }>(), { platforms: () => [] });

const mapId = 'platform-map';
const isVisible = ref(false);

function toggleMap() {
  isVisible.value = !isVisible.value;
}
</script>

<style scoped>
.map-toggle-container {
  margin-top: 1.5rem;
}

/* Smooth transition for showing/hiding map */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
