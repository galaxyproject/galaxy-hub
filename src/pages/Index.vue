<template>
    <Layout>
        <header id="header">
            <h1 class="display-4">{{ inserts.main.title }}</h1>
            <h3 v-if="inserts.main.subtitle">{{ inserts.main.subtitle }}</h3>
        </header>

        <HomeTop :lead="inserts.lead" :jumbotron="inserts.jumbotron" />

        <div id="main-content" v-if="hasContent(inserts.main)" class="row">
            <section class="col-sm-12" v-html="inserts.main.content" />
        </div>

        <b-row id="profiles" class="justify-content-md-center">
            <HomeProfile
                title="SCIENTISTS"
                link="/scientist/"
                img="/images/undraw-illustrations/galaxy-for-scientists.svg"
                alt="Galaxy for scientists"
            />
            <HomeProfile
                title="TRAINERS"
                link="/learn/"
                img="/images/undraw-illustrations/galaxy-for-trainers.svg"
                alt="Galaxy for trainers"
            />
            <HomeProfile
                title="TOOL AUTHORS"
                link="/tools/"
                img="/images/undraw-illustrations/galaxy-for-tool-developers.svg"
                alt="Galaxy for tool authors"
            />
            <HomeProfile
                title="DEVELOPERS"
                link="/develop/"
                img="/images/undraw-illustrations/galaxy-for-developers.svg"
                alt="Galaxy for developers"
            />
            <HomeProfile
                title="ADMINS"
                link="/admin"
                img="/images/undraw-illustrations/galaxy-for-admins.svg"
                alt="Galaxy for admins"
            />
        </b-row>

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

        <section class="extra markdown" v-if="hasContent(inserts.extra)" v-html="inserts.extra.content" />
    </Layout>
</template>

<script>
import HomeTop from "@/components/HomeTop";
import HomeCard from "@/components/HomeCard";
import HomeProfile from "@/components/HomeProfile.vue";
import { hasContent, gatherCollections, gatherInserts, gatherCards, makeCardRows } from "~/lib/pages.mjs";
import { addTwitterScript, addAltmetricsScript } from "~/lib/client.mjs";
export default {
    components: {
        HomeTop,
        HomeProfile,
        HomeCard,
    },
    methods: {
        hasContent,
    },
    metaInfo: {
        title: "Home",
    },
    created() {
        this.inserts = gatherInserts(this.$page.allInsert);
        this.cards = gatherCards(this.inserts);
        this.latest = gatherCollections(this.$page);
    },
    computed: {
        cardRows() {
            return makeCardRows(this.$page.cards.list, this.latest, this.cards);
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
    news: allArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["global"]}, draft: {ne: true}}
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
            category: {eq: "events"}, subsites: {contains: ["global"]}, has_date: {eq: true}, days_ago: {lte: 0},
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
    blog: allArticle(limit: 5, filter: {category: {eq: "blog"}, draft: {ne: true}}) {
        totalCount
        edges {
            node {
                ...articleFields
            }
        }
    }
    careers: allArticle(
        limit: 5, sortBy: "date", order: DESC, filter: {
            category: {eq: "careers"}, closed: {eq: false}, draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                id
                title
                location
                external_url
                path
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
#profiles {
    margin-bottom: 45px;
}
#main-content {
    margin-bottom: 20px;
}
</style>
