<template>
  <div class="accordion" :id="accordionId">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="`heading-${accordionId}-${index}`">
        <button
          class="accordion-button"
          :class="{ collapsed: !isOpen(index) }"
          type="button"
          :aria-expanded="isOpen(index)"
          :aria-controls="`collapse-${accordionId}-${index}`"
          @click="toggle(index)"
        >
          {{ item.title }}
        </button>
      </h2>
      <div
        :id="`collapse-${accordionId}-${index}`"
        class="accordion-collapse collapse"
        :class="{ show: isOpen(index) }"
        :aria-labelledby="`heading-${accordionId}-${index}`"
      >
        <div class="accordion-body">
          <div v-if="item.content" v-html="item.content"></div>
          <slot v-else :name="`item-${index}`">
            {{ item.text || 'No content provided' }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => items.every(item => item.title)
  },
  multiple: {
    type: Boolean,
    default: false
  },
  defaultOpen: {
    type: [Number, Array],
    default: null
  },
  flush: {
    type: Boolean,
    default: false
  }
});

// Generate unique ID for this accordion instance
const accordionId = computed(() => `accordion-${Math.random().toString(36).substr(2, 9)}`);

// Initialize open items
const openItems = ref(new Set());

// Set default open items
if (props.defaultOpen !== null) {
  if (Array.isArray(props.defaultOpen)) {
    props.defaultOpen.forEach(index => openItems.value.add(index));
  } else {
    openItems.value.add(props.defaultOpen);
  }
}

function isOpen(index) {
  return openItems.value.has(index);
}

function toggle(index) {
  if (openItems.value.has(index)) {
    // Close the item
    openItems.value.delete(index);
  } else {
    // Open the item
    if (!props.multiple) {
      // If not multiple, close all others first
      openItems.value.clear();
    }
    openItems.value.add(index);
  }
  
  // Force reactivity update
  openItems.value = new Set(openItems.value);
}

function openAll() {
  props.items.forEach((_, index) => openItems.value.add(index));
  openItems.value = new Set(openItems.value);
}

function closeAll() {
  openItems.value.clear();
  openItems.value = new Set(openItems.value);
}

// Expose methods for parent components
defineExpose({
  openAll,
  closeAll,
  toggle
});
</script>

<style scoped>
.accordion {
  --bs-accordion-color: #212529;
  --bs-accordion-bg: #fff;
  --bs-accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
  --bs-accordion-border-color: #dee2e6;
  --bs-accordion-border-width: 1px;
  --bs-accordion-border-radius: 0.375rem;
  --bs-accordion-btn-padding-x: 1.25rem;
  --bs-accordion-btn-padding-y: 1rem;
  --bs-accordion-btn-color: #212529;
  --bs-accordion-btn-bg: #fff;
  --bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  --bs-accordion-btn-icon-width: 1.25rem;
  --bs-accordion-btn-icon-transform: rotate(-180deg);
  --bs-accordion-btn-focus-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  --bs-accordion-body-padding-x: 1.25rem;
  --bs-accordion-body-padding-y: 1rem;
  --bs-accordion-active-color: #0c63e4;
  --bs-accordion-active-bg: #e7f1ff;
}

.accordion-item {
  color: var(--bs-accordion-color);
  background-color: var(--bs-accordion-bg);
  border: var(--bs-accordion-border-width) solid var(--bs-accordion-border-color);
}

.accordion-item:first-of-type {
  border-top-left-radius: var(--bs-accordion-border-radius);
  border-top-right-radius: var(--bs-accordion-border-radius);
}

.accordion-item:last-of-type {
  border-bottom-right-radius: var(--bs-accordion-border-radius);
  border-bottom-left-radius: var(--bs-accordion-border-radius);
}

.accordion-item:not(:first-of-type) {
  border-top: 0;
}

.accordion-header {
  margin-bottom: 0;
}

.accordion-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);
  font-size: 1rem;
  color: var(--bs-accordion-btn-color);
  text-align: left;
  background-color: var(--bs-accordion-btn-bg);
  border: 0;
  border-radius: 0;
  overflow-anchor: none;
  transition: var(--bs-accordion-transition);
  cursor: pointer;
}

.accordion-button::after {
  flex-shrink: 0;
  width: var(--bs-accordion-btn-icon-width);
  height: var(--bs-accordion-btn-icon-width);
  margin-left: auto;
  content: "";
  background-image: var(--bs-accordion-btn-icon);
  background-repeat: no-repeat;
  background-size: var(--bs-accordion-btn-icon-width);
  transition: var(--bs-accordion-transition);
}

.accordion-button:not(.collapsed) {
  color: var(--bs-accordion-active-color);
  background-color: var(--bs-accordion-active-bg);
  box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color);
}

.accordion-button:not(.collapsed)::after {
  background-image: var(--bs-accordion-btn-icon);
  transform: var(--bs-accordion-btn-icon-transform);
}

.accordion-button:hover {
  z-index: 2;
}

.accordion-button:focus {
  z-index: 3;
  outline: 0;
  box-shadow: var(--bs-accordion-btn-focus-box-shadow);
}

.accordion-collapse {
  transition: height 0.35s ease;
}

.accordion-collapse.collapse {
  display: none;
}

.accordion-collapse.collapse.show {
  display: block;
}

.accordion-body {
  padding: var(--bs-accordion-body-padding-y) var(--bs-accordion-body-padding-x);
}

/* Flush variant */
.accordion.accordion-flush .accordion-item {
  border-right: 0;
  border-left: 0;
  border-radius: 0;
}

.accordion.accordion-flush .accordion-item:first-child {
  border-top: 0;
}

.accordion.accordion-flush .accordion-item:last-child {
  border-bottom: 0;
}
</style>