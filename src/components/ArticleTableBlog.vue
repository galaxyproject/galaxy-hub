<template>
    <tr>
        <td class="date text-nowrap">{{ article.date }}</td>
        <td class="title">
            {{ article.authors }}
            <p class="from">
                from
                <a v-if="article.source_blog_url" :href="article.source_blog_url">{{ article.source_blog }}</a>
                <template v-else> the <strong>Galactic Blog</strong> </template>
            </p>
        </td>
        <td>
            <a v-if="article.external_url" :href="article.external_url">{{ article.title }}</a>
            <g-link v-else :to="article.path" class="read">{{ article.title }}</g-link>
            <p class="tease">
                {{ article.tease }}
            </p>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        article: { type: Object, required: true },
    },
};
</script>

<style scoped>
.from {
    font-style: italic;
    margin-left: 1em;
}
</style>
