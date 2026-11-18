<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Inbox, MapPin, Search } from '@lucide/vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { focusRing } from '@/lib/focus-ring';
import { countryName } from '@/utils/countryName';
import { platformInitials, scopeLabel } from '@/utils/platformLabels';
import { isOnPage, onPopState, readParams, writeParams } from '@/utils/urlFilters';

interface Platform {
  slug: string;
  title: string;
  url?: string | null;
  scope?: string | null;
  summary?: string | null;
  /** Summary rendered to HTML at build time. */
  summaryHtml?: string;
  platforms?:
    | {
        platform_group?: string | null;
        platform_location?: string | null;
        platform_text?: string | null;
      }[]
    | null;
  image?: string | null;
}

interface SearchSuggestion {
  name: string;
  nameLower: string;
  type: 'tool' | 'reference';
  badge: string;
}

const props = withDefaults(
  defineProps<{
    platforms: Platform[];
    // name -> platform slugs that provide that tool / reference (genome)
    toolIndex?: Record<string, string[]>;
    referenceIndex?: Record<string, string[]>;
    /** Pathname of the page the directory is on; the URL is only read and written while it matches. */
    path?: string;
  }>(),
  {
    toolIndex: () => ({}),
    referenceIndex: () => ({}),
    path: '/use/',
  }
);

const MIN_SUGGEST_LENGTH = 3;
const MAX_SUGGESTIONS = 15;

const searchQuery = ref('');
const selectedScope = ref<string>('all');
const selectedLocation = ref<string>('all');
const selectedPlatformGroup = ref<string>('all');

// Autocomplete state (mirrors legacy Use.vue behavior)
const showAutocomplete = ref(false);
const selectedSuggestionIndex = ref(-1);
const suppressAutocomplete = ref(false);

// Maps URL slugs (plural, matching old Gridsome site) to data values (singular)
const urlSlugToGroup: Record<string, string> = {
  'public-servers': 'public-server',
  'public-server': 'public-server',
  'academic-clouds': 'academic-cloud',
  'academic-cloud': 'academic-cloud',
  'commercial-clouds': 'commercial-cloud',
  'commercial-cloud': 'commercial-cloud',
  containers: 'container',
  container: 'container',
  vms: 'vm',
  vm: 'vm',
};

const groupToUrlSlug: Record<string, string> = {
  'public-server': 'public-servers',
  'academic-cloud': 'academic-clouds',
  'commercial-cloud': 'commercial-clouds',
  container: 'containers',
  vm: 'vms',
};

const groupLabels: Record<string, string> = {
  'public-server': 'Public Server',
  'academic-cloud': 'Academic Cloud',
  'commercial-cloud': 'Commercial Cloud',
  container: 'Container',
  vm: 'Virtual Machine',
};

// Extract unique scopes and locations for filters
const scopes = computed(() => {
  const uniqueScopes = new Set<string>();
  props.platforms.forEach((p) => {
    if (p.scope) uniqueScopes.add(p.scope);
  });
  return ['all', ...Array.from(uniqueScopes).sort()];
});

// Option counts: how many servers each value matches (a server counts once per value)
function countBy(values: (p: Platform) => (string | null | undefined)[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of props.platforms) {
    for (const value of new Set(values(p))) {
      if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return counts;
}

const scopeCounts = computed(() => countBy((p) => [p.scope]));
const locationCounts = computed(() => countBy((p) => p.platforms?.map((inst) => inst.platform_location) ?? []));
const groupCounts = computed(() => countBy((p) => p.platforms?.map((inst) => inst.platform_group) ?? []));

// platform_location holds ISO country codes (DE, US, UK, EU); the select shows them as names
const locations = computed(() => {
  const codes = [...locationCounts.value.keys()].sort((a, b) => countryName(a).localeCompare(countryName(b)));
  return ['all', ...codes];
});

const platformGroups = computed(() => ['all', ...[...groupCounts.value.keys()].sort()]);

// Lowercased name -> set of platform slugs, for tool:/reference: filtering
const toolLookup = computed(() => buildLookup(props.toolIndex));
const referenceLookup = computed(() => buildLookup(props.referenceIndex));

function buildLookup(index: Record<string, string[]>): Map<string, Set<string>> {
  const lookup = new Map<string, Set<string>>();
  for (const [name, slugs] of Object.entries(index)) {
    lookup.set(name.toLowerCase(), new Set(slugs));
  }
  return lookup;
}

function matchSlugs(lookup: Map<string, Set<string>>, query: string): Set<string> {
  const exact = lookup.get(query);
  if (exact) return exact;
  const result = new Set<string>();
  for (const [name, slugs] of lookup) {
    if (name.includes(query)) slugs.forEach((slug) => result.add(slug));
  }
  return result;
}

// Combined tool + reference names that power the dropdown suggestions
const allSuggestions = computed<SearchSuggestion[]>(() => {
  const suggestions: SearchSuggestion[] = [];
  for (const name of Object.keys(props.toolIndex)) {
    suggestions.push({ name, nameLower: name.toLowerCase(), type: 'tool', badge: 'tool' });
  }
  for (const name of Object.keys(props.referenceIndex)) {
    suggestions.push({ name, nameLower: name.toLowerCase(), type: 'reference', badge: 'genome' });
  }
  return suggestions;
});

const filteredSuggestions = computed<SearchSuggestion[]>(() => {
  const input = searchQuery.value.toLowerCase().trim();
  if (input.length < MIN_SUGGEST_LENGTH || input.startsWith('tool:') || input.startsWith('reference:')) {
    return [];
  }

  const matches = allSuggestions.value.filter((s) => s.nameLower.includes(input));
  matches.sort((a, b) => {
    const aStarts = a.nameLower.startsWith(input);
    const bStarts = b.nameLower.startsWith(input);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return a.nameLower.localeCompare(b.nameLower);
  });
  return matches.slice(0, MAX_SUGGESTIONS);
});

const isToolSearch = computed(() => searchQuery.value.trim().toLowerCase().startsWith('tool:'));
const isReferenceSearch = computed(() => searchQuery.value.trim().toLowerCase().startsWith('reference:'));

// Filter platforms based on search and filters
const filteredPlatforms = computed(() => {
  let result = [...props.platforms];

  // Search filter
  const rawQuery = searchQuery.value.trim();
  const lowerQuery = rawQuery.toLowerCase();
  if (lowerQuery.startsWith('tool:')) {
    // tool:name -> keep instances offering that tool
    const toolQuery = lowerQuery.slice('tool:'.length).trim();
    if (toolQuery) {
      const slugs = matchSlugs(toolLookup.value, toolQuery);
      result = result.filter((p) => slugs.has(p.slug));
    }
  } else if (lowerQuery.startsWith('reference:')) {
    // reference:genome -> keep instances offering that reference genome
    const referenceQuery = lowerQuery.slice('reference:'.length).trim();
    if (referenceQuery) {
      const slugs = matchSlugs(referenceLookup.value, referenceQuery);
      result = result.filter((p) => slugs.has(p.slug));
    }
  } else if (rawQuery) {
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(lowerQuery) ||
        p.summary?.toLowerCase().includes(lowerQuery) ||
        p.url?.toLowerCase().includes(lowerQuery)
    );
  }

  // Scope filter
  if (selectedScope.value !== 'all') {
    result = result.filter((p) => p.scope === selectedScope.value);
  }

  // Location filter
  if (selectedLocation.value !== 'all') {
    result = result.filter((p) => p.platforms?.some((inst) => inst.platform_location === selectedLocation.value));
  }

  // Platform group filter
  if (selectedPlatformGroup.value !== 'all') {
    result = result.filter((p) => p.platforms?.some((inst) => inst.platform_group === selectedPlatformGroup.value));
  }

  // Sort by title
  const sorted = result.sort((a, b) => {
    const titleA = (a.title || '').toLowerCase();
    const titleB = (b.title || '').toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
  return sorted;
});

const selectClass = 'h-10 w-full rounded-md border-1 border-chicago-400 bg-surface-raised px-3 text-sm text-fg';

function scopeOption(scope: string): string {
  if (scope === 'all') return `All types (${props.platforms.length})`;
  return `${scopeLabel(scope)} (${scopeCounts.value.get(scope)})`;
}

function locationOption(code: string): string {
  if (code === 'all') return 'All locations';
  return `${countryName(code)} (${locationCounts.value.get(code)})`;
}

function groupOption(group: string): string {
  if (group === 'all') return 'All platforms';
  return `${groupLabels[group] || group} (${groupCounts.value.get(group)})`;
}

const hasFilters = computed(
  () =>
    searchQuery.value.trim() !== '' ||
    selectedScope.value !== 'all' ||
    selectedLocation.value !== 'all' ||
    selectedPlatformGroup.value !== 'all'
);

function clearFilters() {
  searchQuery.value = '';
  urlQuery.value = '';
  showAutocomplete.value = false;
  selectedSuggestionIndex.value = -1;
  selectedScope.value = 'all';
  selectedLocation.value = 'all';
  selectedPlatformGroup.value = 'all';
  // The Clear buttons disappear once nothing is filtered; keep focus in the filters
  document.getElementById('platform-filter-search')?.focus();
}

function selectSuggestion(suggestion: SearchSuggestion) {
  suppressAutocomplete.value = true;
  searchQuery.value = `${suggestion.type === 'tool' ? 'tool:' : 'reference:'}${suggestion.name}`;
  showAutocomplete.value = false;
  selectedSuggestionIndex.value = -1;
}

function onSearchKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    showAutocomplete.value = false;
    selectedSuggestionIndex.value = -1;
    return;
  }
  if (!showAutocomplete.value || filteredSuggestions.value.length === 0) return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      selectedSuggestionIndex.value = Math.min(selectedSuggestionIndex.value + 1, filteredSuggestions.value.length - 1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      selectedSuggestionIndex.value = Math.max(selectedSuggestionIndex.value - 1, 0);
      break;
    case 'Enter':
    case 'Tab':
      if (selectedSuggestionIndex.value >= 0) {
        event.preventDefault();
        selectSuggestion(filteredSuggestions.value[selectedSuggestionIndex.value]);
      }
      break;
  }
}

function closeAutocomplete() {
  // Delay so a mouse selection registers before the list closes
  setTimeout(() => {
    showAutocomplete.value = false;
    selectedSuggestionIndex.value = -1;
  }, 150);
}

// URL params, in this order: `q`, `region` (the Location select), `scope` and `platform_group`
// (plural slug; singular slugs are accepted on read)
const FILTER_PARAMS = { q: null, region: 'all', scope: 'all', platform_group: null };
const QUERY_DEBOUNCE_MS = 250;

// The list filters as you type; the URL follows the query once typing pauses
const urlQuery = ref('');
let queryTimer: ReturnType<typeof setTimeout> | undefined;

function applyUrlFilters() {
  const { q, region, scope, platform_group: groupSlug } = readParams(FILTER_PARAMS);
  const query = q ?? '';
  // A query restored from the URL must not open the suggestions
  if (query !== searchQuery.value) suppressAutocomplete.value = true;
  searchQuery.value = query;
  urlQuery.value = query;
  selectedLocation.value = region && locations.value.includes(region) ? region : 'all';
  selectedPlatformGroup.value = (groupSlug && urlSlugToGroup[groupSlug]) || 'all';
  selectedScope.value = scope && scopes.value.includes(scope) ? scope : 'all';
  // The state may not change (e.g. `?region=XX` -> all), so drop what was not applied here
  writeUrl();
}

function writeUrl() {
  const group = selectedPlatformGroup.value;
  writeParams(
    {
      q: urlQuery.value,
      region: selectedLocation.value,
      scope: selectedScope.value,
      platform_group: group === 'all' ? null : groupToUrlSlug[group] || group,
    },
    { defaults: FILTER_PARAMS }
  );
}

let stopPopState = () => {};

onMounted(() => {
  // Mounted after back/forward already left this page: leave the other page's URL alone
  if (!isOnPage(props.path)) return;
  applyUrlFilters();
  // Back/forward restores the filters from the URL
  stopPopState = onPopState(applyUrlFilters);
});

onUnmounted(() => {
  stopPopState();
  clearTimeout(queryTimer);
});

watch(searchQuery, (value) => {
  clearTimeout(queryTimer);
  queryTimer = setTimeout(() => {
    urlQuery.value = value.trim();
  }, QUERY_DEBOUNCE_MS);
});

watch([urlQuery, selectedLocation, selectedScope, selectedPlatformGroup], writeUrl);

watch(searchQuery, () => {
  // Runs after v-model updates, so filteredSuggestions is current here.
  if (suppressAutocomplete.value) {
    suppressAutocomplete.value = false;
    showAutocomplete.value = false;
    selectedSuggestionIndex.value = -1;
    return;
  }
  selectedSuggestionIndex.value = -1;
  showAutocomplete.value = filteredSuggestions.value.length > 0;
});

function unique(values: (string | null | undefined)[]): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function getGroupLabels(platform: Platform): string {
  return unique(platform.platforms?.map((inst) => inst.platform_group) ?? [])
    .map((group) => groupLabels[group] || group)
    .join(', ');
}

function getLocationNames(platform: Platform): string {
  return unique(platform.platforms?.map((inst) => inst.platform_location) ?? [])
    .map(countryName)
    .join(', ');
}

// A logo that fails to load falls back to the initials tile
const brokenLogos = ref(new Set<string>());

function showLogo(platform: Platform): boolean {
  return Boolean(platform.image) && !brokenLogos.value.has(platform.slug);
}

function onLogoError(platform: Platform) {
  brokenLogos.value = new Set(brokenLogos.value).add(platform.slug);
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
</script>

<template>
  <div class="platform-directory">
    <!-- Search and Filters -->
    <div
      role="group"
      aria-label="Filter Galaxy servers"
      class="bg-surface-2 rounded-lg border-1 border-line p-4 sm:p-5 mb-6"
    >
      <div class="flex flex-col gap-4">
        <!-- Search with tool: / reference: autocomplete; Clear sits beside it so the suggestions never cover it -->
        <div class="flex items-start gap-3">
          <div class="relative min-w-0 flex-1">
            <label for="platform-filter-search" class="block text-sm font-medium text-fg-2 mb-1">Search servers</label>
            <div class="relative">
              <Search
                :size="16"
                aria-hidden="true"
                class="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-fg-meta"
              />
              <Input
                id="platform-filter-search"
                v-model="searchQuery"
                type="search"
                placeholder="Search, tool:name, or reference:genome"
                class="h-10 w-full border-chicago-400 bg-surface-raised pl-9"
                :class="focusRing"
                autocomplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-controls="platform-search-suggestions"
                :aria-expanded="showAutocomplete"
                @keydown="onSearchKeydown"
                @blur="closeAutocomplete"
              />
            </div>

            <!-- Autocomplete dropdown -->
            <ul
              v-if="showAutocomplete && filteredSuggestions.length > 0"
              id="platform-search-suggestions"
              role="listbox"
              class="absolute z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-ebony-clay-200 bg-white py-1 shadow-lg"
            >
              <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="`${suggestion.type}-${suggestion.name}`"
                role="option"
                :aria-selected="index === selectedSuggestionIndex"
                class="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-ebony-clay-50"
                :class="{ 'bg-ebony-clay-100': index === selectedSuggestionIndex }"
                @mouseenter="selectedSuggestionIndex = index"
                @mousedown.prevent="selectSuggestion(suggestion)"
              >
                <span class="min-w-0 truncate text-chicago-800">{{ suggestion.name }}</span>
                <span
                  class="shrink-0 rounded-full px-2 py-0.5 text-xs"
                  :class="
                    suggestion.type === 'tool'
                      ? 'bg-galaxy-primary/10 text-galaxy-primary'
                      : 'bg-green-100 text-green-800'
                  "
                >
                  {{ suggestion.badge }}
                </span>
              </li>
            </ul>

            <!-- Active tool/reference search indicator -->
            <p v-if="isToolSearch" class="mt-1 text-xs text-galaxy-primary">
              Tool search: “{{ searchQuery.trim().slice(5).trim() }}”
            </p>
            <p v-else-if="isReferenceSearch" class="mt-1 text-xs text-green-700">
              Reference search: “{{ searchQuery.trim().slice(10).trim() }}”
            </p>
          </div>

          <!-- Clear Filters: only while a filter is active -->
          <Button
            v-if="hasFilters"
            variant="outline"
            class="mt-6 h-10 shrink-0"
            :class="focusRing"
            @click="clearFilters"
          >
            Clear
          </Button>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <!-- Scope Filter -->
          <div class="min-w-0 flex-1 sm:min-w-44">
            <label for="platform-filter-type" class="block text-sm font-medium text-fg-2 mb-1">Type</label>
            <select id="platform-filter-type" v-model="selectedScope" :class="[selectClass, focusRing]">
              <option v-for="scope in scopes" :key="scope" :value="scope">{{ scopeOption(scope) }}</option>
            </select>
          </div>

          <!-- Location Filter -->
          <div class="min-w-0 flex-1 sm:min-w-44">
            <label for="platform-filter-location" class="block text-sm font-medium text-fg-2 mb-1">Location</label>
            <select id="platform-filter-location" v-model="selectedLocation" :class="[selectClass, focusRing]">
              <option v-for="loc in locations" :key="loc" :value="loc">{{ locationOption(loc) }}</option>
            </select>
          </div>

          <!-- Platform Group Filter -->
          <div class="min-w-0 flex-1 sm:min-w-44">
            <label for="platform-filter-platform" class="block text-sm font-medium text-fg-2 mb-1">Platform</label>
            <select id="platform-filter-platform" v-model="selectedPlatformGroup" :class="[selectClass, focusRing]">
              <option v-for="group in platformGroups" :key="group" :value="group">{{ groupOption(group) }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results count -->
      <p class="mt-4 text-meta text-fg-meta" aria-live="polite" aria-atomic="true">
        Showing {{ filteredPlatforms.length }} of {{ platforms.length }} Galaxy servers
      </p>
    </div>

    <!-- Platform Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="platform in filteredPlatforms"
        :key="platform.slug"
        :href="`/${platform.slug}/`"
        class="group relative flex h-full flex-col overflow-hidden rounded-lg border-1 border-line bg-surface-raised p-5 shadow-sm transition-shadow hover:shadow-md"
        :class="focusRing"
      >
        <span
          aria-hidden="true"
          class="absolute inset-y-0 left-0 w-1 origin-left scale-x-0 bg-galaxy-gold transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        ></span>
        <div class="flex items-start gap-3">
          <img
            v-if="showLogo(platform)"
            :src="platform.image ?? undefined"
            alt=""
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
            class="size-10 shrink-0 rounded-md border-1 border-line bg-white object-contain p-0.5"
            @error="onLogoError(platform)"
          />
          <div
            v-else
            aria-hidden="true"
            class="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-tint text-sm font-bold text-fg-brand"
          >
            {{ platformInitials(platform.title) }}
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-h3 font-semibold text-fg-strong break-words group-hover:text-link-hover">
              {{ platform.title || 'Galaxy Server' }}
            </h3>
            <div class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                v-if="platform.scope"
                class="rounded-full bg-surface-tint px-2 py-0.5 text-micro font-bold text-fg-brand"
              >
                {{ scopeLabel(platform.scope) }}
              </span>
              <span v-if="getGroupLabels(platform)" class="text-meta text-fg-meta">
                {{ getGroupLabels(platform) }}
              </span>
            </div>
          </div>
        </div>
        <p v-if="platform.summaryHtml" class="mt-3 text-meta text-fg-2 line-clamp-3" v-html="platform.summaryHtml"></p>
        <div class="mt-auto flex items-center justify-between gap-3 pt-3 text-meta text-fg-meta">
          <span v-if="platform.url" class="min-w-0 truncate">{{ getHostname(platform.url) }}</span>
          <span v-if="getLocationNames(platform)" class="flex min-w-0 shrink-0 items-center gap-1 max-w-[50%]">
            <MapPin :size="14" aria-hidden="true" class="shrink-0" />
            <span class="truncate">{{ getLocationNames(platform) }}</span>
          </span>
        </div>
      </a>
    </div>

    <!-- No results message -->
    <div
      v-if="filteredPlatforms.length === 0"
      class="flex flex-col items-center rounded-lg border-1 border-dashed border-chicago-400 bg-surface-2 px-4 py-12 text-center"
    >
      <Inbox :size="32" aria-hidden="true" class="mb-3 text-fg-meta" />
      <h3 class="text-h3 font-semibold text-fg-strong">No Galaxy servers found</h3>
      <p class="mt-1 mb-4 text-fg-2">Nothing matches your search and filters. Try fewer filters or a different word.</p>
      <Button variant="outline" :class="focusRing" @click="clearFilters">Clear filters</Button>
    </div>
  </div>
</template>
