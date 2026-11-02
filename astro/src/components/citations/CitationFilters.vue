<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { isOnPage, onPopState, parseYearParam, readParams, writeParams } from '@/utils/urlFilters';
import { countByYear, matchesTerms, queryTerms } from '@/utils/listFilters';
import FilterBar from '../filters/FilterBar.vue';
import type { YearOption, YearValue } from '../filters/types';

const props = defineProps<{
  /** Pathname of the page the list is on; the URL is only read and written while it matches. */
  path: string;
  total: number;
  /** Every year in the list, newest first, with its number of entries. */
  years: YearOption[];
  /** Entries without a year; the "Unknown year" chip is shown only when set. */
  unknownCount?: number;
  noun: { singular: string; plural: string };
}>();

// The articles are server HTML next to this island (CitationList.astro); filtering hides them in place
interface Entry {
  el: HTMLElement;
  year: number | 'unknown';
  text: string;
}

const root = ref<HTMLElement | null>(null);
const entries = shallowRef<Entry[]>([]);
let emptyNote: HTMLElement | null = null;

// URL params, in this order: q (title + authors), year (a year, `unknown`, or none for all years)
const FILTER_PARAMS = { q: null, year: null };

// Read from the URL after mount: the server render has no query, and hydration must match it
const searchQuery = ref('');
const selectedYear = ref<YearValue>(null);

const terms = computed(() => queryTerms(searchQuery.value));
const matches = (entry: Entry) => matchesTerms(entry.text, terms.value);
const inYear = (entry: Entry) => selectedYear.value === null || entry.year === selectedYear.value;

// Until the articles are read (server render, hydration) the counts are the full list's
const yearOptions = computed(() =>
  entries.value.length === 0
    ? props.years
    : countByYear(
        entries.value,
        (entry) => (entry.year === 'unknown' ? null : entry.year),
        (entry) => matches(entry)
      )
);
const unknownYearCount = computed(() =>
  props.unknownCount === undefined || entries.value.length === 0
    ? props.unknownCount
    : entries.value.filter((entry) => entry.year === 'unknown' && matches(entry)).length
);
const resultCount = computed(() =>
  entries.value.length === 0 ? props.total : entries.value.filter((entry) => inYear(entry) && matches(entry)).length
);

const resultContext = computed(() =>
  [
    selectedYear.value === 'unknown' ? 'with no year' : selectedYear.value !== null ? `in ${selectedYear.value}` : '',
    searchQuery.value ? `matching “${searchQuery.value}”` : '',
  ]
    .filter(Boolean)
    .join(' ')
);

function isKnownYear(year: YearValue): boolean {
  if (year === 'unknown') return props.unknownCount !== undefined;
  return year !== null && props.years.some((option) => option.year === year);
}

function applyUrlFilters() {
  const { q, year } = readParams(FILTER_PARAMS);
  searchQuery.value = q ?? '';
  // A year this list does not have means all years
  const parsed = parseYearParam(year);
  selectedYear.value = isKnownYear(parsed) ? parsed : null;
  // The state may not change (e.g. `?year=1900` -> all years), so drop what was not applied here
  writeUrl();
}

function writeUrl() {
  writeParams({ q: searchQuery.value, year: selectedYear.value });
}

function applyFilter() {
  let shown = 0;
  for (const entry of entries.value) {
    const visible = inYear(entry) && matches(entry);
    entry.el.classList.toggle('hidden', !visible);
    if (visible) shown += 1;
  }
  emptyNote?.classList.toggle('hidden', shown > 0);
}

let stopPopState = () => {};

onMounted(() => {
  const list = root.value?.closest<HTMLElement>('[data-citation-list]');
  if (!list) return;
  entries.value = Array.from(list.querySelectorAll<HTMLElement>('article[data-citation-year]')).map((el) => {
    const year = Number(el.dataset.citationYear);
    // Title and authors as shown, so inline markup in titles does not split words
    return { el, year: Number.isInteger(year) ? year : 'unknown', text: (el.textContent ?? '').toLowerCase() };
  });
  emptyNote = list.querySelector<HTMLElement>('[data-citation-empty]');
  // Hydrated after back/forward already left this page: leave the other page's URL alone
  if (!isOnPage(props.path)) return;
  applyUrlFilters();
  // Back/forward restores the filters from the URL
  stopPopState = onPopState(applyUrlFilters);
});

onUnmounted(() => stopPopState());

watch([searchQuery, selectedYear, entries], applyFilter);
watch([searchQuery, selectedYear], writeUrl);
</script>

<template>
  <div ref="root" class="citation-filters">
    <FilterBar
      v-model:q="searchQuery"
      v-model:year="selectedYear"
      :label="`Filter ${noun.plural}`"
      :years="yearOptions"
      :unknown-year-count="unknownYearCount"
      :year-label="`Filter ${noun.plural} by year`"
      :search-label="`Search ${noun.plural}`"
      search-placeholder="Search titles and authors"
      :result-count="resultCount"
      :result-noun="noun.plural"
      :result-noun-singular="noun.singular"
      :result-context="resultContext"
    />
  </div>
</template>
