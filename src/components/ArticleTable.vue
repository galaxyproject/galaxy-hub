<template>
    <tr>
        <td class="date text-nowrap">{{ article.date }}</td>
        <td class="summary">
            <div v-if="article.external_url" class="title">
                <p class="outlink">
                    <a :href="article.external_url">{{ article.title }}</a>
                </p>
                <div class="link-icon"><a class="fas fa-external-link-alt"></a></div>
                <div class="clearfix"></div>
            </div>
            <g-link v-else :to="article.path" class="title">{{ article.title }}</g-link>
        </td>
        <td class="tease">{{ article.tease }}</td>
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
.outlink {
    float: left;
    width: calc(100% - 15px);
}
.link-icon {
    font-size: 80%;
    float: right;
}
</style>
