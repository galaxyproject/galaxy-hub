<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite } from '@/stores/subsiteStore';

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
}>();

const $subsite = useStore(currentSubsite);

// Helper to normalize subsites to array
function getSubsites(article: NewsArticle): string[] {
  if (!article.subsites) return ['all'];
  if (Array.isArray(article.subsites)) return article.subsites;
  return [article.subsites];
}

// Filter articles based on current subsite
const filteredArticles = computed(() => {
  const subsite = $subsite.value;

  // Global shows all articles
  if (subsite === 'global') {
    return props.articles;
  }

  // Filter by subsite - include articles tagged with this subsite or 'all'
  return props.articles.filter(article => {
    const articleSubsites = getSubsites(article);
    return articleSubsites.includes('all') ||
           articleSubsites.includes(subsite) ||
           articleSubsites.some(s => s.toLowerCase() === subsite.toLowerCase());
  });
});

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function buildUrl(slug: string): string {
  return `/${slug}/`;
}
</script>

<template>
  <div class="news-list">
    <!-- Subsite indicator -->
    <div v-if="$subsite !== 'global'" class="mb-6 p-4 bg-galaxy-primary/10 rounded-lg">
      <p class="text-sm text-galaxy-dark">
        Showing news for <strong class="capitalize">{{ $subsite }}</strong> subsite.
        <button
          @click="() => currentSubsite.set('global')"
          class="ml-2 text-galaxy-primary hover:underline"
        >
          Show all news
        </button>
      </p>
    </div>

    <!-- Results count -->
    <p class="text-sm text-gray-500 mb-6">
      {{ filteredArticles.length }} article{{ filteredArticles.length !== 1 ? 's' : '' }}
    </p>

    <!-- Articles -->
    <div class="space-y-8">
      <article
        v-for="article in filteredArticles.slice(0, 50)"
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

    <!-- More indicator -->
    <div v-if="filteredArticles.length > 50" class="mt-8 text-center">
      <p class="text-gray-500">Showing 50 of {{ filteredArticles.length }} articles</p>
    </div>

    <!-- No results -->
    <div v-if="filteredArticles.length === 0" class="py-12 text-center">
      <p class="text-gray-500">No news articles for this subsite.</p>
    </div>
  </div>
</template>
