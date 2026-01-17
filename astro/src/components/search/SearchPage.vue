<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Input } from '@/components/ui/input';

interface SearchEntry {
  title: string;
  slug: string;
  path: string;
  excerpt: string;
  tease: string;
  tags: string[];
  date: string;
  collection: string;
}

const searchQuery = ref('');
const searchIndex = ref<SearchEntry[]>([]);
const isLoading = ref(true);
const selectedCollection = ref<string>('all');

// Load search index
onMounted(async () => {
  try {
    const response = await fetch('/search-index.json');
    searchIndex.value = await response.json();
  } catch (error) {
    console.error('Failed to load search index:', error);
  } finally {
    isLoading.value = false;
  }

  // Check URL for initial query
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    searchQuery.value = q;
  }
});

// Update URL when search changes
watch(searchQuery, (query) => {
  const url = new URL(window.location.href);
  if (query) {
    url.searchParams.set('q', query);
  } else {
    url.searchParams.delete('q');
  }
  window.history.replaceState({}, '', url.toString());
});

// Get unique collections
const collections = computed(() => {
  const unique = new Set(searchIndex.value.map((e) => e.collection));
  return ['all', ...Array.from(unique).sort()];
});

// Search results
const results = computed(() => {
  if (!searchQuery.value.trim()) {
    return [];
  }

  const query = searchQuery.value.toLowerCase().trim();
  const words = query.split(/\s+/);

  let filtered = searchIndex.value.filter((entry) => {
    const searchText = [entry.title, entry.excerpt, entry.tease, ...entry.tags].join(' ').toLowerCase();

    // All words must match
    return words.every((word) => searchText.includes(word));
  });

  // Filter by collection
  if (selectedCollection.value !== 'all') {
    filtered = filtered.filter((e) => e.collection === selectedCollection.value);
  }

  // Sort by date (most recent first)
  return filtered
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    })
    .slice(0, 100);
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getCollectionLabel(collection: string): string {
  const labels: Record<string, string> = {
    articles: 'Article',
    events: 'Event',
    platforms: 'Platform',
  };
  return labels[collection] || collection;
}

function getCollectionColor(collection: string): string {
  const colors: Record<string, string> = {
    articles: 'bg-blue-100 text-blue-800',
    events: 'bg-green-100 text-green-800',
    platforms: 'bg-purple-100 text-purple-800',
  };
  return colors[collection] || 'bg-gray-100 text-gray-800';
}

function highlightMatch(text: string, maxLength: number = 200): string {
  if (!text) return '';

  const query = searchQuery.value.toLowerCase();
  const words = query.split(/\s+/).filter((w) => w.length > 2);

  let result = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  // Simple highlighting (would need proper escaping for production)
  words.forEach((word) => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  });

  return result;
}
</script>

<template>
  <div class="search-page">
    <!-- Search Form -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles, events, platforms..."
            class="w-full text-lg"
            autofocus
          />
        </div>
        <div class="w-full md:w-48">
          <select
            v-model="selectedCollection"
            class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option v-for="col in collections" :key="col" :value="col">
              {{ col === 'all' ? 'All content' : getCollectionLabel(col) + 's' }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-4 text-sm text-gray-600">
        <span v-if="isLoading">Loading search index...</span>
        <span v-else-if="!searchQuery.trim()">
          Enter a search term to find content across {{ searchIndex.length.toLocaleString() }} pages
        </span>
        <span v-else>
          Found {{ results.length }} result{{ results.length !== 1 ? 's' : '' }}
          <span v-if="results.length >= 100">(showing first 100)</span>
        </span>
      </div>
    </div>

    <!-- Results -->
    <div v-if="results.length > 0" class="space-y-4">
      <article
        v-for="result in results"
        :key="result.slug"
        class="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
      >
        <a :href="result.path" class="block">
          <div class="flex items-start justify-between gap-4 mb-2">
            <h2 class="text-lg font-semibold text-gray-900 hover:text-galaxy-primary transition-colors">
              {{ result.title }}
            </h2>
            <span :class="['text-xs px-2 py-1 rounded-full whitespace-nowrap', getCollectionColor(result.collection)]">
              {{ getCollectionLabel(result.collection) }}
            </span>
          </div>

          <p
            v-if="result.excerpt || result.tease"
            class="text-gray-600 text-sm mb-3"
            v-html="highlightMatch(result.tease || result.excerpt)"
          ></p>

          <div class="flex items-center gap-4 text-xs text-gray-500">
            <time v-if="result.date">{{ formatDate(result.date) }}</time>
            <div v-if="result.tags?.length" class="flex gap-1 flex-wrap">
              <span v-for="tag in result.tags.slice(0, 3)" :key="tag" class="px-2 py-0.5 bg-gray-100 rounded">
                {{ tag }}
              </span>
              <span v-if="result.tags.length > 3" class="text-gray-400"> +{{ result.tags.length - 3 }} more </span>
            </div>
          </div>
        </a>
      </article>
    </div>

    <!-- No results -->
    <div v-else-if="searchQuery.trim() && !isLoading" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <p class="text-gray-500 mb-2">No results found for "{{ searchQuery }}"</p>
      <p class="text-sm text-gray-400">Try different keywords or check your spelling</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!isLoading" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <p class="text-gray-500">Start typing to search the Galaxy Community Hub</p>
    </div>
  </div>
</template>
