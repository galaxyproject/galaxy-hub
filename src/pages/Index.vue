<template>
    <layout>
        <div class="container p-2">
            <div class="row">
                <div class="col-lg-7 mb-4">
                    <h1 class="mb-3">Meet Galaxy - <br />a data analysis universe</h1>
                    <div class="hero highlight">
                        Galaxy is a free, open-source system for analyzing data, authoring workflows, training and
                        education, publishing tools, managing infrastructure, and more.
                    </div>
                    <nav class="navbar navbar-default p-0" id="heroMaincontainer">
                        <div class="container-fluid">
                            <div v-if="prioritizedGalaxyLocales" class="nav navbar-nav">
                                <div class="dropdown show">
                                    <a
                                        v-for="site in this.prioritizedGalaxyLocales.slice(0, 1)"
                                        :key="site.locale"
                                        :href="site.url"
                                        class="btn hero mr-3 bgBright dropdown-toggle"
                                        role="button"
                                        target="_blank"
                                        id="dropdownMenuLink"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        @click="plausibleCount(`UseGalaxyDropDown Clicks ${site.locale}`)"
                                    >
                                        UseGalaxy:
                                        {{ site.locale }}
                                    </a>
                                    <div
                                        class="dropdown-menu hero bgBright m-0 pb-0"
                                        aria-labelledby="dropdownMenuLink"
                                    >
                                        <a
                                            v-for="site in this.prioritizedGalaxyLocales.slice(1)"
                                            :href="site.url"
                                            :key="site.locale"
                                            target="_blank"
                                            class="dropdown-item"
                                            @click="plausibleCount(`UseGalaxyDropDown Clicks ${site.locale}`)"
                                        >
                                            Use Galaxy Now - {{ site.locale }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a :href="/get-started/" class="btn hero bgBright">Learn more: First Steps with Galaxy</a>
                        </div>
                    </nav>
                </div>
                <!-- When removing this announcement, do not remove it entirely, comment it instead since it would be
                    useful to have this same consistent styling for future announcements (reuse `hero-announcement-...` classes etc.) -->

                <!-- <div class="col-lg-5 hero-announcement-container">
                    <a href="" class="hero-announcement-img-link">
                        <img
                            src=""
                            alt=""
                            class="img-fluid rounded"
                        />
                    </a>
                </div> -->
            </div>
        </div>
        <div class="container-fluid-real p-0">
            <div class="container-fluid-real p-0 bgBright">
                <div class="container-fluid-real p-0 overflow-hidden">
                    <div class="row area education overflow-hidden">
                        <svg viewBox="1 0 80 40" preserveAspectRatio="none" width="5000" height="100" class="wave top">
                            <use xlink:href="images/icons/waveNounProject.svg#path" />
                        </svg>
                    </div>
                </div>
                <div class="container p-3">
                    <div class="row">
                        <div class="col-xl-4">
                            <h2 :id="slugify($page.datasetEducation.heading)" class="education">
                                <a
                                    :href="'#' + slugify($page.datasetEducation.heading)"
                                    :aria-label="slugify($page.datasetEducation.heading)"
                                    aria-hidden="true"
                                    tabindex="-1"
                                >
                                    <span class="icon icon-link" tabindex="-1"></span>
                                </a>
                                {{ $page.datasetEducation.heading }}
                            </h2>
                            <p class="education">{{ $page.datasetEducation.content }}</p>
                        </div>
                        <div class="col-xl-8 col-md-12 area education">
                            <a
                                :href="education.url"
                                v-for="(education, i) in $page.datasetEducation.education"
                                :key="i"
                                role="link"
                                rel="noopener"
                                target="_blank"
                                class="btn btn-outline-primary text-left text-decoration-none mb-4 ml-3"
                            >
                                <span class="text-center iconXlarge pt-1 mr-3">
                                    <i :class="'icon fa ' + education.icon + ' '" aria-hidden="true"></i>
                                </span>
                                <div class="title">{{ education.title }}</div>
                                <div class="text">{{ education.content }}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="container-fluid-real p-0 overflow-hidden">
                    <div class="row area education overflow-hidden">
                        <svg viewBox="13 0 80 40" preserveAspectRatio="none" width="5000" height="100" class="wave">
                            <use xlink:href="images/icons/waveNounProject.svg#path" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-4">
            <div class="row">
                <h2 :id="slugify(this.$static.datasetCallouts.heading)">
                    <a
                        :href="'#' + slugify(this.$static.datasetCallouts.heading)"
                        :aria-label="slugify(this.$static.datasetCallouts.heading)"
                        aria-hidden="true"
                        tabindex="-1"
                    >
                        <span class="icon icon-link"></span>
                    </a>
                    {{ this.$static.datasetCallouts.heading }}
                </h2>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="area callouts cdark h-100">
                        <div class="text-white">
                            <h3>{{ this.$static.datasetCallouts.callout1.title }}</h3>
                            <div v-html="this.$static.datasetCallouts.callout1.content" class="highlight"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-3">
                    <div class="area callouts toolshed h-100">
                        <div class="text-white">
                            <h3>{{ this.$static.datasetCallouts.callout2.title }}</h3>
                            <div v-html="this.$static.datasetCallouts.callout2.content" class="highlight"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <div class="area callouts clight h-100">
                        <div class="text-dark">
                            <h3 class="text-dark">{{ this.$static.datasetCallouts.callout3.title }}</h3>
                            <div v-html="this.$static.datasetCallouts.callout3.content" class="highlight"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 mb-3">
                    <div class="area callouts cbright bgBrightest img h-100">
                        <div class="text-dark">
                            <h3 class="text-dark">{{ this.$static.datasetCallouts.callout4.title }}</h3>
                            <div v-html="this.$static.datasetCallouts.callout4.content" class="highlight"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-7 mb-3">
                    <div class="area callouts cdark h-100">
                        <div class="text-white">
                            <h3>{{ this.$static.datasetCallouts.callout5.title }}</h3>
                            <div v-html="this.$static.datasetCallouts.callout5.content" class="highlight"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 mb-3">
                    <div class="area callouts cdark h-100">
                        <div class="text-white">
                            <h3>{{ this.$static.datasetCallouts.callout6.title }}</h3>
                            <div v-html="this.$static.datasetCallouts.callout6.content" class="highlight"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid-real p-0">
            <div class="container p-4">
                <div class="row">
                    <div class="col-12 text-center">
                        <div class="testimonials-container">
                            <Testimonials :showControls="true" :showHeading="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mb-4">
            <div class="row">
                <div class="col p-0">
                    <h2 :id="slugify(this.$static.datasetResearch.heading)" class="mt-4">
                        <a
                            :href="'#' + slugify(this.$static.datasetResearch.heading)"
                            :aria-label="slugify(this.$static.datasetResearch.heading)"
                            aria-hidden="true"
                            tabindex="-1"
                        >
                            <span class="icon icon-link"></span>
                        </a>
                        {{ this.$static.datasetResearch.heading }}
                    </h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-4 mb-3">
                    <div class="area research publications h-100">
                        <ClientOnly>
                            <Publications />
                        </ClientOnly>
                        <a href="https://doi.org/10.1093/nar/gkae410" target="_blank" rel="noopener" class="text-white">
                            <h3>Cite Galaxy</h3>
                            <div>
                                The Galaxy Community, "The Galaxy platform for accessible, reproducible, and
                                collaborative data analyses: 2024 update", Nucleic Acids Research, 2024; gkae410,
                                https://doi.org/10.1093/nar/gkae410
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-xl-4 mb-3">
                    <div class="area research tutorials h-40">
                        <a :href="this.$static.datasetResearch.research3.url">
                            <h3>{{ this.$static.datasetResearch.research3.title }}</h3>
                        </a>
                        <div v-html="this.$static.datasetResearch.research3.content" class="text-white mb-3"></div>
                        <ul style="list-style-type: none; padding: 0">
                            <li v-for="t in this.$static.datasetResearch.research3.links" :key="t.title" class="pb-2">
                                <a
                                    :href="t.url"
                                    role="button"
                                    rel="noopener"
                                    target="_blank"
                                    class="mb-5 text-white small"
                                    >{{ t.title }}</a
                                >
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center">
                            <a
                                :href="this.$static.datasetResearch.research3.button.url"
                                role="button"
                                rel="noopener"
                                target="_blank"
                                class="btn text-decoration-none w-50"
                                >{{ this.$static.datasetResearch.research3.button.title }}</a
                            >
                        </div>
                    </div>
                    <div class="area research events mt-3 h-40">
                        <a href="/events/">
                            <h3>Upcoming events</h3>
                        </a>
                        <div class="text-white mb-2">
                            The Galaxy community puts on a show every year with dozens of events around the world.
                            <div class="mt-2">Next up:</div>
                        </div>
                        <table style="padding: 0">
                            <tbody>
                                <tr v-for="event in events" :key="event.id">
                                    <td>
                                        <div>{{ event.date }}</div>
                                    </td>
                                    <td>
                                        <a
                                            :href="event.path"
                                            rel="noopener"
                                            target="_blank"
                                            class="text-white text-decoration-none"
                                        >
                                            {{ event.title }}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-center">
                            <a
                                href="/events/"
                                role="button"
                                rel="noopener"
                                target="_blank"
                                class="btn text-decoration-none mt-3 mb-3 w-50"
                                >Visit more</a
                            >
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 mb-3">
                    <div class="area research cases h-100">
                        <h3>{{ this.$static.datasetResearch.research5.title }}</h3>
                        <div v-html="this.$static.datasetResearch.research5.content"></div>
                        <div class="row mt-4 mb-4">
                            <div class="col">
                                <div
                                    v-for="t in this.$static.datasetResearch.research6.logos"
                                    :key="t.title"
                                    class="text-center mt-5"
                                >
                                    <a :href="t.url" rel="noopener" target="_blank">
                                        <img :src="t.image" :alt="t.title" :width="t.width" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
import slugify from "@sindresorhus/slugify";
import CONFIG from "~/../config.json";
import Publications from "@/components/Publications";
import Testimonials from "@/components/Testimonials";

export default {
    components: {
        Publications,
        Testimonials,
    },
    data() {
        return {
            cancelled: false,
            prioritizedGalaxyLocales: [],
        };
    },
    computed: {
        events() {
            return this.$page.events.edges.map((edge) => edge.node);
        },
    },
    methods: {
        slugify,
        setPrioritizedGalaxyLocales() {
            const utcBrowser = (-1 * new Date().getTimezoneOffset()) / 60;
            let galaxies = CONFIG.usegalaxy;
            let priority = galaxies.splice(
                galaxies.findIndex((g) => utcBrowser >= g.utcMin && utcBrowser < g.utcMax),
                1,
            );
            if (priority[0]) {
                galaxies.splice(0, 0, priority[0]);
            }
            this.prioritizedGalaxyLocales = galaxies;
        },
        plausibleCount(goal) {
            if (typeof window.plausible !== "undefined") {
                window.plausible(goal);
            }
        },
    },
    mounted() {
        this.setPrioritizedGalaxyLocales();
    },
    metaInfo() {
        return {
            title: "Home",
        };
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles.scss";

.testimonials-container {
    background: linear-gradient(155deg, #1d4068 44%, #2d629f);
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

<page-query>
query {
    datasetEducation: dataset(path: "/dataset:/home/education/") {
        heading,
        content,
        education {
            title,
            content,
            icon,
            url
        }
    }

    events: allParentArticle(
        limit: 3, sortBy: "date", order: ASC,
        filter: {
            category: {eq: "events"}, subsites: {contains: ["global"]}, has_date: {eq: true}, days_ago: {lte: 0},
            draft: {ne: true}
        }
    ) {
        totalCount
        edges {
            node {
                id
                title
                tease
                external_url
                path
                date (format: "MMM D")
                end  (format: "MMM D")
            }
        }
    }

}
</page-query>

<static-query>
query {
    datasetCallouts: dataset(path: "/dataset:/home/callouts/") {
        heading,
        callout1 {
            title,
            content
        },
        callout2 {
            title,
            content
        },
        callout3 {
            title,
            content
        },
        callout4 {
            title,
            content
        },
        callout5 {
            title,
            content
        },
        callout6 {
            title,
            content
        }
    }

    datasetResearch: dataset(path: "/dataset:/home/research/") {
        heading,
        research3 {
            title,
            content,
            url,
            button {
                title,
                url
            },
            links {
                title,
                url
            }
        },
        research5 {
            title,
            content
        },
        research6 {
            logos {
                title,
                url,
                image,
                width
            }
        }
    }

}
</static-query>
