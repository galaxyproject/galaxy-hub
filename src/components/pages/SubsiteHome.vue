<template>
    <Layout :subsite="subsite">
        <header id="header">
            <h1 class="title">{{ title }}</h1>
            <h3 v-if="subtitle">{{ subtitle }}</h3>
        </header>

        <HomeTop :lead="bundles.lead" :jumbotron="inserts.jumbotron" />

        <Bundle id="main-content" class="row" :bundle="bundles.main" :subclasses="['col-sm-12']" />

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

        <Bundle class="lower" :bundle="bundles.lower" />
    </Layout>
</template>

<script>
import HomeTop from "@/components/HomeTop";
import HomeCard from "@/components/HomeCard";
import Bundle from "@/components/Bundle";
import {
    gatherInserts,
    gatherCollections,
    gatherBundles,
    searchBundle,
    gatherCards,
    makeCardRows,
} from "~/lib/pages.mjs";
import { addAltmetricsScript } from "~/lib/client.mjs";
import CONFIG from "~/../config.json";
export default {
    components: {
        HomeTop,
        HomeCard,
        Bundle,
    },
    metaInfo() {
        let data = this;
        return {
            title: () => this.title || (this.inserts.main && this.inserts.main.title) || this.subsiteData.name,
            afterNavigation(metaInfo) {
                metaInfo.title = data.title;
            },
        };
    },
    created() {
        update(this);
    },
    beforeUpdate() {
        update(this);
    },
    computed: {
        cardRows() {
            return makeCardRows(this.$page.cards, this.latest, this.cards, `/${this.$context.subsite}`);
        },
    },
    mounted() {
        // Add altmetrics stats badges to publications.
        if (this.cards.pubs) {
            addAltmetricsScript(window);
        }
    },
};
function update(data) {
    data.subsite = data.$context.subsite;
    data.subsiteData = CONFIG.subsites.all[data.$context.subsite];
    data.inserts = gatherInserts(data.$page.allInsert);
    data.cards = gatherCards(data.inserts);
    data.latest = gatherCollections(data.$page);
    data.bundles = gatherBundles(data.inserts);
    data.title = searchBundle(data.bundles.main, "title", data.subsiteData.name);
    data.subtitle = searchBundle(data.bundles.main, "subtitle");
}
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
    news: allParentArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: [$subsite]}, draft: {ne: true}}
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
            category: {eq: "events"}, subsites: {contains: [$subsite]}, has_date: {eq: true}, days_ago: {lte: 0},
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
#header .title {
    font-size: 3rem;
}
#main-content {
    margin-bottom: 20px;
}
</style>
