<template>
    <div :class="['card', article.closed ? 'border-muted text-muted closed' : 'border-primary']">
        <div class="card-header">
            <Continent :continent="article.continent" />
            <a :class="'title' + (article.closed ? ' text-muted' : '')" :href="article.external_url">
                {{ article.title }}
            </a>
        </div>
        <p class="location">
            <a :class="article.closed ? 'text-muted' : ''" :href="article.location_url">
                {{ article.location }}
            </a>
        </p>
        <p class="posted">
            Posted: {{ article.date }}
            <br />
            <span v-if="article.closes" :class="article.closed ? 'text-muted' : 'text-warning'">
                Apply by: {{ article.closes }}
            </span>
        </p>
        <p class="markdown" v-html="mdToHtml(article.summary)" />
        <p v-if="article.contact" class="contact">Contact: {{ article.contact }}</p>
        <p v-if="article.image" class="logo">
            <a :href="article.external_url">
                <g-image class="card-img-bottom" :src="getImage(article.image)" />
            </a>
        </p>
    </div>
</template>

<script>
import Continent from "@/components/Continent";
import { mdToHtml, getImage } from "~/utils.js";
export default {
    components: {
        Continent,
    },
    props: {
        article: { type: Object, required: true },
    },
    methods: {
        mdToHtml,
        getImage(imagePath) {
            return getImage(imagePath, this.article.images);
        },
    },
};
</script>

<style scoped>
.card {
    min-width: 14rem;
    max-width: 20rem;
}
.title {
    padding-right: 18px;
}
.location,
.posted {
    font-weight: bolder;
}
.contact {
    font-style: italic;
}
.closed .logo {
    filter: opacity(33%);
}
</style>
