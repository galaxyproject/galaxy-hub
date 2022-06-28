<template>
    <p>
        <g-link class="title" :to="fields.link">{{ fields.title }}</g-link>
        <span class="tease" v-if="fields.tease">
            &ndash;
            <span class="markdown" v-html="mdToHtml(fields.tease)"></span>
        </span>
    </p>
</template>

<script>
import { mdToHtml } from "~/lib/utils.js";
export default {
    props: {
        // Can be an Article, a VueArticle, or any object with a `title`, `link`, and (optionally) a `tease` field.
        item: { type: Object, required: true },
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
                title: this.item.title,
                link: this.item.link || this.item.external_url || this.item.path,
                tease: this.item.tease || "",
            };
            if (this.item.date) {
                fields.tease = `*${this.item.date}.* ${fields.tease}`;
            }
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
.title {
    font-weight: bold;
}
.tease {
    font-size: 80%;
}
</style>
