<template>
    <layout>
        <Redirect
            v-if="redirectUrl"
            pre-text="You are now being redirected to: "
            :url="redirectUrl"
            post-text=""
            :location="location"
        >
        </Redirect>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <h3 class="markdown" v-html="$page.main.content" />
        <ul v-for="(galaxy, g) in galaxies" :key="g">
            <li>
                <a :href="galaxy.url"> Use Galaxy: {{ galaxy.locale }} </a>
            </li>
        </ul>
    </layout>
</template>

<script>
import Redirect from "@/components/Redirect";
import CONFIG from "~/../config.json";

export default {
    components: {
        Redirect,
    },
    computed: {
        galaxies() {
            return CONFIG.usegalaxy;
        },
    },
    data() {
        return {
            location: undefined,
            redirectUrl: undefined,
        };
    },
    methods: {
        getRedirectUrl() {
            const validLocale = CONFIG.usegalaxy.findIndex((g) => g.locale === this.$route.query.locale);
            return validLocale > -1 ? CONFIG.usegalaxy[validLocale].url : "";
        },
    },
    mounted() {
        // This has to be set in mounted() because window does not exist when building.
        // This will execute in the browser on page load.
        this.location = window.location;
        this.redirectUrl = this.getRedirectUrl();
    },
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/usegalaxy/redirect/") {
        title,
        content
    }
}
</page-query>
