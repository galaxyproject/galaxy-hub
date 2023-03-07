<template>
    <div>
        <div :id="containerId"></div>
        <!-- Should *not* need this buytickets id, but eventzilla widget lib crashes without it on the page?  What's going on here?  Must be something in eventzilla docs  -->
        <div id="Eventzilla-BuyTickets"></div>
    </div>
</template>

<script>
// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
function addEventzilla(eventId) {
    let body = document.querySelector("html > body");
    let script = document.createElement("script");
    script.async = true;
    script.defer = true;
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
    },
};
</script>
