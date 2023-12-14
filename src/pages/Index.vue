<template>
    <Layout>
        <header id="header">
            <h1 class="display-4">{{ title }}</h1>
            <h3 v-if="subtitle">{{ subtitle }}</h3>
        </header>

        <Hero />

        <BeyondUser />


        <Bundle id="main-content" class="row" :bundle="bundles.main" :subclasses="['col-sm-12']" />

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

        <Bundle id="lower" :bundle="bundles.lower" />
    </Layout>
</template>

<script>
import Hero from "@/components/Hero";
import HomeTop from "@/components/HomeTop";
import HomeCard from "@/components/HomeCard";
import HomeProfile from "@/components/HomeProfile.vue";
import BeyondUser from "@/components/BeyondUser.vue";
import Bundle from "@/components/Bundle.vue";
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
        HomeTop,
        HomeProfile,
        HomeCard,
        BeyondUser,
        Bundle,
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
