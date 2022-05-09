<template>
    <div>
        <section class="posts row">
            <HomeCard title="News" link="/news/" icon="fas fa-bullhorn" :width="6" :items="latest.news" />
            <HomeCard title="Events" link="/events/" icon="far fa-calendar-alt" :width="6" :items="latest.events" />
        </section>
    </div>
</template>

<script>
import { notifyParent } from "~/utils.js";
import HomeCard from "@/components/HomeCard";
export default {
    components: {
        HomeCard,
    },
    computed: {
        latest() {
            return {
                news: this.$page.news.edges.map((edge) => edge.node),
                events: this.$page.events.edges.map((edge) => edge.node),
            };
        },
    },
    mounted() {
        notifyParent(window);
    }
};
</script>

<page-query>
query {
    news: allArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["eu"]}, draft: {ne: true}}
    ) {
        totalCount
        edges {
            node {
                ...articleFields
            }
        }
    }
    events: allArticle(
        limit: 5, sortBy: "date", order: ASC,
        filter: {
            category: {eq: "events"}, subsites: {contains: ["eu"]}, has_date: {eq: true}, days_ago: {lte: 0},
            draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                ...articleFields
                date (format: "MMM D")
            }
        }
    }
}
fragment articleFields on Article {
    id
    title
    tease
    external_url
    path
}
</page-query>

<style lang="scss">
@import "~/assets/styles.scss";

a:not(.btn) {
    color: $brand-primary;
}
a:hover {
    text-decoration: underline;
}

.posts {
    margin-left: 0;
    width: 100%;
}
</style>
