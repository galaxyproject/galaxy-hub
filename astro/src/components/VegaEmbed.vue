<template>
  <div ref="vegaContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import embed from 'vega-embed';

const props = defineProps({
  spec: {
    type: [String, Object],
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
});

const vegaContainer = ref(null);

const embedChart = async () => {
  if (!vegaContainer.value) return;
  
  try {
    // Parse spec if it's a string
    const specification = typeof props.spec === 'string' 
      ? JSON.parse(props.spec) 
      : props.spec;
    
    // Default options
    const defaultOptions = {
      actions: false,
      renderer: 'svg',
      theme: 'none'
    };
    
    // Merge with provided options
    const options = { ...defaultOptions, ...props.options };
    
    await embed(vegaContainer.value, specification, options);
  } catch (error) {
    console.error('Error embedding Vega chart:', error);
  }
};

onMounted(() => {
  embedChart();
});

// Re-render if spec changes
watch(() => props.spec, () => {
  embedChart();
});
</script>

<style scoped>
/* Vega embed styles will be applied to the container */
</style>