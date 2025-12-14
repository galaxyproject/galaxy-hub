<script setup lang="ts">
interface Supporter {
  name: string;
  logo?: string;
  url?: string;
  description?: string;
}

const props = defineProps<{
  supporters?: Supporter[];
  title?: string;
}>();
</script>

<template>
  <div class="supporters my-8">
    <h3 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div v-if="supporters && supporters.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="supporter in supporters"
        :key="supporter.name"
        class="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <a
          v-if="supporter.url"
          :href="supporter.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center text-center"
        >
          <img
            v-if="supporter.logo"
            :src="supporter.logo"
            :alt="supporter.name"
            class="max-h-16 w-auto mb-2 object-contain"
          />
          <span class="text-sm font-medium text-gray-900">{{ supporter.name }}</span>
          <span v-if="supporter.description" class="text-xs text-gray-500 mt-1">{{ supporter.description }}</span>
        </a>
        <template v-else>
          <img
            v-if="supporter.logo"
            :src="supporter.logo"
            :alt="supporter.name"
            class="max-h-16 w-auto mb-2 object-contain"
          />
          <span class="text-sm font-medium text-gray-900">{{ supporter.name }}</span>
          <span v-if="supporter.description" class="text-xs text-gray-500 mt-1">{{ supporter.description }}</span>
        </template>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-4">
      <slot>No supporters listed</slot>
    </div>
  </div>
</template>
