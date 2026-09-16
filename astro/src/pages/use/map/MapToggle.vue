<template>
  <div class="map-toggle-container">
    <button
      @click="toggleMap"
      class="cursor-pointer p-1 font-medium text-galaxy-dark rounded-lg transition-colors bg-white"
    >
      <span class="inline-flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          ></path>
        </svg>
        {{ isVisible ? 'Hide' : 'Show' }} Platform Map
      </span>
    </button>

    <transition name="slide-fade">
      <div v-if="isVisible" class="p-4">
        <PlatformMap :platforms="platforms" />
      </div>
    </transition>
  </div>
</template>

<script>
import PlatformMap from './PlatformMap.vue';

export default {
  name: 'MapToggle',
  components: {
    PlatformMap,
  },
  props: {
    platforms: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleMap() {
      this.isVisible = !this.isVisible;
    },
  },
};
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
