<template>
    <Layout :subsite="$context.subsite">
        <h1 class="page-title">{{ $page.main ? $page.main.title : `${subsiteData.name} Events Archive` }}</h1>
        <div class="markdown" v-if="hasContent($page.main)" v-html="$page.main.content" />
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
import { hasContent } from "~/lib/pages.mjs";
import CONFIG from "~/../config.json";
export default {
    components: {
        ArticleTableEvents,
    },
    methods: {
        hasContent,
    },
    metaInfo() {
        return {
            title: this.$page.main ? this.$page.main.title : `${this.subsiteData.name} Events Archive`,
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
query($subsite: String, $mainPath: String, $footerPath: String) {
    main: insert(path: $mainPath) {
        id
        title
        content
        fileInfo {
            path
        }
    }
    footer: insert(path: $footerPath) {
        id
        title
        content
    }
    events: allParentArticle(
        sortBy: "date", order: DESC, filter: {
            subsites: {contains: [$subsite]}, category: {eq: "events"},
            has_date: {eq: true}, days_ago: {gt: 364}, draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                id
                title
                tease
                location {
                    name
                    url
                }
                continent
                contact
                contacts {
                    name
                    email
                    url
                }
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
