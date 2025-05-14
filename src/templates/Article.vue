<template>
    <Layout :subsite="$page.article.main_subsite || undefined" class="collection-article">
        <ArticleHeader :article="$page.article" />
        <div :class="['content', 'markdown', ...mdClasses]" v-html="$page.article.content" />
        <Supporters
            v-if="filteredSupporters.length"
            title="Supporters"
            pathPrefix="/images/logos/"
            class="mb-4 blue-card"
            :supporters="filteredSupporters"
        />
        <ArticleFooter :article="$page.article" />
    </Layout>
</template>

<page-query>
query Article($path: String!) {
    article: article(path: $path) {
        id
        title
        tease
        hide_tease
        hide_metadata
        pretitle
        subsites
        main_subsite
        category
        date (format: "YYYY-MM-DD")
        end (format: "YYYY-MM-DD")
        contact
        contacts {
            name
            email
            url
        }
        authors
        location {
            name
            url
        }
        source_blog
        source_blog_url
        skip_title_render
        redirect
        external_url
        autotoc
        links {
            url
            text
        }
        image
        images
        fileInfo {
            path
        }
        path
        content
        supporters
    }
    datasetSupporters: dataset(path: "/dataset:/supporters/") {
        supporters {
            name,
            image (width: 140),
            website
        }
    }
}
</page-query>

<script>
import { addTocClass } from "~/lib/pages.mjs";
import ArticleHeader from "@/components/ArticleHeader";
import Supporters from "~/components/Supporters.vue";
import ArticleFooter from "@/components/ArticleFooter";
export default {
    components: {
        ArticleHeader,
        Supporters,
        ArticleFooter,
    },
    computed: {
        mdClasses() {
            let classes = [];
            addTocClass(classes, this.$page.article);
            return classes;
        },
        filteredSupporters() {
            const articleSupporterNames = this.$page.article.supporters || [];
            const allSupporters = this.$page.datasetSupporters.supporters || [];

            // Return only the supporters mentioned in the article's front matter
            return allSupporters.filter((s) => articleSupporterNames.includes(s.name));
        },
    },
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
