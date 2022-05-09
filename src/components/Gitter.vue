<script>
// This is in a component instead of a function so that static pages can use it by embedding it in their Markdown.
export default {
    mounted() {
        ((window.gitter = {}).chat = {}).options = { room: "galaxyproject/Lobby" };
        let head = document.querySelector("html > head");
        let script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = "https://sidecar.gitter.im/dist/sidecar.v1.js";
        head.appendChild(script);
    },
};
</script>
