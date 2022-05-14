<template>
    <Layout :subsite="subsite">
        <header id="header">
            <h1 class="title">{{ inserts.main.title }}</h1>
            <h3 v-if="inserts.main.subtitle">{{ inserts.main.subtitle }}</h3>
        </header>

        <HomeTop :lead="inserts.lead" :jumbotron="inserts.jumbotron" />

        <div id="main-content" v-if="hasContent(inserts.main)" class="row">
            <section class="col-sm-12" v-html="inserts.main.content" />
        </div>

        <div class="row">
            <HomeCard title="News" :link="`/${subsite}/news/`" icon="fas fa-bullhorn" :items="latest.news" />
            <HomeCard title="Events" :link="`/${subsite}/events/`" icon="far fa-calendar-alt" :items="latest.events" />
        </div>

        <section class="extra markdown" v-if="hasContent(inserts.extra)" v-html="inserts.extra.content" />
    </Layout>
</template>

<script>
import HomeTop from "@/components/HomeTop";
import HomeCard from "@/components/HomeCard";
import { hasContent, gatherInserts, gatherCollections, gatherCards, addTwitterWidget, addAltmetrics } from "~/utils.js";
export default {
    components: {
        HomeTop,
        HomeCard,
    },
    methods: {
        hasContent,
    },
    metaInfo() {
        return {
            title: this.inserts.main.title,
        };
    },
    created() {
        this.inserts = gatherInserts(this.$page.allInsert);
        this.cards = gatherCards(this.inserts);
    },
    computed: {
        latest() {
            return gatherCollections(this.$page);
        },
        subsite() {
            return this.$context.subsite;
        },
    },
    mounted() {
        // Insert Twitter feed.
        if (this.cards.twitter) {
            addTwitterWidget(document);
        }
        // Add altmetrics stats badges to publications.
        if (this.cards.pubs) {
            addAltmetrics(document);
        }
    },
};
</script>

<page-query>
query($subsite: String, $insertRegex: String) {
    allInsert(filter: {path: {regex: $insertRegex}}) {
        totalCount
        edges {
            node {
                id
                path
                title
                subtitle
                content
                link
                icon
                items {
                    title
                    link
                    tease
                }
                fileInfo {
                    path
                }
            }
        }
    }
    news: allArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: [$subsite]}, draft: {ne: true}}
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
            category: {eq: "events"}, subsites: {contains: [$subsite]}, has_date: {eq: true}, days_ago: {lte: 0},
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

<style scoped>
#header {
    margin-bottom: 2.5rem;
}
#header .title {
    font-size: 3rem;
}
#main-content {
    margin-bottom: 20px;
}
</style>
