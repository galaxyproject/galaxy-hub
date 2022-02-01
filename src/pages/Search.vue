<template>
    <Layout>
        <div class="col-md-12">
            <section class="section-content">
                <b-row class="mb-4">
                    <b-col cols="8">
                        <h1 class="page-title">{{ $page.main.title }}</h1>
                        <div class="blurb markdown" v-html="$page.main.content" />
                    </b-col>
                    <b-col cols="4">
                        <b-img
                            class="m-3"
                            style="width: 11rem"
                            src="/images/undraw-illustrations/galactic-search.svg"
                            fluid
                            alt="Galactic search"
                        ></b-img>
                    </b-col>
                </b-row>
                <b-tabs v-if="query != ''">
                    <b-tab title="Pan-Galactic Google Search">
                        <gcse:searchresults-only></gcse:searchresults-only>
                    </b-tab>
                    <b-tab title="Galaxy Publication Search">
                        <p v-if="error">
                            <i class="fa fa-exclamation-triangle"></i>
                            {{ error }}
                        </p>
                        <ul v-else-if="zoteroResults" class="list-group list-group-flush">
                            <template v-if="zoteroResults.length > 0">
                                <li v-for="result of zoteroResults" :key="result.data.url" class="list-group-item">
                                    <h4>
                                        <a :href="result.data.url">{{ result.data.title }}</a>
                                    </h4>
                                    <p class="resultUrl">{{ result.data.url }}</p>
                                    <p v-if="result.data.abstractNote">
                                        {{ result.data.abstractNote.slice(0, 450) }}
                                    </p>
                                </li>
                            </template>
                            <p v-else>
                                Search finished for <strong>{{ query }}</strong> with no results. Please refine your
                                query and try again!
                            </p>
                        </ul>
                        <p v-else>
                            Loading Zotero Results
                            <i class="fa fa-spinner fa-spin"></i>
                        </p>
                    </b-tab>
                </b-tabs>
                <b-row v-else>
                    <b-col cols="12">
                        <b-form @submit.prevent="initSearch">
                            <b-form-input
                                v-model="searchInput"
                                id="input-1"
                                name="q"
                                placeholder="Search"
                                required
                            ></b-form-input>
                        </b-form>
                    </b-col>
                </b-row>
            </section>
        </div>
    </Layout>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            query: "",
            searchInput: "",
            zoteroResults: null,
            error: null,
        };
    },
    mounted() {
        let match = RegExp("[?&]q=([^&]*)").exec(window.location.search);
        let query = match && decodeURIComponent(match[1].replace(/\+/g, " "));
        if (query) {
            this.query = query;
            this.initSearch();
        }
    },
    methods: {
        createGoogleSearch() {
            var cx = "007594916903876912968:w0nrox8rzzy";
            var gcse = document.createElement("script");
            gcse.type = "text/javascript";
            gcse.async = true;
            gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(gcse, s);
        },
        zoteroSearch() {
            axios
                .get(`https://api.zotero.org/groups/1732893/items/top?start=0&limit=25&q=${this.query}`)
                .then((response) => {
                    this.zoteroResults = response.data;
                })
                .catch((error) => {
                    console.error("Zotero search failed:", error);
                    this.error = error;
                });
        },
        initSearch() {
            if (this.searchInput) {
                this.query = this.searchInput;
                this.$router.push({
                    query: { q: this.query },
                });
            }
            let searchInputField = document.getElementById("search-input");
            searchInputField.value = this.query;
            this.createGoogleSearch();
            this.zoteroSearch();
        },
    },
};
</script>

<page-query>
query {
  main: insert(path: "/insert:/search/main/") {
    id
    title
    content
    fileInfo {
      path
    }
  }
  footer: insert(path: "/insert:/search/footer/") {
    id
    title
    content
  }
}
</page-query>

<style scoped>
a.nav-link {
    cursor: pointer;
}
.resultUrl {
    color: #093;
}
</style>
