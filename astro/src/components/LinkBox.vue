<template>
  <div :class="rootClasses">
    <span class="item" v-for="(link, i) in (data?.links || [])" :key="link.id || i">
      <a :class="{ bold: link.bold }" :href="link.url">
        {{ link.title }}
      </a>
      <template v-if="data?.horizontal && i < (data?.links?.length || 0) - 1"> | </template>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: { 
    type: Object, 
    required: true 
  }
  /* `data` properties:
   *   `horizontal` (Boolean): Use a horizontal orientation rather than vertical (default).
   *   `style` (String): Which visual style to use for the linkbox. Options:
   *     `"alert"`: The Bootstrap `alert-info` class.
   *     `"default"`: Our `linkbox` class.
   *   `links` (Array): Array of link objects with:
   *     `url` (String): The link URL
   *     `title` (String): The link text
   *     `bold` (Boolean): Whether to bold the link
   *     `id` (String): Optional unique identifier
   */
});

const rootClasses = computed(() => {
  const classes = ["text-center"];
  
  // Horizontal or vertical orientation?
  if (props.data?.horizontal) {
    classes.push("horizontal");
  } else {
    classes.push("vertical");
    classes.push("float-end"); // Bootstrap 5 uses float-end instead of float-right
  }
  
  // Visual style
  if (props.data?.style === "alert") {
    classes.push("alert");
    classes.push("alert-info");
  } else {
    classes.push("linkbox");
  }
  
  return classes;
});
</script>

<style scoped>
.item {
  margin-bottom: 0;
}

.vertical .item {
  display: block;
}

.bold {
  font-weight: bold;
}

.linkbox {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>