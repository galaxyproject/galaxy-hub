<template>
    <div>
        <section class="latest-posts row">
            <HomeCard title="News" link="/ifb/news/" icon="fas fa-bullhorn" :width="12" :items="news" target="_blank" />
        </section>
    </div>
</template>

<script>
import { notifyParent } from "~/lib/client.mjs";
import HomeCard from "@/components/HomeCard";
export default {
    components: {
        HomeCard,
    },
    computed: {
        news() {
            return this.$page.news.edges.map((edge) => edge.node);
        },
    },
    mounted() {
        notifyParent(window);
    },
};
</script>

<page-query>
query {
    news: allParentArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["fr"]}, draft: {ne: true}}
    ) {
        totalCount
        edges {
            node {
                id
                title
                tease
                external_url
                path
            }
        }
    }
}
</page-query>

<style lang="scss">
@import "~/assets/styles.scss";

section.latest-posts {
    margin-left: 0;
    width: 100%;
    a:not(.btn) {
        color: $brand-primary;
    }
    a:hover {
        text-decoration: underline;
    }
}
</style>
