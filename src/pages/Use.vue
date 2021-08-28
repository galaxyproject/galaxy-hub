<template>
    <Layout>
        <h1 class="page-title">{{ inserts.main.title }}</h1>
        <div class="markdown" v-html="inserts.main.content"></div>
        <ul id="resource-tabs" class="nav nav-tabs nav-fill" role="tablist">
            <li v-for="tab in tabs" :key="`${tab.id}-tab`" class="nav-item">
                <a
                    :id="`${tab.id}-tab`"
                    :class="['nav-link', tab.active ? ' active' : '']"
                    data-toggle-group="use-panes"
                    data-toggle="tab"
                    role="tab"
                    :aria-controls="`${tab.id}-pane`"
                    aria-selected="true"
                    @click.prevent="switchPane(tab.id, 'use-panes')"
                >
                    <strong>{{ tab.label }}</strong>
                </a>
            </li>
        </ul>
        <div id="resource-tabs-content" class="tab-content">
            <div
                v-for="tab in tabs"
                :key="`${tab.id}-pane`"
                :id="`${tab.id}-pane`"
                :class="['tab-pane', 'fade', 'show', tab.active ? 'active' : '']"
                data-toggle-group="use-panes"
                :aria-labelledby="`${tab.id}-tab`"
                role="tabpanel"
            >
                <h2 :id="tabs.anchor || tabs.id" class="nav-item">
                    <template v-if="inserts[`tab-${tab.id}`]">
                        {{ inserts[`tab-${tab.id}`].title }}
                    </template>
                    <template v-else>
                        {{ tab.label }}
                    </template>
                </h2>
                <p class="markdown" v-if="inserts[`tab-${tab.id}`]" v-html="inserts[`tab-${tab.id}`].content"></p>
                <b-table striped hover :items="tab.platforms" :fields="tab.columns">
                    <template v-slot:cell(resource)="data">
                        <a :href="data.item.path">
                            <template v-if="data.item.title">{{ data.item.title }}</template>
                            <template v-else>{{ data.item.path }}</template>
                        </a>
                    </template>
                    <template v-slot:cell(link)="data">
                        <a
                            v-for="link of getLinks(data.item, [tab.linkGroup || tab.id])"
                            :key="link.text"
                            :href="link.url"
                        >
                            {{ link.text }}
                        </a>
                    </template>
                    <template v-slot:cell(cloud)="data">
                        <a
                            v-for="link of getLinks(data.item, ['academic-cloud','commercial-cloud'])"
                            :key="link.text"
                            :href="link.url"
                        >
                            {{ link.text }}
                        </a>
                    </template>
                    <template v-slot:cell(deployable)="data">
                        <a
                            v-for="link of getLinks(data.item, ['container', 'vm'])"
                            :key="link.text"
                            :href="link.url"
                        >
                            {{ link.text }}
                        </a>
                    </template>
                    <template v-slot:cell(summary)="data">
                        <span class="markdown" v-html="mdToHtml(data.item.summary)"></span>
                    </template>
                    <template v-slot:cell(purview)="data">
                        {{ getPlatformValueByGroup(data.item, tab.id, "platform_purview") }}
                    </template>
                    <template v-slot:cell(keywords)="data">
                        <g-link :to="keywords[data.item.scope].link">
                            {{ keywords[data.item.scope].shortText }}
                        </g-link>
                    </template>
                </b-table>
                <p
                    class="markdown"
                    v-if="inserts[`tab-${tab.id}-footer`]"
                    v-html="inserts[`tab-${tab.id}-footer`].content"
                ></p>
            </div>
        </div>
        <hr />
        <footer class="page-footer markdown" v-if="inserts.footer" v-html="inserts.footer.content"></footer>
    </Layout>
</template>

<script>
import { rmPrefix, rmSuffix, mdToHtml, contains, switchPane } from "~/utils.js";
const LINK_DISP_NAMES = {
    "academic-cloud": "Academic",
    "commercial-cloud": "Commercial",
    "container": "Container",
    "vm": "VM",
    "public-server": "Server",
};
function platformContainsGroup(platform, group) {
    let filteredPlatforms = platform.platforms.filter((p) => p.platform_group === group);
    return filteredPlatforms.length > 0;
}
export default {
    components: {
    },
    metaInfo() {
        return {
            title: this.inserts.main.title,
        };
    },
    methods: {
        mdToHtml,
        switchPane,
        platformsByGroup(group) {
            return this.sortedPlatforms.filter((platform) => platformContainsGroup(platform, group));
        },
        getPlatformValueByGroup(platformData, group, key) {
            for (let platform of platformData.platforms) {
                if (platform.platform_group === group) {
                    return platform[key];
                }
            }
        },
        getLinks(platform, groups) {
            let links = [];
            for (let platformData of platform.platforms) {
                if (contains(groups, platformData.platform_group)) {
                    links.push({ url: platformData.platform_url, text: LINK_DISP_NAMES[platformData.platform_group] });
                }
            }
            return links;
        },
    },
    data() {
        return {
            keywords: {
                usegalaxy: {
                    link: "/use/#usegalaxy-dir",
                    shortText: "UseGalaxy",
                },
                general: {
                    link: "/use/#genomics",
                    shortText: "Genomics",
                },
                domain: {
                    link: "/use/#domain",
                    shortText: "Domain",
                },
                "tool-publishing": {
                    link: "/use/#tool-publishing",
                    shortText: "Tools",
                },
            },
        }
    },
    computed: {
        inserts() {
            let inserts = {};
            for (let edge of this.$page.allInsert.edges) {
                let name = rmSuffix(rmPrefix(edge.node.path, "/insert:/use/"), "/");
                inserts[name] = edge.node;
            }
            return inserts;
        },
        sortedPlatforms() {
            return this.$page.platforms.edges
                .map((edge) => edge.node)
                .sort((n1, n2) => n1.title.toLowerCase().localeCompare(n2.title.toLowerCase()));
        },
        platformsUsegalaxy() {
            return this.sortedPlatforms.filter((platform) => platform.scope === "usegalaxy");
        },
        tabs() {
            return [
                {
                    id: "usegalaxy",
                    label: "UseGalaxy",
                    anchor: "usegalaxy-dir",
                    platforms: this.platformsUsegalaxy,
                    active: true,
                    linkGroup: "public-server",
                    columns: ["resource", { key:"link", label:"Server" }, "summary", "keywords"],
                },
                {
                    id: "all-resources",
                    label: "All",
                    platforms: this.sortedPlatforms,
                    linkGroup: "public-server",
                    columns: ["resource", { key:"link", label:"Server" }, "cloud", "deployable", "summary", "keywords"],
                },
                {
                    id: "public-server",
                    label: "Public Servers",
                    platforms: this.platformsByGroup("public-server"),
                    columns: ["resource", "link", "summary", "keywords"],
                },
                {
                    id: "academic-cloud",
                    label: "Academic Clouds",
                    platforms: this.platformsByGroup("academic-cloud"),
                    columns: ["resource", "link", "summary", "purview", "keywords"],
                },
                {
                    id: "commercial-cloud",
                    label: "Commercial Clouds",
                    platforms: this.platformsByGroup("commercial-cloud"),
                    columns: ["resource", "link", "summary", "keywords"],
                },
                {
                    id: "containers",
                    label: "Containers",
                    anchor: "container",
                    linkGroup: "container",
                    platforms: this.platformsByGroup("container"),
                    columns: ["resource", "link", "summary", "keywords"],
                },
                {
                    id: "vms",
                    label: "VMs",
                    anchor: "vm",
                    linkGroup: "vm",
                    platforms: this.platformsByGroup("vm"),
                    columns: ["resource", "link", "summary", "keywords"],
                },
            ];
        },
    },
};
</script>

<page-query>
query {
  allInsert(filter: {path: {regex: "^/insert:/use/[^/]+/$"}}) {
    totalCount
    edges {
      node {
        id
        path
        title
        content
      }
    }
  }
  platforms: allPlatform(sortBy: "title", order: ASC) {
    totalCount
    edges {
      node {
        id
        title
        scope
        summary
        url
        path
        platforms {
          platform_group
          platform_url
          platform_purview
        }
      }
    }
  }
}
</page-query>

<style scoped>
a.nav-link {
    cursor: pointer;
}
footer.page-footer {
    font-size: 100%;
}
</style>
