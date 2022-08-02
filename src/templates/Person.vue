<template>
    <Layout :subsite="$page.person.main_subsite" class="collection-person">
        <g-link to="/people/" class="link">&larr; Community Directory</g-link>
        <header>
            <h1 class="pageTitle">{{ $page.person.name }}</h1>
        </header>
        <div class="float-right image-box">
            <g-image v-if="$page.person.image" class="img-responsive" :src="getImage($page.person.image)" />
        </div>
        <ul class="metadata list-unstyled">
            <li v-if="$page.person.affiliations">
                <span class="metakey">Affiliations: </span>
                <template v-for="(affiliation, index) in $page.person.affiliations">
                    <template v-if="index > 0">, </template>
                    <g-link :to="`/sites/${affiliation.id}`" :key="affiliation.id">{{ affiliation.name }}</g-link>
                </template>
            </li>
            <li v-if="$page.person.email">
                <span class="metakey">Email:</span>
                {{ $page.person.email }}
            </li>
        </ul>
        <ul>
            <li v-if="$page.person.github">
                <a :href="`https://github.com/${$page.person.github}`">@{{ $page.person.github }}</a>
            </li>
            <li v-if="$page.person.website">
                <a :href="website_url">{{ $page.person.website }}</a>
            </li>
        </ul>
        <b-table
            v-if="$page.person.github"
            striped
            hover
            :items="galaxyRepoData($page.person.github)"
            :fields="fields"
        ></b-table>
        <div class="content markdown" v-html="$page.person.content" />
    </Layout>
</template>

<page-query>
query Person($path: String!) {
    person(path: $path) {
        id
        name
        content
        email
        phone
        website
        github
        orcid
        gitter
        matrix
        linkedin
        image
        images
        twitter
        subsites
        main_subsite
        google_scholar
        researchgate
        galaxy_help
        location {
            city
            country
        }
        affiliations {
            id
            name
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
export default {
    data() {
        return {
            fields: ["galaxy_repo", "contributions"],
            galaxyrepostring: "galaxyproject",
        };
    },
    metaInfo() {
        return {
            title: this.$page.person.name,
        };
    },
    methods: {
        mdToHtml,
        getImage(imagePath) {
            return getImage(imagePath, this.$page.person.images);
        },
        galaxyRepoData(github) {
            let repoData = [];
            const userGalaxyRepos = this.getGalaxyRepos(github);
            let contribFn = this.getContributions;
            // let galaxRepoString = this.galaxyrepostring;
            userGalaxyRepos.forEach(function (value, key) {
                //get contributions
                let pullCount = contribFn(github, key, "galaxyproject").length;
                repoData.push({ galaxy_repo: key, contributions: pullCount });
            });

            return repoData;
        },
        getGalaxyRepos(github) {
            let userRepos = this.getRepos(github, "users");
            let galaxyRepos = this.getRepos(this.galaxyrepostring, "orgs");
            let joinedRepos = new Map();
            userRepos.forEach((value, key) => {
                if (galaxyRepos.has(key)) {
                    joinedRepos.set(key, value);
                }
            });

            return joinedRepos;
        },
        getContributions(github, galaxyRepo, galaxyRepoString) {
            let pageNum = 1;
            let perPage = 100;
            let repoNames = [];
            let responseSize = 0;
            // Create new XMLHttpRequest object
            const xhr = new XMLHttpRequest();

            // When request is received
            // Process it here
            xhr.onload = function () {
                // Parse API data into JSON
                const data = JSON.parse(this.response);
                responseSize = data.length;
                // Save the response
                data.forEach(function (value) {
                    repoNames.push(value);
                });
            };

            do {
                // GitHub endpoint, dynamically passing in specified username
                const url = `https://api.github.com/repos/${galaxyRepoString}/${galaxyRepo}/issues?creator=${github}&state=all&page=${pageNum}&per_page=${perPage}`;
                // const url =
                //     `https://api.github.com/repos/assuntad23/${galaxyRepo}/pulls`;

                // Open a new connection, using a GET request via URL endpoint
                // Providing 3 arguments (GET/POST, The URL, Async True/False)
                xhr.open("GET", url, false);

                // Send the request to the server
                xhr.send();
                pageNum++;
            } while (responseSize % 100 == 0 && responseSize != 0);
            return repoNames;
        },
        getRepos(github, type) {
            let pageNum = 1;
            let perPage = 100;
            let repoNames = new Map();
            let responseSize = 0;
            // Create new XMLHttpRequest object
            const xhr = new XMLHttpRequest();

            // When request is received
            // Process it here
            xhr.onload = function () {
                // Parse API data into JSON
                const data = JSON.parse(this.response);
                responseSize = data.length;
                // Save the response
                data.forEach(function (value) {
                    repoNames.set(value.name, value);
                });
            };

            do {
                // GitHub endpoint, dynamically passing in specified username
                const url = `https://api.github.com/${type}/${github}/repos?per_page=${perPage}&page=${pageNum}`;

                // Open a new connection, using a GET request via URL endpoint
                // Providing 3 arguments (GET/POST, The URL, Async True/False)
                xhr.open("GET", url, false);

                // Send the request to the server
                xhr.send();
                pageNum++;
            } while (responseSize % 100 == 0 && responseSize != 0);
            return repoNames;
        },
    },
    computed: {
        website_url() {
            let website = this.$page.person.website;
            if (website.startsWith("http://") || website.startsWith("https://")) {
                return website;
            } else {
                return `https://${website}`;
            }
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
