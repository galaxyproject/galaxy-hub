<template>
    <component :is="currentLayout">
        <p v-html="$page.main.content" class="mb-4"></p>

        <h2 id="upcoming-events">
            <a href="#upcoming-events" aria-hidden="true"><span class="icon icon-link"></span></a>
            Upcoming Events
        </h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Topic/Event</th>
                    <th>Venue/Location</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <ArticleTableEvents v-for="edge in $page.upcoming.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
        <h2 id="recent-events">
            <a href="#recent-events" aria-hidden="true"><span class="icon icon-link"></span></a>
            Recent Events
        </h2>
        <p>Events in the past 12 months:</p>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Topic/Event</th>
                    <th>Venue/Location</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <ArticleTableEvents v-for="edge in $page.recent.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
    </component>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import EsgLayout from "~/layouts/ESG.vue";
import ArticleTableEvents from "~/components/ArticleTableEvents";

export default {
    components: {
        Layout,
        EsgLayout,
        ArticleTableEvents,
    },
    metaInfo() {
        return {
            title: this.$page.main.title,
            meta: [
                {
                    name: "description",
                    content: this.$page.main.description,
                },
            ],
        };
    },
    data() {
        return {
            currentLayout: Layout,
        };
    },
    created() {
        if (this.$route.query.solo) {
            this.currentLayout = EsgLayout;
        }
    },
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/projects/esg/events/") {
        title,
        description,
        content
    }

    upcoming: allArticle(
        sortBy: "date", order: ASC, filter: {
            category: {eq: "events"}, subsites: {contains: ["global"]}, draft: {ne: true},
            has_date: {eq: true}, days_ago: {lte: 0}
        }
    ) {
        edges {
            node {
                ...articleFields
            }
        }
    }

    recent: allArticle(
        sortBy: "date", order: DESC, filter: {
            category: {eq: "events"}, subsites: {contains: ["global"]}, draft: {ne: true},
            has_date: {eq: true}, days_ago: {between: [1, 365]}
        }
    ) {
        edges {
            node {
                ...articleFields
            }
        }
    }
}

fragment articleFields on Article {
    id
    title
    tease
    location
    location_url
    continent
    contact
    external_url
    gtn
    links {
        text
        url
    }
    date (format: "D MMMM YYYY")
    path
}
</page-query>
