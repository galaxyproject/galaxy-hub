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

        <div class="row">
            <HomeCard title="News" link="/news/" icon="fas fa-bullhorn" :items="latest.news" />
            <HomeCard title="Events" link="/events/" icon="far fa-calendar-alt" :items="latest.events" />
            <HomeCard
                v-if="cards.twitter"
                :title="cards.twitter.title"
                :link="cards.twitter.link"
                :icon="cards.twitter.icon"
                :content="cards.twitter.content"
            />
        </div>

        <div class="row">
            <HomeCard
                v-if="cards.videos"
                :title="cards.videos.title"
                :link="cards.videos.link"
                :icon="cards.videos.icon"
                :content="cards.videos.content"
                :items="cards.videos.items"
            />
            <HomeCard title="Blog" link="/blog/" icon="fas fa-pencil-alt" :items="latest.blog" />
            <HomeCard title="Careers" link="/careers/" icon="fas fa-user-astronaut" :items="latest.careers" />
        </div>

        <div class="row">
            <HomeCard
                v-if="cards.platforms"
                :title="cards.platforms.title"
                :link="cards.platforms.link"
                :icon="cards.platforms.icon"
                :content="cards.platforms.content"
                :items="cards.platforms.items"
            />
            <HomeCard
                v-if="cards.pubs"
                :title="cards.pubs.title"
                :link="cards.pubs.link"
                :icon="cards.pubs.icon"
                :content="cards.pubs.content"
                :items="cards.pubs.items"
                :width="8"
            />
        </div>

        <section class="extra markdown" v-if="hasContent(inserts.extra)" v-html="inserts.extra.content" />
    </Layout>
</template>

<script>
import HomeTop from "@/components/HomeTop";
import HomeCard from "@/components/HomeCard";
import HomeProfile from "@/components/HomeProfile.vue";
import { hasContent, gatherCollections, gatherInserts, gatherCards, addTwitterWidget, addAltmetrics } from "~/utils.js";
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
    },
    computed: {
        latest() {
            return gatherCollections(this.$page);
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
query {
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
