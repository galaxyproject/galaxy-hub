<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite, type SubsiteId } from '@/stores/subsiteStore';

interface EventData {
  slug: string;
  title: string;
  date?: string;
  end?: string;
  tease?: string;
  location?: {
    city?: string;
    name?: string;
  } | string;
  subsites?: string[] | string;
}

const props = defineProps<{
  events: EventData[];
  initialSubsite?: SubsiteId;
}>();

const $subsite = useStore(currentSubsite);

// Year-based navigation for past events
const selectedPastYear = ref<number | null>(null);
const pageSize = 50;
const pastDisplayCount = ref(pageSize);

// Set initial subsite from URL route if provided
onMounted(() => {
  if (props.initialSubsite && props.initialSubsite !== 'global') {
    currentSubsite.set(props.initialSubsite);
  }
});

function loadMorePast() {
  pastDisplayCount.value += pageSize;
}

// Get year from event
function getYear(event: EventData): number | null {
  if (!event.date) return null;
  const date = new Date(event.date);
  return isNaN(date.getTime()) ? null : date.getFullYear();
}

// Helper to normalize subsites to array
function getSubsites(event: EventData): string[] {
  if (!event.subsites) return ['all'];
  if (Array.isArray(event.subsites)) return event.subsites;
  return [event.subsites];
}

// Filter events based on current subsite
const filteredEvents = computed(() => {
  const subsite = $subsite.value;

  // Global shows all events
  if (subsite === 'global') {
    return props.events;
  }

  // Filter by subsite - include events tagged with this subsite or 'all'
  return props.events.filter(event => {
    const eventSubsites = getSubsites(event);
    return eventSubsites.includes('all') ||
           eventSubsites.includes(subsite) ||
           eventSubsites.some(s => s.toLowerCase() === subsite.toLowerCase());
  });
});

// Separate upcoming and past
const now = new Date();

function toDate(d: string | undefined): Date | null {
  if (!d) return null;
  return new Date(d);
}

const upcomingEvents = computed(() => {
  return filteredEvents.value
    .filter(event => {
      const eventDate = toDate(event.date);
      const endDate = toDate(event.end) || eventDate;
      return endDate && endDate >= now;
    })
    .sort((a, b) => {
      const dateA = toDate(a.date)?.getTime() || 0;
      const dateB = toDate(b.date)?.getTime() || 0;
      return dateA - dateB;
    });
});

// All past events (before year filtering)
const allPastEvents = computed(() => {
  return filteredEvents.value
    .filter(event => {
      const eventDate = toDate(event.date);
      const endDate = toDate(event.end) || eventDate;
      return endDate && endDate < now;
    })
    .sort((a, b) => {
      const dateA = toDate(a.date)?.getTime() || 0;
      const dateB = toDate(b.date)?.getTime() || 0;
      return dateB - dateA;
    });
});

// Available years for past events (sorted descending)
const availablePastYears = computed(() => {
  const years = new Set<number>();
  allPastEvents.value.forEach(event => {
    const year = getYear(event);
    if (year) years.add(year);
  });
  return Array.from(years).sort((a, b) => b - a);
});

// Set default year to most recent when available years change
watch(availablePastYears, (years) => {
  if (years.length > 0 && (selectedPastYear.value === null || !years.includes(selectedPastYear.value))) {
    selectedPastYear.value = years[0];
  }
}, { immediate: true });

// Reset pagination when year or subsite changes
watch([selectedPastYear, $subsite], () => {
  pastDisplayCount.value = pageSize;
});

// Past events filtered by selected year
const pastEvents = computed(() => {
  if (selectedPastYear.value === null) {
    return allPastEvents.value;
  }
  return allPastEvents.value.filter(event => getYear(event) === selectedPastYear.value);
});

// Count per year for badges
function countPastForYear(year: number): number {
  return allPastEvents.value.filter(event => getYear(event) === year).length;
}

function selectPastYear(year: number) {
  selectedPastYear.value = year;
}

function formatDate(date: string | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatDateRange(start: string | undefined, end?: string): string {
  if (!start) return '';
  const startDate = new Date(start);
  if (!end) return formatDate(start);
  const endDate = new Date(end);
  if (startDate.getTime() === endDate.getTime()) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function getLocationText(location: EventData['location']): string {
  if (!location) return '';
  if (typeof location === 'string') return location;
  return location.city || location.name || 'Online';
}

function buildUrl(slug: string): string {
  return `/${slug}/`;
}
</script>

<template>
  <div class="events-list">
    <!-- Subsite indicator -->
    <div v-if="$subsite !== 'global'" class="mb-6 p-4 bg-galaxy-primary/10 rounded-lg">
      <p class="text-sm text-galaxy-dark">
        Showing events for <strong class="capitalize">{{ $subsite }}</strong> subsite.
        <button
          @click="() => currentSubsite.set('global')"
          class="ml-2 text-galaxy-primary hover:underline"
        >
          Show all events
        </button>
      </p>
    </div>

    <!-- Upcoming Events -->
    <section v-if="upcomingEvents.length > 0" class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <span class="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
        Upcoming Events
        <span class="text-sm font-normal text-gray-500">({{ upcomingEvents.length }})</span>
      </h2>
      <div class="space-y-6">
        <article
          v-for="event in upcomingEvents"
          :key="event.slug"
          class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <a :href="buildUrl(event.slug)" class="block">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 hover:text-galaxy-primary transition-colors">
                  {{ event.title || 'Untitled Event' }}
                </h3>
                <p v-if="event.tease" class="text-gray-600 mt-1">{{ event.tease }}</p>
                <p v-if="event.location" class="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ getLocationText(event.location) }}
                </p>
              </div>
              <div class="sm:text-right">
                <time v-if="event.date" class="text-sm font-medium text-galaxy-primary">
                  {{ formatDateRange(event.date, event.end) }}
                </time>
              </div>
            </div>
          </a>
        </article>
      </div>
    </section>

    <div v-else class="mb-12 p-8 text-center bg-gray-50 rounded-lg">
      <p class="text-gray-600">No upcoming events for this subsite.</p>
    </div>

    <!-- Past Events -->
    <section>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        Past Events
        <span class="text-sm font-normal text-gray-500">({{ allPastEvents.length }} total)</span>
      </h2>

      <!-- Year navigation for past events -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="year in availablePastYears"
            :key="year"
            @click="selectPastYear(year)"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              selectedPastYear === year
                ? 'bg-galaxy-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ year }}
            <span class="ml-1 text-xs opacity-75">({{ countPastForYear(year) }})</span>
          </button>
        </div>
      </div>

      <p class="text-sm text-gray-500 mb-4">
        {{ pastEvents.length }} event{{ pastEvents.length !== 1 ? 's' : '' }}
        <span v-if="selectedPastYear"> in {{ selectedPastYear }}</span>
      </p>

      <div class="space-y-4">
        <article
          v-for="event in pastEvents.slice(0, pastDisplayCount)"
          :key="event.slug"
          class="border-b border-gray-200 pb-4"
        >
          <a :href="buildUrl(event.slug)" class="group block">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 class="text-base font-medium text-gray-700 group-hover:text-galaxy-primary transition-colors">
                {{ event.title || 'Untitled Event' }}
              </h3>
              <time v-if="event.date" class="text-sm text-gray-500">
                {{ formatDateRange(event.date, event.end) }}
              </time>
            </div>
          </a>
        </article>
      </div>
      <div v-if="pastEvents.length > pastDisplayCount" class="mt-6 text-center">
        <p class="text-gray-500 text-sm mb-3">Showing {{ pastDisplayCount }} of {{ pastEvents.length }} events in {{ selectedPastYear }}</p>
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
