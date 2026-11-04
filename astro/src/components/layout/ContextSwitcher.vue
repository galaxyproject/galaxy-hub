<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { Check, ChevronDown } from '@lucide/vue';
import { CONTEXT_KIND_LABELS, contextFromPath, contextMenuGroups, type ContextMenuItem } from '@/utils/siteContext';

// Context header: shows where the page sits (region, project or global) and opens the region menu.
// A disclosure with a list of links (no select-to-navigate); the URL decides the context, nothing is stored.
const props = withDefaults(
  defineProps<{
    currentPath?: string;
    /** Prefix for element ids, so the sidebar and the mobile sheet copies do not collide. */
    idPrefix?: string;
    /** Open the menu on mount and focus the current item (mobile chip). */
    defaultOpen?: boolean;
  }>(),
  { currentPath: '/', idPrefix: 'sb', defaultOpen: false }
);

const emit = defineEmits<{ navigate: [] }>();

const context = computed(() => contextFromPath(props.currentPath));
const groups = computed(() => contextMenuGroups(context.value.id));
const kindLabel = computed(() => CONTEXT_KIND_LABELS[context.value.kind]);
// One sr-only string, so the accessible name has no stray spaces between inline spans
const accessibleName = computed(() => `Current context: ${context.value.name}, ${kindLabel.value}. Change region`);
const menuId = computed(() => `${props.idPrefix}-region-menu`);

const open = ref(false);
const root = ref<HTMLElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);
const panel = ref<HTMLElement | null>(null);

function items(): HTMLAnchorElement[] {
  return Array.from(panel.value?.querySelectorAll<HTMLAnchorElement>('a[data-menu-item]') ?? []);
}

async function show() {
  open.value = true;
  await nextTick();
  const list = items();
  (list.find((item) => item.getAttribute('aria-current') === 'true') ?? list[0])?.focus();
}

function hide(returnFocus = false) {
  open.value = false;
  if (returnFocus) button.value?.focus();
}

function toggle() {
  if (open.value) {
    // Return focus to the button: Safari does not focus a clicked button by itself
    hide(true);
  } else {
    void show();
  }
}

function onPanelKeydown(event: KeyboardEvent) {
  const list = items();
  const index = list.indexOf(document.activeElement as HTMLAnchorElement);
  let next: number | null = null;

  if (event.key === 'ArrowDown') next = (index + 1) % list.length;
  else if (event.key === 'ArrowUp') next = (index - 1 + list.length) % list.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = list.length - 1;

  if (next !== null) {
    event.preventDefault();
    list[next]?.focus();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !open.value) return;
  // preventDefault also tells an enclosing dialog (mobile sheet) to stay open
  event.preventDefault();
  hide(true);
}

// Tab out of the header or the menu closes it
function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  if (open.value && next && !root.value?.contains(next)) hide();
}

function onDocumentPointerDown(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) hide();
}

function onItemClick(item: ContextMenuItem) {
  hide();
  if (!item.external) emit('navigate');
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown);
  if (props.defaultOpen) void show();
});

onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown));
</script>

<template>
  <div ref="root" class="relative" @keydown="onKeydown" @focusout="onFocusOut">
    <button
      ref="button"
      type="button"
      class="flex w-full items-center justify-between gap-2 rounded-md bg-medium-bg px-3 py-2 text-left text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold"
      :aria-expanded="open"
      :aria-controls="menuId"
      :data-context="context.id"
      :data-context-kind="context.kind"
      @click="toggle"
    >
      <span class="sr-only">{{ accessibleName }}</span>
      <span class="min-w-0 truncate" aria-hidden="true" data-context-name>{{ context.name }}</span>
      <ChevronDown class="h-4 w-4 flex-none opacity-50" aria-hidden="true" />
    </button>

    <div
      :id="menuId"
      ref="panel"
      :hidden="!open"
      class="absolute inset-x-0 top-full z-30 mt-1 max-h-[min(520px,calc(100vh-180px))] overflow-auto overscroll-contain rounded-md border border-medium-bg bg-galaxy-dark p-1 text-white shadow-lg"
      @keydown="onPanelKeydown"
    >
      <template v-for="(group, groupIndex) in groups" :key="group.label">
        <p :id="`${idPrefix}-rm-g${groupIndex}`" class="px-2 pb-1 pt-2 text-xs font-medium text-chicago-300">
          {{ group.label }}
        </p>
        <ul class="m-0 list-none p-0" :aria-labelledby="`${idPrefix}-rm-g${groupIndex}`">
          <li v-for="item in group.items" :key="item.id">
            <a
              :href="item.href"
              data-menu-item
              :data-region="item.id"
              :aria-current="item.current ? 'true' : undefined"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-white no-underline hover:bg-medium-bg focus:bg-medium-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-galaxy-gold"
              @click="onItemClick(item)"
            >
              {{ item.name }}
              <svg
                v-if="item.external"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <Check v-if="item.current" class="ml-auto h-4 w-4" aria-hidden="true" />
              <span v-if="item.current" class="sr-only"> (current)</span>
              <span v-if="item.external" class="sr-only"> (external site, opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
