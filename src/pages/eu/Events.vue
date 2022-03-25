<template>
    <Layout subsite="eu">
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="toc-wrapper col-md-3">
            <ul>
                <li><a href="#upcoming-events">Upcoming Events</a></li>
                <li><a href="#recent-events">Recent Events</a></li>
            </ul>
        </div>
        <div class="body-wrapper col-md-9">
            <div class="content markdown" v-html="$page.main.content" />
        </div>
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
    </Layout>
</template>

<script>
import ArticleTableEvents from "@/components/ArticleTableEvents";
export default {
    components: {
        ArticleTableEvents,
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
    main: insert(path: "/insert:/eu/events/main/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
    footer: insert(path: "/insert:/eu/events/footer/") {
        id
        title
        content
    }
    upcoming: allArticle(
        sortBy: "date", order: ASC, filter: {
            category: {eq: "events"}, subsites: {contains: "eu"}, draft: {ne: true},
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
    recent: allArticle(
        sortBy: "date", order: DESC, filter: {
            category: {eq: "events"}, subsites: {contains: "eu"}, draft: {ne: true},
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
