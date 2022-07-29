<template>
    <header :class="article.category">
        <g-link v-if="article.category" :to="categoryIndex" class="link">
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
        <p class="blogref" v-if="article.source_blog && article.source_blog_url">
            From <a :href="article.source_blog_url">{{ article.source_blog }}</a>
        </p>
        <div class="clearfix"></div>
    </header>
</template>

<script>
import Redirect from "@/components/Redirect";
import { isEmpty, getType, ensureDomain, humanDateSpan } from "~/lib/utils.js";
import { getImage } from "~/lib/pages.mjs";
import CONFIG from "~/../config.json";
import * as dayjs from "dayjs";
const SOCIAL_TAGS_METADATA = [
    ["title", "title", 70],
    ["tease", "description", 200],
    ["image", "image", null],
];
function makeJsonLd(meta) {
    let json = {
        "@context": "http://schema.org/",
    };
    switch (meta.category) {
        case "events":
            json["@type"] = "Event";
            break;
        case "news":
            json["@type"] = "NewsArticle";
            break;
        case "blog":
            json["@type"] = "BlogPosting";
            break;
    }
    if (meta.title) {
        json.name = meta.title;
    }
    if (meta.date) {
        if (json["@type"] === "Event") {
            json.startDate = meta.date;
        } else {
            json.datePublished = meta.date;
        }
    }
    if (meta.end && json["@type"] === "Event") {
        json.endDate = meta.end;
    }
    let contactNames;
    if (meta.contacts && meta.contacts.length > 0) {
        contactNames = meta.contacts.map((c) => c.name);
    } else if (meta.contact) {
        contactNames = meta.contact.split(",").map((rawName) => rawName.trim());
    }
    if (contactNames) {
        json.contact = contactNames.map((name) => ({ "@type": "Person", name }));
    }
    let authorNames;
    if (getType(meta.authors) === "Array" && meta.authors.length > 0) {
        authorNames = meta.authors.map((a) => a.name);
    } else if (getType(meta.authors) === "String" && meta.authors) {
        authorNames = meta.authors.split(",").map((rawName) => rawName.trim());
    }
    if (authorNames) {
        json.author = authorNames.map((name) => ({ "@type": "Person", name }));
    }
    json.url = `https://${CONFIG.host}${meta.path}`;
    return json;
}
export default {
    components: {
        Redirect,
    },
    metaInfo() {
        let info = {};
        if (this.article.title) {
            info.title = this.article.title;
        }
        // Set <meta> values for social previews.
        // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
        for (let [articleKey, metaKey, maxLen] of SOCIAL_TAGS_METADATA) {
            let value = this.article[articleKey];
            if (value) {
                if (maxLen) {
                    value = value.slice(0, maxLen);
                }
                if (articleKey === "image") {
                    value = ensureDomain(value);
                }
                if (info.meta === undefined) {
                    info.meta = [];
                }
                for (let prefix of ["og", "twitter"]) {
                    info.meta.push({ property: `${prefix}:${metaKey}`, content: value });
                }
            }
        }
        if (info.meta !== undefined) {
            info.meta.push({ property: "og:type", content: "article" });
            info.meta.push({ property: "twitter:card", content: "summary_large_image" });
        }
        // Add JSON-LD.
        if (info.script === undefined) {
            info.script = [];
        }
        info.script.push({ json: makeJsonLd(this.article), type: "application/ld+json" });
        // Return the metaInfo, if any.
        if (!isEmpty(info)) {
            return info;
        }
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
        categoryIndex() {
            for (let [path, category] of Object.entries(CONFIG.categories)) {
                if (category === this.article.category) {
                    return path + "/";
                }
            }
            if (this.article.category) {
                return `/${this.article.category}/`;
            }
            return null;
        },
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
