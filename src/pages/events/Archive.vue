<template>
    <Layout>
        <template v-if="$page.main">
            <h1 class="page-title">{{ $page.main.title }}</h1>
            <div class="markdown" v-html="$page.main.content" />
        </template>
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
                <ArticleTableEvents v-for="edge in $page.events.edges" :key="edge.node.id" :article="edge.node" />
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
  main: insert(path: "/insert:/events/archive/main/") {
    id
    title
    content
    fileInfo {
      path
    }
  }
  footer: insert(path: "/insert:/events/archive/footer/") {
    id
    title
    content
  }
  events: allArticle(
      sortBy: "date", order: DESC, filter: {
        category: {eq: "events"}, has_date: {eq: true}, days_ago: {gt: 364}, draft: {ne: true}
      }
    ) {
    totalCount
    edges {
      node {
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
    }
  }
}
</page-query>
