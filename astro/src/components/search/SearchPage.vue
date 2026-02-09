<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HubSearch from './HubSearch.vue';
import PanGalacticSearch from './PanGalacticSearch.vue';
import PublicationSearch from './PublicationSearch.vue';

const searchQuery = ref('');
const activeTab = ref('hub');

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    searchQuery.value = q;
  }
  const tab = params.get('tab');
  if (tab && ['hub', 'google', 'publications'].includes(tab)) {
    activeTab.value = tab;
  }
});

watch(searchQuery, (query) => {
  const url = new URL(window.location.href);
  if (query) {
    url.searchParams.set('q', query);
  } else {
    url.searchParams.delete('q');
  }
  window.history.replaceState({}, '', url.toString());
});

watch(activeTab, (tab) => {
  const url = new URL(window.location.href);
  if (tab !== 'hub') {
    url.searchParams.set('tab', tab);
  } else {
    url.searchParams.delete('tab');
  }
  window.history.replaceState({}, '', url.toString());
});
</script>

<template>
  <div class="search-page">
    <!-- Shared search input -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <Input
        v-model="searchQuery"
        type="text"
        placeholder="Search articles, events, platforms..."
        class="w-full text-lg"
        autofocus
      />
    </div>

    <!-- Tabs -->
    <Tabs v-model="activeTab" default-value="hub">
      <TabsList class="mb-6">
        <TabsTrigger value="hub">Hub Search</TabsTrigger>
        <TabsTrigger value="google">Pan-Galactic Search</TabsTrigger>
        <TabsTrigger value="publications">Publication Search</TabsTrigger>
      </TabsList>

      <TabsContent value="hub">
        <HubSearch :query="searchQuery" />
      </TabsContent>

      <TabsContent value="google">
        <PanGalacticSearch :query="searchQuery" />
      </TabsContent>

      <TabsContent value="publications">
        <PublicationSearch :query="searchQuery" />
      </TabsContent>
    </Tabs>
  </div>
</template>
