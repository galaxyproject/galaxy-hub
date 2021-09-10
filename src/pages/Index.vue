<template>
    <Layout>
        <header class="header">
            <h1 class="display-4">{{ $page.main.title }}</h1>
        </header>

        <section class="section-content jumbotron" v-if="$page.jumbotron">
            <div class="row text-center markdown" v-html="$page.jumbotron.content" />
        </section>

        <section class="section-content">
            <div id="splash-row">
                <div class="col-sm-12 lead markdown" v-html="$page.main.content" />
            </div>

            <div class="row">
                <div class="pseudo-card col-sm-4">
                    <h2>
                        <g-link to="/news/"><span class="fas fa-bullhorn"></span>News</g-link>
                    </h2>
                    <ArticleListBrief v-for="edge in $page.news.edges" :key="edge.node.id" :article="edge.node" />
                </div>
                <div class="pseudo-card col-sm-4">
                    <h2>
                        <g-link to="/events/"><span class="far fa-calendar-alt"></span>Events</g-link>
                    </h2>
                    <ArticleListBrief v-for="edge in $page.events.edges" :key="edge.node.id" :article="edge.node" />
                </div>
                <div class="pseudo-card col-sm-4">
                    <h2>
                        <a href="https://twitter.com/galaxyproject">
                            <span class="fab fa-twitter"></span>@galaxyproject
                        </a>
                        <a
                            class="twitter-timeline"
                            href="https://twitter.com/galaxyproject"
                            data-dnt="true"
                            height="400"
                            data-chrome="noheader nofooter noscrollbar noborders transparent"
                            data-widget-id="384667676347363329"
                        >
                        </a>
                    </h2>
                </div>
            </div>

            <div class="row">
                <div class="pseudo-card col-sm-4 markdown" v-if="$page.videos" v-html="$page.videos.content" />
                <div class="pseudo-card col-sm-4">
                    <h2>
                        <g-link to="/blog/"><span class="fas fa-pencil-alt"></span>Blog</g-link>
                    </h2>
                    <ArticleListBrief v-for="edge in $page.blog.edges" :key="edge.node.id" :article="edge.node" />
                </div>
                <div class="pseudo-card col-sm-4">
                    <h2>
                        <a href="/careers/"><span class="fas fa-user-astronaut"></span>Careers</a>
                    </h2>
                    <ArticleListBrief v-for="node in careers" :key="node.id" :article="node" />
                </div>
            </div>

            <div class="row">
                <div class="pseudo-card col-sm-4" v-if="$page.platforms">
                    <h2>
                        <a href="/use/"><span class="fas fa-server"></span>{{ $page.platforms.title }}</a>
                    </h2>
                    <div class="markdown" v-html="$page.platforms.content" />
                </div>
                <div class="pseudo-card col-sm-8" v-if="$page.pubs">
                    <h2>
                        <a href="https://www.zotero.org/groups/galaxy">
                            <span class="fas fa-book-open"></span>{{ $page.pubs.title }}
                        </a>
                    </h2>
                    <div class="markdown" v-html="$page.pubs.content" />
                </div>
            </div>
        </section>

        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
    </Layout>
</template>

<script>
import ArticleListBrief from "@/components/ArticleListBrief";
export default {
    components: {
        ArticleListBrief,
    },
    metaInfo: {
        title: "Home",
    },
    computed: {
      careers() {
        this.$page.careers.edges.reverse();
        return this.$page.careers.edges.map(edge => edge.node);
      }
    },
    mounted() {
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
    content
  }
  videos: insert(path: "/insert:/homepage-videos/") {
    id
    title
    content
  }
  platforms: insert(path: "/insert:/homepage-platforms/") {
    id
    title
    content
  }
  pubs: insert(path: "/insert:/homepage-pubs/") {
    id
    title
    content
  }
  footer: insert(path: "/insert:/footer/") {
    id
    title
    content
  }
  news: allArticle(limit: 5, filter: {category: {eq: "news" }, draft: {ne: true}}) {
    totalCount
    edges {
      node {
        id
        title
        tease
        external_url
        path
      }
    }
  }
  events: allArticle(
      limit: 5, sortBy: "date", order: ASC,
      filter: {category: {eq: "events"}, has_date: {eq: true}, days_ago: {lte: 0}, draft: {ne: true}}
    ) {
    totalCount
    edges {
      node {
        id
        title
        tease
        date (format: "MMM D")
        external_url
        path
      }
    }
  }
  blog: allArticle(limit: 5, filter: {category: {eq: "blog"}, draft: {ne: true}}) {
    totalCount
    edges {
      node {
        id
        title
        tease
        external_url
        path
      }
    }
  }
  careers: allArticle(
      limit: 5, sortBy: "date", order: ASC, filter: {
        category: {eq: "careers"}, closed: {eq: false}, draft: {ne: true}
      }
    ) {
    totalCount
    edges {
      node {
        id
        title
        closes (format: "MMM D")
        location
        external_url
        path
      }
    }
  }
}
</page-query>

<style scoped>
.jumbotron {
    padding-top: 2.5rem;
}
.jumbo-image {
    background-color: lightyellow;
    padding-top: 100px;
    border: 4px solid black;
}
.pseudo-card {
    background-color: #e0eaf2;
    border: 3px solid white;
    border-radius: 10px;
}
.pseudo-card h2 .fas,
.pseudo-card h2 .far {
    margin-right: 0.7em;
}
.pseudo-card .markdown::v-deep p {
    font-size: 80%;
}
.pseudo-card .markdown::v-deep a {
    font-size: 125%;
}
</style>
