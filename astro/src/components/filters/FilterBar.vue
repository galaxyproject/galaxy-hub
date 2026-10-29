<script setup lang="ts">
import { computed, onUnmounted, ref, useId, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import YearFilter from './YearFilter.vue';
import type { FilterOption, YearOption } from './types';

const props = withDefaults(
  defineProps<{
    /** Accessible name of the whole bar, e.g. "Filter news". */
    label: string;
    resultCount: number;
    /** Plural noun for the result count, e.g. "articles". */
    resultNoun: string;
    resultNounSingular: string;
    /** Extra context for the count line, e.g. "in 2024". */
    resultContext?: string;
    years?: YearOption[];
    yearLabel?: string;
    searchLabel?: string;
    searchPlaceholder?: string;
    tagOptions?: FilterOption[];
    tagLabel?: string;
    tagAllLabel?: string;
    debounceMs?: number;
  }>(),
  {
    resultContext: '',
    years: () => [],
    yearLabel: 'Filter by year',
    searchLabel: 'Search',
    searchPlaceholder: '',
    tagOptions: () => [],
    tagLabel: 'Tag',
    tagAllLabel: 'All tags',
    debounceMs: 250,
  }
);

const q = defineModel<string>('q', { default: '' });
const year = defineModel<number | null>('year', { default: null });
const tag = defineModel<string | null>('tag', { default: null });

const id = useId();
const searchId = `filter-${id}-search`;
const tagLabelId = `filter-${id}-tag`;

// The input updates at once; the model (and with it the URL and the count) follows after a pause
const draft = ref(q.value);
let timer: ReturnType<typeof setTimeout> | undefined;

watch(q, (value) => {
  if (value !== draft.value.trim()) draft.value = value;
});

watch(draft, (value) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    q.value = value.trim();
  }, props.debounceMs);
});

onUnmounted(() => clearTimeout(timer));

// Solid 2px outline instead of the primitives' 50% ring (below 3:1 on white); outlines also show in forced colors
const focusRing =
  'focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-galaxy-primary';

const ALL = '__all__';
const tagValue = computed(() => tag.value ?? ALL);

function onTagChange(value: unknown) {
  tag.value = typeof value === 'string' && value !== ALL ? value : null;
}

const hasFilters = computed(() => q.value !== '' || year.value !== null || tag.value !== null);

function clearAll() {
  clearTimeout(timer);
  draft.value = '';
  q.value = '';
  year.value = null;
  tag.value = null;
  // The button disappears once nothing is filtered; keep focus in the bar
  document.getElementById(searchId)?.focus();
}

const countText = computed(() => {
  const noun = props.resultCount === 1 ? props.resultNounSingular : props.resultNoun;
  return [`${props.resultCount} ${noun}`, props.resultContext].filter(Boolean).join(' ');
});
</script>

<template>
  <div role="group" :aria-label="label" class="filter-bar mb-6 space-y-4">
    <YearFilter v-if="years.length > 0" v-model="year" :years="years" :label="yearLabel" />

    <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div class="min-w-0 flex-1">
        <label :for="searchId" class="mb-1 block text-sm font-medium text-chicago-700">{{ searchLabel }}</label>
        <Input
          :id="searchId"
          v-model="draft"
          type="search"
          :placeholder="searchPlaceholder"
          autocomplete="off"
          class="h-10 border-chicago-400"
          :class="focusRing"
        />
      </div>

      <div v-if="tagOptions.length > 0" class="min-w-0 sm:w-56">
        <span :id="tagLabelId" class="mb-1 block text-sm font-medium text-chicago-700">{{ tagLabel }}</span>
        <Select :model-value="tagValue" @update:model-value="onTagChange">
          <SelectTrigger
            :aria-labelledby="tagLabelId"
            class="h-10 w-full border-chicago-400 data-[size=default]:h-10"
            :class="focusRing"
          >
            <SelectValue :placeholder="tagAllLabel" />
          </SelectTrigger>
          <SelectContent class="max-h-72">
            <SelectItem :value="ALL">{{ tagAllLabel }}</SelectItem>
            <SelectItem v-for="option in tagOptions" :key="option.value" :value="option.value">
              {{ option.label }}<template v-if="option.count !== undefined"> ({{ option.count }})</template>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        v-if="hasFilters"
        type="button"
        variant="outline"
        class="h-10 shrink-0"
        :class="focusRing"
        @click="clearAll"
      >
        Clear filters
      </Button>
    </div>

    <!-- Count left, optional list actions (e.g. the view toggle) right -->
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <p class="text-sm text-chicago-600" aria-live="polite" aria-atomic="true" data-filter-count>
        {{ countText }}
      </p>
      <slot name="actions" />
    </div>
  </div>
</template>
