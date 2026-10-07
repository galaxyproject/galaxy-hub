<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { renderMarkdown } from '@/utils/markdown';
import { Button } from '@/components/ui/button';

export interface DykImage {
  url: string;
  alt: string;
}

export interface DykLink {
  url: string;
  text: string;
}

export interface DykItem {
  slug: string;
  title: string;
  tease?: string | null;
  body: string;
  subsites?: string[];
  date?: string | null;
  weight?: number | null;
  images?: DykImage[] | null;
  links?: DykLink[] | null;
}

const props = withDefaults(
  defineProps<{
    item: DykItem;
    /** Open links in a new tab (used on bare/embed pages). */
    newTab?: boolean;
  }>(),
  { newTab: false }
);

const sampledImage = ref<DykImage | undefined>(undefined);
const sampledLink = ref<DykLink | undefined>(undefined);

function pickRandom<T>(arr: readonly T[] | null | undefined): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

onMounted(() => {
  sampledImage.value = pickRandom(props.item.images);
  sampledLink.value = pickRandom(props.item.links);
});

// Re-sample the image and link (e.g. a "shuffle" action).
function resample() {
  sampledImage.value = pickRandom(props.item.images);
  sampledLink.value = pickRandom(props.item.links);
}

defineExpose({ resample });

const bodyHtml = renderMarkdown(props.item.body);
const linkTarget = props.newTab ? '_blank' : undefined;
const linkRel = props.newTab ? 'noopener noreferrer' : undefined;
</script>

<template>
  <article class="dyk-card">
    <header class="dyk-header">
      <h3 class="dyk-title">{{ item.title }}</h3>
      <p v-if="item.tease" class="dyk-tease">{{ item.tease }}</p>
    </header>

    <figure v-if="sampledImage" class="dyk-figure">
      <img :src="sampledImage.url" :alt="sampledImage.alt" :title="sampledImage.alt" loading="lazy" class="dyk-image" />
      <figcaption class="dyk-caption">{{ sampledImage.alt }}</figcaption>
    </figure>

    <div class="dyk-body" v-html="bodyHtml" />

    <footer v-if="sampledLink" class="dyk-footer">
      <Button
        as="a"
        :href="sampledLink.url"
        :target="linkTarget"
        :rel="linkRel"
        variant="default"
        size="sm"
        class="dyk-link-btn"
      >
        {{ sampledLink.text }}
      </Button>
    </footer>
  </article>
</template>

<style scoped>
.dyk-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.dyk-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #25537b;
  margin: 0;
  line-height: 1.3;
}

.dyk-tease {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.4;
}

.dyk-figure {
  margin: 0;
}

.dyk-image {
  width: 100%;
  height: auto;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  display: block;
}

.dyk-caption {
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.3;
}

.dyk-body {
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.55;
}

.dyk-body :deep(p) {
  margin: 0 0 0.5rem;
}

.dyk-body :deep(p:last-child) {
  margin-bottom: 0;
}

.dyk-footer {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
  text-align: center;
}

.dyk-link-btn {
  text-decoration: none;
}
</style>

<style>
/* Override prose link styling on bare pages where the card lives inside
   article.prose-galaxy — without this, .prose-galaxy a { color: #25537b }
   makes the button text the same color as its primary background. */
.prose-galaxy .dyk-link-btn,
.prose-galaxy .dyk-link-btn:hover {
  color: var(--color-primary-foreground, #fff);
  text-decoration: none;
}
</style>
