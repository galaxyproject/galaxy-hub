<template>
    <div :id="containerId"></div>
</template>

<script>
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
        addEventzilla(this.event);
        setTimeout(() => {
            // Clunky, but we can iterate on this or manually invoke it in the future.
            // Just for example purposes.
            // Wait 2 seconds and then re-fire the page load event that eventzilla is listening for
            window.dispatchEvent(new Event("load"));
        }, 2000);
    },
};
</script>
