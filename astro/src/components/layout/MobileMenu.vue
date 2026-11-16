<script setup lang="ts">
import { ref, computed } from 'vue';
import { type SubsiteId } from '@/stores/subsiteStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Menu } from '@lucide/vue';
import { type NavbarData, type SidebarNavigation } from '@/utils/navbar';
import { CONTEXT_KIND_LABELS, contextFromPath } from '@/utils/siteContext';
import ContextSwitcher from './ContextSwitcher.vue';
import SidebarNav from './SidebarNav.vue';

// Mobile navigation used when the subsite has no navbar data (global pages)
const DEFAULT_MOBILE_NAV: SidebarNavigation = {
  topLinks: [],
  sections: [
    {
      title: 'Use Galaxy',
      items: [
        { label: 'Get Started', href: '/get-started/', scope: 'global' },
        { label: 'Galaxy Servers', href: '/use/', scope: 'global' },
        { label: 'Training', href: 'https://training.galaxyproject.org', external: true, scope: 'global' },
        { label: 'Documentation', href: 'https://docs.galaxyproject.org', external: true, scope: 'global' },
      ],
    },
    {
      title: 'Community',
      items: [
        { label: 'News', href: '/news/', scope: 'global' },
        { label: 'Events', href: '/events/', scope: 'global' },
        { label: 'Search', href: '/search/', scope: 'global' },
        { label: 'Blog', href: '/blog/', scope: 'global' },
        { label: 'Get Involved', href: '/community/', scope: 'global' },
        { label: 'Hall of Fame', href: '/hall-of-fame/', scope: 'global' },
        { label: 'Support', href: '/support/', scope: 'global' },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'Galaxy Project', href: '/about/', scope: 'global' },
        { label: 'Team', href: '/community/team/', scope: 'global' },
        { label: 'Citing Galaxy', href: '/citing-galaxy/', scope: 'global' },
        { label: 'Statistics', href: '/galaxy-project/statistics/', scope: 'global' },
        { label: 'Careers', href: '/careers/', scope: 'global' },
      ],
    },
  ],
  bottomLinks: [],
};

const props = withDefaults(
  defineProps<{
    navbar?: NavbarData | null;
    initialSubsite?: SubsiteId;
    currentPath?: string;
  }>(),
  { navbar: null, initialSubsite: 'global', currentPath: '/' }
);

const isOpen = ref(false);
// True while the sheet was opened from the region chip: the region menu opens with it
const openedFromChip = ref(false);
const chip = ref<HTMLButtonElement | null>(null);

const context = computed(() => contextFromPath(props.currentPath));
const kindLabel = computed(() => CONTEXT_KIND_LABELS[context.value.kind].toLowerCase());

function openFromChip() {
  openedFromChip.value = true;
  isOpen.value = true;
}

function onOpenChange(open: boolean) {
  isOpen.value = open;
}

// The region menu takes focus itself when the chip opened the sheet
function onOpenAutoFocus(event: Event) {
  if (openedFromChip.value) event.preventDefault();
}

// Focus returns to the control that opened the sheet
function onCloseAutoFocus(event: Event) {
  if (openedFromChip.value) {
    event.preventDefault();
    chip.value?.focus();
  }
  openedFromChip.value = false;
}

function handleNavClick() {
  isOpen.value = false;
}
</script>

<template>
  <div class="flex min-w-0 flex-1 items-center gap-1.5">
    <button
      ref="chip"
      type="button"
      class="ml-1.5 inline-flex min-w-0 max-w-full items-center gap-1 rounded-md p-2 text-sm font-medium text-white hover:bg-medium-bg transition-colors focus-visible:outline-2 focus-visible:outline-galaxy-gold"
      aria-haspopup="dialog"
      :aria-expanded="isOpen && openedFromChip"
      :data-context="context.id"
      data-context-chip
      @click="openFromChip"
    >
      <span class="min-w-0 truncate">{{ context.shortName }}</span>
      <span class="sr-only"> — current context: {{ context.name }} ({{ kindLabel }}). Change region</span>
      <ChevronDown class="h-4 w-4 flex-none opacity-50" aria-hidden="true" />
    </button>
    <span class="flex-1" aria-hidden="true"></span>

    <Sheet :open="isOpen" @update:open="onOpenChange">
      <SheetTrigger as-child>
        <button
          class="lg:hidden p-2 text-white hover:bg-medium-bg rounded-md transition-colors"
          aria-label="Open menu"
          :aria-expanded="isOpen"
        >
          <Menu class="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        class="w-80 bg-galaxy-dark border-medium-bg p-0 overflow-hidden"
        data-testid="mobile-menu"
        role="dialog"
        @open-auto-focus="onOpenAutoFocus"
        @close-auto-focus="onCloseAutoFocus"
      >
        <SheetHeader class="px-4 py-3 border-b border-medium-bg flex-shrink-0">
          <SheetTitle class="text-white flex items-center gap-2">
            <img src="/images/galaxy_logo_hub_white.svg" alt="Galaxy" class="h-8" />
            Galaxy Hub
          </SheetTitle>
        </SheetHeader>

        <!-- Context header and region menu, pinned above the scrolling navigation -->
        <div class="relative z-10 flex-shrink-0 px-4 py-4 border-b border-medium-bg">
          <ContextSwitcher
            :current-path="currentPath"
            id-prefix="mm"
            :default-open="openedFromChip"
            @navigate="handleNavClick"
          />
        </div>

        <div class="flex-1 min-h-0 overflow-y-auto p-4">
          <SidebarNav
            :navbar="navbar"
            :initial-subsite="initialSubsite"
            :current-path="currentPath"
            :fallback="DEFAULT_MOBILE_NAV"
            id-prefix="mm"
            @navigate="handleNavClick"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
