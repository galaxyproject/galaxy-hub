<script setup lang="ts">
import type { Project } from './CofestBoard.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div v-else class="gx-tile-grid">
      <Card v-for="p in projects" :key="p.project" class="gx-tile border-galaxy-primary/10">
        <CardHeader class="pb-2">
          <CardTitle class="text-galaxy-dark text-base leading-snug">{{ p.project }}</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-3 pt-0">
          <p v-if="p.description" class="text-sm text-galaxy-grey leading-relaxed">{{ p.description }}</p>
          <div v-if="p.lead" class="text-sm">
            <span class="text-galaxy-grey">Lead: </span>
            <span class="font-semibold text-galaxy-primary">{{ p.lead }}</span>
          </div>
          <div v-if="p.assignees.length > 0" class="flex flex-wrap gap-1.5">
            <Badge v-for="name in p.assignees" :key="name" variant="secondary" class="text-xs">
              {{ name }}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
