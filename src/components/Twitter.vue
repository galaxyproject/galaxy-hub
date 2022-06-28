<template>
    <a class="twitter-timeline" :data-width="`${width}`" :data-height="`${height}`" data-dnt="true" :href="link"
        ><slot></slot
    ></a>
</template>

<script>
// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
import { addTwitterScript } from "~/lib/client.mjs";
export default {
    props: {
        link: { type: String, required: true },
        height: { type: String, required: true },
        width: { type: String, required: true },
    },
    mounted() {
        addTwitterScript(window);
    },
};
</script>
