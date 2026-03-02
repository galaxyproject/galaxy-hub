<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { formatDate } from '@/utils/dateUtils';
import ExternalIcon from '../common/ExternalIcon.vue';

interface SearchEntry {
  title: string;
  slug: string;
  path: string;
  external_url?: string | null;
  excerpt: string;
  tease: string;
  tags: string[];
  date: string | null;
  collection: string;
  contributors?: string[];
  organisations?: string[];
  grants?: string[];
  search_terms?: string[];
}

const props = defineProps<{ query: string }>();

const searchIndex = ref<SearchEntry[]>([]);
const isLoading = ref(true);
const selectedCollection = ref<string>('all');

onMounted(async () => {
  try {
    const response = await fetch('/search-index.json');
    searchIndex.value = await response.json();
  } catch (error) {
    console.error('Failed to load search index:', error);
  } finally {
    isLoading.value = false;
  }
});

const collections = computed(() => {
  const unique = new Set(searchIndex.value.map((e) => e.collection));
  return ['all', ...Array.from(unique).sort()];
});

function normalizeForMatch(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function normalizeQueryWord(word: string): string {
  return String(word || '')
    .toLowerCase()
    .trim()
    .replace(/^tags?:/, '')
    .replace(/^#/, '')
    .replace(/^["']+|["']+$/g, '');
}

function fieldMatches(fieldValue: string, word: string): boolean {
  const field = String(fieldValue || '').toLowerCase();
  if (!field) return false;
  if (field.includes(word)) return true;
  const compactWord = normalizeForMatch(word);
  if (!compactWord) return false;
  return normalizeForMatch(field).includes(compactWord);
}

function scoreEntry(entry: SearchEntry, words: string[]): number {
  const metaFields = [
    ...(entry.contributors || []),
    ...(entry.organisations || []),
    ...(entry.grants || []),
    ...(entry.search_terms || []),
  ];

  let score = 0;
  for (const word of words) {
    const inTitle = fieldMatches(entry.title, word);
    const inMeta = metaFields.some((field) => fieldMatches(field, word));
    const inTags = (entry.tags || []).some((tag) => fieldMatches(tag, word));
    const inBody = fieldMatches(entry.tease, word) || fieldMatches(entry.excerpt, word);
    const inPath = fieldMatches(entry.path, word);

    if (inTitle) score += 120;
    if (inMeta) score += 90;
    if (inTags) score += 40;
    if (inBody) score += 10;
    if (inPath) score += 15;
    if (entry.collection === 'hall-of-fame' && (inTitle || inMeta)) score += 30;
  }

  return score;
}

const results = computed(() => {
  if (!props.query.trim()) {
    return [];
  }

  const q = props.query.toLowerCase().trim();
  const words = q
    .split(/\s+/)
    .map((word) => normalizeQueryWord(word))
    .filter(Boolean);

  let filtered = searchIndex.value.filter((entry) => {
    const fields = [
      entry.title,
      entry.excerpt,
      entry.tease,
      ...(entry.tags || []),
      ...(entry.contributors || []),
      ...(entry.organisations || []),
      ...(entry.grants || []),
      ...(entry.search_terms || []),
    ];
    return words.every((word) => fields.some((field) => fieldMatches(String(field || ''), word)));
  });

  if (selectedCollection.value !== 'all') {
    filtered = filtered.filter((e) => e.collection === selectedCollection.value);
  }

  return filtered
    .map((entry) => ({ entry, score: scoreEntry(entry, words) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const dateA = new Date(a.entry.date || '').getTime() || 0;
      const dateB = new Date(b.entry.date || '').getTime() || 0;
      return dateB - dateA;
    })
    .map((item) => item.entry)
    .slice(0, 100);
});

function getCollectionLabel(collection: string): string {
  const labels: Record<string, string> = {
    articles: 'Article',
    events: 'Event',
    platforms: 'Platform',
    news: 'News',
    'hall-of-fame': 'Hall of Fame',
  };
  return labels[collection] || collection;
}

function getCollectionFilterLabel(collection: string): string {
  const labels: Record<string, string> = {
    articles: 'Articles',
    events: 'Events',
    platforms: 'Platforms',
    news: 'News',
    'hall-of-fame': 'Hall of Fame',
  };
  return labels[collection] || collection;
}

function getCollectionColor(collection: string): string {
  const colors: Record<string, string> = {
    articles: 'bg-blue-100 text-blue-800',
    events: 'bg-green-100 text-green-800',
    platforms: 'bg-purple-100 text-purple-800',
    news: 'bg-cyan-100 text-cyan-800',
    'hall-of-fame': 'bg-amber-100 text-amber-900',
  };
  return colors[collection] || 'bg-gray-100 text-gray-800';
}

function highlightMatch(text: string, maxLength: number = 200): string {
  if (!text) return '';

  const words = props.query
    .toLowerCase()
    .split(/\s+/)
    .map((w) => normalizeQueryWord(w))
    .filter((w) => w.length > 2);

  let result = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  words.forEach((word) => {
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  });

  return result;
}
</script>

<template>
  <div>
    <!-- Collection filter -->
    <div class="mb-4 flex items-center gap-4">
      <div class="w-full md:w-48">
        <select
          v-model="selectedCollection"
          class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option v-for="col in collections" :key="col" :value="col">
            {{ col === 'all' ? 'All content' : getCollectionFilterLabel(col) }}
          </option>
        </select>
      </div>
      <div class="text-sm text-gray-600">
        <span v-if="isLoading">Loading search index...</span>
        <span v-else-if="!query.trim()"> {{ searchIndex.length.toLocaleString() }} pages indexed </span>
        <span v-else>
          {{ results.length }} result{{ results.length !== 1 ? 's' : '' }}
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
              <ExternalIcon v-if="result.collection === 'events' && result.external_url" />
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
    <div v-else-if="query.trim() && !isLoading" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <p class="text-gray-500 mb-2">No results found for "{{ query }}"</p>
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
      <p class="text-gray-500">Enter a search term to search the Galaxy Community Hub</p>
    </div>
  </div>
</template>
