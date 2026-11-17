<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  /** Diagram source. If omitted, a ```mermaid code block inside the component is used. */
  chart?: string;
}>();

const container = ref<HTMLElement | null>(null);
const sourceHost = ref<HTMLElement | null>(null);
const error = ref<string | null>(null);
let renderCounter = 0;

/**
 * Extract the diagram source from the slot content.
 *
 * The preferred form is a fenced ```mermaid code block inside the component:
 * code blocks are passed through markdown processing untouched, so arrows like
 * `-->` are not mangled by smartypants typography. As a fallback, plain slot
 * text is used (with `<br>` elements converted back to newlines).
 */
function extractSource(host: HTMLElement): string {
  const code = host.querySelector('pre code') ?? host.querySelector('code');
  if (code?.textContent?.trim()) {
    return code.textContent;
  }

  let text = '';
  host.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement;
      text += el.tagName === 'BR' ? '\n' : extractSource(el);
    } else if (child.nodeType === Node.TEXT_NODE) {
      text += child.nodeValue ?? '';
    }
  });
  return text;
}

async function renderDiagram() {
  if (!container.value) return;

  const raw = props.chart ?? (sourceHost.value ? extractSource(sourceHost.value) : '');
  const source = raw
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();

  if (!source) {
    error.value = 'No diagram source provided';
    return;
  }

  try {
    // Dynamic import to keep Mermaid out of the main bundle
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
    });
    const { svg } = await mermaid.render(`mermaid-${++renderCounter}-${Date.now()}`, source);
    container.value.innerHTML = svg;
    error.value = null;
  } catch (e) {
    console.error('Failed to render Mermaid diagram:', e);
    error.value = e instanceof Error ? e.message : 'Failed to load diagram';
  }
}

onMounted(renderDiagram);
watch(() => props.chart, renderDiagram);
</script>

<template>
  <div class="mermaid-embed my-4">
    <div v-if="error" class="p-4 bg-red-50 text-red-700 rounded-lg">
      <p class="font-medium">Failed to render diagram</p>
      <p class="text-sm">{{ error }}</p>
    </div>
    <div ref="container" class="mermaid-diagram"></div>
    <div ref="sourceHost" class="hidden" aria-hidden="true"><slot /></div>
  </div>
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}
</style>
