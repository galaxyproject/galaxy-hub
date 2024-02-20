<template>
    <layout>
        <div class="container p-2">
            <div class="row">
                <div class="col-lg-7">
                    <div v-html="$page.hero.notification" class="text-center notification bgBrighter"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7 mb-4">
                    <h1 v-html="$page.hero.description" class="mb-3"></h1>
                    <div v-html="$page.hero.content" class="hero highlight"></div>
                    <nav class="navbar navbar-default p-0" id="heroMaincontainer">
                        <div class="container-fluid">
                            <div class="nav navbar-nav">
                                <div v-if="prioritizedGalaxyLocales" class="dropdown show">
                                    <a
                                        :href="'/usegalaxy/redirect/?locale=' + prioritizedGalaxyLocales[0].locale"
                                        class="btn hero mr-3 bgBright dropdown-toggle"
                                        role="button"
                                        target="_blank"
                                        id="dropdownMenuLink"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {{ $page.hero.button1 }}:
                                        {{ prioritizedGalaxyLocales[0].locale }}
                                    </a>
                                    <div
                                        v-if="prioritizedGalaxyLocales.length > 0"
                                        class="dropdown-menu hero bgBright m-0 pb-0"
                                        aria-labelledby="dropdownMenuLink"
                                    >
                                        <a
                                            v-for="(site, i) in prioritizedGalaxyLocales.slice(1)"
                                            :href="'/usegalaxy/redirect/?locale=' + site.locale"
                                            :key="i"
                                            target="_blank"
                                            class="dropdown-item"
                                        >
                                            {{ $page.hero.button1 }}:
                                            {{ site.locale }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a :href="$page.hero.buttonUrl2" class="btn hero bgBright">{{ $page.hero.button2 }}</a>
                        </div>
                    </nav>
                </div>
                <div class="col-lg-5">
                    <div v-html="$page.hero.image"></div>
                </div>
            </div>
        </div>
        <div class="container-fluid-real p-0">
            <div class="container-fluid-real p-0 bgBright bgGradient">
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
                        <a
                            :href="this.$static.datasetResearch.research1.url"
                            rel="noopener"
                            target="_blank"
                            class="text-white"
                        >
                            <h3>{{ this.$static.datasetResearch.research1.title }}</h3>
                        </a>
                        <a
                            :href="p.url"
                            class="mb-3 text-white small"
                            v-for="p in this.$static.datasetResearch.research1.links"
                            :key="p.title"
                            role="button"
                            rel="noopener"
                            target="_blank"
                            >{{ p.title }}</a
                        >
                        <a
                            :href="this.$static.datasetResearch.research2.url"
                            target="_blank"
                            rel="noopener"
                            class="text-white"
                        >
                            <h3>{{ this.$static.datasetResearch.research2.title }}</h3>
                        </a>
                        <a
                            :href="this.$static.datasetResearch.research2.url"
                            target="_blank"
                            rel="noopener"
                            class="small text-white"
                        >
                            <div v-html="this.$static.datasetResearch.research2.content"></div>
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
                        <a :href="this.$static.datasetResearch.research4.url">
                            <h3>{{ this.$static.datasetResearch.research4.title }}</h3>
                        </a>
                        <div v-html="this.$static.datasetResearch.research4.content" class="text-white mb-2"></div>
                        <table style="padding: 0">
                            <tbody>
                                <tr v-for="t in this.$static.datasetResearch.research4.events" :key="t.event">
                                    <td>
                                        <div>{{ t.date }}</div>
                                    </td>
                                    <td>
                                        <a
                                            :href="t.url"
                                            rel="noopener"
                                            target="_blank"
                                            class="text-white text-decoration-none"
                                            >{{ t.event }}</a
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="d-flex justify-content-center">
                            <a
                                :href="this.$static.datasetResearch.research4.button.url"
                                role="button"
                                rel="noopener"
                                target="_blank"
                                class="btn text-decoration-none mt-3 mb-3 w-50"
                                >{{ this.$static.datasetResearch.research4.button.title }}</a
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

export default {
    methods: {
        slugify,
    },
    computed: {
        prioritizedGalaxyLocales() {
            const utcBrowser = (-1 * new Date().getTimezoneOffset()) / 60;
            let galaxies = CONFIG.usegalaxy;
            let priority = galaxies.splice(
                galaxies.findIndex((g) => utcBrowser >= g.utcMin && utcBrowser < g.utcMax),
                1
            );
            if (priority[0]) {
                galaxies.splice(0, 0, priority[0]);
            }
            return galaxies;
        },
    },
};
</script>

<page-query>
query {
    hero: insert(path: "/insert:/home/hero/") {
        heading,
        notification,
        description,
        image,
        button1,
        button2,
        buttonUrl2,
        content
    }

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
        research1 {
            title,
            content,
            url,
            links {
                title,
                url
            }
        },
        research2 {
            title,
            content,
            url
        },
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
        research4 {
            title,
            content,
            url,
            button {
                title,
                url
            },
            events {
                event,
                date,
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
