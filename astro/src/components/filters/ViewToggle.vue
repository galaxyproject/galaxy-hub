<script setup lang="ts">
/**
 * Rows/tiles switch for listings (DESIGN.md "View Toggle"): a segmented control of two `aria-pressed`
 * buttons in a labelled group. The list owns the state and the URL.
 */
import { computed } from 'vue';
import { LayoutGrid, List } from '@lucide/vue';
import { LIST_VIEW_DEFAULT, type ListView } from '@/utils/listView';

const props = withDefaults(
  defineProps<{
    /** Accessible name of the group, e.g. "News layout". */
    label: string;
    rowsLabel?: string;
    tilesLabel?: string;
  }>(),
  { rowsLabel: 'Rows', tilesLabel: 'Tiles' }
);

const view = defineModel<ListView>({ default: LIST_VIEW_DEFAULT });

const options = computed(() => [
  { value: 'rows' as const, label: props.rowsLabel, icon: List },
  { value: 'tiles' as const, label: props.tilesLabel, icon: LayoutGrid },
]);

// 32px tall, 14/20 text, 16px icon
const buttonBase =
  'inline-flex min-h-8 items-center gap-1.5 rounded-[4px] px-3 py-1 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-galaxy-primary';
const buttonOn = 'bg-galaxy-primary font-bold text-white';
const buttonOff = 'text-chicago-700 hover:bg-bay-of-many-100 hover:text-galaxy-dark';
</script>

<template>
  <!-- Hidden on phones, where tiles are one column (a ?view=tiles link still shows tiles).
       border-1, not border: bootstrap-compat's global .border sets a grey colour with !important -->
  <div
    role="group"
    :aria-label="label"
    class="hidden gap-0.5 rounded-md border-1 border-chicago-400 bg-white p-0.5 sm:inline-flex"
    data-view-toggle
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="view === option.value"
      :data-view="option.value"
      :class="[buttonBase, view === option.value ? buttonOn : buttonOff]"
      @click="view = option.value"
    >
      <component :is="option.icon" :size="16" aria-hidden="true" class="shrink-0" />
      <span>{{ option.label }}</span>
    </button>
  </div>
</template>
