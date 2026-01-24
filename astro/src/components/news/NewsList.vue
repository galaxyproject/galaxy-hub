<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite, subsites, type SubsiteId } from '@/stores/subsiteStore';

interface NewsArticle {
  slug: string;
  title: string;
  date?: string;
  tease?: string;
  tags?: string[];
  subsites?: string[] | string;
}

const props = defineProps<{
  articles: NewsArticle[];
  initialSubsite?: SubsiteId;
}>();

const $subsite = useStore(currentSubsite);

// Year-based navigation - null means "show recent" (no year filter)
const isBrowser = typeof window !== 'undefined';

function getYearFromQuery(): number | null {
  if (!isBrowser) return null;
  const param = new URLSearchParams(window.location.search).get('year');
  if (!param) return null;
  const parsed = Number(param);
  return Number.isFinite(parsed) ? parsed : null;
}

const selectedYear = ref<number | null>(getYearFromQuery());
const pageSize = 20;
const displayCount = ref(pageSize);

// Set initial subsite from URL route if provided
onMounted(() => {
  if (props.initialSubsite && props.initialSubsite !== 'global') {
    currentSubsite.set(props.initialSubsite);
  }
});

// Helper to normalize subsites to array
function getSubsites(article: NewsArticle): string[] {
  if (!article.subsites) return ['all'];
  if (Array.isArray(article.subsites)) return article.subsites;
  return [article.subsites];
}

// Filter articles based on current subsite
const filteredBySubsite = computed(() => {
  const subsite = $subsite.value;
  if (subsite === 'global') {
    return props.articles;
  }
  return props.articles.filter((article) => {
    const articleSubsites = getSubsites(article);
    return (
      articleSubsites.includes('all') ||
      articleSubsites.includes(subsite) ||
      articleSubsites.some((s) => s.toLowerCase() === subsite.toLowerCase())
    );
  });
});

// Get year from article
function getYear(article: NewsArticle): number | null {
  if (!article.date) return null;
  const date = new Date(article.date);
  return isNaN(date.getTime()) ? null : date.getFullYear();
}

// Available years (sorted descending)
const availableYears = computed(() => {
  const years = new Set<number>();
  filteredBySubsite.value.forEach((article) => {
    const year = getYear(article);
    if (year) years.add(year);
  });
  return Array.from(years).sort((a, b) => b - a);
});

// Keep selected year valid when available years change
watch(availableYears, (years) => {
  if (selectedYear.value !== null && !years.includes(selectedYear.value)) {
    selectedYear.value = years[0] ?? null;
  }
});

// Split years: show last 5 as buttons, rest in dropdown
const recentYears = computed(() => availableYears.value.slice(0, 5));
const olderYears = computed(() => availableYears.value.slice(5));

// Reset pagination when year or subsite changes
watch([selectedYear, $subsite], () => {
  displayCount.value = pageSize;
});

// Articles filtered by year
const filteredArticles = computed(() => {
  if (selectedYear.value === null) {
    return filteredBySubsite.value;
  }
  return filteredBySubsite.value.filter((article) => getYear(article) === selectedYear.value);
});

// Count per year for badges
function countForYear(year: number): number {
  return filteredBySubsite.value.filter((article) => getYear(article) === year).length;
}

function selectYear(year: number | null) {
  selectedYear.value = year;
}

function updateUrl(year: number | null) {
  if (!isBrowser) return;
  const params = new URLSearchParams(window.location.search);
  if (year === null) {
    params.delete('year');
  } else {
    params.set('year', String(year));
  }
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
  window.history.replaceState({}, '', newUrl);
}

watch(
  selectedYear,
  (year) => {
    updateUrl(year);
  },
  { immediate: false }
);

function loadMore() {
  displayCount.value += pageSize;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
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
  <div class="news-list">
    <!-- Subsite indicator -->
    <div v-if="$subsite !== 'global'" class="mb-6 p-4 bg-galaxy-primary/10 rounded-lg">
      <p class="text-sm text-galaxy-dark">
        Showing news for <strong>{{ displaySubsite($subsite) }}</strong> subsite.
        <button @click="() => currentSubsite.set('global')" class="ml-2 text-galaxy-primary hover:underline">
          Show all news
        </button>
      </p>
    </div>

    <!-- Year navigation -->
    <div class="mb-6">
      <div class="flex flex-wrap items-center gap-2">
        <button
          @click="selectYear(null)"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            selectedYear === null ? 'bg-galaxy-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          Recent
        </button>
        <button
          v-for="year in recentYears"
          :key="year"
          @click="selectYear(year)"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            selectedYear === year ? 'bg-galaxy-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          {{ year }}
          <span class="ml-1 text-xs opacity-75">({{ countForYear(year) }})</span>
        </button>
        <!-- Older years dropdown -->
        <select
          v-if="olderYears.length > 0"
          :value="olderYears.includes(selectedYear as number) ? selectedYear : 'older'"
          @change="(e) => selectYear(Number((e.target as HTMLSelectElement).value))"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors border-0 cursor-pointer',
            olderYears.includes(selectedYear as number)
              ? 'bg-galaxy-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          <option value="older" disabled selected>Older...</option>
          <option v-for="year in olderYears" :key="year" :value="year">{{ year }} ({{ countForYear(year) }})</option>
        </select>
      </div>
    </div>

    <!-- Results count -->
    <p class="text-sm text-gray-500 mb-6">
      <template v-if="selectedYear">
        {{ filteredArticles.length }} article{{ filteredArticles.length !== 1 ? 's' : '' }} in {{ selectedYear }}
      </template>
      <template v-else> Showing most recent articles </template>
    </p>

    <!-- Articles -->
    <div class="space-y-8">
      <article
        v-for="article in filteredArticles.slice(0, displayCount)"
        :key="article.slug"
        class="border-b border-gray-200 pb-8"
      >
        <a :href="buildUrl(article.slug)" class="group block">
          <h2 class="text-xl font-semibold text-gray-900 group-hover:text-galaxy-primary transition-colors mb-2">
            {{ article.title || 'Untitled' }}
          </h2>
          <time v-if="article.date" class="text-sm text-gray-500 mb-2 block">
            {{ formatDate(article.date) }}
          </time>
          <p v-if="article.tease" class="text-gray-600">
            {{ article.tease }}
          </p>
          <div v-if="article.tags?.length" class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="tag in article.tags.slice(0, 5)"
              :key="tag"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
            >
              {{ tag }}
            </span>
          </div>
        </a>
      </article>
    </div>

    <!-- Load more -->
    <div v-if="filteredArticles.length > displayCount" class="mt-8 text-center">
      <p class="text-gray-500 mb-4">
        Showing {{ displayCount }} of {{ filteredArticles.length }} articles<span v-if="selectedYear">
          in {{ selectedYear }}</span
        >
      </p>
      <button
        @click="loadMore"
        class="px-6 py-2 bg-galaxy-primary text-white rounded-md hover:bg-galaxy-primary/90 transition-colors"
      >
        Load more
      </button>
    </div>

    <!-- No results -->
    <div v-if="filteredArticles.length === 0" class="py-12 text-center">
      <p class="text-gray-500">No news articles found.</p>
    </div>
  </div>
</template>
