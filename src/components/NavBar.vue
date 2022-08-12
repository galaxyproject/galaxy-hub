<template>
    <div :class="classes" :style="style">
        <b-navbar class="container justify-content-center" toggleable="lg" :type="theme" variant="transparent">
            <b-navbar-brand to="/">
                <img id="masthead-logo" :src="logoUrl" alt="Galaxy Community Hub" height="30" />
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-brand id="subsite-name" v-if="subsite !== 'global'" :to="`${pathPrefix}/`">
                    <p>{{ subsiteName }}</p>
                </b-navbar-brand>
                <b-navbar-nav id="subsite-items">
                    <b-nav-item-dropdown id="subsite-select" v-if="false" text="Regions">
                        <b-dropdown-item v-for="link of subsiteLinks" :key="link.key" :to="link.path">
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
                    <b-nav-item :href="editUrl">
                        <i class="fab fa-lg fa-github"></i>
                        <span class="xl-plus"> Edit</span>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import NavBarItem from "@/components/NavBarItem";
import { rmPrefix, matchesPrefixes } from "~/lib/utils.js";
import CONFIG from "~/../config.json";
import NAVBARS from "~/../navbars.json";
const REPO_URL = "https://github.com/galaxyproject/galaxy-hub";
const EDIT_PATH = "tree/master/content";
export default {
    props: {
        subsite: { type: String, required: false, default: CONFIG.subsites.default },
    },
    components: {
        NavBarItem,
    },
    data() {
        let pathPrefix;
        if (!this.subsite || this.subsite === CONFIG.subsites.default) {
            pathPrefix = "";
        } else {
            pathPrefix = `/${this.subsite}`;
        }
        return {
            pathPrefix,
        };
    },
    computed: {
        customContent() {
            let rawContent;
            if (this.subsite && NAVBARS[this.subsite]) {
                rawContent = NAVBARS[this.subsite];
            } else {
                rawContent = NAVBARS[CONFIG.subsites.default];
            }
            return parseCustomContent(rawContent, this.pathPrefix);
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
            let subsitesLinks = [];
            for (let [subsite, metadata] of Object.entries(CONFIG.subsites.all)) {
                if (subsite === this.subsite) {
                    continue;
                }
                let link = {
                    key: subsite,
                    name: metadata.name,
                    order: metadata.order,
                };
                if (subsite == "global") {
                    link.path = "/";
                } else {
                    link.path = `/${subsite}/`;
                }
                subsitesLinks.push(link);
            }
            subsitesLinks.sort((a, b) => a.order > b.order);
            return subsitesLinks;
        },
        theme() {
            if (CONFIG.subsites.all[this.subsite]?.lightBg) {
                return "light";
            } else {
                return "dark";
            }
        },
        classes() {
            let classes = [];
            if (CONFIG.subsites.all[this.subsite]?.lightBg) {
                classes.push("light-bg");
            }
            return classes;
        },
        logoUrl() {
            if (CONFIG.subsites.all[this.subsite]?.lightBg) {
                return "/images/galaxy_logo_hub.svg";
            } else {
                return "/images/galaxy_logo_hub_white.svg";
            }
        },
        style() {
            let color = CONFIG.subsites.all[this.subsite]?.color;
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
            let sourcePath = getPath(this.$page);
            if (sourcePath) {
                // Remove build directory prefix (e.g. "build/content-md").
                // `Article`s contain the prefix (e.g. "build/content-md/galaxy-project/statistics/index.md").
                // `VueArticle`s lack it (e.g. "events/gcc2019/index.md").
                sourcePath = rmPrefix(sourcePath, CONFIG.build.dirs.md);
                sourcePath = rmPrefix(sourcePath, "/");
                return `${REPO_URL}/${EDIT_PATH}/${sourcePath}`;
            } else {
                return REPO_URL + "/";
            }
        },
    },
};
/** Turn the raw, human-friendly navbar definition into a structure more easily used in the template. */
function parseCustomContent(rawContent, pathPrefix) {
    let content = {};
    for (let part of ["left", "right"]) {
        content[part] = [];
        for (let rawItem of rawContent[part] || []) {
            let item = parseCustomItem(rawItem, pathPrefix);
            content[part].push(item);
        }
    }
    return content;
}
function parseCustomItem(rawItem, pathPrefix) {
    let item = {};
    if (rawItem.target) {
        item.type = "link";
        item.label = rawItem.label;
        if (rawItem.relativeTo === "subsite" && pathPrefix !== undefined) {
            item.to = `${pathPrefix}/${rawItem.target}`;
        } else if (matchesPrefixes(rawItem.target, ["https://", "http://", "mailto:", "ftp:"])) {
            item.href = rawItem.target;
        } else {
            item.to = rawItem.target;
        }
        item.key = `${item.type}:${rawItem.relativeTo}:${rawItem.target}`;
    } else if (rawItem.contents) {
        item.type = "dropdown";
        item.label = rawItem.label;
        item.contents = rawItem.contents.map((subitem) => parseCustomItem(subitem, pathPrefix));
        item.key = `${item.type}:` + item.contents.map((subitem) => subitem.key).join(":");
    }
    return item;
}
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

<style scoped>
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
#search-input {
    width: 175px;
}
</style>
