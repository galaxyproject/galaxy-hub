<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  spec: string;
}>();

const container = ref<HTMLElement | null>(null);
const error = ref<string | null>(null);

async function renderChart() {
  if (!container.value || !props.spec) return;

  try {
    // Dynamic import to keep Vega out of main bundle
    const [vegaModule, vegaLiteModule, vegaEmbedModule] = await Promise.all([
      import('vega'),
      import('vega-lite'),
      import('vega-embed')
    ]);

    const vegaEmbed = vegaEmbedModule.default;

    // Fetch spec if it's a URL
    let specData = props.spec;
    if (props.spec.startsWith('http')) {
      const response = await fetch(props.spec);
      specData = await response.json();
    }

    await vegaEmbed(container.value, specData, {
      actions: {
        export: true,
        source: false,
        compiled: false,
        editor: false,
      },
      theme: 'latimes',
    });

    error.value = null;
  } catch (e) {
    console.error('Failed to render Vega chart:', e);
    error.value = e instanceof Error ? e.message : 'Failed to load chart';
  }
}

onMounted(renderChart);
watch(() => props.spec, renderChart);
</script>

<template>
  <div class="vega-embed-container my-4">
    <div v-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg">
      <p class="font-medium">Failed to load chart</p>
      <p class="text-sm">{{ error }}</p>
    </div>
    <div ref="container" class="vega-chart"></div>
  </div>
</template>

<style scoped>
.vega-embed-container :deep(.vega-embed) {
  width: 100%;
}
</style>
