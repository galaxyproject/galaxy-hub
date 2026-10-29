<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentPathname, type SubsiteId } from '@/stores/subsiteStore';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Globe, Layers, MapPin } from '@lucide/vue';
import SubsiteSwitcher from './SubsiteSwitcher.vue';
import {
  getDefaultSidebarNavigation,
  groupSidebarNavigation,
  isCurrentPage,
  navbarToSidebarNavigation,
  type NavbarData,
  type SidebarLink,
  type SidebarNavigation,
} from '@/utils/navbar';
import { CONTEXT_KIND_LABELS, contextFromPath, projectLinks } from '@/utils/siteContext';

const props = withDefaults(
  defineProps<{
    navbar?: NavbarData | null;
    initialSubsite?: SubsiteId;
    currentPath?: string;
    /** Navigation used when the subsite has no navbar data. */
    fallback?: SidebarNavigation;
    /** Prefix for element ids, so two copies on one page do not collide. */
    idPrefix?: string;
  }>(),
  { navbar: null, initialSubsite: 'global', currentPath: '/', fallback: undefined, idPrefix: 'sb' }
);

const emit = defineEmits<{ navigate: [] }>();

// The sidebar persists only while the context stays the same (BaseLayout), so the subsite and navbar
// props stay right; after mount the pathname comes from the store so aria-current follows navigation.
const $pathname = useStore(currentPathname);
const hasMounted = ref(false);
const pathname = computed(() => (hasMounted.value ? $pathname.value : props.currentPath));

const context = computed(() => contextFromPath(props.currentPath));
const navModel = computed<SidebarNavigation>(
  () => navbarToSidebarNavigation(props.navbar, props.initialSubsite) || props.fallback || getDefaultSidebarNavigation()
);
const groups = computed(() => groupSidebarNavigation(navModel.value, props.initialSubsite));
const projectGroup = computed<SidebarLink[]>(() =>
  projectLinks(context.value.id).map((link) => ({ ...link, scope: 'global' }))
);

const navRoot = ref<HTMLElement | null>(null);
const openSections = ref<Set<string>>(new Set());

function openSectionOf(path: string) {
  for (const section of groups.value.global.sections) {
    if (section.items.some((item) => item.href.startsWith('/') && path.startsWith(item.href))) {
      setSection(section.title, true);
    }
  }
}

// On mount, open the section containing the current page and bring the active link into view
onMounted(async () => {
  hasMounted.value = true;
  openSectionOf(pathname.value);
  await nextTick();
  navRoot.value?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
});

watch(pathname, (path) => openSectionOf(path));

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

function current(href: string) {
  return isCurrentPage(href, pathname.value) ? 'page' : undefined;
}

function onLinkClick(link: SidebarLink) {
  if (!link.external) emit('navigate');
}

// Chrome colours from prototype A (NOTES "Contrast"): text ebony-clay-50, sub-items 100, labels 200,
// hover white/7, active white/12 with a gold bar, focus gold. Rows are 44px in the mobile sheet, 32px on desktop.
const itemBase =
  'relative flex w-full min-h-11 lg:min-h-8 items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-galaxy-gold';
const activeLink =
  "aria-[current=page]:bg-white/[0.12] aria-[current=page]:font-bold aria-[current=page]:text-white aria-[current=page]:before:absolute aria-[current=page]:before:inset-y-[7px] aria-[current=page]:before:left-[3px] aria-[current=page]:before:w-[3px] aria-[current=page]:before:rounded-sm aria-[current=page]:before:bg-galaxy-gold aria-[current=page]:before:content-['']";
const linkClass = `${itemBase} ${activeLink} text-ebony-clay-50`;
const subLinkClass = `${itemBase} ${activeLink} text-ebony-clay-100`;
const triggerClass = `${itemBase} justify-between text-ebony-clay-50`;
const labelClass =
  'mb-1 flex items-center gap-1.5 whitespace-nowrap px-2 text-xs font-bold uppercase tracking-[0.06em] text-ebony-clay-200';
const tagClass =
  'ml-auto flex-none rounded-full border border-white/35 px-1.5 text-[0.6875rem] font-bold normal-case leading-4 tracking-[0.04em] text-ebony-clay-100';
</script>

<template>
  <nav ref="navRoot" class="flex flex-col gap-4" aria-label="Main">
    <!-- Project group (project pages only) -->
    <div v-if="projectGroup.length > 0" role="group" :aria-labelledby="`${idPrefix}-ng-project`">
      <p :id="`${idPrefix}-ng-project`" :class="labelClass">
        <Layers class="h-3.5 w-3.5 flex-none" aria-hidden="true" />
        <span class="min-w-0 truncate">{{ context.name }}</span>
        <span :class="tagClass">{{ CONTEXT_KIND_LABELS.project }}</span>
      </p>
      <ul class="flex flex-col gap-0.5">
        <li v-for="link in projectGroup" :key="link.href">
          <a :href="link.href" :aria-current="current(link.href)" :class="linkClass" @click="onLinkClick(link)">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Region group (region pages only) -->
    <div v-if="groups.region.length > 0" role="group" :aria-labelledby="`${idPrefix}-ng-region`">
      <p :id="`${idPrefix}-ng-region`" :class="labelClass">
        <MapPin class="h-3.5 w-3.5 flex-none text-galaxy-gold" aria-hidden="true" />
        <span class="min-w-0 truncate">{{ context.name }}</span>
        <span :class="tagClass">{{ CONTEXT_KIND_LABELS.region }}</span>
      </p>
      <ul class="flex flex-col gap-0.5">
        <li v-for="link in groups.region" :key="link.href">
          <a :href="link.href" :aria-current="current(link.href)" :class="linkClass" @click="onLinkClick(link)">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Global group -->
    <div
      role="group"
      :aria-labelledby="`${idPrefix}-ng-global`"
      :class="groups.region.length > 0 || projectGroup.length > 0 ? 'border-t border-white/[0.08] pt-4' : ''"
    >
      <p :id="`${idPrefix}-ng-global`" :class="labelClass">
        <Globe class="h-3.5 w-3.5 flex-none" aria-hidden="true" />
        <span class="min-w-0 truncate">Galaxy Project</span>
        <span :class="tagClass">{{ CONTEXT_KIND_LABELS.global }}</span>
      </p>
      <ul class="flex flex-col gap-0.5">
        <li v-for="link in groups.global.topLinks" :key="link.href">
          <a
            :href="link.href"
            :aria-current="current(link.href)"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            :class="linkClass"
            @click="onLinkClick(link)"
          >
            {{ link.label }}
          </a>
        </li>

        <!-- Collapsible sections -->
        <li v-for="section in groups.global.sections" :key="section.title">
          <Collapsible :open="isOpen(section.title)" @update:open="(open) => setSection(section.title, open)">
            <CollapsibleTrigger :class="triggerClass">
              {{ section.title }}
              <ChevronDown
                class="h-4 w-4 text-ebony-clay-200 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen(section.title) }"
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <CollapsibleContent class="mb-1.5 ml-3 mt-0.5 border-l border-white/15 pl-2">
              <ul class="flex flex-col gap-0.5">
                <li v-for="item in section.items" :key="item.href">
                  <a
                    :href="item.href"
                    :aria-current="current(item.href)"
                    :target="item.external ? '_blank' : undefined"
                    :rel="item.external ? 'noopener noreferrer' : undefined"
                    :class="subLinkClass"
                    @click="onLinkClick(item)"
                  >
                    {{ item.label }}
                    <svg
                      v-if="item.external"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1 opacity-50"
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
                  </a>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </li>
      </ul>
    </div>

    <!-- Region Selector -->
    <div class="pt-4 border-t border-ebony-clay-700">
      <SubsiteSwitcher :initial-subsite="initialSubsite" />
    </div>

    <!-- Bottom links (@jxtx Foundation) -->
    <ul v-if="groups.global.bottomLinks.length > 0" class="flex flex-col gap-0.5 border-t border-white/[0.08] pt-4">
      <li v-for="link in groups.global.bottomLinks" :key="link.href">
        <a
          :href="link.href"
          :aria-current="current(link.href)"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :class="subLinkClass"
          @click="onLinkClick(link)"
        >
          {{ link.label }}
          <svg
            v-if="link.external"
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 ml-1 opacity-50"
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
        </a>
      </li>
    </ul>
  </nav>
</template>
