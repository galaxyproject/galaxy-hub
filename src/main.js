// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/assets/styles.scss";

import DefaultLayout from "~/layouts/Default.vue";
import LinkBox from "~/components/LinkBox.vue";
import VegaEmbed from "~/components/VegaEmbed.vue";
import MarkdownEmbed from "~/components/MarkdownEmbed.vue";
import { Tweet, Timeline } from "vue-tweet-embed";

import BootstrapVue from "bootstrap-vue";

//eslint-disable-next-line no-unused-vars
export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.component("LinkBox", LinkBox);
    Vue.component("VegaEmbed", VegaEmbed);
    Vue.component("MarkdownEmbed", MarkdownEmbed);
    Vue.component("Tweet", Tweet);
    Vue.component("Timeline", Timeline);

    Vue.use(BootstrapVue);
    Vue.config.ignoredElements = ["gcse:search", "gcse:searchresults-only"];
}
