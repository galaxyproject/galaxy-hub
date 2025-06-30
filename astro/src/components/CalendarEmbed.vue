<template>
  <div v-if="event" :id="containerId" class="calendar-embed eventzilla-embed"></div>
  <iframe
    v-else-if="googleCalendarId"
    :src="googleCalendarSrc"
    :style="{ border: 'solid 1px #777' }"
    :width="width"
    :height="height"
    frameborder="0"
    scrolling="no"
    class="calendar-embed google-calendar-embed"
  ></iframe>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  event: {
    type: String,
    default: ''
  },
  googleCalendarId: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: 300
  },
  timezone: {
    type: String,
    default: 'UTC'
  }
})

const containerId = computed(() => {
  return props.event ? `eventzilla-widget-container-a-${props.event}` : ''
})

const googleCalendarSrc = computed(() => {
  if (!props.googleCalendarId) return ''
  const baseUrl = 'https://calendar.google.com/calendar/embed'
  const params = new URLSearchParams({
    src: props.googleCalendarId,
    ctz: props.timezone
  })
  return `${baseUrl}?${params.toString()}`
})

function addEventzilla(eventId) {
  // Only add if not already added
  const existingScript = document.querySelector(`script[data-target-id="${eventId}"]`)
  if (existingScript) return

  const script = document.createElement('script')
  script.src = 'https://cdn.eventzilla.net/embed/js/ez_widgets.js'
  script.setAttribute('data-widget-type', 'eventzilla-evagenda-i')
  script.setAttribute('data-target-id', eventId)
  document.body.appendChild(script)
}

onMounted(() => {
  if (props.event) {
    addEventzilla(props.event)
    
    // Eventzilla listens for the load event, so we need to trigger it
    // after the script is loaded
    setTimeout(() => {
      window.dispatchEvent(new Event('load'))
    }, 2000)
  }
})
</script>

<style scoped>
.calendar-embed {
  margin: 1rem 0;
}

.google-calendar-embed {
  max-width: 100%;
}
</style>