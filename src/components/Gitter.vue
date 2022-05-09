<template>
    <div class="gitter-embed-body"></div>
</template>

<script>
// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
function addGitter(window) {
    ((window.gitter = {}).chat = {}).options = { room: "galaxyproject/Lobby" };
    let body = document.querySelector("html > body");
    let script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://sidecar.gitter.im/dist/sidecar.v1.js";
    body.appendChild(script);
}
export default {
    mounted() {
        if (!window.gitter) {
            addGitter(window);
        }
    },
};
</script>
