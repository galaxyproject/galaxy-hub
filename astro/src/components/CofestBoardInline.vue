<script setup lang="ts">
import type { Project } from '@/utils/cofest-csv';
import CofestProject from '@/components/CofestProject.vue';

defineProps<{
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}>();
</script>

<template>
  <div>
    <div v-if="isLoading" class="py-8 text-center text-galaxy-grey">Loading projects…</div>
    <div v-else-if="error" class="py-8 text-center text-galaxy-grey">
      Could not load projects: {{ error }}. Will retry shortly.
    </div>
    <div v-else-if="projects.length === 0" class="py-8 text-center text-galaxy-grey">
      No projects found yet — check back soon!
    </div>
    <div v-else class="gx-tile-grid not-prose">
      <CofestProject v-for="p in projects" :key="p.project" :project="p" />
    </div>
  </div>
</template>
