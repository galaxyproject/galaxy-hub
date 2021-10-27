<template>
    <b-navbar class="container justify-content-center" toggleable="lg" type="dark" variant="transparent">
        <b-navbar-brand to="/">
            <img id="masthead-logo" src="/images/galaxy_logo_hub_white.svg" alt="Galaxy Community Hub" height="30" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav id="navbar-menu">
                <b-nav-item to="/use/">Use</b-nav-item>
                <b-nav-item-dropdown text="Learn">
                    <b-dropdown-item to="/learn/">How to use Galaxy</b-dropdown-item>
                    <b-dropdown-item href="https://training.galaxyproject.org/">Teach with Galaxy</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Community">
                    <b-dropdown-item to="/community/">About</b-dropdown-item>
                    <b-dropdown-item to="/events/">Events</b-dropdown-item>
                    <b-dropdown-item to="/news/">News</b-dropdown-item>
                    <b-dropdown-item to="/blog/">Blog</b-dropdown-item>
                    <b-dropdown-item to="/careers/">Careers</b-dropdown-item>
                    <b-dropdown-item to="/publication-library/">Publications</b-dropdown-item>
                    <b-dropdown-item to="/galaxy-project/statistics/">Stats</b-dropdown-item>
                    <b-dropdown-item to="/community/governance/">Governance</b-dropdown-item>
                    <b-dropdown-item to="/community/coc/">Code of Conduct</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Deploy &amp; Develop">
                    <b-dropdown-item to="/admin/get-galaxy/">Install Galaxy</b-dropdown-item>
                    <b-dropdown-item to="/admin/">Server administration</b-dropdown-item>
                    <b-dropdown-item to="/tools/">Tools</b-dropdown-item>
                    <b-dropdown-item to="/develop/api/">Working with the API</b-dropdown-item>
                    <b-dropdown-item to="/develop/">Contributing</b-dropdown-item>
                    <b-dropdown-item to="/docs/">Code documentation</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Support">
                    <b-dropdown-item to="/support/">FAQ</b-dropdown-item>
                    <b-dropdown-item href="https://help.galaxyproject.org/">Galaxy Help Forum</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item href="https://jxtxfoundation.org/">@jxtx</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav id="navbar-misc" class="ml-auto">
                <b-nav-form action="/search/" method="get">
                    <b-form-input
                        id="search-input"
                        size="sm"
                        class="mr-sm-2"
                        name="q"
                        placeholder="Search Galaxy"
                    ></b-form-input>
                    <b-button aria-label="Search" size="sm" class="my-2 my-sm-0" type="submit">
                        <span class="fa fa-search"></span>
                    </b-button>
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
