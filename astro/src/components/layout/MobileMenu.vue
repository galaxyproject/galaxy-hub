<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentSubsite, subsites, setSubsite, type SubsiteId } from '@/stores/subsiteStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Menu, X } from 'lucide-vue-next';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const isOpen = ref(false);
const subsite = useStore(currentSubsite);

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

const openSections = ref<Set<string>>(new Set(['Use Galaxy', 'Community']));

function toggleSection(title: string) {
  if (openSections.value.has(title)) {
    openSections.value.delete(title);
  } else {
    openSections.value.add(title);
  }
  openSections.value = new Set(openSections.value);
}

function isSectionOpen(title: string): boolean {
  return openSections.value.has(title);
}

function buildHref(href: string, external?: boolean): string {
  if (external || href.startsWith('http')) {
    return href;
  }

  const currentSub = subsite.value;
  if (currentSub && currentSub !== 'global') {
    const subsitePaths = ['/news/', '/events/', '/community/'];
    for (const path of subsitePaths) {
      if (href.startsWith(path)) {
        return `/${currentSub}${href}`;
      }
    }
  }

  return href;
}

function handleSubsiteChange(value: string) {
  setSubsite(value as SubsiteId);
}

function handleNavClick() {
  isOpen.value = false;
}
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child>
      <button class="lg:hidden p-2 text-white hover:bg-medium-bg rounded-md transition-colors" aria-label="Open menu">
        <Menu class="h-6 w-6" />
      </button>
    </SheetTrigger>
    <SheetContent side="left" class="w-80 bg-galaxy-dark border-medium-bg p-0">
      <SheetHeader class="px-4 py-3 border-b border-medium-bg">
        <SheetTitle class="text-white flex items-center gap-2">
          <img src="/galaxy-logo.svg" alt="Galaxy" class="h-8" />
          Galaxy Hub
        </SheetTitle>
      </SheetHeader>

      <div class="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
        <!-- Region Switcher -->
        <div class="px-4 py-4 border-b border-medium-bg">
          <label class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block"> Region </label>
          <Select :model-value="subsite" @update:model-value="handleSubsiteChange">
            <SelectTrigger class="w-full bg-medium-bg border-0 text-white">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent class="bg-galaxy-dark border-medium-bg">
              <SelectItem
                v-for="site in subsites"
                :key="site.id"
                :value="site.id"
                class="text-white hover:bg-medium-bg focus:bg-medium-bg"
              >
                <span class="flex items-center gap-2">
                  {{ site.name }}
                  <svg
                    v-if="'external' in site && site.external"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 opacity-50"
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
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-2">
          <div v-for="section in navSections" :key="section.title">
            <Collapsible :open="isSectionOpen(section.title)" @update:open="toggleSection(section.title)">
              <CollapsibleTrigger
                class="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 hover:bg-medium-bg hover:text-white rounded-md transition-colors"
              >
                {{ section.title }}
                <ChevronDown
                  class="h-4 w-4 transition-transform duration-200"
                  :class="{ 'rotate-180': isSectionOpen(section.title) }"
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
                  @click="!item.external && handleNavClick()"
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
      </div>
    </SheetContent>
  </Sheet>
</template>
