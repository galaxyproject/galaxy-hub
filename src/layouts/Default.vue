<template>
    <div :class="rootClasses">
        <header v-if="showHomeNav()" id="masthead" class="mastheadHome">
            <NavBar :subsite="subsite" :show-home-nav="showHomeNav()" />
        </header>
        <header v-else id="masthead">
            <NavBar :subsite="subsite" />
        </header>
        <main id="maincontainer" :class="showHomeNav() ? 'container-fluid-real p-0' : 'container'">
            <slot />
        </main>
        <FooterProject v-if="showHomeNav()" :citation="footer.content" />
        <footer v-else-if="footer" class="static-footer">
            <div class="markdown container" v-html="footer.content" />
        </footer>
        <Gitter :room="gitter" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterProject from "@/components/FooterProject";
import Gitter from "@/components/Gitter";
import CONFIG from "~/../config.json";
import { rmPrefix, rmSuffix } from "~/lib/utils.js";

export default {
    components: {
        NavBar,
        FooterProject,
        Gitter,
    },
    props: {
        subsite: { type: String, required: false, default: CONFIG.subsites.default },
    },
    computed: {
        routePath(){
            return this.$route.path;
        },
        rootClasses() {
            let classes = ["layout"];
            if (this.subsite) {
                classes.push(this.subsite);
            }
            if (classes.includes("global") && this.routePath === "/") {
                classes.push("layoutHome");
            }
            return classes;
        },
        gitter() {
            return CONFIG.subsites.all[this.subsite]?.gitter || CONFIG.subsites.all[CONFIG.subsites.default]?.gitter;
        },
        footer() {
            let footers = compileFooters(this.$static.footers.edges);
            return footers[this.subsite];
        },
    },
    methods: {
        showHomeNav() {
            // return rootClasses.includes('global') && window.location.pathname === '/';
            return this.routePath === "/";
        },
    },
};
function compileFooters(edges) {
    let footers = {};
    for (let edge of edges) {
        let footer = edge.node;
        let subsite;
        if (footer.path === "/insert:/site-footer/") {
            subsite = CONFIG.subsites.default;
        } else {
            subsite = rmSuffix(rmPrefix(footer.path, "/insert:/"), "/site-footer/");
        }
        footers[subsite] = footer;
    }
    return footers;
}
</script>

<static-query>
query {
    metadata {
        siteName
    }
    footers: allInsert(filter: {path: {regex: "^/insert:/([^/]+/)?site-footer/$"}}) {
        totalCount
        edges {
            node {
                id
                path
                title
                content
                fileInfo {
                    path
                }
            }
        }
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
