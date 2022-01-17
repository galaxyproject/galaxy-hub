<template>
    <header :class="article.category">
        <g-link v-if="article.category" :to="`/${article.category}/`" class="link">
            &larr; Back to <span class="text-capitalize">{{ article.category }}</span>
        </g-link>
        <Redirect v-if="article.redirect" :url="article.redirect" :location="this.location" />
        <div class="clearfix"></div>
        <g-image v-if="article.image" class="img-fluid main-image" :src="image" />
        <h1 class="title float-left" v-if="!article.skip_title_render">{{ article.title }}</h1>
        <div class="clearfix"></div>
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
import Redirect from "@/components/Redirect";
import { getImage, humanDateSpan } from "~/utils.js";
import * as dayjs from "dayjs";

export default {
    components: {
        Redirect,
    },
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            location: undefined,
        };
    },
    computed: {
        dateSpan() {
            if (this.article?.date !== this.article?.end) {
                return humanDateSpan(this.startDate, this.endDate);
            } else {
                return this.articleDateStr;
            }
        },
        startDate() {
            return dayjs(this.article.date);
        },
        endDate() {
            return dayjs(this.article.end);
        },
        articleDateStr() {
            return this.startDate.format("MMMM D YYYY");
        },
        image() {
            return getImage(this.article.image, this.article.images);
        },
    },
    mounted() {
        // This has to be set in mounted() because window does not exist when building.
        // This will execute in the browser on page load.
        this.location = window.location;
    },
};
</script>

<style scoped>
.main-image {
    float: right;
    margin: 20px 0px 5px 10px;
    max-height: 400px;
    width: auto;
    padding: 2px;
    border: 1px solid #666;
}
.title {
    font-size: 28px;
    font-weight: 300;
    line-height: 1.4em;
    padding: 0.5em 0;
    margin-bottom: 5px;
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
