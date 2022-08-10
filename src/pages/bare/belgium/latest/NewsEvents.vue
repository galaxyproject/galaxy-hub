<template>
    <div>
        <section class="latest-posts row">
            <HomeCard
                title="News"
                link="/belgium/news/"
                icon="fas fa-bullhorn"
                :width="6"
                :items="news"
                target="_blank"
            />
            <HomeCard
                title="Events"
                link="/belgium/events/"
                icon="far fa-calendar-alt"
                :width="6"
                :items="events"
                target="_blank"
            />
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
        events() {
            return this.$page.events.edges.map((edge) => edge.node);
        },
    },
    mounted() {
        notifyParent(window);
    },
};
</script>

<page-query>
query {
    news: allArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["belgium"]}, draft: {ne: true}}
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
    events: allArticle(
        limit: 5, sortBy: "date", order: ASC,
        filter: {
            category: {eq: "events"}, subsites: {contains: ["belgium"]}, has_date: {eq: true}, days_ago: {lte: 0},
            draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                id
                title
                tease
                external_url
                date (format: "MMM D")
                end  (format: "MMM D")
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
