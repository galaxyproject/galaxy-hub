<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { onPopState, readParams, writeParams } from '@/utils/urlFilters';
import HubSearch from './HubSearch.vue';
import PanGalacticSearch from './PanGalacticSearch.vue';
import PublicationSearch from './PublicationSearch.vue';

// URL params, in this order: q, type (Hub Search content type), tab
const FILTER_PARAMS = { q: null, type: 'all', tab: 'hub' };
const TABS = ['hub', 'google', 'publications'];

const searchQuery = ref('');
const contentType = ref('all');
const activeTab = ref('hub');

function applyUrlParams() {
  const { q, type, tab } = readParams(FILTER_PARAMS);
  searchQuery.value = q ?? '';
  // HubSearch drops a type its index does not have, once the index has loaded
  contentType.value = type ?? 'all';
  activeTab.value = tab && TABS.includes(tab) ? tab : 'hub';
}

let stopPopState = () => {};

onMounted(() => {
  applyUrlParams();
  // Back/forward restores the query and tab from the URL
  stopPopState = onPopState(applyUrlParams);
});

onUnmounted(() => stopPopState());

watch([searchQuery, contentType, activeTab], ([q, type, tab]) => {
  writeParams({ q, type, tab }, { defaults: FILTER_PARAMS });
});

const tabClass =
  'min-h-11 h-auto flex-auto sm:min-h-0 sm:h-[calc(100%-1px)] sm:flex-1 data-[state=active]:bg-galaxy-primary data-[state=active]:text-white data-[state=active]:shadow-md';
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
      <!-- Below sm the tabs wrap inside the card, with 44px tall targets -->
      <TabsList class="mb-6 h-auto w-full flex-wrap bg-galaxy-dark/10 p-1 sm:h-9 sm:w-fit sm:flex-nowrap">
        <TabsTrigger value="hub" :class="tabClass">Hub Search</TabsTrigger>
        <TabsTrigger value="google" :class="tabClass">Pan-Galactic Search</TabsTrigger>
        <TabsTrigger value="publications" :class="tabClass">Publication Search</TabsTrigger>
      </TabsList>

      <TabsContent value="hub">
        <HubSearch v-model:type="contentType" :query="searchQuery" />
      </TabsContent>

      <TabsContent value="google" force-mount class="data-[state=inactive]:hidden">
        <PanGalacticSearch :query="searchQuery" :active="activeTab === 'google'" />
      </TabsContent>

      <TabsContent value="publications" force-mount class="data-[state=inactive]:hidden">
        <PublicationSearch :query="searchQuery" />
      </TabsContent>
    </Tabs>
  </div>
</template>
