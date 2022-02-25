<template>
    <b-navbar class="container justify-content-center" toggleable="lg" type="dark" variant="transparent">
        <b-navbar-brand to="/">
            <img id="masthead-logo" src="/images/galaxy_logo_hub_white.svg" alt="Galaxy Community Hub" height="30" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav id="navbar-menu">
                <b-nav-item to="/news/">News</b-nav-item>
                <b-nav-item to="/events/">Events</b-nav-item>
                <b-nav-item to="/learn/">Training</b-nav-item>
                <b-nav-item-dropdown text="Support">
                    <b-dropdown-item to="/support/">FAQ</b-dropdown-item>
                    <b-dropdown-item href="https://help.galaxyproject.org/">Galaxy Help Forum</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Community">
                    <b-dropdown-item to="/community/">The Galaxy Community</b-dropdown-item>
                    <b-dropdown-item to="/get-started/">Get started</b-dropdown-item>
                    <b-dropdown-item to="/community/contributing/">How to contribute</b-dropdown-item>
                    <b-dropdown-item href="https://galaxy-mentor-network.netlify.app/"
                        >Galaxy Mentoring Netowrk</b-dropdown-item
                    >
                    <b-dropdown-item to="/blog/">Blog</b-dropdown-item>
                    <b-dropdown-item to="/community/governance/">Governance</b-dropdown-item>
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
                <b-nav-item to="/projects/covid19/">Covid19</b-nav-item>
                <b-nav-item to="/jxtx/">@jxtx</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav id="navbar-misc" class="ml-auto">
                <b-nav-form action="/search/" method="get">
                    <b-form-input
                        id="search-input"
                        size="sm"
                        class="mr-sm-1"
                        name="q"
                        placeholder="Search"
                    ></b-form-input>
                </b-nav-form>
                <b-nav-item :href="editUrl">
                    <i class="fab fa-lg fa-github"></i>
                    Edit
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { rmPrefix } from "~/utils.js";
import CONFIG from "~/../config.json";
const REPO_URL = "https://github.com/galaxyproject/galaxy-hub";
const EDIT_PATH = "tree/master/content";
export default {
    computed: {
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
