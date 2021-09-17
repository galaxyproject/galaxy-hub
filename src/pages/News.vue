<template>
    <Layout>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
        <table class="table table-striped">
            <tbody>
                <ArticleTable v-for="edge in $page.articles.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
    </Layout>
</template>

<script>
import ArticleTable from "@/components/ArticleTable";
export default {
    components: {
        ArticleTable,
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
  main: insert(path: "/insert:/news/main/") {
    id
    title
    content
    fileInfo {
      path
    }
  }
  footer: insert(path: "/insert:/news/footer/") {
    id
    title
    content
  }
  articles: allArticle(sortBy: "date", order: DESC, filter: {category: {eq: "news"}, draft: {ne: true}}) {
    totalCount
    edges {
      node {
        id
        title
        tease
        external_url
        date (format: "D MMMM YYYY")
        path
      }
    }
  }
}
</page-query>
