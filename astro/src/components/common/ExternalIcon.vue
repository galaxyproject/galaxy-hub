<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  href?: string;
}>();

const isGTN = computed(() => {
  const url = props.href || '';
  return /training\.galaxyproject\.org/i.test(url);
});
</script>

<template>
  <span
    class="inline-flex items-center text-xs font-medium text-gray-500 ml-2 align-middle"
    title="Opens external site"
    data-external-icon
  >
    <template v-if="isGTN">
      <img src="/images/logos/gtn_icon.svg" alt="GTN" class="h-4 w-4" loading="lazy" />
    </template>
    <template v-else>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h7m0 0l-3-3m3 3l-3 3m6-8h2a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2"
        />
      </svg>
    </template>
  </span>
</template>
