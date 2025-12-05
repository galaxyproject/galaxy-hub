<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src?: string;
  calendarId?: string;
  googleCalendarId?: string;
}>();

const embedUrl = computed(() => {
  if (props.src) return props.src;

  const calId = props.googleCalendarId || props.calendarId;
  if (calId) {
    // Google Calendar embed URL
    const encodedId = encodeURIComponent(calId);
    return `https://calendar.google.com/calendar/embed?src=${encodedId}&ctz=America%2FNew_York&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&mode=AGENDA`;
  }

  return '';
});
</script>

<template>
  <div class="calendar-embed my-6">
    <div v-if="embedUrl" class="rounded-lg overflow-hidden shadow-lg">
      <iframe
        :src="embedUrl"
        class="w-full h-[600px] border-0"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
    <div v-else class="p-4 bg-gray-100 rounded-lg text-center">
      <p class="text-gray-600">No calendar specified</p>
    </div>
  </div>
</template>
