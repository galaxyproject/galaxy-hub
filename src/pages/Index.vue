<template>
    <Layout>
        <header id="header">
            <h1 class="display-4">{{ inserts.main.title }}</h1>
            <h3 v-if="inserts.main.subtitle">{{ inserts.main.subtitle }}</h3>
        </header>

        <div id="top-content" class="row">
            <section id="lead" v-if="has.lead" :class="`col-sm-${topWidth}`">
                <div class="lead markdown" v-html="inserts.lead.content" />
            </section>
            <section id="jumbotron" v-if="has.jumbotron" :class="`col-sm-${topWidth}`">
                <h3 v-if="inserts.jumbotron.title" class="title text-center">{{ inserts.jumbotron.title }}</h3>
                <div class="text-center markdown" v-html="inserts.jumbotron.content" />
            </section>
        </div>

        <div id="main-content" v-if="has.main" class="row">
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

        <section class="extra markdown" v-if="has.extra" v-html="inserts.extra.content" />
    </Layout>
</template>

<script>
import HomeCard from "@/components/HomeCard";
import { rmPrefix, rmSuffix } from "~/utils.js";
import HomeProfile from "../components/HomeProfile.vue";
export default {
    components: {
        HomeCard,
        HomeProfile,
    },
    metaInfo: {
        title: "Home",
    },
    created() {
        this.inserts = {};
        this.has = {};
        this.cards = {};
        for (let insert of this.$page.allInsert.edges.map((edge) => edge.node)) {
            let name = rmSuffix(rmPrefix(insert.path, "/insert:/"), "/");
            if (name.endsWith("-card")) {
                let cardName = rmSuffix(name, "-card");
                this.cards[cardName] = insert;
            } else {
                this.inserts[name] = insert;
            }
            this.has[name] = Boolean(insert && insert.content && insert.content.trim());
        }
    },
    computed: {
        latest() {
            let latest = {};
            for (let [category, value] of Object.entries(this.$page)) {
                if (value.edges && category !== "allInsert") {
                    latest[category] = value.edges.map((edge) => edge.node);
                }
            }
            return latest;
        },
        topWidth() {
            if (this.has.lead && this.has.jumbotron) {
                return 6;
            } else {
                return 12;
            }
        },
    },
    mounted() {
        // Insert Twitter feed.
        if (this.cards.twitter) {
            !(function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? "http" : "https";
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            })(document, "script", "twitter-wjs");
        }
        // Add altmetrics stats badges to publications.
        if (this.cards.pubs) {
            const altmetricScript = document.createElement("script");
            altmetricScript.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
            document.head.appendChild(altmetricScript);
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
#top-content {
    margin-bottom: 40px;
}
#jumbotron .title {
    font-weight: bold;
}
#profiles {
    margin-bottom: 45px;
}
</style>
