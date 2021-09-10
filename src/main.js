// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import BootstrapVue from "bootstrap-vue";

import "~/assets/styles.scss";
import "bootstrap";

export default function (Vue, { router, head, isClient }) {
    head.script.push({
        src: "https://sidecar.gitter.im/dist/sidecar.v1.js",
        async: true,
        defer: true,
    });
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.use(BootstrapVue);
}
