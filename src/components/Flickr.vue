<template>
    <a :title="title" :href="link" data-flickr-embed="true" data-context="true">
        <img v-if="cover" :src="cover" :alt="title" :width="coverWidth" :height="coverHeight" />
    </a>
</template>

<script>
// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
import { addFlickrScript } from "~/lib/client.mjs";
export default {
    props: {
        link: { type: String, required: true },
        title: { type: String, required: false, default: "" },
        cover: { type: String, required: false, default: "" },
        coverWidth: { type: String, required: false, default: "" },
        coverHeight: { type: String, required: false, default: "" },
    },
    mounted() {
        addFlickrScript(window);
    },
};
</script>
