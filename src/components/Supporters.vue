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
.card {
    max-width: calc(120px * 4);
    margin: auto;
}

.card-body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    justify-content: center;
    padding: 5px;
}

.supporter-card {
    flex-direction: column;
    align-items: center;

    .image-container {
        height: 100px;
        display: grid;
        place-items: center;

        img {
            max-width: 100%;
            max-height: 100px;
            object-fit: contain;
        }
    }
}
</style>
