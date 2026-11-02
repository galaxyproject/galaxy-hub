<script setup lang="ts">
import { computed } from 'vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { YearOption, YearValue } from './types';

const props = withDefaults(
  defineProps<{
    years: YearOption[];
    label: string;
    allLabel?: string;
    /** Years shown as chips; the rest go into the "Older years" select. */
    chipCount?: number;
    /** Opt-in "Unknown year" chip (entries without a year) with this count; left out when undefined. */
    unknownCount?: number;
  }>(),
  { allLabel: 'All years', chipCount: 5, unknownCount: undefined }
);

const model = defineModel<YearValue>({ default: null });

const chipYears = computed(() => props.years.slice(0, props.chipCount));
const olderYears = computed(() => props.years.slice(props.chipCount));
const olderSelected = computed(() => olderYears.value.some((o) => o.year === model.value));
// Reka Select shows the placeholder for an empty string
const olderValue = computed(() => (olderSelected.value ? String(model.value) : ''));

function onOlderChange(value: unknown) {
  if (value === null || value === undefined || value === '') return;
  model.value = Number(value);
}

const chipBase =
  'inline-flex min-h-8 items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-galaxy-primary';
const chipOn = 'bg-galaxy-primary text-white';
const chipOff = 'bg-ebony-clay-50 text-chicago-700 hover:bg-ebony-clay-100';
</script>

<template>
  <div role="group" :aria-label="label" class="flex flex-wrap items-center gap-2" data-year-filter>
    <button
      type="button"
      :aria-pressed="model === null"
      :class="[chipBase, model === null ? chipOn : chipOff]"
      @click="model = null"
    >
      {{ allLabel }}
    </button>
    <button
      v-for="option in chipYears"
      :key="option.year"
      type="button"
      :aria-pressed="model === option.year"
      :class="[chipBase, model === option.year ? chipOn : chipOff]"
      @click="model = option.year"
    >
      {{ option.year }}
      <span class="ml-1 text-xs">({{ option.count }})</span>
    </button>
    <Select v-if="olderYears.length > 0" :model-value="olderValue" @update:model-value="onOlderChange">
      <SelectTrigger
        size="sm"
        aria-label="Older years"
        :class="[
          'min-h-8 border-0 font-medium shadow-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-galaxy-primary data-[placeholder]:text-chicago-700',
          olderSelected ? chipOn : chipOff,
        ]"
      >
        <SelectValue placeholder="Older years" />
      </SelectTrigger>
      <SelectContent class="max-h-72">
        <SelectItem v-for="option in olderYears" :key="option.year" :value="String(option.year)">
          {{ option.year }} ({{ option.count }})
        </SelectItem>
      </SelectContent>
    </Select>
    <button
      v-if="unknownCount !== undefined"
      type="button"
      :aria-pressed="model === 'unknown'"
      :class="[chipBase, model === 'unknown' ? chipOn : chipOff]"
      @click="model = 'unknown'"
    >
      Unknown year
      <span class="ml-1 text-xs">({{ unknownCount }})</span>
    </button>
  </div>
</template>
