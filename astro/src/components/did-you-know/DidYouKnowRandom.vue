<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DidYouKnowCard, { type DykItem } from './DidYouKnowCard.vue';
import { Button } from '@/components/ui/button';
import { pickWeightedIndex } from '@/utils/did-you-know';

const props = withDefaults(
  defineProps<{
    items: DykItem[];
    /** Open links in a new tab (bare/embed pages). */
    newTab?: boolean;
    /**
     * Show the permalink to the currently displayed item (bare/embed pages).
     * When true, a "Link to this tip" field is rendered below the card.
     */
    showPermalink?: boolean;
  }>(),
  { newTab: true, showPermalink: false }
);

const currentIndex = ref(0);
/** True when the current selection was pinned via ?item=<slug> (not random). */
const isPinned = ref(false);

function pickWeightedRandomIndex(): number {
  if (props.items.length === 0) return 0;
  return pickWeightedIndex(props.items.map((it) => it.weight ?? null));
}

function indexForSlug(slug: string | null): number {
  if (!slug) return -1;
  const idx = props.items.findIndex((it) => it.slug === slug);
  return idx;
}

function readItemParam(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('item');
}

onMounted(() => {
  const requested = readItemParam();
  const idx = indexForSlug(requested);
  if (requested && idx >= 0) {
    currentIndex.value = idx;
    isPinned.value = true;
  } else {
    currentIndex.value = pickWeightedRandomIndex();
    isPinned.value = false;
  }
});

const currentItem = computed(() => props.items[currentIndex.value]);
const hasItems = computed(() => props.items.length > 0);

const permalink = computed(() => {
  if (typeof window === 'undefined' || !currentItem.value) return '';
  const url = new URL(window.location.href);
  url.searchParams.set('item', currentItem.value.slug);
  return url.toString();
});

const copied = ref(false);

async function copyPermalink() {
  if (!permalink.value) return;
  try {
    await navigator.clipboard.writeText(permalink.value);
  } catch {
    // Fallback for older browsers / non-secure contexts
    const input = document.getElementById('dyk-permalink-input') as HTMLInputElement | null;
    if (input) {
      input.select();
      document.execCommand('copy');
    }
  }
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

const showActions = computed(() => hasItems.value && props.items.length > 1 && !isPinned.value);

function showAnother() {
  if (props.items.length <= 1) {
    currentIndex.value = 0;
    return;
  }
  // Re-roll a weighted sample, avoiding the current item (a few tries, then
  // fall back to advancing to the next index deterministically).
  let next = pickWeightedRandomIndex();
  let tries = 0;
  while (next === currentIndex.value && tries < 8) {
    next = pickWeightedRandomIndex();
    tries++;
  }
  if (next === currentIndex.value) next = (next + 1) % props.items.length;
  currentIndex.value = next;
  isPinned.value = false;
}
</script>

<template>
  <div class="dyk-random">
    <p v-if="!hasItems" class="dyk-empty">No "Did you know" tips are available for this site.</p>
    <template v-else>
      <DidYouKnowCard :key="currentIndex" :item="currentItem" :new-tab="newTab" />

      <div v-if="showActions" class="dyk-actions">
        <Button variant="outline" size="sm" @click="showAnother">Show another tip</Button>
      </div>

      <div v-if="showPermalink && currentItem" class="dyk-permalink">
        <label class="dyk-permalink-label" for="dyk-permalink-input">Link to this tip</label>
        <div class="dyk-permalink-row">
          <input
            id="dyk-permalink-input"
            class="dyk-permalink-input"
            type="url"
            readonly
            :value="permalink"
            @focus="($event.target as HTMLInputElement).select()"
          />
          <Button
            variant="default"
            size="sm"
            class="dyk-copy-btn"
            :title="copied ? 'Copied!' : 'Copy to clipboard'"
            @click="copyPermalink"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dyk-random {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dyk-empty {
  color: #64748b;
  font-size: 0.9rem;
}

.dyk-actions {
  display: flex;
  justify-content: center;
}

.dyk-permalink {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
}

.dyk-permalink-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.dyk-permalink-input {
  flex: 1;
  font-size: 0.8rem;
  font-family: monospace;
  color: #334155;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.35rem 0.5rem;
  box-sizing: border-box;
  min-width: 0;
}

.dyk-permalink-row {
  display: flex;
  gap: 0.4rem;
  align-items: stretch;
}

.dyk-copy-btn {
  flex-shrink: 0;
  white-space: nowrap;
}
</style>
