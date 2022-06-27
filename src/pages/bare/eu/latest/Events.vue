<template>
    <div>
        <section class="latest-posts row">
            <HomeCard title="Events" link="/events/" icon="far fa-calendar-alt" :width="12" :items="events" />
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
                id
                title
                tease
                external_url
                path
                date (format: "MMM D")
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
