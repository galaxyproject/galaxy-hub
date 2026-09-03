<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { renderMarkdownInline } from '@/utils/markdown';

interface Platform {
  slug: string;
  title: string;
  url?: string | null;
  scope?: string | null;
  summary?: string | null;
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
  }>(),
  {
    toolIndex: () => ({}),
    referenceIndex: () => ({}),
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

const locations = computed(() => {
  const uniqueLocations = new Set<string>();
  props.platforms.forEach((p) => {
    p.platforms?.forEach((inst) => {
      if (inst.platform_location) uniqueLocations.add(inst.platform_location);
    });
  });
  return ['all', ...Array.from(uniqueLocations).sort()];
});

const platformGroups = computed(() => {
  const uniqueGroups = new Set<string>();
  props.platforms.forEach((p) => {
    p.platforms?.forEach((inst) => {
      if (inst.platform_group) uniqueGroups.add(inst.platform_group);
    });
  });
  return ['all', ...Array.from(uniqueGroups).sort()];
});

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

function clearFilters() {
  searchQuery.value = '';
  showAutocomplete.value = false;
  selectedSuggestionIndex.value = -1;
  selectedScope.value = 'all';
  selectedLocation.value = 'all';
  selectedPlatformGroup.value = 'all';
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

function updateUrl(group: string) {
  const params = new URLSearchParams(window.location.search);
  if (group === 'all') {
    params.delete('platform_group');
  } else {
    params.set('platform_group', groupToUrlSlug[group] || group);
  }
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
  window.history.replaceState({}, '', newUrl);
}

onMounted(() => {
  const param = new URLSearchParams(window.location.search).get('platform_group');
  if (param) {
    const group = urlSlugToGroup[param];
    if (group) {
      selectedPlatformGroup.value = group;
    }
  }
});

watch(selectedPlatformGroup, (group) => {
  updateUrl(group);
});

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

function getScopeLabel(scope: string): string {
  const labels: Record<string, string> = {
    usegalaxy: 'UseGalaxy',
    domain: 'Domain Specific',
    general: 'General Purpose',
    'academic-cloud': 'Academic Cloud',
  };
  return labels[scope] || scope;
}

function getLocationFromPlatform(platform: Platform): string | null | undefined {
  return platform.platforms?.[0]?.platform_location;
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
    <div class="bg-white rounded-lg shadow-sm border border-ebony-clay-100 p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search with tool: / reference: autocomplete -->
        <div class="flex-1 relative">
          <label class="block text-sm font-medium text-chicago-700 mb-1">Search</label>
          <Input
            v-model="searchQuery"
            type="search"
            placeholder="Search, tool:name, or reference:genome"
            class="w-full"
            autocomplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="platform-search-suggestions"
            :aria-expanded="showAutocomplete"
            @keydown="onSearchKeydown"
            @blur="closeAutocomplete"
          />

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

        <!-- Scope Filter -->
        <div class="w-full md:w-48">
          <label class="block text-sm font-medium text-chicago-700 mb-1">Type</label>
          <select
            v-model="selectedScope"
            class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option v-for="scope in scopes" :key="scope" :value="scope">
              {{ scope === 'all' ? 'All Types' : getScopeLabel(scope) }}
            </option>
          </select>
        </div>

        <!-- Location Filter -->
        <div class="w-full md:w-48">
          <label class="block text-sm font-medium text-chicago-700 mb-1">Location</label>
          <select
            v-model="selectedLocation"
            class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option v-for="loc in locations" :key="loc" :value="loc">
              {{ loc === 'all' ? 'All Locations' : loc }}
            </option>
          </select>
        </div>

        <!-- Platform Group Filter -->
        <div class="w-full md:w-48">
          <label class="block text-sm font-medium text-chicago-700 mb-1">Platform</label>
          <select
            v-model="selectedPlatformGroup"
            class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option v-for="group in platformGroups" :key="group" :value="group">
              {{ group === 'all' ? 'All Platforms' : groupLabels[group] || group }}
            </option>
          </select>
        </div>

        <!-- Clear Filters -->
        <div class="flex items-end">
          <Button variant="outline" @click="clearFilters" class="h-10"> Clear </Button>
        </div>
      </div>

      <!-- Results count -->
      <div class="mt-4 text-sm text-chicago-600">
        Showing {{ filteredPlatforms.length }} of {{ platforms.length }} Galaxy servers
      </div>
    </div>

    <!-- Platform Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a v-for="platform in filteredPlatforms" :key="platform.slug" :href="`/${platform.slug}/`" class="block group">
        <Card class="h-full hover:shadow-md transition-shadow border-t-4 border-t-galaxy-primary">
          <CardHeader class="pb-2">
            <div class="flex items-start justify-between">
              <CardTitle class="text-lg text-chicago-900 group-hover:text-galaxy-primary transition-colors">
                {{ platform.title || 'Galaxy Server' }}
              </CardTitle>
              <span
                v-if="platform.scope"
                class="text-xs px-2 py-1 rounded-full bg-galaxy-primary/10 text-galaxy-primary"
              >
                {{ getScopeLabel(platform.scope) }}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p
              v-if="platform.summary"
              class="text-sm text-chicago-600 line-clamp-3 mb-3 prose prose-sm max-w-none"
              v-html="renderMarkdownInline(platform.summary)"
            ></p>
            <div class="flex items-center justify-between text-xs text-chicago-500">
              <span v-if="platform.url" class="truncate max-w-[60%]">
                {{ getHostname(platform.url) }}
              </span>
              <span v-if="getLocationFromPlatform(platform)" class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                {{ getLocationFromPlatform(platform) }}
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </div>

    <!-- No results message -->
    <div v-if="filteredPlatforms.length === 0" class="text-center py-12">
      <p class="text-chicago-500 mb-4">No Galaxy servers found matching your criteria.</p>
      <Button variant="outline" @click="clearFilters">Clear Filters</Button>
    </div>
  </div>
</template>
