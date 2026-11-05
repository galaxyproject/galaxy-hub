<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentPathname, type SubsiteId } from '@/stores/subsiteStore';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from '@lucide/vue';
import {
  getDefaultSidebarNavigation,
  groupSidebarNavigation,
  isCurrentPage,
  navbarToSidebarNavigation,
  type NavbarData,
  type SidebarLink,
  type SidebarNavigation,
} from '@/utils/navbar';
import { contextFromPath, projectLinks } from '@/utils/siteContext';

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
// The global group gets a visible heading only when a region or project group sits above it
const showGlobalHeading = computed(() => groups.value.region.length > 0 || projectGroup.value.length > 0);

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

const headingClass = 'px-3 pb-1 text-sm font-semibold text-white';
const linkClass =
  'flex items-center px-3 py-2 text-sm font-medium text-chicago-300 hover:bg-medium-bg hover:text-white rounded-md transition-colors';
const triggerClass =
  'flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-chicago-300 hover:bg-medium-bg hover:text-white rounded-md transition-colors';
const subLinkClass =
  'flex items-center px-3 py-1.5 text-sm text-chicago-400 hover:bg-medium-bg hover:text-white rounded-md transition-colors';
const bottomLinkClass =
  'flex items-center px-3 py-2 text-sm text-chicago-400 hover:bg-medium-bg hover:text-white rounded-md transition-colors';
</script>

<template>
  <nav ref="navRoot" class="space-y-2" aria-label="Main">
    <!-- Project group (project pages only) -->
    <div v-if="projectGroup.length > 0" role="group" :aria-labelledby="`${idPrefix}-ng-project`">
      <p :id="`${idPrefix}-ng-project`" :class="headingClass">{{ context.name }}</p>
      <ul class="space-y-1">
        <li v-for="link in projectGroup" :key="link.href">
          <a :href="link.href" :aria-current="current(link.href)" :class="linkClass" @click="onLinkClick(link)">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Region group (region pages only) -->
    <div v-if="groups.region.length > 0" role="group" :aria-labelledby="`${idPrefix}-ng-region`">
      <p :id="`${idPrefix}-ng-region`" :class="headingClass">{{ context.name }}</p>
      <ul class="space-y-1">
        <li v-for="link in groups.region" :key="link.href">
          <a :href="link.href" :aria-current="current(link.href)" :class="linkClass" @click="onLinkClick(link)">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Global group: no heading when it is the only group -->
    <div
      role="group"
      :aria-labelledby="showGlobalHeading ? `${idPrefix}-ng-global` : undefined"
      :aria-label="showGlobalHeading ? undefined : 'Galaxy Project'"
      :class="showGlobalHeading ? 'pt-4 border-t border-ebony-clay-700' : ''"
    >
      <p v-if="showGlobalHeading" :id="`${idPrefix}-ng-global`" :class="headingClass">Galaxy Project</p>
      <ul class="space-y-2">
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
                class="h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen(section.title) }"
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <CollapsibleContent class="pl-3 mt-1">
              <ul class="space-y-1">
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

    <!-- Bottom links (@jxtx Foundation) -->
    <ul v-if="groups.global.bottomLinks.length > 0" class="pt-4 border-t border-ebony-clay-700 space-y-1">
      <li v-for="link in groups.global.bottomLinks" :key="link.href">
        <a
          :href="link.href"
          :aria-current="current(link.href)"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :class="bottomLinkClass"
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
