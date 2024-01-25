<template>
    <div v-if="$route.query.solo" class="layout">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <div class="container">
                <b-navbar-brand href="/projects/esg/?solo=true">
                    <img
                        src="/images/projects/esg/eosc_euro_science_gateway_white.svg"
                        alt="eosc EuroScienceGateway"
                        height="30"
                    />
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse" />

                <b-collapse class="ml-auto" id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <li class="nav-item" :class="{ active: activeUrl === 'esg' }">
                            <a class="nav-link" href="/projects/esg/?solo=true"> Home </a>
                        </li>
                        <li class="nav-item" :class="{ active: activeUrl === 'news' }">
                            <a class="nav-link" href="/projects/esg/news/?solo=true"> News </a>
                        </li>
                        <li class="nav-item" :class="{ active: activeUrl === 'events' }">
                            <a class="nav-link" href="/projects/esg/events/?solo=true"> Events </a>
                        </li>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>

        <main id="maincontainer" class="container">
            <slot />

            <div class="funding mt-2">
                <g-image class="eu-img" :src="$static.funding.image" />
                <div v-html="$static.funding.content"></div>
            </div>
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

        <div class="funding mt-2">
            <g-image class="eu-img" :src="$static.funding.image" />
            <div v-html="$static.funding.content"></div>
        </div>
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

            if (path.endsWith("esg/")) {
                return "esg";
            }

            if (path.endsWith("news/")) {
                return "news";
            }

            if (path.endsWith("events/")) {
                return "events";
            }

            return "";
        },
    },
};
</script>

<static-query>
query {
    funding: insert(path: "/insert:/projects/esg/funding_notice/") {
        image,
        content
    }
}
</static-query>

<style lang="scss" scoped>
#nav-collapse {
    flex-grow: unset;
}

.funding {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    font-size: 0.75rem;
    line-height: 1.6em;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }

    .eu-img {
        width: 200px;
    }
}
</style>
