<script setup lang="ts">
interface Props {
  sites: Record<string, string>;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-wrap gap-4 mt-6 text-white/80 text-sm">
    <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/15">
      <span class="flex flex-wrap items-center gap-1">
        <template v-for="([id, label], index) in Object.entries(props.sites)" :key="id">
          <span v-if="index > 0">·</span>
          <a class="underline decoration-white/40 hover:decoration-galaxy-gold" :href="`#${id}`">
            {{ label }}
          </a>
        </template>
      </span>
    </div>
  </div>
</template>
