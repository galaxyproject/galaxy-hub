<template>
    <div class="gitter-embed-body"></div>
</template>

<script>
// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
import { getRootSubsite } from "~/lib/site.js";
import CONFIG from "~/../config.json";
const ROOT_SUBSITE = getRootSubsite();
function addGitter(window, room) {
    ((window.gitter = {}).chat = {}).options = { room: room };
    let body = document.querySelector("html > body");
    let script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://sidecar.gitter.im/dist/sidecar.v1.js";
    body.appendChild(script);
}
export default {
    props: {
        room: { type: String, required: false, default: "" },
    },
    mounted() {
        if (!window.gitter) {
            let room = this.room || CONFIG.subsites.all[ROOT_SUBSITE]?.gitter;
            addGitter(window, room);
        }
    },
};
</script>
