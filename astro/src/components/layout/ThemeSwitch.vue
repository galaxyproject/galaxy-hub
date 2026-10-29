<script setup lang="ts">
// System / Light / Dark switch for the dark chrome (sidebar footer, mobile menu). Native radios,
// so Tab reaches the group and the arrow keys move the choice; see src/utils/theme.ts.
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Monitor, Moon, Sun } from '@lucide/vue';
import { THEME_CHANGE_EVENT, readThemeMode, setThemeMode, type ThemeMode } from '@/utils/theme';

const props = withDefaults(
  defineProps<{
    /** Prefix for ids and the radio name, so two switches on one page stay separate groups. */
    idPrefix?: string;
    /** 40px targets for touch (mobile menu); 28px in the desktop sidebar. */
    touch?: boolean;
  }>(),
  { idPrefix: 'sb', touch: false }
);

const OPTIONS = [
  { value: 'system', label: 'System', title: 'Follow the system setting', icon: Monitor },
  { value: 'light', label: 'Light', title: 'Light theme', icon: Sun },
  { value: 'dark', label: 'Dark', title: 'Dark theme', icon: Moon },
] as const;

const optionClass = [
  'flex flex-1 cursor-pointer items-center justify-center gap-1 rounded px-1.5 py-1',
  'text-xs font-bold leading-4 text-chicago-200 hover:bg-white/10 hover:text-white',
  'peer-checked:bg-medium-bg peer-checked:text-white',
  'peer-checked:shadow-[inset_0_-2px_0_var(--color-galaxy-gold)]',
  'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-galaxy-gold',
];

// Unset until mounted, so the server HTML checks no radio. During a view-transition swap the new
// page's sidebar briefly shares the radio name with the persisted one, and a checked radio there
// would uncheck the persisted choice.
const mode = ref<ThemeMode | null>(null);

function onThemeChange(event: Event) {
  mode.value = (event as CustomEvent<ThemeMode>).detail;
}

onMounted(() => {
  mode.value = readThemeMode();
  document.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
});

onBeforeUnmount(() => {
  document.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
});
</script>

<template>
  <div class="flex items-center" role="radiogroup" :aria-labelledby="`${props.idPrefix}-theme-label`" data-theme-switch>
    <span :id="`${props.idPrefix}-theme-label`" class="sr-only">Theme</span>
    <!-- A ring, not .border: bootstrap-compat.css styles .border globally with a light grey -->
    <span class="flex flex-1 gap-0.5 rounded-md bg-black/20 p-0.5 ring-1 ring-inset ring-white/10">
      <span v-for="option in OPTIONS" :key="option.value" class="relative flex flex-1">
        <input
          :id="`${props.idPrefix}-theme-${option.value}`"
          class="peer sr-only"
          type="radio"
          :name="`${props.idPrefix}-theme`"
          :value="option.value"
          :checked="mode === option.value"
          @change="setThemeMode(option.value)"
        />
        <label
          :for="`${props.idPrefix}-theme-${option.value}`"
          :title="option.title"
          :class="[optionClass, props.touch ? 'min-h-10' : 'min-h-7']"
        >
          <component :is="option.icon" class="size-3.5 flex-none" aria-hidden="true" />
          <span>{{ option.label }}</span>
        </label>
      </span>
    </span>
  </div>
</template>
