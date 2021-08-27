<template>
    <g-image v-if="continent" class="continent float-right" :src="`/images/icons/${continent}.png`" />
</template>

<script>
export default {
    props: {
        continent: { type: String, required: true },
    },
};
</script>

<style scoped>
.continent {
    margin-left: 0;
    margin-bottom: 0;
}
</style>
