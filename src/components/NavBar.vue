<template>
    <div :class="classes" :style="style">
        <b-navbar class="container" toggleable="lg" :type="theme" variant="transparent">
            <b-navbar-brand to="/">
                <img id="masthead-logo" :src="logoUrl" alt="Galaxy Community Hub" height="30" />
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-brand id="subsite-name" :to="`${pathPrefix}/`">
                    <p>{{ subsiteName }}</p>
                </b-navbar-brand>
                <b-navbar-nav id="subsite-items">
                    <b-nav-item-dropdown id="subsite-select" text="Regions">
                        <b-dropdown-item
                            v-for="link of subsiteLinks"
                            :key="link.key"
                            :href="link.path"
                            :target="link.external ? '_blank' : ''"
                        >
                            {{ link.name }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <NavBarItem v-for="item of customContent.left" :key="item.key" :item="item" />
                </b-navbar-nav>
                <b-navbar-nav id="global-items" class="ml-auto">
                    <NavBarItem v-for="item of customContent.right" :key="item.key" :item="item" />
                </b-navbar-nav>
                <b-navbar-nav id="global-tools" class="ml-2">
                    <b-nav-form id="search" action="/search/" method="get">
                        <b-form-input id="search-input" size="sm" name="q" placeholder="Search"></b-form-input>
                    </b-nav-form>
                    <b-nav-text v-if="editUrl">
                        <!-- Workaround for the lack of a working `aria-label` prop on `<b-nav-item>`. -->
                        <a class="edit-link" :href="editUrl" aria-label="Edit this page" target="_blank">
                            <i class="fab fa-lg fa-github"></i>
                            <span class="xl-plus"> Edit</span>
                        </a>
                    </b-nav-text>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<static-query>
query {
    navbars: allDataset(filter: {filename: {eq: "navbar"}}) {
        totalCount
        edges {
            node {
                id
                main_subsite
                style {
                    color
                    lightBg
                }
                customized
                left {
                    type
                    label
                    href
                    to
                    contents {
                        type
                        label
                        href
                        to
                    }
                }
                right {
                    type
                    label
                    href
                    to
                    contents {
                        type
                        label
                        href
                        to
                    }
                }
            }
        }
    }
}
</static-query>

<script>
import NavBarItem from "@/components/NavBarItem";
import { cloneDeep } from "lodash";
import { rmPrefix, rmSuffix } from "~/lib/utils.js";
import { getPathPrefix } from "~/lib/site.js";
import PACKAGE from "~/../package.json";
import CONFIG from "~/../config.json";
const EDIT_PATH = "tree/master/content";
export default {
    props: {
        subsite: { type: String, required: false, default: CONFIG.subsites.default },
        showHomeNav: { type: Boolean, required: false, default: false },
    },
    components: {
        NavBarItem,
    },
    data() {
        return {
            defaultSubsite: CONFIG.subsites.default,
        };
    },
    created() {
        this.navbars = {};
        for (let edge of this.$static.navbars.edges) {
            let navbar = edge.node;
            if (navbar.main_subsite) {
                this.navbars[navbar.main_subsite] = navbar;
            }
        }
    },
    computed: {
        pathPrefix() {
            return getPathPrefix(this.subsite);
        },
        customContent() {
            let defaults = this.navbars[CONFIG.subsites.default];
            let subsite = this.subsite || CONFIG.subsites.default;
            let customizations = this.navbars[subsite];
            let customContent = cloneDeep(defaults);
            for (let part of ["left", "right"]) {
                if (customizations.customized.includes(part)) {
                    customContent[part] = customizations[part];
                }
            }
            if (!customContent.style) {
                customContent.style = {};
            }
            for (let [key, value] of Object.entries(customizations.style || {})) {
                customContent.style[key] = value;
            }
            return customContent;
        },
        subsiteName() {
            let nameRaw = CONFIG.subsites.all[this.subsite]?.name;
            if (nameRaw) {
                return nameRaw.replace("/", " ");
            } else {
                return "";
            }
        },
        subsiteLinks() {
            return CONFIG.subsites.navbar.map((subsite) =>
                CONFIG.subsites.all[subsite].external
                    ? {
                          key: subsite,
                          name: CONFIG.subsites.all[subsite].name,
                          path: CONFIG.subsites.all[subsite].external,
                          external: true,
                      }
                    : {
                          key: subsite,
                          name: CONFIG.subsites.all[subsite].name,
                          path: getPathPrefix(subsite) + "/",
                      }
            );
        },
        theme() {
            if (this.customContent.style?.lightBg || this.showHomeNav) {
                return "light";
            } else {
                return "dark";
            }
        },
        classes() {
            let classes = [];
            if (this.customContent.style?.lightBg || this.showHomeNav) {
                classes.push("light-bg");
            }
            return classes;
        },
        logoUrl() {
            if (this.customContent.style?.lightBg || this.showHomeNav) {
                return "/images/galaxy_logo_hub.svg";
            } else {
                return "/images/galaxy_logo_hub_white.svg";
            }
        },
        style() {
            let color = this.customContent.style?.color;
            if (color) {
                return `background-color: ${color}`;
            } else {
                return "";
            }
        },
        editUrl() {
            // This will only point to the exact Github source url for Collections which include a "fileInfo { path }"
            // in their GraphQL query. Otherwise, (like for dynamic pages) it'll default to pointing to the repo home
            // page (which has a README, etc., so is not unreasonable).
            if (!PACKAGE.repository?.url) {
                return;
            }
            let sourcePath = getPath(this.$page);
            let repoUrl = rmSuffix(PACKAGE.repository.url, ".git");
            if (sourcePath) {
                // Remove build directory prefix (e.g. "build/content-md").
                // `Article`s contain the prefix (e.g. "build/content-md/galaxy-project/statistics/index.md").
                // `VueArticle`s lack it (e.g. "events/gcc2019/index.md").
                sourcePath = rmPrefix(sourcePath, CONFIG.build.dirs.md);
                sourcePath = rmPrefix(sourcePath, "/");
                return `${repoUrl}/${EDIT_PATH}/${sourcePath}`;
            } else {
                return repoUrl + "/";
            }
        },
    },
};
function getPath(page) {
    if (page) {
        for (let child of Object.values(page)) {
            let path = child?.fileInfo?.path;
            if (path) {
                return path;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "~bootstrap/scss/bootstrap.scss";

#subsite-name {
    display: flex;
    margin-right: 10px;
}
#subsite-name > p {
    line-height: 100%;
    white-space: normal;
    text-align: center;
    font-size: 1.1rem;
    max-width: 95px;
    margin: 0;
    padding: 0;
}
/* Play with search box size at different resolutions to get a little more space when needed. */
#search-input {
    width: 175px;
}
@media (min-width: map.get($grid-breakpoints, "lg")) and (max-width: map.get($grid-breakpoints, "xl")) {
    #search-input {
        width: 125px;
    }
}
@media (max-width: map.get($grid-breakpoints, "lg")) {
    #search-input {
        width: 250px;
    }
}
// The <b-nav-text> workaround (see above) requires us to set this manually.
@media (min-width: map.get($grid-breakpoints, "lg")) {
    .edit-link {
        padding-left: 8px;
    }
}
</style>
