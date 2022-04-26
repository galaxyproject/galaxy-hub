<template>
    <tr>
        <td class="date text-nowrap">{{ article.date }}</td>
        <td class="summary">
            {{ article.authors }}
            <p class="from">
                from
                <a v-if="article.source_blog_url" :href="article.source_blog_url">{{ article.source_blog }}</a>
                <template v-else> the <strong>Galactic Blog</strong> </template>
            </p>
        </td>
        <td>
            <div v-if="article.external_url" class="title">
                <p class="outlink">
                    <a :href="article.external_url">{{ article.title }}</a>
                </p>
                <div class="link-icon"><a class="fas fa-external-link-alt"></a></div>
                <div class="clearfix"></div>
            </div>
            <g-link v-else :to="article.path" class="title">{{ article.title }}</g-link>
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
p {
    margin: 0;
}
.from {
    font-style: italic;
    margin-left: 1em;
}
.outlink {
    float: left;
    width: calc(100% - 15px);
}
.link-icon {
    font-size: 80%;
    float: right;
}
</style>
