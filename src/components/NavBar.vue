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
const REPO_URL = "https://github.com/galaxyproject/galaxy-hub/";
const EDIT_URL = `${REPO_URL}tree/master/content/`;
export default {
    computed: {
        editUrl() {
            // TODO: a more robust way to do this, this only works on
            // article-based pages and we probably don't want a hacky mess of
            // exceptions.  For now, just default to root (which has a README,
            // etc., so is not unreasonable) for 'special' pages.
            let articlePath = this?.$page?.article?.fileInfo?.path;
            if (articlePath) {
                articlePath = articlePath.replace(/^build\//, "");
                articlePath = articlePath.replace(/^content-md\//, "");
                return `${EDIT_URL}${articlePath}`;
            } else {
                return REPO_URL;
            }
        },
    },
};
</script>
