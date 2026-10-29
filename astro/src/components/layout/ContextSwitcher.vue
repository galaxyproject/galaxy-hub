<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { Check, ChevronsUpDown, ExternalLink, Globe, Layers, MapPin } from '@lucide/vue';
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
    hide();
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

function itemIcon(item: ContextMenuItem) {
  if (item.id === 'global' || item.external) return Globe;
  return MapPin;
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
      class="grid w-full min-h-14 grid-cols-[32px_1fr_auto] items-center gap-x-2.5 rounded-[0.625rem] border border-white/15 bg-ebony-clay-950 p-2.5 text-left text-white transition-colors hover:border-white/35 hover:bg-[#1b1f2b] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-galaxy-gold aria-expanded:border-white/35 aria-expanded:bg-[#1b1f2b]"
      :aria-expanded="open"
      :aria-controls="menuId"
      :data-context="context.id"
      :data-context-kind="context.kind"
      @click="toggle"
    >
      <span
        class="row-span-2 grid h-8 w-8 place-items-center rounded-md"
        :class="{
          'bg-galaxy-primary text-galaxy-gold': context.kind === 'region',
          'bg-galaxy-primary text-white': context.kind === 'global',
          'bg-ebony-clay-700 text-white': context.kind === 'project',
        }"
        aria-hidden="true"
      >
        <MapPin v-if="context.kind === 'region'" class="h-[18px] w-[18px]" />
        <Layers v-else-if="context.kind === 'project'" class="h-[18px] w-[18px]" />
        <Globe v-else class="h-[18px] w-[18px]" />
      </span>
      <span class="sr-only">Current context: </span>
      <span class="col-span-2 text-base font-bold leading-5 text-white [overflow-wrap:anywhere]" data-context-name>
        {{ context.name }}
      </span>
      <span
        class="mt-0.5 text-xs font-bold uppercase leading-4 tracking-[0.06em] text-ebony-clay-200"
        data-context-kind-label
      >
        <span class="sr-only">, </span>{{ kindLabel }}<span class="sr-only">. </span>
      </span>
      <span class="inline-flex items-center gap-0.5 justify-self-end text-xs font-bold leading-4 text-bay-of-many-300">
        Change<span class="sr-only"> region</span>
        <ChevronsUpDown class="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>

    <div
      :id="menuId"
      ref="panel"
      :hidden="!open"
      class="absolute inset-x-0 top-[calc(100%+6px)] z-30 max-h-[min(520px,calc(100vh-180px))] overflow-auto overscroll-contain rounded-[0.625rem] border border-galaxy-primary/15 bg-white p-2 text-galaxy-dark shadow-lg"
      @keydown="onPanelKeydown"
    >
      <p class="px-2 pb-1.5 pt-1 text-xs leading-4 text-galaxy-grey">
        Switch to another part of Galaxy. The page you land on becomes your context.
      </p>
      <template v-for="(group, groupIndex) in groups" :key="group.label">
        <p
          :id="`${idPrefix}-rm-g${groupIndex}`"
          class="px-2 pb-1 pt-2.5 text-xs font-bold uppercase leading-4 tracking-[0.06em] text-galaxy-grey"
        >
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
              class="grid min-h-11 lg:min-h-8 grid-cols-[16px_1fr_auto] items-center gap-x-2 rounded-md px-2 py-1.5 text-sm leading-5 text-galaxy-dark no-underline hover:bg-light-bg hover:text-bay-of-many-950 focus-visible:bg-light-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-galaxy-primary aria-[current=true]:bg-light-bg aria-[current=true]:font-bold"
              @click="onItemClick(item)"
            >
              <component :is="itemIcon(item)" class="h-4 w-4 text-galaxy-primary" aria-hidden="true" />
              <span class="min-w-0">{{ item.name }}</span>
              <Check v-if="item.current" class="row-span-2 h-4 w-4 text-galaxy-primary" aria-hidden="true" />
              <ExternalLink v-else-if="item.external" class="row-span-2 h-3 w-3" aria-hidden="true" />
              <span class="col-start-2 text-xs font-normal leading-4 text-galaxy-grey [overflow-wrap:anywhere]">
                {{ item.meta }}
              </span>
              <span v-if="item.current" class="sr-only"> (current)</span>
              <span v-if="item.external" class="sr-only"> (external site, opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
