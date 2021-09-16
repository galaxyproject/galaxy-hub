<template>
    <b-navbar class="container justify-content-center" toggleable="lg" type="dark" variant="transparent">
        <b-navbar-brand to="/">
            <img id="masthead-logo" src="/images/galaxy_logo_hub_white.svg" alt="Galaxy Community Hub" height="30" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
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
                <b-nav-item to="/jxtx/">@jxtx</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form action="/search/" method="get">
                    <b-form-input
                        id="search-input"
                        size="sm"
                        class="mr-sm-2"
                        name="q"
                        placeholder="Search Galaxy"
                    ></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">
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
import path from "path";
import { rmPrefix } from "~/utils.js";
import CONFIG from "~/../config.json";
const REPO_URL = "https://github.com/galaxyproject/galaxy-hub/";
const EDIT_PATH = "tree/master/content";
export default {
    computed: {
        editUrl() {
            let sourcePath;
            if (this.$page.main?.fileInfo?.path) {
                // Each Collection should have a `$page.main`.
                // `fileInfo.path` for VueArticles already omits the build directory: `"events/gcc2019/index.md"`.
                // For Articles it looks like `"build/content-md/community/index.md"`.
                sourcePath = rmPrefix(this.$page.main.fileInfo.path, CONFIG?.build?.dirs?.md);
            } else {
                // Otherwise, this must be a dynamic page.
                // Almost every dynamic page has a `main.md` Insert.
                //TODO: 404.vue doesn't have a `main.md`, so that Github link will (perhaps appropriately) 404.
                //      Not sure what the best fix is.
                sourcePath = path.join(this.$route.path, "main.md");
            }
            return path.join(REPO_URL, EDIT_PATH, sourcePath);
        },
    },
};
</script>
