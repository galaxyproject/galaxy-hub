<template>
    <footer :class="article.category"></footer>
</template>

<script>
export default {
    props: {
        article: { type: Object, required: true },
    },
};
</script>

<style scoped>
footer {
    font-size: 100%;
}
.backlink {
    margin-top: 40px;
    font-style: italic;
}
</style>
