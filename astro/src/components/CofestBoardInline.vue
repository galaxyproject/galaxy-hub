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
    <div v-else class="gx-tile-grid not-prose">
      <Card v-for="p in projects" :key="p.project" class="gx-tile h-full border-galaxy-primary/10 py-0 gap-0">
        <CardHeader class="pt-4 pb-1">
          <CardTitle class="m-0 text-galaxy-dark text-base leading-tight">{{ p.project }}</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-1 flex-col gap-2.5 pt-1 pb-4">
          <p v-if="p.description" class="text-sm text-galaxy-grey leading-relaxed">{{ p.description }}</p>
          <div v-if="p.lead" class="text-sm">
            <span class="text-galaxy-grey">Lead: </span>
            <span class="font-semibold text-galaxy-primary">{{ p.lead }}</span>
          </div>
          <div v-if="p.assignees.length > 0" class="team-section">
            <span class="team-label">TEAM</span>
            <div class="flex flex-wrap gap-1.5">
              <Badge v-for="name in p.assignees" :key="name" variant="default" class="text-xs font-normal">
                {{ name }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.team-section {
  margin-top: auto;
  padding-top: 0.45rem;
  border-top: 1px solid color-mix(in srgb, var(--color-galaxy-primary, #25537b) 12%, transparent);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.team-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-galaxy-grey, #6b7280);
}
</style>
