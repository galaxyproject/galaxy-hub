<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite, subsites, type SubsiteId } from '@/stores/subsiteStore';
import { renderMarkdownInline } from '@/utils/markdown';
import { formatDate, getUTCYear } from '@/utils/dateUtils';
import { contentMatchesSubsite } from '@/utils/subsites';
import { onPopState, readParams, writeParams } from '@/utils/urlFilters';
import { LIST_VIEW_DEFAULT, parseListView, type ListView } from '@/utils/listView';
import FilterBar from '../filters/FilterBar.vue';
import ViewToggle from '../filters/ViewToggle.vue';
import ExternalIcon from '../common/ExternalIcon.vue';

interface NewsArticle {
  slug: string;
  title: string;
  date?: string;
  tease?: string;
  tags?: string[];
  subsites?: string[] | string;
  externalUrl?: string;
  /** Site image shown at the bottom of the tile. */
  image?: string;
}

const props = defineProps<{
  articles: NewsArticle[];
  initialSubsite?: SubsiteId;
}>();

const $subsite = useStore(currentSubsite);
const hasMounted = ref(false);
const effectiveSubsite = computed(() =>
  !hasMounted.value && props.initialSubsite ? props.initialSubsite : $subsite.value
);

// URL params, in this order: q (title + tease text), year (null = all years), tag, view. "Load more" stays out.
const FILTER_PARAMS = { q: null, year: null, tag: null, view: LIST_VIEW_DEFAULT };

function parseYear(param: string | null): number | null {
  if (!param) return null;
  const parsed = Number(param);
  return Number.isFinite(parsed) ? parsed : null;
}

// Read from the URL after mount: the server render has no query, and hydration must match it
const searchQuery = ref('');
const selectedYear = ref<number | null>(null);
const selectedTag = ref<string | null>(null);
const view = ref<ListView>(LIST_VIEW_DEFAULT);
const isTiles = computed(() => view.value === 'tiles');
const pageSize = 20;
const displayCount = ref(pageSize);

function applyUrlFilters() {
  const params = readParams(FILTER_PARAMS);
  searchQuery.value = params.q ?? '';
  selectedYear.value = parseYear(params.year);
  selectedTag.value = params.tag;
  view.value = parseListView(params.view);
}

let stopPopState = () => {};

// Set initial subsite from URL route if provided
onMounted(() => {
  if (props.initialSubsite && props.initialSubsite !== 'global') {
    currentSubsite.set(props.initialSubsite);
  }
  applyUrlFilters();
  hasMounted.value = true;
  // Back/forward restores the filters from the URL
  stopPopState = onPopState(applyUrlFilters);
});

onUnmounted(() => stopPopState());

// Filter articles based on current subsite
const filteredBySubsite = computed(() => {
  const subsite = effectiveSubsite.value;
  if (subsite === 'global') {
    return props.articles;
  }
  return props.articles.filter((article) => {
    return contentMatchesSubsite(article.subsites, subsite);
  });
});

// Get year from article
function getYear(article: NewsArticle): number | null {
  if (!article.date) return null;
  const date = new Date(article.date);
  return isNaN(date.getTime()) ? null : getUTCYear(date);
}

// Lower-cased title + tease, built once per article list
const searchText = computed(() => {
  const map = new Map<NewsArticle, string>();
  props.articles.forEach((article) => {
    map.set(article, `${article.title ?? ''} ${article.tease ?? ''}`.toLowerCase());
  });
  return map;
});

// Every word of the query must appear in the title or tease
const queryTerms = computed(() => searchQuery.value.toLowerCase().split(/\s+/).filter(Boolean));

function matchesQuery(article: NewsArticle): boolean {
  if (queryTerms.value.length === 0) return true;
  const text = searchText.value.get(article) ?? '';
  return queryTerms.value.every((term) => text.includes(term));
}

function matchesTag(article: NewsArticle): boolean {
  return selectedTag.value === null || (article.tags ?? []).includes(selectedTag.value);
}

function matchesYear(article: NewsArticle): boolean {
  return selectedYear.value === null || getYear(article) === selectedYear.value;
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

// Year chip counts follow the text and tag filters
const yearOptions = computed(() => {
  const counts = new Map<number, number>();
  filteredBySubsite.value.forEach((article) => {
    if (!matchesQuery(article) || !matchesTag(article)) return;
    const year = getYear(article);
    if (year) counts.set(year, (counts.get(year) ?? 0) + 1);
  });
  return availableYears.value.map((year) => ({ year, count: counts.get(year) ?? 0 }));
});

// Every tag in this subsite, A-Z; counts follow the text and year filters
const tagOptions = computed(() => {
  const all = new Set<string>();
  const counts = new Map<string, number>();
  filteredBySubsite.value.forEach((article) => {
    const matches = matchesQuery(article) && matchesYear(article);
    (article.tags ?? []).forEach((tag) => {
      all.add(tag);
      if (matches) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(all)
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({ value: tag, label: tag, count: counts.get(tag) ?? 0 }));
});

// Drop a tag this subsite does not have (a stale or mistyped ?tag=), so the select and the list agree
watch([selectedTag, tagOptions], ([tag, options]) => {
  if (tag !== null && !options.some((option) => option.value === tag)) selectedTag.value = null;
});

// Reset pagination when a filter or the subsite changes
watch([searchQuery, selectedYear, selectedTag, effectiveSubsite], () => {
  displayCount.value = pageSize;
});

const filteredArticles = computed(() =>
  filteredBySubsite.value.filter((article) => matchesYear(article) && matchesTag(article) && matchesQuery(article))
);

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
watch([searchQuery, selectedYear, selectedTag, view], ([q, year, tag, layout]) => {
  writeParams({ q, year, tag, view: layout }, { defaults: { view: LIST_VIEW_DEFAULT } });
});

function loadMore() {
  displayCount.value += pageSize;
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
    <div v-if="effectiveSubsite !== 'global'" class="mb-6 p-4 bg-galaxy-primary/10 rounded-lg">
      <p class="text-sm text-galaxy-dark">
        Showing news for <strong>{{ displaySubsite(effectiveSubsite) }}</strong> subsite.
        <button @click="() => currentSubsite.set('global')" class="ml-2 text-galaxy-primary hover:underline">
          Show all news
        </button>
      </p>
    </div>

    <FilterBar
      v-model:q="searchQuery"
      v-model:year="selectedYear"
      v-model:tag="selectedTag"
      label="Filter news"
      :years="yearOptions"
      year-label="Filter news by year"
      search-label="Search news"
      search-placeholder="Search titles and summaries"
      :tag-options="tagOptions"
      tag-label="Tag"
      :result-count="filteredArticles.length"
      result-noun="articles"
      result-noun-singular="article"
      :result-context="resultContext"
    >
      <template #actions>
        <ViewToggle v-model="view" label="News layout" />
      </template>
    </FilterBar>

    <!-- Articles: rows, or tiles with the image at the bottom -->
    <div
      :data-view="view"
      :class="isTiles ? 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-4' : 'space-y-8'"
    >
      <article
        v-for="article in filteredArticles.slice(0, displayCount)"
        :key="article.slug"
        :class="
          isTiles
            ? 'overflow-hidden rounded-lg border border-ebony-clay-100 bg-white shadow-sm transition-shadow hover:shadow-md'
            : 'border-b border-ebony-clay-100 pb-8'
        "
      >
        <a :href="buildUrl(article.slug)" :class="isTiles ? 'group flex h-full flex-col' : 'group block'">
          <div :class="{ 'flex-1 p-4': isTiles }">
            <h2
              :class="[
                'font-semibold text-chicago-900 group-hover:text-galaxy-primary transition-colors mb-2',
                isTiles ? 'text-base' : 'text-xl',
              ]"
            >
              {{ article.title || 'Untitled' }}
              <ExternalIcon v-if="article.externalUrl" :href="article.externalUrl" />
            </h2>
            <time v-if="article.date" class="text-sm text-chicago-500 mb-2 block">
              {{ formatDate(article.date) }}
            </time>
            <p
              v-if="article.tease"
              :class="['text-chicago-600', { 'line-clamp-3 text-sm': isTiles }]"
              v-html="renderMarkdownInline(article.tease)"
            ></p>
            <div v-if="article.tags?.length" class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="tag in article.tags.slice(0, isTiles ? 3 : 5)"
                :key="tag"
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-ebony-clay-50 text-chicago-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <img
            v-if="isTiles && article.image"
            :src="article.image"
            alt=""
            loading="lazy"
            decoding="async"
            class="aspect-video w-full border-t border-ebony-clay-100 object-cover"
            data-tile-image
          />
        </a>
      </article>
    </div>

    <!-- Load more -->
    <div v-if="filteredArticles.length > displayCount" class="mt-8 text-center">
      <p class="text-chicago-500 mb-4">
        Showing {{ displayCount }} of {{ filteredArticles.length }} articles {{ resultContext }}
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
      <p class="text-chicago-500">No news articles found.</p>
    </div>
  </div>
</template>
