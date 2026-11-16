<script setup lang="ts">
/**
 * Event date line for Vue islands; same markup and styles as EventDate.astro.
 */
import { computed } from 'vue';
import { Calendar } from '@lucide/vue';
import { eventDateParts, type DateFormatOptions } from '@/utils/dateUtils';
import './event-date.css';

const props = withDefaults(
  defineProps<{
    start: Date | string | null | undefined;
    end?: Date | string | null;
    format?: boolean | DateFormatOptions;
    /** Muted text for past events. */
    past?: boolean;
  }>(),
  { end: undefined, format: true, past: false }
);

const parts = computed(() => eventDateParts(props.start, props.end, props.format));
</script>

<template>
  <span v-if="parts" :class="['gx-event-date', { 'gx-event-date--past': past }]">
    <span class="gx-event-date__icon" aria-hidden="true"><Calendar :size="16" /></span>
    <span class="gx-event-date__range"
      ><time :datetime="parts.isoStart">{{ parts.start }}</time
      ><template v-if="parts.end"
        >{{ ' - ' }}<time :datetime="parts.isoEnd ?? undefined">{{ parts.end }}</time></template
      ></span
    >{{ ' ' }}<span v-if="parts.durationLabel" class="gx-event-date__dur">{{ parts.durationLabel }}</span>
  </span>
</template>
