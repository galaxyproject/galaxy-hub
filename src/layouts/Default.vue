<template>
    <div :class="rootClasses">
        <header id="masthead">
            <NavBar :subsite="subsite" />
        </header>
        <main id="maincontainer" class="container">
            <slot />
        </main>
        <footer class="static-footer" v-if="$static.footer">
            <div class="markdown container" v-html="$static.footer.content" />
        </footer>
        <Gitter />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Gitter from "@/components/Gitter";
import { getSingleKey } from "~/lib/utils.js";
import CONFIG from "~/../config.json";
const ROOT_SUBSITE = getSingleKey(CONFIG.subsites.hierarchy);
export default {
    components: {
        NavBar,
        Gitter,
    },
    props: {
        subsite: { type: String, required: false, default: ROOT_SUBSITE },
    },
    computed: {
        rootClasses() {
            let classes = ["layout"];
            if (this.subsite) {
                classes.push(this.subsite);
            }
            return classes;
        },
    },
    mounted() {
        // Google Analytics tag.
        addGATag();
    },
};
function addGATag() {
    //TODO: Replace with vue-gtag.
    (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
            i[r] ||
            function () {
                (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
    /* global ga */
    ga("create", "UA-45719423-4", "auto");
    ga("send", "pageview");
}
</script>

<static-query>
query {
    metadata {
        siteName
    }
    footer: insert(path: "/insert:/site-footer/") {
        id
        title
        content
    }
}
</static-query>

<style scoped>
.static-footer {
    width: 100%;
    bottom: 0;
    padding-bottom: 0.5rem;
}
</style>
