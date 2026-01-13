<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { currentSubsite, subsites, setSubsite, type SubsiteId } from '@/stores/subsiteStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const current = useStore(currentSubsite);

function handleChange(value: string) {
  setSubsite(value as SubsiteId);
}
</script>

<template>
  <div class="px-3">
    <label class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block"> Region </label>
    <Select :model-value="current" @update:model-value="handleChange">
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
</template>
