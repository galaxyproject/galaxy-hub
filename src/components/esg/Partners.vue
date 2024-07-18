<template>
    <div class="card h-100 shadow-sm w-100">
        <h2 class="card-header mt-0">
            {{ title }}
        </h2>

        <div class="card-body">
            <a
                v-for="(partner, i) in partners"
                :key="i"
                class="partner-card"
                target="_blank"
                :href="partner.website"
                :title="partner.name"
            >
                <div class="image-container">
                    <g-image :src="partner.image" :alt="'Logo of ' + partner.name" />
                </div>
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
