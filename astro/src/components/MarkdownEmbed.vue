<template>
  <div class="markdown-embed">
    <div v-if="loading" class="text-center p-3">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      Failed to load content: {{ error }}
    </div>
    <div v-else v-html="processedContents"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

const props = defineProps({
  href: {
    type: String,
    required: true
  },
  // Allow passing markdown content directly
  content: {
    type: String,
    default: null
  }
});

const markdownContents = ref('');
const loading = ref(true);
const error = ref(null);

const processedContents = computed(() => {
  if (!markdownContents.value) return '';
  
  try {
    return unified()
      .use(remarkParse)
      .use(remarkHtml, { sanitize: false })
      .processSync(markdownContents.value)
      .toString();
  } catch (err) {
    console.error('Error processing markdown:', err);
    return `<p class="text-danger">Error processing markdown content</p>`;
  }
});

const loadContent = async () => {
  // If content is provided directly, use it
  if (props.content) {
    markdownContents.value = props.content;
    loading.value = false;
    return;
  }
  
  // Otherwise, fetch from href
  try {
    loading.value = true;
    error.value = null;
    
    const response = await fetch(props.href);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    markdownContents.value = text;
  } catch (err) {
    console.error('Error loading markdown:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadContent();
});
</script>

<style scoped>
.markdown-embed {
  /* Ensure proper spacing for embedded content */
  margin: 1rem 0;
}

/* Style for nested content */
.markdown-embed :deep(h1),
.markdown-embed :deep(h2),
.markdown-embed :deep(h3),
.markdown-embed :deep(h4),
.markdown-embed :deep(h5),
.markdown-embed :deep(h6) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.markdown-embed :deep(p) {
  margin-bottom: 1rem;
}

.markdown-embed :deep(pre) {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
}

.markdown-embed :deep(code) {
  background-color: #f8f9fa;
  padding: 0.125rem 0.25rem;
  border-radius: 0.125rem;
}

.markdown-embed :deep(blockquote) {
  border-left: 4px solid #dee2e6;
  padding-left: 1rem;
  margin-left: 0;
  color: #6c757d;
}
</style>