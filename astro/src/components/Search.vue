<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <input
        v-model="query"
        type="search"
        class="form-control"
        :placeholder="placeholder"
        @input="handleSearch"
        @keydown.enter="handleSubmit"
        @keydown.escape="clearSearch"
        aria-label="Search"
      >
      <button 
        v-if="query"
        class="search-clear"
        @click="clearSearch"
        aria-label="Clear search"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    
    <div v-if="isSearching" class="search-status">
      Searching...
    </div>
    
    <div v-else-if="hasSearched && results.length === 0" class="search-status">
      No results found for "{{ lastQuery }}"
    </div>
    
    <div v-else-if="results.length > 0" class="search-results">
      <div class="search-status">
        Found {{ results.length }} result{{ results.length === 1 ? '' : 's' }} for "{{ lastQuery }}"
      </div>
      
      <div class="results-list">
        <article 
          v-for="result in paginatedResults" 
          :key="result.id"
          class="result-item"
        >
          <h3 class="result-title">
            <a :href="result.url">{{ result.title }}</a>
          </h3>
          <p class="result-content">
            {{ result.content }}...
          </p>
          <div class="result-meta">
            <span v-if="result.date" class="result-date">
              {{ formatDate(result.date) }}
            </span>
            <span v-if="result.type" class="result-type">
              {{ formatType(result.type) }}
            </span>
            <span v-if="result.tags.length > 0" class="result-tags">
              <span v-for="tag in result.tags.slice(0, 3)" :key="tag" class="tag">
                {{ tag }}
              </span>
            </span>
          </div>
        </article>
      </div>
      
      <nav v-if="totalPages > 1" class="pagination-wrapper">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
              Previous
            </button>
          </li>
          <li 
            v-for="page in displayedPages" 
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="goToPage(page)">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import lunr from 'lunr';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search Galaxy Hub...'
  },
  resultsPerPage: {
    type: Number,
    default: 10
  },
  debounceMs: {
    type: Number,
    default: 300
  }
});

const query = ref('');
const lastQuery = ref('');
const results = ref([]);
const isSearching = ref(false);
const hasSearched = ref(false);
const currentPage = ref(1);

let searchIndex = null;
let documents = null;
let debounceTimer = null;

// Load search index on mount
onMounted(async () => {
  try {
    const response = await fetch('/search-index.json');
    const data = await response.json();
    
    searchIndex = lunr.Index.load(data.index);
    documents = data.documents;
  } catch (error) {
    console.error('Failed to load search index:', error);
  }
});

// Computed properties
const totalPages = computed(() => Math.ceil(results.value.length / props.resultsPerPage));

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * props.resultsPerPage;
  const end = start + props.resultsPerPage;
  return results.value.slice(start, end);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxDisplay = 5;
  const halfDisplay = Math.floor(maxDisplay / 2);
  
  let start = Math.max(1, currentPage.value - halfDisplay);
  let end = Math.min(totalPages.value, start + maxDisplay - 1);
  
  if (end - start + 1 < maxDisplay) {
    start = Math.max(1, end - maxDisplay + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Methods
function handleSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    performSearch();
  }, props.debounceMs);
}

function handleSubmit() {
  clearTimeout(debounceTimer);
  performSearch();
}

function performSearch() {
  if (!searchIndex || !documents) {
    console.error('Search index not loaded');
    return;
  }
  
  const searchQuery = query.value.trim();
  if (!searchQuery) {
    clearSearch();
    return;
  }
  
  isSearching.value = true;
  hasSearched.value = true;
  lastQuery.value = searchQuery;
  
  try {
    // Perform search
    const searchResults = searchIndex.search(searchQuery);
    
    // Map results to documents
    results.value = searchResults.map(result => {
      const doc = documents.find(d => d.id === result.ref);
      return {
        ...doc,
        score: result.score
      };
    });
    
    currentPage.value = 1;
  } catch (error) {
    console.error('Search error:', error);
    results.value = [];
  } finally {
    isSearching.value = false;
  }
}

function clearSearch() {
  query.value = '';
  lastQuery.value = '';
  results.value = [];
  hasSearched.value = false;
  currentPage.value = 1;
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
}
</script>

<style scoped>
.search-container {
  max-width: 800px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.search-input-wrapper input {
  padding-right: 2.5rem;
}

.search-clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #6c757d;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.search-clear:hover {
  color: #495057;
}

.search-status {
  margin-bottom: 1rem;
  color: #6c757d;
}

.search-results {
  margin-top: 2rem;
}

.results-list {
  margin-bottom: 2rem;
}

.result-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.result-item:last-child {
  border-bottom: none;
}

.result-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.result-title a {
  color: #212529;
  text-decoration: none;
}

.result-title a:hover {
  color: #0d6efd;
  text-decoration: underline;
}

.result-content {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.result-meta {
  font-size: 0.875rem;
  color: #6c757d;
}

.result-meta > span {
  margin-right: 1rem;
}

.result-type {
  text-transform: capitalize;
}

.result-tags .tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  background-color: #f8f9fa;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-item {
  margin: 0 0.125rem;
}

.page-link {
  position: relative;
  display: block;
  padding: 0.375rem 0.75rem;
  text-decoration: none;
  color: #0d6efd;
  background-color: #fff;
  border: 1px solid #dee2e6;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  cursor: pointer;
}

.page-link:hover {
  z-index: 2;
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>