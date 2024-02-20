<template>
    <layout>
        <Redirect
            v-if="getRedirectUrl"
            pre-text="You are now being redirected to: "
            :url="getRedirectUrl"
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
        getRedirectUrl() {
            const validLocale = CONFIG.usegalaxy.findIndex((g) => g.locale === this.$route.query.locale);
            return validLocale > -1 ? CONFIG.usegalaxy[validLocale].url : "";
        },
    },
    data() {
        return {
            location: window.location,
        };
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
