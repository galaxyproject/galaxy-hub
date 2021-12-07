// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/assets/styles.scss";
import "~/assets/covid.styl";

import DefaultLayout from "~/layouts/Default.vue";
import LinkBox from "~/components/LinkBox.vue";
import FlatShield from "~/components/FlatShield.vue";
import DeferredIframe from "~/components/DeferredIframe.vue";
// Significant dependencies are required if we do want embedded jupyter notebooks
//import JupyterNotebook from "~/components/JupyterNotebook.vue";
import ObservableNotebook from "~/components/ObservableNotebook.vue";

import BootstrapVue from "bootstrap-vue";

//eslint-disable-next-line no-unused-vars
export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.component("LinkBox", LinkBox);
    Vue.component("FlatShield", FlatShield);
    Vue.component("DeferredIframe", DeferredIframe);
    //Vue.component("JupyterNotebook", JupyterNotebook);
    Vue.component("ObservableNotebook", ObservableNotebook);

    Vue.use(BootstrapVue);
    Vue.config.ignoredElements = ["gcse:search", "gcse:searchresults-only"];
}
