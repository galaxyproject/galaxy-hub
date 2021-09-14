<template>
    <Layout>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Author(s)</th>
                    <th>Topic</th>
                </tr>
            </thead>
            <tbody>
                <ArticleTableBlog v-for="edge in $page.articles.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
        <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
    </Layout>
</template>

<script>
import ArticleTableBlog from "@/components/ArticleTableBlog";
export default {
    components: {
        ArticleTableBlog,
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
  main: insert(path: "/insert:/blog/main/") {
    id
    title
    content
  }
  footer: insert(path: "/insert:/blog/footer/") {
    id
    title
    content
  }
  articles: allArticle(sortBy: "date", order: DESC, filter: {category: {eq: "blog"}, draft: {ne: true}}) {
    totalCount
    edges {
      node {
        id
        title
        tease
        authors
        source_blog
        source_blog_url
        external_url
        date (format: "D MMM YYYY")
        path
      }
    }
  }
}
</page-query>
