<template>
    <header :class="article.category">
        <g-link v-if="article.category" :to="`/${article.category}/`" class="link">
            &larr; Back to <span class="text-capitalize">{{ article.category }}</span>
        </g-link>
        <g-link v-else to="/" class="link">&larr; Back to Home</g-link>
        <p v-if="article.redirect" class="redirect alert alert-warning">
            <strong>Note</strong>
            This content has a new home at
            <a :href="article.redirect">{{ article.redirect }}</a>
            , which you will be redirected to in {{ redirectDelay }} seconds.
        </p>
        <g-image v-if="article.image" class="img-fluid main-image" :src="getImage(article)" />
        <h1 class="title" v-if="!article.skip_title_render">{{ article.title }}</h1>
        <p class="subtitle" v-if="article.tease">{{ article.tease }}</p>
        <ul class="metadata list-unstyled" v-if="article.category === 'events'">
            <li v-if="article.date"><span class="metakey">Date:</span> {{ dateSpan }}</li>
            <li v-if="article.location">
                <span class="metakey">Location: </span>
                <a v-if="article.location_url" :href="article.location_url">{{ article.location }}</a>
                <template v-else>{{ article.location }}</template>
            </li>
            <li v-if="article.contact">
                <span class="metakey">Contact: </span>
                <a v-if="article.contact_url" :href="article.contact_url">{{ article.contact }}</a>
                <template v-else>{{ article.contact }}</template>
            </li>
            <li v-if="article.links.length > 0">
                <span class="metakey">Links: </span>
                <template v-for="link in article.links">
                    <a :href="link.url" :key="link.url">{{ link.text }}</a
                    >.
                </template>
            </li>
        </ul>
        <section class="metadata freetext" v-else>
            <p class="contact" v-if="article.contact">Contact: {{ article.contact }}</p>
            <p class="authors" v-if="article.authors">By {{ article.authors }}</p>
            <p class="date" v-if="article.date">
                {{ articleDateStr }}
            </p>
        </section>
        <p class="outlink" v-if="article.external_url">See <a :href="article.external_url">(external) url</a></p>
        <p class="blogref" v-if="article.source_blog">
            From <a :href="article.source_blog_url">{{ article.source_blog }}</a>
        </p>
        <div class="clearfix"></div>
    </header>
</template>

<script>
import { repr, doRedirect, getImage, humanDateSpan } from "~/utils.js";
import * as dayjs from "dayjs";

export default {
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            redirectDelay: 5,
        }
    },
    computed: {
        dateSpan() {
            if (this.article?.days > 1) {
                const startDate = dayjs(this.article.date);
                const endDate = startDate.add(this.article.days, "day");
                return humanDateSpan(startDate, endDate);
            } else {
                return this.articleDateStr;
            }
        },
        articleDateStr() {
            return dayjs(this.article.date).format("MMMM D YYYY");
        },
    },
    methods: {
        getImage(article) {
            return getImage(article.image, article.images);
        },
    },
    mounted() {
        if (this.article.redirect) {
            let url = getRedirectUrl(this.article.redirect);
            console.log(repr`Redirecting to ${url} in ${this.redirectDelay} seconds..`);
            let currentPath = window.location.pathname;
            setTimeout(() => doRedirect(currentPath, url), this.redirectDelay*1000);
        }
    },
};
function getRedirectUrl(target) {
    if (target.startsWith("/")) {
        return `${window.location.origin}${target}`;
    } else if (target.startsWith("http://") || target.startsWith("https://")) {
        return target;
    } else {
        console.error(repr`Unrecognized redirect url ${target}`);
    }
}
</script>

<style scoped>
.main-image {
    float: right;
    margin: 20px 0px 5px 10px;
    padding: 2px;
    border: 1px solid #666;
}
.redirect {
    margin-top: 20px;
}
.title {
    font-size: 28px;
    font-weight: 300;
    line-height: 1.4em;
    padding: 0.5em 0;
}
.subtitle {
    font-weight: 400;
    font-style: italic;
}
.metadata {
    font-size: 14px;
}
.metakey {
    font-weight: bolder;
}
.authors {
    font-size: 1.09375rem;
    font-weight: 300;
}
.news .date {
    font-size: 80%;
}
.blog .date {
    font-weight: bolder;
}
.outlink {
    font-weight: bolder;
}
.blogref a {
    font-style: italic;
}
</style>
