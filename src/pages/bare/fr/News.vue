<template>
    <!-- This first div gets `id="app"` automatically. -->
    <div>
        <div id="maincontainer" class="container">
            <h1 class="page-title">{{ $page.main.title }}</h1>
            <div class="markdown" v-if="hasContent($page.main)" v-html="$page.main.content" />
            <table class="table table-striped">
                <tbody>
                    <ArticleTable v-for="edge in $page.articles.edges" :key="edge.node.id" :article="edge.node" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ArticleTable from "@/components/ArticleTable";
import { hasContent } from "~/lib/pages.mjs";
export default {
    components: {
        ArticleTable,
    },
    methods: {
        hasContent,
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
    main: insert(path: "/insert:/ifb/news/main/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
    articles: allParentArticle(
            sortBy: "date", order: DESC, filter: {
                category: {eq: "news"}, subsites: {contains: ["fr"]}, draft: {ne: true}
            }
        ) {
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
