<template>
    <p>
        <span class="title">
            <a v-if="article.external_url" :href="article.external_url">{{ article.title }}</a>
            <g-link v-else :to="article.path" class="read">{{ article.title }}</g-link>
        </span>
        <small class="text-dark" v-if="article.date || article.tease || article.location || article.closes">
            –
            <span v-if="article.date" class="date"> {{ article.date }}. </span>
            <template v-if="article.tease">
                {{ article.tease }}
            </template>
            <template v-else-if="article.location">
                {{ article.location }}
            </template>
            <span v-if="article.closes" class="closes"> Apply by {{ article.closes }}. </span>
        </small>
    </p>
</template>

<script>
export default {
    props: {
        article: { type: Object, required: true },
    },
};
</script>

<style scoped>
.title {
    font-weight: bold;
}
.date,
.closes {
    font-style: italic;
}
</style>
