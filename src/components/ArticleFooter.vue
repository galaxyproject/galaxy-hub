<template>
    <footer :class="article.category">
        <p class="backlink" v-if="article.category === 'blog'">
            See this and other Galaxy-related posts in
            <g-link to="/blog/">The Galactic Blog</g-link>
        </p>
    </footer>
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
