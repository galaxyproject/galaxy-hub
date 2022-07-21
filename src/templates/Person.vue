<template>
    <Layout :subsite="subsite" class="collection-platform">
        <g-link to="/people/" class="link"> &larr; Community Directory</g-link>
        <header>
            <h1 class="pageTitle">{{ $page.person.name }}</h1>
        </header>
        <div class="float-right image-box">
            <g-image v-if="$page.person.image" class="img-responsive" :src="getImage($page.person.image)" />
        </div>
        <ul class="metadata list-unstyled">
            <li v-if="$page.person.affiliations">
                <span class="metakey">Affiliations:</span>
                <template v-for="affiliation in $page.person.affiliations">
                    <g-link :to="`/sites/${affiliation.id}`" :key="affiliation.id">{{ affiliation.name }}</g-link>,
                </template>
            </li>
            <li v-if="$page.person.email">
                <span class="metakey">Email:</span>
                {{ $page.person.email }}
            </li>
        </ul>
        <ul>
            <li v-if="$page.person.github">
                <a :href="`https://github.com/${$page.person.github}`">@{{ $page.person.github}}</a>
            </li>
            <li v-if="$page.person.website">
                <a :href="$page.person.website">{{ $page.person.website }}</a>
            </li>
        </ul>
        <div class="content markdown" v-html="$page.person.content" />
    </Layout>
</template>

<page-query>
query Person($path: String!) {
    person(path: $path) {
        id
        name
        email
        phone
        website
        github
        orcid
        gitter
        matrix
        linkedin
        twitter
        subsites
        google_scholar
        researchgate
        galaxy_help
        location {
            city
            country
        }
        fileInfo {
            path
        }
    }
}
</page-query>

<script>
import { mdToHtml } from "~/lib/utils.js";
import { getImage } from "~/lib/pages.mjs";
import { getRootSubsite } from "~/lib/site.js";
const ROOT_SUBSITE = getRootSubsite();
/*
        name
        subsites
        affiliations {
            id
            url
            name
        }
        email
        phone
        website
        github
        orcid
        gitter
        matrix
        linkedin
        twitter
        google-scholar
        researchgate
        galaxy_help
        location {
            city
            country
            geo
        }
        image
        fileInfo {
            path
        }
*/
export default {
    metaInfo() {
        return {
            title: this.$page.person.name,
        };
    },
    methods: {
        mdToHtml,
        getImage(imagePath) {
            return getImage(imagePath, this.$page.platform.images);
        },
    },
};
</script>

<style scoped>
.image-box {
    margin: 0px 0px 5px 10px;
    padding: 2px;
    border: 1px solid #ccc;
}
.image-box img {
    max-width: 100%;
}
table.summary {
    width: auto;
}
</style>
