<template>
    <div>
        <main id="maincontainer" class="container">
            <section id="notices" v-if="notices.length > 0">
                <div v-for="notice of notices" :key="notice.order" :class="notice.classes">
                    <h4 v-if="notice.title" class="title">{{ notice.title }}</h4>
                    <div class="markdown" v-html="notice.content" />
                </div>
            </section>
            <section id="jumbotron" class="col-sm-7" v-if="hasJumbotron">
                <h3 v-if="$page.jumbotron.title" class="title text-center">{{ $page.jumbotron.title }}</h3>
                <div class="markdown" v-html="$page.jumbotron.content" />
            </section>
            <section class="markdown" v-html="$page.main.content" />
            <section class="posts row">
                <HomeCard title="News" link="/news/" icon="fas fa-bullhorn" :items="latest.news" />
                <HomeCard title="Events" link="/events/" icon="far fa-calendar-alt" :items="latest.events" />
            </section>
            <section class="jobs row" v-if="$page.jobs" v-html="$page.jobs.content" />
            <section class="data-policy" v-if="$page.dataPolicy">
                <h3 v-if="$page.dataPolicy.title" class="title">{{ $page.dataPolicy.title }}</h3>
                <div class="markdown" v-html="$page.dataPolicy.content" />
            </section>
            <footer class="footer" v-if="$page.footer" v-html="$page.footer.content" />
        </main>
    </div>
</template>

<script>
import HomeCard from "@/components/HomeCard";
export default {
    components: {
        HomeCard,
    },
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
    computed: {
        latest() {
            return {
                news: this.$page.news.edges.map((edge) => edge.node),
                events: this.$page.events.edges.map((edge) => edge.node),
            };
        },
        notices() {
            let notices = [];
            let i = 1;
            for (let edge of this.$page.notices.edges) {
                let node = edge.node;
                let notice = {
                    title: node.title,
                    order: node.order || 1000 * i,
                    content: node.content,
                };
                notice.classes = ["alert"];
                if (node.display) {
                    notice.classes.push("alert-" + node.display);
                }
                notices.push(notice);
            }
            notices.sort((node1, node2) => node1.order > node2.order);
            return notices;
        },
        hasJumbotron() {
            return this.$page.jumbotron && this.$page.jumbotron.content.trim();
        },
    },
};
</script>

<page-query>
query {
    notices: allInsert(filter: {path: {regex: "^/insert:/hosted/usegalaxy-eu/notices/[^/]+/$"}}) {
        totalCount
        edges {
            node {
                id
                path
                title
                display
                order
                content
            }
        }
    }
    main: insert(path: "/insert:/hosted/usegalaxy-eu/main/main/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
    jumbotron: insert(path: "/insert:/hosted/usegalaxy-eu/main/jumbotron/") {
        id
        title
        content
    }
    jobs: insert(path: "/insert:/hosted/usegalaxy-eu/jobs/") {
        id
        title
        content
    }
    dataPolicy: insert(path: "/insert:/eu/data-policy/") {
        id
        title
        content
    }
    footer: insert(path: "/insert:/hosted/usegalaxy-eu/main/footer/") {
        id
        title
        content
    }
    news: allArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["eu"]}, draft: {ne: true}}
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
            category: {eq: "events"}, subsites: {contains: ["eu"]}, has_date: {eq: true}, days_ago: {lte: 0},
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

<style lang="scss">
@import "~/assets/styles.scss";

#maincontainer {
    padding-top: 1rem;
    padding-bottom: 1rem;
    a:not(.btn) {
        color: $brand-primary;
    }
    a:hover {
        text-decoration: underline;
    }
}

.title {
    font-weight: bold;
}
#maincontainer > section {
    margin-bottom: 10px;
}
</style>
