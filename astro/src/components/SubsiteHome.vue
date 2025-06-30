<template>
  <div class="subsite-home">
    <!-- Jumbotron Section -->
    <div v-if="jumbotron" class="jumbotron bg-light p-5 rounded-lg mb-4">
      <div class="container" v-html="processMarkdown(jumbotron)"></div>
    </div>
    
    <!-- Lead Section -->
    <div v-if="lead" class="lead-section container mb-4">
      <div class="lead" v-html="processMarkdown(lead)"></div>
    </div>
    
    <!-- Welcome Message -->
    <div class="container">
      <h1 class="text-center mb-4">
        Welcome to Galaxy {{ subsiteConfig.name }}
      </h1>
      
      <!-- Cards Section -->
      <div v-if="cards" class="cards-section mb-4">
        <div v-html="processMarkdown(cards)"></div>
      </div>
      
      <!-- Main Content Grid -->
      <div class="row">
        <!-- News Column -->
        <div class="col-md-6 mb-4">
          <h2>Latest News</h2>
          <div class="news-placeholder p-3 bg-light rounded">
            <p class="text-muted mb-0">
              <a :href="`/${subsite}/news/`">View all news →</a>
            </p>
          </div>
        </div>
        
        <!-- Events Column -->
        <div class="col-md-6 mb-4">
          <h2>Upcoming Events</h2>
          <div class="events-placeholder p-3 bg-light rounded">
            <p class="text-muted mb-0">
              <a :href="`/${subsite}/events/`">View all events →</a>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Main Content Sections -->
      <div v-if="main1" class="main1-section mb-4">
        <div v-html="processMarkdown(main1)"></div>
      </div>
      
      <div v-if="main2" class="main2-section mb-4">
        <div v-html="processMarkdown(main2)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

const props = defineProps({
  subsite: {
    type: String,
    required: true
  },
  subsiteConfig: {
    type: Object,
    required: true
  },
  contentPieces: {
    type: Object,
    default: () => ({})
  }
});

// Extract content pieces
const lead = computed(() => props.contentPieces.lead || '');
const jumbotron = computed(() => props.contentPieces.jumbotron || '');
const main1 = computed(() => props.contentPieces.main1 || '');
const main2 = computed(() => props.contentPieces.main2 || '');
const cards = computed(() => props.contentPieces.cards || '');

// Process markdown to HTML
function processMarkdown(content) {
  if (!content) return '';
  
  try {
    return unified()
      .use(remarkParse)
      .use(remarkHtml, { sanitize: false })
      .processSync(content)
      .toString();
  } catch (error) {
    console.error('Error processing markdown:', error);
    return content;
  }
}
</script>

<style scoped>
.subsite-home {
  min-height: 60vh;
}

.jumbotron {
  background-color: #f8f9fa;
}

.lead-section {
  font-size: 1.25rem;
  font-weight: 300;
}

.news-placeholder,
.events-placeholder {
  min-height: 200px;
}

/* Deep styling for rendered markdown */
:deep(h1),
:deep(h2),
:deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(p) {
  margin-bottom: 1rem;
}

:deep(a) {
  color: #0066cc;
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:deep(ul),
:deep(ol) {
  margin-bottom: 1rem;
}

:deep(blockquote) {
  border-left: 4px solid #dee2e6;
  padding-left: 1rem;
  margin-left: 0;
  color: #6c757d;
}
</style>