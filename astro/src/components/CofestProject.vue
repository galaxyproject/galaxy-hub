<script setup lang="ts">
import type { Project } from '@/utils/cofest-csv';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <Card class="gx-tile h-full border-galaxy-primary/10 py-0 gap-0">
    <CardHeader class="pt-4 pb-1">
      <CardTitle class="m-0 text-galaxy-dark text-base leading-tight">{{ project.project }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col gap-2.5 pt-1 pb-4">
      <p v-if="project.description" class="text-sm text-galaxy-grey leading-relaxed">{{ project.description }}</p>
      <div v-if="project.lead" class="text-sm">
        <span class="text-galaxy-grey">Lead: </span>
        <span class="font-semibold text-galaxy-primary">{{ project.lead }}</span>
      </div>
      <div class="team-section">
        <span class="team-label">TEAM</span>
        <div v-if="project.assignees.length > 0" class="flex flex-wrap gap-1.5">
          <Badge v-for="name in project.assignees" :key="name" variant="default" class="text-xs font-normal">
            {{ name }}
          </Badge>
        </div>
        <p v-else class="text-xs text-galaxy-primary italic">✨ Open spot — come join this project!</p>
      </div>
    </CardContent>
  </Card>
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
