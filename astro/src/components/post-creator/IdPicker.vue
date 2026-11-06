<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { Check, X } from '@lucide/vue';
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxViewport,
} from 'reka-ui';
import { focusRing, hintClass, labelClass } from './styles';

export interface PickerOption {
  id: string;
  name: string;
}

const props = defineProps<{
  label: string;
  options: PickerOption[];
  placeholder?: string;
}>();

const model = defineModel<string[]>({ required: true });

const inputId = useId();
const hintId = useId();
const search = ref('');

// shortcut: show the first 50 matches; type more to narrow down 700+ contributors
const LIMIT = 50;

const labels = computed(() => new Map(props.options.map((o) => [o.id, o.name])));

const matches = computed(() => {
  const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = words.length
    ? props.options.filter((o) => words.every((word) => `${o.name} ${o.id}`.toLowerCase().includes(word)))
    : props.options;
  return hits.slice(0, LIMIT);
});

// Unknown values are allowed: a first-time author is not in CONTRIBUTORS.yaml yet. PostCreator lists them.
const typed = computed(() => search.value.trim());
const isKnown = computed(() =>
  props.options.some((o) => [o.id, o.name].some((v) => v.toLowerCase() === typed.value.toLowerCase()))
);

function remove(id: string) {
  model.value = model.value.filter((value) => value !== id);
}

const item =
  'flex cursor-default items-center justify-between gap-3 rounded px-2 py-1.5 text-sm text-fg outline-none select-none data-[highlighted]:bg-ebony-clay-100';
</script>

<template>
  <div>
    <label :for="inputId" :class="labelClass">{{ label }}</label>
    <ComboboxRoot v-model="model" multiple ignore-filter open-on-click>
      <ComboboxAnchor
        class="flex h-10 w-full items-center rounded-md border border-chicago-400 bg-transparent px-3 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-galaxy-primary focus-within:outline-solid"
      >
        <ComboboxInput
          :id="inputId"
          v-model="search"
          :placeholder="placeholder"
          :aria-describedby="hintId"
          class="h-full w-full bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
        />
      </ComboboxAnchor>
      <ComboboxPortal>
        <ComboboxContent
          position="popper"
          :side-offset="4"
          class="z-50 w-[var(--reka-combobox-trigger-width)] rounded-md border border-line bg-white shadow-md"
        >
          <ComboboxViewport class="max-h-72 overflow-y-auto p-1">
            <ComboboxItem v-for="option in matches" :key="option.id" :value="option.id" :class="item">
              <span class="min-w-0 truncate">
                {{ option.name }}
                <span v-if="option.name !== option.id" class="text-fg-meta">({{ option.id }})</span>
              </span>
              <ComboboxItemIndicator><Check class="size-4" aria-hidden="true" /></ComboboxItemIndicator>
            </ComboboxItem>
            <ComboboxItem v-if="typed && !isKnown" :value="typed" :class="item">
              <span>Add “{{ typed }}” as new</span>
            </ComboboxItem>
            <p v-if="!matches.length && !typed" class="px-2 py-1.5 text-sm text-fg-meta">Nothing to show.</p>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
    <p :id="hintId" :class="hintClass"><slot name="hint" /></p>
    <ul v-if="model.length" class="mt-2 flex flex-wrap gap-2" :aria-label="`Selected: ${label}`">
      <li
        v-for="id in model"
        :key="id"
        class="inline-flex items-center gap-1 rounded-md border border-galaxy-primary/30 py-1 pr-1 pl-2.5 text-sm font-medium text-galaxy-dark"
      >
        <span v-if="!labels.has(id)">{{ id }} <span class="text-warn-fg">(new)</span></span>
        <span v-else>{{ labels.get(id) !== id ? `${labels.get(id)} (${id})` : id }}</span>
        <button
          type="button"
          class="inline-flex size-6 items-center justify-center rounded hover:bg-ebony-clay-100"
          :class="focusRing"
          :aria-label="`Remove ${labels.get(id) ?? id}`"
          @click="remove(id)"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </li>
    </ul>
  </div>
</template>
