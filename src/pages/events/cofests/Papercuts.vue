<template>
    <Layout>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
        <h2 id="upcoming-events">Upcoming Papercuts CoFests</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Topic/Event</th>
                    <th>Venue/Location</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <ArticleTableEvents v-for="edge in $page.upcoming.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
        <h2 id="recent-events">Recent Papercuts CoFests</h2>
        <p>Events in the past 12 months:</p>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Topic/Event</th>
                    <th>Venue/Location</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <ArticleTableEvents v-for="edge in $page.recent.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
    </Layout>
</template>

<script>
import ArticleTableEvents from "@/components/ArticleTableEvents";
export default {
    components: {
        ArticleTableEvents,
    },
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
};
</script>

<page-query>
query {
  main: insert(path: "/insert:/events/cofests/papercuts/main/") {
    id
    title
    content
    fileInfo {
      path
    }
  }
  footer: insert(path: "/insert:/events/cofests/papercuts/footer/") {
    id
    title
    content
  }
  upcoming: allArticle(
      sortBy: "date", order: ASC, filter: {
        category: {eq: "events"}, tags: {contains: "papercuts"}, draft: {ne: true},
        has_date: {eq: true}, days_ago: {lte: 0}
      }
    ) {
    totalCount
    edges {
      node {
        ...articleFields
      }
    }
  }
  recent: allArticle(
      sortBy: "date", order: DESC, filter: {
        category: {eq: "events"}, tags: {contains: "papercuts"}, draft: {ne: true},
        has_date: {eq: true}, days_ago: {between: [1, 365]}
      }
    ) {
    totalCount
    edges {
      node {
        ...articleFields
      }
    }
  }
}
fragment articleFields on Article {
  id
  title
  tease
  location
  location_url
  continent
  contact
  external_url
  gtn
  links {
    text
    url
  }
  date (format: "D MMMM YYYY")
  path
}
</page-query>
