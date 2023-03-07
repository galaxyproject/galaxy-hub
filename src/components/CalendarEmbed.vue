<template>
    <div :id="containerId"></div>
</template>

<script>
import Vue from "vue";

// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
function addEventzilla(eventId) {
    // Wait until the dom is ready and then inject the script
    let body = document.querySelector("html > body");
    let script = document.createElement("script");
    script.src = "https://cdn.eventzilla.net/embed/js/ez_widgets.js";
    script.setAttribute("data-widget-type", "eventzilla-evagenda-i");
    script.setAttribute("data-target-id", eventId);
    body.appendChild(script);
}

export default {
    props: {
        event: { type: String, required: true },
    },
    computed: {
        containerId() {
            return `eventzilla-widget-container-a-${this.event}`;
        },
    },
    mounted() {
        Vue.nextTick(() => {
            addEventzilla(this.event);
        });
    },
};
</script>
