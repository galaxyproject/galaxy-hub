<template>
    <div class="card h-100 shadow-sm w-100">
        <h2 class="card-header mt-0">
            {{ title }}
        </h2>

        <div class="card-body">
            <a
                v-for="(supporter, i) in supporters"
                :key="i"
                class="supporter-card"
                target="_blank"
                :href="supporter.website"
                :title="supporter.name"
            >
                <div class="image-container">
                    <g-image :src="supporter.image" :alt="'Logo of ' + supporter.name" />
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        supporters: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        pathPrefix: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss" scoped>
.card-body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
}

.supporter-card {
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
