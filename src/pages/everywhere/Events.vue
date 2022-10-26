<template>
    <Layout :subsite="$context.subsite">
        <h1 class="page-title">{{ $page.main ? $page.main.title : "All Events" }}</h1>
        <div class="toc-wrapper col-md-3">
            <ul>
                <li><a href="#upcoming-events">Upcoming Events</a></li>
                <li><a href="#recent-events">Recent Events</a></li>
            </ul>
        </div>
        <div v-if="hasContent($page.main)" class="body-wrapper col-md-9">
            <div class="content markdown" v-html="$page.main.content" />
        </div>
        <div class="clearfix"></div>
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
    </Layout>
</template>

<script>
import ArticleTableEvents from "@/components/ArticleTableEvents";
import { hasContent } from "~/lib/pages.mjs";
export default {
    components: {
        ArticleTableEvents,
    },
    methods: {
        hasContent,
    },
    metaInfo() {
        return {
            title: this.$page.main ? this.$page.main.title : "All Events",
        };
    },
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/everywhere/events/main/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
    upcoming: allParentArticle(
        sortBy: "date", order: ASC, filter: {
            category: {eq: "events"}, draft: {ne: true}, has_date: {eq: true}, days_ago: {lte: 0}
        }
    ) {
        totalCount
        edges {
            node {
                ...articleFields
            }
        }
    }
    recent: allParentArticle(
        sortBy: "date", order: DESC, filter: {
            category: {eq: "events"}, draft: {ne: true}, has_date: {eq: true}, days_ago: {between: [1, 365]}
        }
    ) {
        totalCount
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
    continent
    contact
    contacts {
        name
        email
        url
    }
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
