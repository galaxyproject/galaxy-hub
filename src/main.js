// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/assets/styles.scss";

import DefaultLayout from "~/layouts/Default.vue";
import LinkBox from "~/components/LinkBox.vue";
import VegaEmbed from "~/components/VegaEmbed.vue";
import MarkdownEmbed from "~/components/MarkdownEmbed.vue";
import Twitter from "~/components/Twitter.vue";
import Mastodon from "~/components/Mastodon.vue";
import VideoPlayer from "~/components/VideoPlayer.vue";
import Carousel from "~/components/Carousel.vue";
import CalendarEmbed from "~/components/CalendarEmbed.vue";

import BootstrapVue from "bootstrap-vue";

//eslint-disable-next-line no-unused-vars
export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.component("LinkBox", LinkBox);
    Vue.component("VegaEmbed", VegaEmbed);
    Vue.component("MarkdownEmbed", MarkdownEmbed);
    Vue.component("Twitter", Twitter);
    Vue.component("Mastodon", Mastodon);
    Vue.component("VideoPlayer", VideoPlayer);
    Vue.component("Carousel", Carousel);
    Vue.component("CalendarEmbed", CalendarEmbed);

    Vue.use(BootstrapVue);
    Vue.config.ignoredElements = ["gcse:search", "gcse:searchresults-only"];
}
