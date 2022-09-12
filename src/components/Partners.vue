<template>
    <div class="card h-100 shadow-sm bg-light rounded border-0">
        <h2 class="card-header mt-0">
            {{ title }}
        </h2>

        <div class="card-body">
            <a v-for="partner in partners" class="partner-card" target="_blank" :href="partner.website">
                <div class="image-container">
                    <g-image :src="partner.image"/>
                </div>
                <h3>{{ partner.name }}</h3>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        partners: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        pathPrefix: String,
    },
};
</script>

<style lang="scss" scoped>
.card-body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
}

.partner-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .image-container {
        aspect-ratio: 1 / 1;
        display: grid;
        place-items: center;

        img {
            max-width: 100%;
        }
    }
}
</style>
