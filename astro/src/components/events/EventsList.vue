<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite, subsites, type SubsiteId } from '@/stores/subsiteStore';
import { isUpcomingEvent, isPastEvent } from '@/utils/dateUtils';
import { contentMatchesSubsite } from '@/utils/subsites';
import { isOnPage, onPopState, parseYearParam, readParams, writeParams } from '@/utils/urlFilters';
import { countByYear, matchesTerms, queryTerms, yearOf } from '@/utils/listFilters';
import { LIST_VIEW_DEFAULT, parseListView, type ListView } from '@/utils/listView';
import { eventSearchText, parseEventStatus, type EventLocation, type EventStatus } from '@/utils/eventFilters';
import FilterBar from '../filters/FilterBar.vue';
import ViewToggle from '../filters/ViewToggle.vue';
import ExternalIcon from '../common/ExternalIcon.vue';
import EventDate from './EventDate.vue';
import type { YearValue } from '../filters/types';

interface EventData {
  slug: string;
  title: string;
  date?: string;
  end?: string;
  /** Raw tease text, searched by the filter bar. */
  tease?: string;
  /** Tease rendered to HTML at build time. */
  teaseHtml?: string;
  location?: EventLocation;
  tags?: string[];
  subsites?: string[] | string;
  externalUrl?: string;
}

const props = withDefaults(
  defineProps<{
    events: EventData[];
    initialSubsite?: SubsiteId;
    /** This page's path, for the late-hydration guard (isOnPage). */
    path: string;
    /** False on the archive: past events only, no status filter. */
    showUpcoming?: boolean;
  }>(),
  {
    showUpcoming: true,
  }
);

const $subsite = useStore(currentSubsite);
const hasMounted = ref(false);
const effectiveSubsite = computed(() =>
  !hasMounted.value && props.initialSubsite ? props.initialSubsite : $subsite.value
);

// URL params, in this order: q (title, summary and location text), year (null = all years), tag,
// status (upcoming | past, null = both), view. "Load more" stays out.
const FILTER_PARAMS = { q: null, year: null, tag: null, status: null, view: LIST_VIEW_DEFAULT };

// Read from the URL after mount: the server render has no query, and hydration must match it
const searchQuery = ref('');
const selectedYear = ref<YearValue>(null);
const selectedTag = ref<string | null>(null);
const selectedStatus = ref<EventStatus | null>(null);
const view = ref<ListView>(LIST_VIEW_DEFAULT);
const isTiles = computed(() => view.value === 'tiles');
const tilesGrid = 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-4';
const pageSize = 50;
const pastDisplayCount = ref(pageSize);

// The archive lists past events only, so it has no status filter
const statusOptions = computed(() =>
  props.showUpcoming
    ? [
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'past', label: 'Past' },
      ]
    : []
);

function applyUrlFilters() {
  const params = readParams(FILTER_PARAMS);
  searchQuery.value = params.q ?? '';
  // Events have no "Unknown year" chip, so ?year=unknown means all years
  const year = parseYearParam(params.year);
  selectedYear.value = year === 'unknown' ? null : year;
  selectedTag.value = params.tag;
  selectedStatus.value = props.showUpcoming ? parseEventStatus(params.status) : null;
  view.value = parseListView(params.view);
}

function onStatusChange(value: string | null) {
  selectedStatus.value = parseEventStatus(value);
}

let stopPopState = () => {};

// Set initial subsite from URL route if provided
onMounted(() => {
  // Mounted after back/forward already left this page: leave the other page's URL and region alone
  if (!isOnPage(props.path)) return;
  if (props.initialSubsite && props.initialSubsite !== 'global') {
    currentSubsite.set(props.initialSubsite);
  }
  applyUrlFilters();
  hasMounted.value = true;
  // Back/forward restores the filters and the layout from the URL
  stopPopState = onPopState(applyUrlFilters);
});

onUnmounted(() => stopPopState());

function loadMorePast() {
  pastDisplayCount.value += pageSize;
}

const getYear = (event: EventData) => yearOf(event.date);

// Filter events based on current subsite
const filteredEvents = computed(() => {
  const subsite = effectiveSubsite.value;

  // Global shows all events
  if (subsite === 'global') {
    return props.events;
  }

  return props.events.filter((event) => {
    return contentMatchesSubsite(event.subsites, subsite);
  });
});

// Separate upcoming and past
const now = new Date();

function toDate(d: string | undefined): Date | null {
  if (!d) return null;
  return new Date(d);
}

const allUpcomingEvents = computed(() => {
  if (!props.showUpcoming) return [];
  return filteredEvents.value
    .filter((event) => isUpcomingEvent(event.date, event.end, now))
    .sort((a, b) => {
      const dateA = toDate(a.date)?.getTime() || 0;
      const dateB = toDate(b.date)?.getTime() || 0;
      return dateA - dateB;
    });
});

// All past events (before the other filters)
const allPastEvents = computed(() => {
  return filteredEvents.value
    .filter((event) => isPastEvent(event.date, event.end, now))
    .sort((a, b) => {
      const dateA = toDate(a.date)?.getTime() || 0;
      const dateB = toDate(b.date)?.getTime() || 0;
      return dateB - dateA;
    });
});

const showUpcomingSection = computed(() => props.showUpcoming && selectedStatus.value !== 'past');
const showPastSection = computed(() => selectedStatus.value !== 'upcoming');

// Lower-cased title + tease + location, built once per event list
const searchText = computed(() => {
  const map = new Map<EventData, string>();
  props.events.forEach((event) => map.set(event, eventSearchText(event)));
  return map;
});

// Every word of the query must appear in the title, tease or location
const terms = computed(() => queryTerms(searchQuery.value));

function matchesQuery(event: EventData): boolean {
  return matchesTerms(searchText.value.get(event) ?? '', terms.value);
}

function matchesTag(event: EventData): boolean {
  return selectedTag.value === null || (event.tags ?? []).includes(selectedTag.value);
}

function matchesYear(event: EventData): boolean {
  return selectedYear.value === null || getYear(event) === selectedYear.value;
}

// Events the status filter keeps: the shown sections, before text, year and tag
const statusEvents = computed(() => [
  ...(showUpcomingSection.value ? allUpcomingEvents.value : []),
  ...(showPastSection.value ? allPastEvents.value : []),
]);

// Every year with an upcoming or past event in this subsite, newest first; chip counts follow the
// text, tag and status filters
const yearOptions = computed(() => {
  const shown = new Set(statusEvents.value);
  return countByYear(
    [...allUpcomingEvents.value, ...allPastEvents.value],
    getYear,
    (event) => shown.has(event) && matchesQuery(event) && matchesTag(event)
  );
});
const availableYears = computed(() => yearOptions.value.map((option) => option.year));

// Every tag in this subsite, A-Z; counts follow the text, year and status filters
const tagOptions = computed(() => {
  const all = new Set<string>();
  const counts = new Map<string, number>();
  [...allUpcomingEvents.value, ...allPastEvents.value].forEach((event) => {
    (event.tags ?? []).forEach((tag) => all.add(tag));
  });
  statusEvents.value.forEach((event) => {
    if (!matchesQuery(event) || !matchesYear(event)) return;
    (event.tags ?? []).forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });
  return Array.from(all)
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({ value: tag, label: tag, count: counts.get(tag) ?? 0 }));
});

// Drop a year or tag this subsite does not have (a stale or mistyped param), so the bar and the list agree
watch([selectedYear, availableYears], ([year, years]) => {
  if (typeof year === 'number' && !years.includes(year)) selectedYear.value = null;
});
watch([selectedTag, tagOptions], ([tag, options]) => {
  if (tag !== null && !options.some((option) => option.value === tag)) selectedTag.value = null;
});

// Reset pagination when a filter or the subsite changes
watch([searchQuery, selectedYear, selectedTag, selectedStatus, effectiveSubsite], () => {
  pastDisplayCount.value = pageSize;
});

const matchesFilters = (event: EventData) => matchesYear(event) && matchesTag(event) && matchesQuery(event);
const upcomingEvents = computed(() =>
  showUpcomingSection.value ? allUpcomingEvents.value.filter(matchesFilters) : []
);
const pastEvents = computed(() => (showPastSection.value ? allPastEvents.value.filter(matchesFilters) : []));
const resultCount = computed(() => upcomingEvents.value.length + pastEvents.value.length);

const hasFilters = computed(
  () => searchQuery.value !== '' || selectedYear.value !== null || selectedTag.value !== null
);

const resultNoun = computed(() => (selectedStatus.value ? `${selectedStatus.value} events` : 'events'));
const resultNounSingular = computed(() => (selectedStatus.value ? `${selectedStatus.value} event` : 'event'));
const resultContext = computed(() =>
  [
    selectedYear.value !== null ? `in ${selectedYear.value}` : '',
    selectedTag.value !== null ? `tagged “${selectedTag.value}”` : '',
    searchQuery.value ? `matching “${searchQuery.value}”` : '',
  ]
    .filter(Boolean)
    .join(' ')
);

// One write for every param keeps them in the documented order
watch([searchQuery, selectedYear, selectedTag, selectedStatus, view], ([q, year, tag, status, layout]) => {
  writeParams({ q, year, tag, status, view: layout }, { defaults: { view: LIST_VIEW_DEFAULT } });
});

function getLocationText(location: EventData['location']): string {
  if (!location) return '';
  if (typeof location === 'string') return location;
  return location.city || location.name || 'Online';
}

function buildUrl(slug: string): string {
  return `/${slug}/`;
}

function displaySubsite(subsite: string): string {
  const match = subsites.find((s) => s.id === subsite);
  return match?.name ?? subsite;
}
</script>

<template>
  <div class="events-list">
    <!-- Subsite indicator -->
    <div v-if="effectiveSubsite !== 'global'" class="mb-6 p-4 bg-galaxy-primary/10 rounded-lg">
      <p class="text-sm text-galaxy-dark">
        Showing events for <strong>{{ displaySubsite(effectiveSubsite) }}</strong> subsite.
        <button @click="() => currentSubsite.set('global')" class="ml-2 text-galaxy-primary hover:underline">
          Show all events
        </button>
      </p>
    </div>

    <FilterBar
      v-model:q="searchQuery"
      v-model:year="selectedYear"
      v-model:tag="selectedTag"
      :status="selectedStatus"
      label="Filter events"
      :years="yearOptions"
      year-label="Filter events by year"
      search-label="Search events"
      search-placeholder="Search titles, summaries and places"
      :tag-options="tagOptions"
      tag-label="Tag"
      :status-options="statusOptions"
      status-label="Show"
      status-all-label="All events"
      :result-count="resultCount"
      :result-noun="resultNoun"
      :result-noun-singular="resultNounSingular"
      :result-context="resultContext"
      @update:status="onStatusChange"
    >
      <template #actions>
        <ViewToggle v-model="view" label="Events layout" />
      </template>
    </FilterBar>

    <!-- Upcoming Events -->
    <template v-if="showUpcomingSection">
      <section v-if="upcomingEvents.length > 0" class="mb-12">
        <h2 class="text-2xl font-semibold text-chicago-900 mb-6 flex items-center gap-2">
          <span class="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
          Upcoming Events
          <span class="text-sm font-normal text-chicago-500">({{ upcomingEvents.length }})</span>
        </h2>
        <div :data-view="view" :class="isTiles ? tilesGrid : 'space-y-6'">
          <article
            v-for="event in upcomingEvents"
            :key="event.slug"
            :class="[
              'bg-white border border-ebony-clay-100 rounded-lg hover:shadow-md transition-shadow',
              isTiles ? 'p-4' : 'p-6',
            ]"
          >
            <a :href="buildUrl(event.slug)" :class="isTiles ? 'block h-full' : 'block'">
              <div :class="['flex flex-col gap-4', { 'sm:flex-row sm:items-start sm:justify-between': !isTiles }]">
                <div class="flex-1">
                  <h3
                    :class="[
                      'font-semibold text-chicago-900 hover:text-galaxy-primary transition-colors',
                      isTiles ? 'text-base' : 'text-lg',
                    ]"
                  >
                    {{ event.title || 'Untitled Event' }}
                    <ExternalIcon v-if="event.externalUrl" :href="event.externalUrl" />
                  </h3>
                  <p
                    v-if="event.date || event.location"
                    class="text-sm text-chicago-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1"
                  >
                    <EventDate v-if="event.date" :start="event.date" :end="event.end" />
                    <span v-if="event.location" class="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {{ getLocationText(event.location) }}
                    </span>
                  </p>
                  <p
                    v-if="event.teaseHtml"
                    :class="['text-chicago-600 mt-2', { 'line-clamp-3 text-sm': isTiles }]"
                    v-html="event.teaseHtml"
                  ></p>
                </div>
              </div>
            </a>
          </article>
        </div>
      </section>

      <div v-else class="mb-12 p-8 text-center bg-ebony-clay-50 rounded-lg">
        <p class="text-chicago-600">
          {{ hasFilters ? 'No upcoming events match these filters.' : 'No upcoming events for this subsite.' }}
        </p>
      </div>
    </template>

    <!-- Past Events -->
    <section v-if="showPastSection">
      <h2 class="text-2xl font-semibold text-chicago-900 mb-4">
        Past Events
        <span class="text-sm font-normal text-chicago-500">({{ pastEvents.length }})</span>
      </h2>

      <div :data-view="view" :class="isTiles ? tilesGrid : 'space-y-4'">
        <article
          v-for="event in pastEvents.slice(0, pastDisplayCount)"
          :key="event.slug"
          :class="
            isTiles
              ? 'rounded-lg border border-ebony-clay-100 bg-white p-4 transition-shadow hover:shadow-md'
              : 'border-b border-ebony-clay-100 pb-4'
          "
        >
          <a :href="buildUrl(event.slug)" :class="isTiles ? 'group block h-full' : 'group block'">
            <div :class="['flex flex-col gap-2', { 'sm:flex-row sm:items-center sm:justify-between': !isTiles }]">
              <h3 class="text-base font-medium text-chicago-700 group-hover:text-galaxy-primary transition-colors">
                {{ event.title || 'Untitled Event' }}
                <ExternalIcon v-if="event.externalUrl" :href="event.externalUrl" />
              </h3>
              <EventDate
                v-if="event.date"
                :class="['text-sm', { 'sm:shrink-0': !isTiles }]"
                :start="event.date"
                :end="event.end"
                past
              />
            </div>
          </a>
        </article>
      </div>
      <div v-if="pastEvents.length === 0" class="p-8 text-center bg-ebony-clay-50 rounded-lg">
        <p class="text-chicago-600">
          {{ hasFilters ? 'No past events match these filters.' : 'No past events for this subsite.' }}
        </p>
      </div>
      <div v-if="pastEvents.length > pastDisplayCount" class="mt-6 text-center">
        <p class="text-chicago-500 text-sm mb-3">
          Showing {{ pastDisplayCount }} of {{ pastEvents.length }} past events {{ resultContext }}
        </p>
        <button
          @click="loadMorePast"
          class="px-6 py-2 bg-galaxy-primary text-white rounded-md hover:bg-galaxy-primary/90 transition-colors"
        >
          Load more
        </button>
      </div>
    </section>
  </div>
</template>
