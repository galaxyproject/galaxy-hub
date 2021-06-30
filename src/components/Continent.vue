<template>
  <g-image v-if="continent" class="continent float-right" :src="`/images/icons/${continent}.png`"/>
</template>

<script>
export default {
  props: ["continent"],
};
</script>


