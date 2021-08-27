<template>
    <tr>
        <td class="date text-nowrap">{{ article.date }}</td>
        <td class="title">
            <a v-if="article.external_url" :href="article.external_url">{{ article.title }}</a>
            <g-link v-else :to="article.path" class="read">{{ article.title }}</g-link>
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
