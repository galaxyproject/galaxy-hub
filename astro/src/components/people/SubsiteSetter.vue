<script setup lang="ts">
import { onMounted } from 'vue';
import { currentSubsite, type SubsiteId } from '@/stores/subsiteStore';

interface Props {
  subsiteId: SubsiteId;
}

const props = defineProps<Props>();

onMounted(() => {
  currentSubsite.set(props.subsiteId);
});
</script>

<template>
  <span class="hidden" aria-hidden="true"></span>
</template>
