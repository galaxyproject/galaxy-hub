<template>
    <Layout>
        <header id="header">
            <h1 class="display-4">{{ $page.main.title }}</h1>
            <h3 v-if="$page.main.subtitle">{{ $page.main.subtitle }}</h3>
        </header>

        <div id="static-content" class="row">
            <section :class="hasJumbotron ? 'col-sm-5' : ''">
                <div class="lead markdown" v-html="$page.main.content" />
            </section>
            <section id="jumbotron" class="col-sm-7" v-if="hasJumbotron">
                <h3 v-if="$page.jumbotron.title" class="title text-center">{{ $page.jumbotron.title }}</h3>
                <div class="text-center markdown" v-html="$page.jumbotron.content" />
            </section>
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
                :title="inserts.twitter.title"
                :link="inserts.twitter.link"
                :icon="inserts.twitter.icon"
                :content="inserts.twitter.content"
            />
        </div>

        <div class="row">
            <HomeCard
                :title="inserts.videos.title"
                :link="inserts.videos.link"
                :icon="inserts.videos.icon"
                :content="inserts.videos.content"
                :items="inserts.videos.items"
            />
            <HomeCard title="Blog" link="/blog/" icon="fas fa-pencil-alt" :items="latest.blog" />
            <HomeCard title="Careers" link="/careers/" icon="fas fa-user-astronaut" :items="latest.careers" />
        </div>

        <div class="row">
            <HomeCard
                :title="inserts.platforms.title"
                :link="inserts.platforms.link"
                :icon="inserts.platforms.icon"
                :content="inserts.platforms.content"
                :items="inserts.platforms.items"
            />
            <HomeCard
                :title="inserts.pubs.title"
                :link="inserts.pubs.link"
                :icon="inserts.pubs.icon"
                :content="inserts.pubs.content"
                :items="inserts.pubs.items"
                :width="8"
            />
        </div>

        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
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
    computed: {
        inserts() {
            let inserts = {};
            for (let edge of this.$page.allInsert.edges) {
                let name = rmSuffix(rmPrefix(edge.node.path, "/insert:/homepage-"), "/");
                inserts[name] = edge.node;
            }
            return inserts;
        },
        latest() {
            let latest = {};
            for (let category of ["blog", "news", "events", "careers"]) {
                latest[category] = this.$page[category].edges.map((edge) => edge.node);
            }
            return latest;
        },
        hasJumbotron() {
            return this.$page.jumbotron && this.$page.jumbotron.content.trim();
        },
    },
    mounted() {
        // Insert Twitter feed.
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
        // Add altmetrics stats badges to publications.
        const altmetricScript = document.createElement("script");
        altmetricScript.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
        document.head.appendChild(altmetricScript);
    },
};
</script>

<page-query>
query {
    jumbotron: insert(path: "/insert:/jumbotron/") {
        id
        title
        content
    }
    main: insert(path: "/insert:/main/") {
        id
        title
        subtitle
        content
        fileInfo {
            path
        }
    }
    allInsert(filter: {path: {regex: "^/insert:/homepage-[^/]+/$"}}) {
        totalCount
        edges {
            node {
                id
                path
                title
                link
                icon
                items {
                    title
                    link
                    tease
                }
                content
            }
        }
    }
    footer: insert(path: "/insert:/footer/") {
        id
        title
        content
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
#static-content {
    margin-bottom: 40px;
}
#jumbotron .title {
    font-weight: bold;
}
#profiles {
    margin-bottom: 45px;
}
</style>
