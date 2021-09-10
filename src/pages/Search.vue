<template>
    <Layout>
        <div class="col-md-12">
            <section class="section-content">
                <h1 class="page-title">{{ $page.main.title }}</h1>
                <div class="blurb markdown" v-html="$page.main.content" />
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a
                            id="google-tab"
                            class="nav-link active"
                            href="#google-pane"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="google-pane"
                            aria-selected="true"
                        >
                            Pan-Galactic Google Search
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            id="zotero-tab"
                            class="nav-link"
                            href="#zotero-pane"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="zotero-pane"
                            aria-selected="false"
                        >
                            Galaxy Publication Search
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div
                        id="google-pane"
                        class="tab-pane active show"
                        data-toggle-group="search-panes"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        <gcse:searchresults-only></gcse:searchresults-only>
                    </div>
                    <div
                        id="zotero-pane"
                        class="tab-pane"
                        data-toggle-group="search-panes"
                        role="tabpanel"
                        aria-labelledby="zotero-tab"
                    >
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
                    </div>
                </div>
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
            zoteroResults: null,
            error: null,
        };
    },
    mounted() {
        createGoogleSearch();
        zoteroSearchOnLoad(this);
    },
};
function createGoogleSearch() {
    var cx = "007594916903876912968:w0nrox8rzzy";
    var gcse = document.createElement("script");
    gcse.type = "text/javascript";
    gcse.async = true;
    gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(gcse, s);
}
function zoteroSearchOnLoad(instance) {
    let match = RegExp("[?&]q=([^&]*)").exec(window.location.search);
    let query = match && decodeURIComponent(match[1].replace(/\+/g, " "));
    if (query) {
        instance.query = query;
    } else {
        console.error("Could not find a search query in the page url.");
        return;
    }
    let searchInput = document.getElementById("search-input");
    searchInput.value = query;
    axios
        .get(`https://api.zotero.org/groups/1732893/items/top?start=0&limit=25&q=${query}`)
        .then((response) => {
            instance.zoteroResults = response.data;
        })
        .catch((error) => {
            console.error("Zotero search failed:", error);
            instance.error = error;
        });
}
</script>

<page-query>
query {
  main: insert(path: "/insert:/search/main/") {
    id
    title
    content
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
