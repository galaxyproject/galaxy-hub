<template>
    <HomeCard
        title="Recent Publications"
        link="https://www.zotero.org/groups/galaxy"
        icon="fas fa-book-open"
        :items="itemsToShow"
        :width="12" />
</template>

<script>
import HomeCard from "@/components/HomeCard";
import axios from "axios";

const TEASE_TEMPLATE = (
    item
) => `<span class='altmetric-embed float-right' data-badge-type='donut' data-doi='${item.data.DOI}'></span>
${item.meta.creatorSummary}
*${item.data.extra}*`;

// Journal -- if no publicationTitle, use 'preprint'
// Add year, volume (if available)
// Use donut for altmetric.
// Add a loading spinner

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
    computed: {
        itemsToShow() {
            if (this.items) {
                return this.items.map((item) => {
                    return {
                        title: item.data.title,
                        link: item.data.url,
                        tease: TEASE_TEMPLATE(item),
                    };
                });
            } else {
                return [];
            }
        },
    },
    components: {
        HomeCard,
    },
    methods: {
        fetchPubs() {
            //fetch data from https://api.zotero.org/groups/1732893/items/top?start=0&limit=5, and then render the data
            axios
                .get(`https://api.zotero.org/groups/1732893/items/top?start=0&limit=${this.limit}`)
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            if (typeof _altmetric_embed_init !== "undefined") {
                _altmetric_embed_init.embeds.init();
            }
        },
    },
    mounted() {
        this.fetchPubs();
        // if altmetric is loaded, call init
        //_altmetric_embed_init('#new-container');
        const altmetricScript = document.createElement("script");
        altmetricScript.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
        document.head.appendChild(altmetricScript);
    },
};
</script>

<style lang="scss" scoped></style>
