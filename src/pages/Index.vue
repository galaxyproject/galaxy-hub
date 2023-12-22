<template>
    <Layout>
        <!-- <header id="header">
            <h1 class="display-4">{{ title }}</h1>
            <h3 v-if="subtitle">{{ subtitle }}</h3>
        </header> -->

        <Hero />

        <HomeLearn />

        <BeyondUser />

        <HomeGrow />
    </Layout>
</template>

<script>
import Hero from "@/components/Hero";
import BeyondUser from "@/components/BeyondUser.vue";
import HomeLearn from "@/components/HomeLearn.vue";
import HomeGrow from "@/components/HomeGrow.vue";
import {
    gatherCollections,
    gatherInserts,
    gatherBundles,
    searchBundle,
    gatherCards,
    makeCardRows,
} from "~/lib/pages.mjs";
import { addAltmetricsScript } from "~/lib/client.mjs";
export default {
    components: {
        Hero,
        BeyondUser,
        HomeLearn,
        HomeGrow,
    },
    metaInfo: {
        title: "Home",
    },
    created() {
        this.inserts = gatherInserts(this.$page.allInsert);
        this.cards = gatherCards(this.inserts);
        this.latest = gatherCollections(this.$page);
        this.bundles = gatherBundles(this.inserts);
    },
    computed: {
        cardRows() {
            return makeCardRows(this.$page.cards, this.latest, this.cards);
        },
        title() {
            return searchBundle(this.bundles.main, "title");
        },
        subtitle() {
            return searchBundle(this.bundles.main, "subtitle");
        },
    },
    mounted() {
        // Add altmetrics stats badges to publications.
        if (this.cards.pubs) {
            addAltmetricsScript(window);
        }
    },
};
</script>

<page-query>
query {
    cards: insert(path: "/insert:/cards/") {
        id
        list {
            name
            type
            title
            link
            icon
            width
        }
    }
    allInsert(filter: {path: {regex: "^/insert:/[^/]+/$"}}) {
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
    news: allParentArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["global"]}, draft: {ne: true}}
    ) {
        totalCount
        edges {
            node {
                ...articleFields
            }
        }
    }
    events: allParentArticle(
        limit: 5, sortBy: "date", order: ASC,
        filter: {
            category: {eq: "events"}, subsites: {contains: ["global"]}, has_date: {eq: true}, days_ago: {lte: 0},
            draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                ...articleFields
                date (format: "MMM D")
                end  (format: "MMM D")
            }
        }
    }
    blog: allParentArticle(limit: 5, filter: {category: {eq: "blog"}, draft: {ne: true}}) {
        totalCount
        edges {
            node {
                ...articleFields
            }
        }
    }
    careers: allParentArticle(
        limit: 5, sortBy: "date", order: DESC, filter: {
            category: {eq: "careers"}, closed: {eq: false}, draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                id
                title
                location {
                    name
                    url
                }
                external_url
                closes (format: "MMM D")
                path
            }
        }
    }
}
fragment articleFields on ParentArticle {
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
#profiles {
    margin-bottom: 45px;
}
#main-content {
    margin-bottom: 20px;
}
#lower {
    margin-top: 10px;
}
</style>
