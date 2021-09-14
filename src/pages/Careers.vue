<template>
    <Layout>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
        <h2 id="open-positions">Open Positions</h2>
        <div class="card-deck">
            <CardCareers v-for="edge in $page.openings.edges" :key="edge.node.id" :article="edge.node" />
        </div>
        <h2 id="previous-openings">Previous Openings</h2>
        <div class="card-deck">
            <CardCareers v-for="edge in $page.previous.edges" :key="edge.node.id" :article="edge.node" />
        </div>
        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
    </Layout>
</template>

<script>
import CardCareers from "@/components/CardCareers";
export default {
    components: {
        CardCareers,
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
  main: insert(path: "/insert:/careers/main/") {
    id
    title
    content
  }
  footer: insert(path: "/insert:/careers/footer/") {
    id
    title
    content
  }
  openings: allArticle(sortBy: "date", order: DESC, filter: {
    category: {eq: "careers"}, closed: {eq: false}, draft: {ne: true}
  }) {
    totalCount
    edges {
      node {
        id
        title
        date (format: "D MMM YYYY")
        closes (format: "D MMM YYYY")
        closed
        continent
        location
        location_url
        external_url
        contact
        summary
        images
        image
        path
      }
    }
  }
  previous: allArticle(sortBy: "date", order: DESC, filter: {
    category: {eq: "careers"}, closed: {eq: true}, draft: {ne: true}
  }) {
    totalCount
    edges {
      node {
        id
        title
        date (format: "D MMM YYYY")
        closes (format: "D MMM YYYY")
        closed
        continent
        location
        location_url
        external_url
        contact
        summary
        images
        image
        path
      }
    }
  }
}
</page-query>
