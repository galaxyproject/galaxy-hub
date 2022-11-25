<template>
    <EsgLayout>
        <div v-html="$page.main.content" class="mb-4"></div>
        <table class="table table-striped">
            <tbody>
                <ArticleTable v-for="edge in $page.articles.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
    </EsgLayout>
</template>

<script>
import EsgLayout from "~/layouts/ESG.vue";
import ArticleTable from "~/components/ArticleTable";

export default {
    components: {
        EsgLayout,
        ArticleTable,
    },
    metaInfo() {
        return {
            title: this.$page.main.title,
            meta: [
                {
                    name: "description",
                    content: this.$page.main.description,
                },
            ],
        };
    },
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/projects/esg/news/") {
        title,
        description,
        content
    }

    articles: allParentArticle(
            sortBy: "date", order: DESC, filter: {
                category: {eq: "news"}, subsites: {contains: ["esg"]}, draft: {ne: true}
            }
        ) {
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
