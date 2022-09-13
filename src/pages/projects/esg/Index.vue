<template>
    <Layout>
        <p v-html="$page.main.content" class="mb-4"></p>

        <div class="news-and-events mb-4">
            <div class="card shadow-sm bg-light rounded border-0">
                <h2 class="card-header mt-0">News</h2>
                <div class="card-body p-2">

                </div>
            </div>

            <div class="card shadow-sm bg-light rounded border-0">
                <h2 class="card-header mt-0">Events</h2>
                <div class="card-body p-2">
                    
                </div>
            </div>

            <div class="card shadow-sm bg-light rounded border-0">
                <h2 class="card-header mt-0">Twitter</h2>
                <div class="card-body p-2">
                    <Twitter link="https://twitter.com/galaxyproject" height="410" width="100%"/>
                </div>
            </div>
        </div>

        <Partners title="Project Partners" pathPrefix="/projects/esg/partner-logos/" :partners="$page.dataset.partners"/>
    </Layout>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import Partners from "~/components/Partners.vue";
import Twitter from "~/components/Twitter.vue";

export default {
    components: {
        Layout,
        Partners,
        Twitter,
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
    main: insert(path: "/insert:/projects/esg/main/") {
        title,
        description,
        content
    }

    dataset(path: "/dataset:/projects/esg/partners/") {
        partners {
            name,
            image (width: 140),
            website
        }
    }

    news: allArticle(
        limit: 5, filter: {category: {eq: "news" }, subsites: {contains: ["esg"]}, draft: {ne: true}}
    ) {
        totalCount
        edges {
            node {
                ...articleFields
            }
        }
    }

    events: allArticle(
        limit: 5, sortBy: "date", order: ASC,
        filter: {
            category: {eq: "events"}, subsites: {contains: ["esg"]}, has_date: {eq: true}, days_ago: {lte: 0},
            draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                ...articleFields
                date (format: "MMM D")
                end  (format: "MMM D")
            }
        }
    }
}

fragment articleFields on Article {
    id
    title
    tease
    external_url
    path
}
</page-query>

<style lang="scss" scoped>
p {
    &::v-deep img {
        max-width: 100%;
    }
}

.news-and-events {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 2rem;

    // makes sure the twitter component doesn't expand this element on load
    min-height: 30rem;

    & > * {
        width: 100%;
    }

    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }
}
</style>
