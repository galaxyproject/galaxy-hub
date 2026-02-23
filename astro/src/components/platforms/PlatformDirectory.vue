<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { renderMarkdownInline } from '@/utils/markdown';

interface Platform {
  slug: string;
  title: string;
  url?: string;
  scope?: string;
  summary?: string;
  platforms?: {
    platform_group?: string;
    platform_location?: string;
    platform_text?: string;
  }[];
  image?: string;
}

const props = defineProps<{
  platforms: Platform[];
}>();

const searchQuery = ref('');
const selectedScope = ref<string>('all');
const selectedLocation = ref<string>('all');
const selectedPlatformGroup = ref<string>('all');

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

// Filter platforms based on search and filters
const filteredPlatforms = computed(() => {
  let result = [...props.platforms];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.summary?.toLowerCase().includes(query) ||
        p.url?.toLowerCase().includes(query)
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
  return result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
});

function clearFilters() {
  searchQuery.value = '';
  selectedScope.value = 'all';
  selectedLocation.value = 'all';
  selectedPlatformGroup.value = 'all';
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

function getScopeLabel(scope: string): string {
  const labels: Record<string, string> = {
    usegalaxy: 'UseGalaxy',
    domain: 'Domain Specific',
    general: 'General Purpose',
    'academic-cloud': 'Academic Cloud',
  };
  return labels[scope] || scope;
}

function getLocationFromPlatform(platform: Platform): string | undefined {
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
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <Input v-model="searchQuery" type="text" placeholder="Search servers..." class="w-full" />
        </div>

        <!-- Scope Filter -->
        <div class="w-full md:w-48">
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Platform</label>
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
      <div class="mt-4 text-sm text-gray-600">
        Showing {{ filteredPlatforms.length }} of {{ platforms.length }} Galaxy servers
      </div>
    </div>

    <!-- Platform Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a v-for="platform in filteredPlatforms" :key="platform.slug" :href="`/${platform.slug}/`" class="block group">
        <Card class="h-full hover:shadow-lg transition-shadow border-t-4 border-t-galaxy-primary">
          <CardHeader class="pb-2">
            <div class="flex items-start justify-between">
              <CardTitle class="text-lg text-gray-900 group-hover:text-galaxy-primary transition-colors">
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
              class="text-sm text-gray-600 line-clamp-3 mb-3 prose prose-sm max-w-none"
              v-html="renderMarkdownInline(platform.summary)"
            ></p>
            <div class="flex items-center justify-between text-xs text-gray-500">
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
      <p class="text-gray-500 mb-4">No Galaxy servers found matching your criteria.</p>
      <Button variant="outline" @click="clearFilters">Clear Filters</Button>
    </div>
  </div>
</template>
