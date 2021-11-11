<template>
    <div class="alert alert-info float-right text-center">
        <p v-for="(link, i) in links" :key="link.id || i">
            <g-link :to="link.url">
                <span :class="link.bold ? 'bold' : ''">
                    {{ link.title }}
                </span>
            </g-link>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        links: { type: Array, required: true },
    },
};
</script>

<style scoped>
p {
    margin-bottom: 0;
}
.bold {
    font-weight: bold;
}
</style>
