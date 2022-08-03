<template>
    <div class="item-list-brief">
        <span class="date" v-if="fields.date">{{ fields.date }}</span>
        <g-link class="title" :to="fields.link" :target="target">{{ fields.title }}</g-link>
        <span class="tease" v-if="fields.tease">
            &ndash;
            <span class="markdown" v-html="mdToHtml(fields.tease)"></span>
        </span>
    </div>
</template>

<script>
import { mdToHtml } from "~/lib/utils.js";
export default {
    props: {
        // Can be an Article, a VueArticle, or any object with a `title`, `link`, and (optionally) a `tease` field.
        item: { type: Object, required: true },
        target: { type: String, required: false, default: "" },
    },
    methods: {
        mdToHtml,
    },
    computed: {
        fields() {
            /** Normalize the input object into a standard set of fields.
             *  This will parse the metadata from an Article into the standard set of "item" fields.
             */
            let fields = {
                date: this.item.date,
                title: this.item.title,
                link: this.item.link || this.item.external_url || this.item.path,
                tease: this.item.tease || "",
            };
            if (this.item.location) {
                fields.tease += ` ${this.item.location} `;
            }
            if (this.item.closes) {
                // The date a job opening closes.
                fields.tease += `*Apply by ${this.item.closes}.*`;
            }
            return fields;
        },
    },
};
</script>

<style scoped>
.item-list-brief {
    padding: 8px 12px;
    margin: 0;
    border-top: 1px solid #ddd;
}
.date {
    padding-right: 8px;
    font-weight: bold;
}
.title {
    font-weight: bold;
}
.tease {
    font-size: 80%;
}
</style>
