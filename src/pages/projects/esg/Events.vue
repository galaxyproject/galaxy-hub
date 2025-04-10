<template>
    <EsgLayout>
        <div v-html="$page.main.content" class="mb-4"></div>

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
    </EsgLayout>
</template>

<script>
import EsgLayout from "~/layouts/ESG.vue";
import ArticleTableEvents from "~/components/ArticleTableEvents";

export default {
    components: {
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
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/projects/esg/events/") {
        title,
        description,
        content
    }

    upcoming: allParentArticle(
        sortBy: "date", order: ASC, filter: {
            category: {eq: "events"}, subsites: {contains: ["eu"]}, draft: {ne: true},
            has_date: {eq: true}, days_ago: {lte: 0}
        }
    ) {
        edges {
            node {
                ...articleFields
            }
        }
    }

    recent: allParentArticle(
        sortBy: "date", order: DESC, filter: {
            category: {eq: "events"}, subsites: {contains: ["eu"]}, draft: {ne: true}
        }
    ) {
        edges {
            node {
                ...articleFields
            }
        }
    }
}

fragment articleFields on ParentArticle {
    id
    title
    tease
    location {
        name
        url
    }
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
