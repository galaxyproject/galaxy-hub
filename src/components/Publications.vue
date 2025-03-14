<template>
    <div class="pseudo-card col-sm-12">
        <h2>
            <g-link to="https://www.zotero.org/groups/galaxy">
                <span :class="`icon fas fa-book-open`"></span>
                <b>Recent Publications</b>
            </g-link>
        </h2>
        <b-row class="mb-2" v-for="(item, i) in this.items" :key="i">
            <b-col cols="11">
                <g-link class="title" :to="item.data.url">{{ item.data.title }}</g-link>
                <br />
                <div class="tease">
                    {{ item.meta.creatorSummary }},
                    {{ item.data.journalAbbreviation ? item.data.journalAbbreviation : "preprint" }},
                    {{ item.data.date }}.
                </div>
            </b-col>
            <b-col cols="1">
                <span class="altmetric-embed" data-badge-type="donut" :data-doi="item.data.DOI"></span>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        limit: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            items: [],
        };
    },
    methods: {
        initAltmetric() {
            setTimeout(() => {
                if (typeof window._altmetric_embed_init !== "undefined") {
                    window._altmetric_embed_init();
                } else {
                    this.initAltmetric();
                }
            }, 100);
        },
        fetchPubs() {
            axios
                .get(`https://api.zotero.org/groups/1732893/items/top?start=0&limit=${this.limit}`)
                .then((response) => {
                    this.items = response.data;
                    this.initAltmetric();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        // Inject altmetric scripts and kick off pub fetch
        const altmetricScript = document.createElement("script");
        altmetricScript.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
        document.head.appendChild(altmetricScript);
        this.fetchPubs();
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles.scss";

.pseudo-card {
    background-color: $gray-200;
    border: 4px solid white;
    border-radius: 8px;
}
h2 .icon {
    margin-right: 0.7em;
}
.content.markdown::v-deep p {
    font-size: 80%;
}
.content.markdown::v-deep a {
    font-size: 120%;
}
.title {
    font-weight: bold;
}
.tease {
    font-size: 80%;
}
</style>
