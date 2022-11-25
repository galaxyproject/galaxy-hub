<template>
    <EsgLayout>
        <div v-if="!$route.query.tag" v-html="$page.main.content" class="mb-4"></div>
        <div v-else>
            <h1>{{ title }}</h1>
            {{ description }}
        </div>

        <table class="table table-striped">
            <tbody>
                <ArticleTable v-for="edge in articles" :key="edge.node.id" :article="edge.node" />
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
    computed: {
        title() {
            const tag = this.$route.query.tag;
            const prefix = "News about ";

            switch (tag) {
                case "esg-wp1":
                    return prefix + this.$page.datasetWorkPackages.wp1.title;
                case "esg-wp2":
                    return prefix + this.$page.datasetWorkPackages.wp2.title;
                case "esg-wp3":
                    return prefix + this.$page.datasetWorkPackages.wp3.title;
                case "esg-wp4":
                    return prefix + this.$page.datasetWorkPackages.wp4.title;
                case "esg-wp5":
                    return prefix + this.$page.datasetWorkPackages.wp5.title;
                default:
                    return this.$page.main.title;
            }
        },
        description() {
            const tag = this.$route.query.tag;

            switch (tag) {
                case "esg-wp1":
                    return this.$page.datasetWorkPackages.wp1.content;
                case "esg-wp2":
                    return this.$page.datasetWorkPackages.wp2.content;
                case "esg-wp3":
                    return this.$page.datasetWorkPackages.wp3.content;
                case "esg-wp4":
                    return this.$page.datasetWorkPackages.wp4.content;
                case "esg-wp5":
                    return this.$page.datasetWorkPackages.wp5.content;
                default:
                    return this.$page.main.description;
            }
        },
        articles() {
            const tag = this.$route.query.tag;
            const articles = this.$page.articles.edges;

            if (!tag) {
                return articles;
            } else {
                return articles.filter((article) => article.node.tags.includes(tag));
            }
        },
    },
    metaInfo() {
        return {
            title: this.title || this.$page.main.title,
            meta: [
                {
                    name: "description",
                    content: this.description || this.$page.main.description,
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

    datasetWorkPackages: dataset(path: "/dataset:/projects/esg/work_packages/") {
        wp1 {
            title,
            content
        },
        wp2 {
            title,
            content
        },
        wp3 {
            title,
            content
        },
        wp4 {
            title,
            content
        },
        wp5 {
            title,
            content
        },
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
                tags
            }
        }
    }
}
</page-query>
