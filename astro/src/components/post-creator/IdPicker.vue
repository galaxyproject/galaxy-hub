<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { X } from '@lucide/vue';
import { Input } from '@/components/ui/input';
import { focusRing, inputClass, labelClass, hintClass } from './styles';

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
const listId = useId();
const hintId = useId();
const draft = ref('');

const byKey = computed(() => {
  const map = new Map<string, PickerOption>();
  for (const option of props.options) {
    map.set(option.name.toLowerCase(), option);
    map.set(option.id.toLowerCase(), option);
  }
  return map;
});

const labels = computed(() => new Map(props.options.map((o) => [o.id, o.name])));

function add() {
  const text = draft.value.trim();
  if (!text) return;
  // Unknown values are kept: a first-time author is not in CONTRIBUTORS.yaml yet. PostCreator lists them.
  const value = byKey.value.get(text.toLowerCase())?.id ?? text;
  if (!model.value.includes(value)) model.value = [...model.value, value];
  draft.value = '';
}

// A datalist pick fires `input` with the full value and no keystroke; add it right away
function onInput(event: Event) {
  if (!(event instanceof InputEvent) || event.inputType === 'insertReplacementText') {
    if (byKey.value.has(draft.value.trim().toLowerCase())) add();
  }
}

// Leaving the box keeps a typed known value; unknown text stays for the author to confirm with Enter
function onBlur() {
  if (byKey.value.has(draft.value.trim().toLowerCase())) add();
}

function remove(id: string) {
  model.value = model.value.filter((value) => value !== id);
}
</script>

<template>
  <div>
    <label :for="inputId" :class="labelClass">{{ label }}</label>
    <Input
      :id="inputId"
      v-model="draft"
      :list="listId"
      :placeholder="placeholder"
      autocomplete="off"
      :aria-describedby="hintId"
      :class="[inputClass, focusRing]"
      @input="onInput"
      @keydown.enter.prevent="add"
      @blur="onBlur"
    />
    <datalist :id="listId">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name === option.id ? '' : option.name }}
      </option>
    </datalist>
    <p :id="hintId" :class="hintClass">Press Enter to add. <slot name="hint" /></p>
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
