<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite } from '@/stores/subsiteStore';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-vue-next';

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

// Navigation sections
const navSections: NavSection[] = [
  {
    title: 'Use Galaxy',
    items: [
      { label: 'Get Started', href: '/get-started/' },
      { label: 'Galaxy Servers', href: '/use/' },
      { label: 'Training', href: 'https://training.galaxyproject.org', external: true },
      { label: 'Documentation', href: 'https://docs.galaxyproject.org', external: true },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'News', href: '/news/' },
      { label: 'Events', href: '/events/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Get Involved', href: '/community/' },
      { label: 'Support', href: '/support/' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Galaxy Project', href: '/about/' },
      { label: 'Team', href: '/community/team/' },
      { label: 'Citing Galaxy', href: '/citing-galaxy/' },
      { label: 'Statistics', href: '/galaxy-project/statistics/' },
      { label: 'Careers', href: '/careers/' },
    ],
  },
];

// Track which sections are open
const openSections = ref<Set<string>>(new Set(['Use Galaxy', 'Community']));

function toggleSection(title: string) {
  if (openSections.value.has(title)) {
    openSections.value.delete(title);
  } else {
    openSections.value.add(title);
  }
  // Trigger reactivity
  openSections.value = new Set(openSections.value);
}

function isOpen(title: string): boolean {
  return openSections.value.has(title);
}

// Build href with subsite prefix if needed
function buildHref(href: string, external?: boolean): string {
  if (external || href.startsWith('http')) {
    return href;
  }

  const currentSub = subsite.value;
  if (currentSub && currentSub !== 'global') {
    // Check if this path should be prefixed
    const subsitePaths = ['/news/', '/events/', '/community/'];
    for (const path of subsitePaths) {
      if (href.startsWith(path)) {
        return `/${currentSub}${href}`;
      }
    }
  }

  return href;
}
</script>

<template>
  <nav class="space-y-2">
    <div v-for="section in navSections" :key="section.title">
      <Collapsible :open="isOpen(section.title)" @update:open="toggleSection(section.title)">
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
            :href="buildHref(item.href, item.external)"
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
  </nav>
</template>
