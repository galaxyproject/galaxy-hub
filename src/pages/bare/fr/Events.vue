<template>
    <!-- This first div gets `id="app"` automatically. -->
    <div>
        <div id="maincontainer" class="container">
            <h1 class="page-title">{{ $page.main.title }}</h1>
            <div class="content markdown" v-if="hasContent($page.main)" v-html="$page.main.content" />
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
            <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
        </div>
    </div>
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
            title: this.$page.main.title,
        };
    },
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/ifb/events/main/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
    footer: insert(path: "/insert:/ifb/events/footer/") {
        id
        title
        content
    }
    upcoming: allParentArticle(
        sortBy: "date", order: ASC, filter: {
            category: {eq: "events"}, subsites: {contains: ["eu"]}, draft: {ne: true},
            has_date: {eq: true}, days_ago: {lte: 0}
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
            category: {eq: "events"}, subsites: {contains: ["eu"]}, draft: {ne: true},
            has_date: {eq: true}, days_ago: {between: [1, 365]}
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
