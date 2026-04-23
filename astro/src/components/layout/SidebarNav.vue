<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite } from '@/stores/subsiteStore';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-vue-next';
import SubsiteSwitcher from './SubsiteSwitcher.vue';
import {
  getDefaultSidebarNavigation,
  navbarToSidebarNavigation,
  type NavbarData,
  type SidebarNavigation,
} from '@/utils/navbar';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const subsite = useStore(currentSubsite);

const props = defineProps<{
  navbar?: NavbarData | null;
}>();

const navModel = computed<SidebarNavigation>(
  () => navbarToSidebarNavigation(props.navbar, subsite.value) || getDefaultSidebarNavigation()
);
const topLinks = computed<NavItem[]>(() => navModel.value.topLinks);
const navSections = computed<NavSection[]>(() => navModel.value.sections);
const bottomLinks = computed<NavItem[]>(() => navModel.value.bottomLinks);

// Track which sections are open
const openSections = ref<Set<string>>(new Set());

// On mount, open the section containing the current page
onMounted(() => {
  const currentPath = window.location.pathname;
  for (const section of navSections.value) {
    for (const item of section.items) {
      // Check if current path starts with this item's href (for nested pages)
      if (currentPath.startsWith(item.href) || currentPath === item.href) {
        openSections.value.add(section.title);
        break;
      }
    }
  }
});

function setSection(title: string, open: boolean) {
  if (open) {
    openSections.value.add(title);
  } else {
    openSections.value.delete(title);
  }
  // Trigger reactivity
  openSections.value = new Set(openSections.value);
}

function isOpen(title: string): boolean {
  return openSections.value.has(title);
}
</script>

<template>
  <nav class="space-y-2">
    <!-- Top-level links (News, Events) -->
    <div class="space-y-1">
      <a
        v-for="link in topLinks"
        :key="link.href"
        :href="link.href"
        class="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-medium-bg hover:text-white rounded-md transition-colors"
      >
        {{ link.label }}
      </a>
    </div>

    <!-- Collapsible sections -->
    <div v-for="section in navSections" :key="section.title">
      <Collapsible :open="isOpen(section.title)" @update:open="(open) => setSection(section.title, open)">
        <CollapsibleTrigger
          class="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 hover:bg-medium-bg hover:text-white rounded-md transition-colors"
        >
          {{ section.title }}
          <ChevronDown
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen(section.title) }"
          />
        </CollapsibleTrigger>
        <CollapsibleContent class="pl-3 space-y-1 mt-1">
          <a
            v-for="item in section.items"
            :key="item.href"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            class="flex items-center px-3 py-1.5 text-sm text-gray-400 hover:bg-medium-bg hover:text-white rounded-md transition-colors"
          >
            {{ item.label }}
            <svg
              v-if="item.external"
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 ml-1 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </CollapsibleContent>
      </Collapsible>
    </div>

    <!-- Region Selector -->
    <div class="pt-4 border-t border-gray-700">
      <SubsiteSwitcher />
    </div>

    <!-- Bottom links (@jxtx Foundation) -->
    <div class="pt-4 border-t border-gray-700 space-y-1">
      <a
        v-for="link in bottomLinks"
        :key="link.href"
        :href="link.href"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noopener noreferrer' : undefined"
        class="flex items-center px-3 py-2 text-sm text-gray-400 hover:bg-medium-bg hover:text-white rounded-md transition-colors"
      >
        {{ link.label }}
        <svg
          v-if="link.external"
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 ml-1 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  </nav>
</template>
