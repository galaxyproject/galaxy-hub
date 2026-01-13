<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite } from '@/stores/subsiteStore';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-vue-next';
import SubsiteSwitcher from './SubsiteSwitcher.vue';

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

// Top-level links (not in collapsible sections)
const topLinks: NavItem[] = [
  { label: 'News', href: '/news/' },
  { label: 'Events', href: '/events/' },
];

// Navigation sections (matching galaxyproject.org structure)
const navSections: NavSection[] = [
  {
    title: 'Help',
    items: [
      { label: 'Get Started', href: '/get-started/' },
      { label: 'Training', href: '/learn/' },
      { label: 'FAQ', href: '/support/' },
      { label: 'Galaxy Help Forum', href: 'https://help.galaxyproject.org/', external: true },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'The Galaxy Community', href: '/community/' },
      { label: 'Governance', href: '/community/governance/' },
      { label: 'Special Interest Groups', href: '/community/sig/' },
      { label: 'Working Groups', href: '/community/wg/' },
      { label: 'How to Contribute', href: '/community/contributing/' },
      { label: 'Galaxy Mentor Network', href: 'https://galaxy-mentor-network.netlify.app/', external: true },
      { label: 'Code of Conduct', href: '/community/coc/' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Platforms', href: '/use/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Statistics', href: '/galaxy-project/statistics/' },
      { label: 'Mailing Lists', href: '/mailing-lists/' },
      { label: 'Publications', href: '/publication-library/' },
      { label: 'Citing Galaxy', href: '/citing-galaxy/' },
      { label: 'Branding', href: '/images/galaxy-logos/' },
      { label: 'Roadmap', href: '/roadmap/' },
    ],
  },
  {
    title: 'Applications',
    items: [
      { label: 'COVID-19', href: '/projects/covid19/' },
      { label: 'Monkeypox', href: '/projects/mpxv/' },
      { label: 'VGP', href: '/projects/vgp/' },
      { label: 'BRC Analytics', href: 'https://brc-analytics.org/', external: true },
    ],
  },
];

// Bottom links
const bottomLinks: NavItem[] = [{ label: '@jxtx Foundation', href: 'https://jxtxfoundation.org/', external: true }];

// Track which sections are open
const openSections = ref<Set<string>>(new Set());

// On mount, open the section containing the current page
onMounted(() => {
  const currentPath = window.location.pathname;
  for (const section of navSections) {
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
    <!-- Top-level links (News, Events) -->
    <div class="space-y-1">
      <a
        v-for="link in topLinks"
        :key="link.href"
        :href="buildHref(link.href, link.external)"
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
