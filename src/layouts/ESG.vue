<template>
    <div v-if="$route.query.solo" class="layout">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <div class="container">
                <b-navbar-brand href="/projects/esg?solo=true">
                    <img
                        src="/images/projects/esg/eosc_euro_science_gateway_white.svg"
                        alt="eosc Euro Science Gateway"
                        height="30"
                    />
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse" />

                <b-collapse class="ml-auto" id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <li class="nav-item" :class="{ active: activeUrl === 'esg' }">
                            <a class="nav-link" href="/projects/esg?solo=true"> Home </a>
                        </li>
                        <li class="nav-item" :class="{ active: activeUrl === 'news' }">
                            <a class="nav-link" href="/projects/esg/news?solo=true"> News </a>
                        </li>
                        <li class="nav-item" :class="{ active: activeUrl === 'events' }">
                            <a class="nav-link" href="/projects/esg/events?solo=true"> Events </a>
                        </li>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>

        <main id="maincontainer" class="container">
            <slot />
        </main>

        <footer class="container mt-4">
            Hosted on the
            <a href="/">
                <b>Galaxy Community Hub</b>
            </a>
        </footer>
    </div>
    <Default v-else>
        <slot></slot>
    </Default>
</template>

<script>
import Default from "./Default.vue";

export default {
    components: {
        Default,
    },
    computed: {
        activeUrl() {
            const path = this.$route.path;

            if (path.endsWith("esg")) {
                return "esg";
            }

            if (path.endsWith("news")) {
                return "news";
            }

            if (path.endsWith("events")) {
                return "events";
            }

            return "";
        },
    },
};
</script>

<style lang="scss" scoped>
#nav-collapse {
    flex-grow: unset;
}
</style>
