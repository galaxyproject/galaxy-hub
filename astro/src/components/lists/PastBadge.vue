<script setup lang="ts">
/**
 * "Past" status badge for event rows; same markup and styles as PastBadge.astro.
 */
import { Clock } from '@lucide/vue';
import './list-rows.css';
</script>

<template>
  <span class="gx-badge-past">
    <span class="gx-badge-past__icon" aria-hidden="true"><Clock :size="12" /></span>
    Past
  </span>
</template>
