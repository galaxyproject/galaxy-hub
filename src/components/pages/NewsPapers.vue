<template>
    <Layout :subsite="$context.subsite">
        <h1 class="page-title">{{ $page.main ? $page.main.title : `${subsiteData.name} Papers in News` }}</h1>
        <div class="markdown" v-if="hasContent($page.main)" v-html="$page.main.content" />
        <table class="table table-striped">
            <tbody>
                <ArticleTable v-for="edge in $page.articles.edges" :key="edge.node.id" :article="edge.node" />
            </tbody>
        </table>
    </Layout>
</template>

<script>
import ArticleTable from "@/components/ArticleTable";
import { hasContent } from "~/lib/pages.mjs";
import CONFIG from "~/../config.json";
export default {
    components: {
        ArticleTable,
    },
    methods: {
        hasContent,
    },
    metaInfo() {
        return {
            title: this.$page.main ? this.$page.main.title : `${this.subsiteData.name} News`,
        };
    },
    computed: {
        subsiteData() {
            return CONFIG.subsites.all[this.$context.subsite];
        },
    },
};
</script>

<page-query>
query($subsite: String, $mainPath: String) {
    main: insert(path: $mainPath) {
        id
        title
        content
        fileInfo {
            path
        }
    }
    articles: allParentArticle(   
    sortBy: "date", order: DESC, filter: {
      category: {eq: "news"}, draft: {ne: true}, tags: {contains: ["paper"]}
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
