<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { onPopState, readParams, writeParams } from '@/utils/urlFilters';
import HubSearch from './HubSearch.vue';
import PanGalacticSearch from './PanGalacticSearch.vue';
import PublicationSearch from './PublicationSearch.vue';

const FILTER_PARAMS = { q: null, tab: 'hub' };
const TABS = ['hub', 'google', 'publications'];

const searchQuery = ref('');
const activeTab = ref('hub');

function applyUrlParams() {
  const { q, tab } = readParams(FILTER_PARAMS);
  searchQuery.value = q ?? '';
  activeTab.value = tab && TABS.includes(tab) ? tab : 'hub';
}

let stopPopState = () => {};

onMounted(() => {
  applyUrlParams();
  // Back/forward restores the query and tab from the URL
  stopPopState = onPopState(applyUrlParams);
});

onUnmounted(() => stopPopState());

watch([searchQuery, activeTab], ([q, tab]) => {
  writeParams({ q, tab }, { defaults: FILTER_PARAMS });
});
</script>

<template>
  <div class="search-page">
    <!-- Shared search input -->
    <div class="mb-6">
      <Input
        v-model="searchQuery"
        type="text"
        placeholder="Search articles, events, platforms..."
        class="w-full text-lg"
        aria-keyshortcuts="Meta+K Control+K"
        data-search-shortcut="page"
        autofocus
      />
    </div>

    <!-- Tabs -->
    <Tabs v-model="activeTab" default-value="hub">
      <TabsList class="mb-6 bg-galaxy-dark/10 p-1">
        <TabsTrigger
          value="hub"
          class="data-[state=active]:bg-galaxy-primary data-[state=active]:text-white data-[state=active]:shadow-md"
        >
          Hub Search
        </TabsTrigger>
        <TabsTrigger
          value="google"
          class="data-[state=active]:bg-galaxy-primary data-[state=active]:text-white data-[state=active]:shadow-md"
        >
          Pan-Galactic Search
        </TabsTrigger>
        <TabsTrigger
          value="publications"
          class="data-[state=active]:bg-galaxy-primary data-[state=active]:text-white data-[state=active]:shadow-md"
        >
          Publication Search
        </TabsTrigger>
      </TabsList>

      <TabsContent value="hub">
        <HubSearch :query="searchQuery" />
      </TabsContent>

      <TabsContent value="google" force-mount class="data-[state=inactive]:hidden">
        <PanGalacticSearch :query="searchQuery" />
      </TabsContent>

      <TabsContent value="publications" force-mount class="data-[state=inactive]:hidden">
        <PublicationSearch :query="searchQuery" />
      </TabsContent>
    </Tabs>
  </div>
</template>
