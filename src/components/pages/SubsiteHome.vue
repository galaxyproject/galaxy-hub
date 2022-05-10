<template>
    <Layout :subsite="subsite">
        <header id="header">
            <h1 class="title">{{ $page.main.title }}</h1>
            <h3 v-if="$page.main.subtitle">{{ $page.main.subtitle }}</h3>
        </header>

        <div id="static-content" :class="hasJumbotron ? 'row' : 'row no-jumbo'">
            <section :class="hasJumbotron ? 'col-sm-5' : 'col-sm-12'">
                <div class="lead markdown" v-html="$page.main.content" />
            </section>
            <section id="jumbotron" class="col-sm-7" v-if="hasJumbotron">
                <h3 v-if="$page.jumbotron.title" class="title text-center">{{ $page.jumbotron.title }}</h3>
                <div class="text-center markdown" v-html="$page.jumbotron.content" />
            </section>
        </div>

        <div class="row">
            <HomeCard title="News" :link="`/${subsite}/news/`" icon="fas fa-bullhorn" :items="latest.news" />
            <HomeCard title="Events" :link="`/${subsite}/events/`" icon="far fa-calendar-alt" :items="latest.events" />
        </div>

        <section class="extra markdown" v-if="$page.extra" v-html="$page.extra.content" />
    </Layout>
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
            let latest = {};
            for (let category of ["news", "events"]) {
                latest[category] = this.$page[category].edges.map((edge) => edge.node);
            }
            return latest;
        },
        subsite() {
            return this.$context.subsite;
        },
        hasJumbotron() {
            return this.$page.jumbotron && this.$page.jumbotron.content.trim();
        },
    },
};
</script>

<page-query>
query($subsite: String, $mainPath: String, $jumboPath: String, $extraPath: String) {
    main: insert(path: $mainPath) {
        id
        title
        subtitle
        content
        fileInfo {
            path
        }
    }
    jumbotron: insert(path: $jumboPath) {
        id
        title
        content
    }
    extra: insert(path: $extraPath) {
        id
        title
        content
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
#static-content {
    margin-bottom: 40px;
}
#jumbotron .title {
    font-weight: bold;
}
</style>
