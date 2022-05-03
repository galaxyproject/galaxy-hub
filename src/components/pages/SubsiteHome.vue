<template>
    <Layout :subsite="subsite">
        <header id="header">
            <h1 class="title">{{ $page.main.title }}</h1>
            <h3 v-if="$page.main.subtitle">{{ $page.main.subtitle }}</h3>
        </header>

        <div id="static-content" :class="hasJumbotron ? 'row' : 'row no-jumbo'">
            <section :class="hasJumbotron ? 'col-sm-5' : ''">
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

        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
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
                latest[category] = this.$page[category].edges.map((edge) => articleToItem(edge.node));
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
/** Convert an Article to an "item", with the title, link, and tease fields expected by ItemListBrief. */
function articleToItem(article) {
    let item = {
        id: article.id,
        title: article.title,
        link: article.external_url || article.path,
        tease: article.tease || "",
    };
    if (article.date) {
        item.tease = `*${article.date}.* ${item.tease}`;
    }
    return item;
}
</script>

<page-query>
query($subsite: String, $mainPath: String, $jumboPath: String, $footerPath: String) {
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
    footer: insert(path: $footerPath) {
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
