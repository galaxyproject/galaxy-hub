<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite } from '@/stores/subsiteStore';

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
}>();

const $subsite = useStore(currentSubsite);

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

const pastEvents = computed(() => {
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
    })
    .slice(0, 50);
});

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
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">
        Past Events
        <span class="text-sm font-normal text-gray-500">({{ pastEvents.length }})</span>
      </h2>
      <div class="space-y-4">
        <article
          v-for="event in pastEvents"
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
      <p v-if="pastEvents.length >= 50" class="mt-4 text-gray-500 text-sm">
        Showing first 50 past events
      </p>
    </section>
  </div>
</template>
