<template>
  <div class="tabs-container">
    <ul class="nav nav-tabs" :class="tabClass" role="tablist">
      <li 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="nav-item"
        role="presentation"
      >
        <button
          class="nav-link"
          :class="{ active: activeTab === index }"
          :id="`tab-${id}-${index}`"
          type="button"
          role="tab"
          :aria-controls="`panel-${id}-${index}`"
          :aria-selected="activeTab === index"
          @click="selectTab(index)"
        >
          {{ tab.title }}
        </button>
      </li>
    </ul>
    
    <div class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-pane fade"
        :class="{ 'show active': activeTab === index }"
        :id="`panel-${id}-${index}`"
        role="tabpanel"
        :aria-labelledby="`tab-${id}-${index}`"
      >
        <div v-if="tab.content" v-html="tab.content"></div>
        <slot v-else :name="`tab-${index}`"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => tabs.every(tab => tab.title)
  },
  defaultActive: {
    type: Number,
    default: 0
  },
  variant: {
    type: String,
    default: 'tabs', // 'tabs' or 'pills'
    validator: (value) => ['tabs', 'pills'].includes(value)
  },
  justified: {
    type: Boolean,
    default: false
  },
  fill: {
    type: Boolean,
    default: false
  }
});

// Generate unique ID for this tabs instance
const id = computed(() => `tabs-${Math.random().toString(36).substr(2, 9)}`);

const activeTab = ref(props.defaultActive);

const tabClass = computed(() => {
  const classes = [];
  if (props.variant === 'pills') {
    classes.push('nav-pills');
  }
  if (props.justified) {
    classes.push('nav-justified');
  }
  if (props.fill) {
    classes.push('nav-fill');
  }
  return classes;
});

function selectTab(index) {
  if (index >= 0 && index < props.tabs.length) {
    activeTab.value = index;
  }
}

// Handle keyboard navigation
function handleKeydown(event) {
  const tabButtons = document.querySelectorAll(`#${id.value} .nav-link`);
  const currentIndex = activeTab.value;
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      selectTab(currentIndex === 0 ? props.tabs.length - 1 : currentIndex - 1);
      tabButtons[activeTab.value]?.focus();
      break;
    case 'ArrowRight':
      event.preventDefault();
      selectTab((currentIndex + 1) % props.tabs.length);
      tabButtons[activeTab.value]?.focus();
      break;
    case 'Home':
      event.preventDefault();
      selectTab(0);
      tabButtons[0]?.focus();
      break;
    case 'End':
      event.preventDefault();
      selectTab(props.tabs.length - 1);
      tabButtons[props.tabs.length - 1]?.focus();
      break;
  }
}

onMounted(() => {
  const container = document.querySelector(`#${id.value}`);
  if (container) {
    container.addEventListener('keydown', handleKeydown);
  }
});
</script>

<style scoped>
.tabs-container {
  width: 100%;
}

.nav-tabs {
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1rem;
}

.nav-tabs .nav-link {
  margin-bottom: -1px;
  background: none;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: #495057;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
  isolation: isolate;
}

.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.nav-pills .nav-link {
  background: none;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: #0d6efd;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}

.nav-pills .nav-link:hover {
  background-color: #f8f9fa;
}

.nav-pills .nav-link.active {
  color: #fff;
  background-color: #0d6efd;
}

.nav-justified .nav-item {
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
}

.nav-fill .nav-item {
  flex: 1 1 auto;
  text-align: center;
}

.tab-content {
  position: relative;
}

.tab-pane {
  display: none;
}

.tab-pane.show {
  display: block;
}

.tab-pane.fade {
  transition: opacity 0.15s linear;
}

.tab-pane.fade:not(.show) {
  opacity: 0;
}

.tab-pane.fade.show {
  opacity: 1;
}
</style>