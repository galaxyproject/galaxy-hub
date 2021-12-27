<template>
    <Layout>
        <header class="header">
            <h2 class="display-4">{{ $page.main.title }}</h2>
            <h3>The meeting point where you can find curated documentation of all things Galaxy</h3>
        </header>
            <div class="row">
                <div class="col-sm-5 lead markdown" v-html="$page.main.content" />
                <section class="col-sm-7 jumbotron" v-if="$page.jumbotron && $page.jumbotron.content.trim()">
                  <div class="text-center"> <h3><b> Announcements </b></h3></div>
                  <div class="text-center markdown" v-html="$page.jumbotron.content" />
                </section>
            </div>
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
        </section>

        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
    </Layout>
</template>

<script>
import HomeCard from "@/components/HomeCard";
import { rmPrefix, rmSuffix } from "~/utils.js";
export default {
    components: {
        HomeCard,
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
                latest[category] = this.$page[category].edges.map((edge) => articleToItem(edge.node));
            }
            return latest;
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

        const altmetricScript = document.createElement("script");
        altmetricScript.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
        document.head.appendChild(altmetricScript);
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
    if (article.location) {
        item.tease += ` ${article.location} `;
    }
    if (article.closes) {
        item.tease += ` *Apply by ${article.closes}.*`;
    }
    return item;
}
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
</page-query>

<style scoped>
.header {
    margin-bottom: 2.5rem;
}
.jumbotron {
    padding-top: 0;
    margin-bottom: 1rem;
}
.jumbo-image {
    background-color: lightyellow;
    padding-top: 100px;
    border: 4px solid black;
}
</style>
