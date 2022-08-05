<template>
    <Layout :subsite="subsite">
        <header id="header">
            <h1 class="title">{{ inserts.main ? inserts.main.title : subsiteData.name }}</h1>
            <h3 v-if="inserts.main && inserts.main.subtitle">{{ inserts.main.subtitle }}</h3>
        </header>

        <HomeTop :lead="inserts.lead" :jumbotron="inserts.jumbotron" />

        <div id="main-content" v-if="hasContent(inserts.main)" class="row">
            <section class="col-sm-12" v-html="inserts.main.content" />
        </div>

        <div class="row" v-for="(cardRow, i) of cardRows" :key="i">
            <HomeCard
                v-for="(card, j) of cardRow"
                :key="j"
                :title="card.title"
                :link="card.link"
                :icon="card.icon"
                :width="card.width"
                :items="card.items"
                :content="card.content"
            />
        </div>

        <section class="lower" v-if="bundles.lower && bundles.lower.length > 0">
            <div class="markdown" v-for="(insert, i) of bundles.lower" :key="i" v-html="insert.content" />
        </section>
    </Layout>
</template>

<script>
import HomeTop from "@/components/HomeTop";
import HomeCard from "@/components/HomeCard";
import {
    hasContent,
    gatherInserts,
    gatherCollections,
    bundleInserts,
    gatherCards,
    makeCardRows,
} from "~/lib/pages.mjs";
import { addTwitterScript, addAltmetricsScript } from "~/lib/client.mjs";
import CONFIG from "~/../config.json";
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
            title: this.inserts.main ? this.inserts.main.title : this.subsiteData.name,
        };
    },
    created() {
        this.inserts = gatherInserts(this.$page.allInsert);
        this.cards = gatherCards(this.inserts);
        this.latest = gatherCollections(this.$page);
        this.bundles = bundleInserts(this.inserts, ["main", "lead", "lower"]);
    },
    computed: {
        subsiteData() {
            return CONFIG.subsites.all[this.$context.subsite];
        },
        subsite() {
            return this.$context.subsite;
        },
        cardRows() {
            return makeCardRows(this.$page.cards, this.latest, this.cards, `/${this.$context.subsite}`);
        },
    },
    mounted() {
        // Insert Twitter feed.
        if (this.cards.twitter) {
            addTwitterScript(window);
        }
        // Add altmetrics stats badges to publications.
        if (this.cards.pubs) {
            addAltmetricsScript(window);
        }
    },
};
</script>

<page-query>
query($subsite: String, $cardsPath: String, $insertRegex: String) {
    cards: insert(path: $cardsPath) {
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
