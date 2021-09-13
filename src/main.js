// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/assets/styles.scss";

import DefaultLayout from "~/layouts/Default.vue";
import BootstrapVue from "bootstrap-vue";

export default function (Vue, { router, head, isClient }) {
    head.script.push({
        src: "//unpkg.com/jquery@3.3.1/dist/jquery.slim.min.js",
        async: false,
        defer: false,
    });
    head.script.push({
        src: "//unpkg.com/bootstrap@4.5.0/dist/js/bootstrap.min.js",
        body: true,
        async: false,
        defer: false,
    });
    head.script.push({
        src: "https://sidecar.gitter.im/dist/sidecar.v1.js",
        async: true,
        defer: true,
    });
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.use(BootstrapVue);
    Vue.config.ignoredElements = ["gcse:search", "gcse:searchresults-only"];
}
