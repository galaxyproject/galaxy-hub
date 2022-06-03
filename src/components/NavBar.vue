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
                    <b-nav-item-dropdown id="subsite-select" v-if="false && subsiteName" text="Regions">
                        <b-dropdown-item v-for="link of subsiteLinks" :key="link.key" :to="link.path">
                            {{ link.name }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item :to="`${pathPrefix}/news/`">News</b-nav-item>
                    <b-nav-item :to="`${pathPrefix}/events/`">Events</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav id="global-items" class="ml-auto">
                    <b-nav-item-dropdown text="Support">
                        <b-dropdown-item to="/get-started/">Get started</b-dropdown-item>
                        <b-dropdown-item to="/learn/">Training</b-dropdown-item>
                        <b-dropdown-item to="/support/">FAQ</b-dropdown-item>
                        <b-dropdown-item href="https://help.galaxyproject.org/">Galaxy Help Forum</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="Community">
                        <b-dropdown-item to="/community/">The Galaxy Community</b-dropdown-item>
                        <b-dropdown-item to="/blog/">Blog</b-dropdown-item>
                        <b-dropdown-item to="/community/wg/">Working Groups</b-dropdown-item>
                        <b-dropdown-item to="/community/governance/">Governance</b-dropdown-item>
                        <b-dropdown-item to="/community/contributing/">How to contribute</b-dropdown-item>
                        <b-dropdown-item href="https://galaxy-mentor-network.netlify.app/"
                            >Galaxy Mentor Network</b-dropdown-item
                        >
                        <b-dropdown-item to="/community/coc/">Code of Conduct</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="About">
                        <b-dropdown-item to="/use/">Platforms</b-dropdown-item>
                        <b-dropdown-item to="/careers/">Careers</b-dropdown-item>
                        <b-dropdown-item to="/galaxy-project/statistics/">Stats</b-dropdown-item>
                        <b-dropdown-item to="/mailing-lists">Mailing lists</b-dropdown-item>
                        <b-dropdown-item to="/publication-library/">Publications</b-dropdown-item>
                        <b-dropdown-item to="/citing-galaxy/">Citing Galaxy</b-dropdown-item>
                        <b-dropdown-item to="/images/galaxy-logos/">Branding</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="Projects">
                        <b-dropdown-group header="Core Team Projects">
                            <template #header>
                                <strong>
                                    <b-link to="/projects/">Core Team Projects</b-link>
                                </strong>
                            </template>
                            <b-dropdown-item to="/projects/covid19/">Covid19</b-dropdown-item>
                            <b-dropdown-item to="/projects/mpxv/">Monkeypox</b-dropdown-item>
                        </b-dropdown-group>
                        <b-dropdown-group header="Community Projects">
                            <template #header>
                                <strong>
                                    <b-link to="/projects/community/">Community Projects</b-link>
                                </strong>
                            </template>
                            <b-dropdown-item to="/projects/community/climate/">Climate Science</b-dropdown-item>
                        </b-dropdown-group>
                    </b-nav-item-dropdown>
                    <b-nav-item to="/events/gcc2022/">GCC2022</b-nav-item>
                    <b-nav-item to="/jxtx/">@jxtx</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav id="global-tools" class="ml-2">
                    <b-nav-form id="search" action="/search/" method="get">
                        <b-form-input id="search-input" size="sm" name="q" placeholder="Search"></b-form-input>
                    </b-nav-form>
                    <b-nav-item :href="editUrl">
                        <i class="fab fa-lg fa-github"></i>
                        Edit
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { rmPrefix, getSingleKey } from "~/lib/utils.js";
import CONFIG from "~/../config.json";
const ROOT_SUBSITE = getSingleKey(CONFIG.subsites.hierarchy);
const REPO_URL = "https://github.com/galaxyproject/galaxy-hub";
const EDIT_PATH = "tree/master/content";
export default {
    props: {
        subsite: { type: String, required: false, default: ROOT_SUBSITE },
    },
    data() {
        return {
            rootSubsite: ROOT_SUBSITE,
        };
    },
    computed: {
        pathPrefix() {
            if (!this.subsite || this.subsite === ROOT_SUBSITE) {
                return "";
            } else {
                return `/${this.subsite}`;
            }
        },
        subsiteName() {
            let nameRaw = CONFIG.subsites.metadata[this.subsite]?.name;
            if (nameRaw) {
                return nameRaw.replace("/", " ");
            } else {
                return "";
            }
        },
        subsiteLinks() {
            let subsitesLinks = [];
            for (let [subsite, metadata] of Object.entries(CONFIG.subsites.metadata)) {
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
            if (CONFIG.subsites.metadata[this.subsite]?.lightBg) {
                return "light";
            } else {
                return "dark";
            }
        },
        classes() {
            let classes = [];
            if (CONFIG.subsites.metadata[this.subsite]?.lightBg) {
                classes.push("light-bg");
            }
            return classes;
        },
        logoUrl() {
            if (CONFIG.subsites.metadata[this.subsite]?.lightBg) {
                return "/images/galaxy_logo_hub.svg";
            } else {
                return "/images/galaxy_logo_hub_white.svg";
            }
        },
        style() {
            let color = CONFIG.subsites.metadata[this.subsite]?.color;
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
    align-items: center;
    margin-right: 10px;
}
#subsite-name > p {
    line-height: 100%;
    white-space: normal;
    font-size: 1.1rem;
    max-width: 95px;
    margin: 0;
    padding: 0;
}
#search-input {
    width: 175px;
}
</style>
