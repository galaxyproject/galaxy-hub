<template>
    <component :is="currentLayout">
        <p v-html="$page.main.content" class="mb-4"></p>

        <h2>
            {{ $page.datasetLinks.heading }}
        </h2>

        <div class="external-links mb">
            <b-button
                v-for="(link, i) in $page.datasetLinks.external_links"
                class="border-0"
                :key="i"
                :title="link.name"
                :href="link.url"
                variant="outline-secondary"
            >
                <div class="mx-auto">
                    <g-image :src="link.image" :alt="link.name" />
                </div>
            </b-button>
        </div>

        <div class="news-and-events mb">
            <div class="card shadow-sm bg-light rounded border-0">
                <h2 class="card-header mt-0">
                    <span class="icon fas fa-bullhorn mr-1" />
                    News
                </h2>
                <div class="card-body p-2">
                    <div>
                        <ItemListBrief v-for="edge in $page.news.edges" :key="edge.id" :item="edge.node" />
                    </div>
                    <a :href="esgUrl('/projects/esg/news')" class="btn btn-secondary border-0 btn-sm w-75">
                        <b>More News</b>
                    </a>
                </div>
            </div>

            <div class="card shadow-sm bg-light rounded border-0">
                <h2 class="card-header mt-0">
                    <span class="icon far fa-calendar-alt mr-1" />
                    Events
                </h2>
                <div class="card-body p-2">
                    <div>
                        <ItemListBrief v-for="edge in $page.events.edges" :key="edge.id" :item="edge.node" />
                    </div>
                    <a :href="esgUrl('/projects/esg/events')" class="btn btn-secondary border-0 btn-sm w-75">
                        <b>More Events</b>
                    </a>
                </div>
            </div>

            <div class="card shadow-sm bg-light rounded border-0">
                <h2 class="card-header mt-0">
                    <span class="icon fab fa-twitter mr-1" />
                    Twitter
                </h2>
                <div class="card-body p-2">
                    <Twitter link="https://twitter.com/galaxyproject" height="410" width="100%" />
                </div>
            </div>
        </div>

        <Partners
            title="Project Partners"
            pathPrefix="/projects/esg/partner-logos/"
            class="mb"
            :partners="$page.datasetPartners.partners"
        />
    </component>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import EsgLayout from "~/layouts/ESG.vue";
import Partners from "~/components/Partners.vue";
import Twitter from "~/components/Twitter.vue";
import ItemListBrief from "~/components/ItemListBrief.vue";

export default {
    components: {
        Layout,
        EsgLayout,
        Partners,
        Twitter,
        ItemListBrief,
    },
    data() {
        return {
            currentLayout: Layout,
        };
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
    created() {
        if (this.$route.query.solo) {
            this.currentLayout = EsgLayout;
        }
    },
    methods: {
        esgUrl(url) {
            if (this.$route.query.solo) {
                return `${url}?solo=true`;
            } else {
                return url;
            }
        },
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

    datasetPartners: dataset(path: "/dataset:/projects/esg/partners/") {
        partners {
            name,
            image (width: 140),
            website
        }
    }

    datasetLinks: dataset(path: "/dataset:/projects/esg/external_links/") {
        heading,
        external_links {
            name,
            image (width: 320),
            url
        }
    }

    news: allArticle(
        limit: 6, filter: {category: {eq: "news" }, subsites: {contains: ["global"]}, draft: {ne: true}}
    ) {
        edges {
            node {
                ...articleFields
            }
        }
    }

    events: allArticle(
        limit: 5, sortBy: "date", order: ASC,
        filter: {
            category: {eq: "events"}, subsites: {contains: ["global"]}, has_date: {eq: true}, days_ago: {lte: 0},
            draft: {ne: true}
        }
    ) {
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
// keep images in markdown from overflowing
p {
    &::v-deep img {
        max-width: 100%;
    }
}

.external-links {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;

    img {
        height: 64px;
        width: auto;
    }
}

.mb {
    margin-bottom: 3rem;
}

// bootstrap override
div.card::v-deep p {
    padding: unset;
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

    & .card > .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & > a {
            align-self: center;
            max-width: 250px;
        }
    }
}
</style>
