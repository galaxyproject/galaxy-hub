<template>
    <Layout>
        <h1 class="page-title">
            <template v-if="$page.main && $page.main.title">
                {{ $page.main.title }}
            </template>
            <template v-else>
                Events tagged <code>{{ $context.tag }}</code>
            </template>
        </h1>
        <div class="markdown" v-if="$page.main && $page.main.content" v-html="$page.main.content" />
        <h2 id="upcoming-events">
            <template v-if="$page.main && $page.main.noun">Upcoming {{ $page.main.noun }}s</template>
            <template v-else>Upcoming events</template>
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
            <template v-if="$page.main && $page.main.noun">Recent {{ $page.main.noun }}s</template>
            <template v-else>Recent events</template>
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
query($tag: String, $mainPath: String, $footerPath: String) {
    main: insert(path: $mainPath) {
        id
        title
        content
        noun
        fileInfo {
            path
        }
    }
    footer: insert(path: $footerPath) {
        id
        title
        content
    }
    upcoming: allArticle(
        sortBy: "date", order: ASC, filter: {
            category: {eq: "events"}, tags: {contains: [$tag]}, draft: {ne: true},
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
            category: {eq: "events"}, tags: {contains: [$tag]}, draft: {ne: true},
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
