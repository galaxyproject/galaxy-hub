<template>
    <Layout>
        <!-- Page name and description. -->
        <h1 class="page-title">{{ inserts.main.title }}</h1>
        <div class="markdown" v-html="inserts.main.content"></div>
        <!-- Tabs for switching between panes (tables). -->
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
                    @click.prevent="switchPaneWrapper(tab.id,'use-panes')"
                >
                    <strong>{{ tab.label }}</strong>
                </a>
            </li>
        </ul>
        <!-- Panes (each containing a table). -->
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
                <!-- Table name. -->
                <h2 :id="tabs.anchor || tabs.id" class="nav-item">
                    <template v-if="inserts[`tab-${tab.id}`]">
                        {{ inserts[`tab-${tab.id}`].title }}
                    </template>
                    <template v-else>
                        {{ tab.label }}
                    </template>
                </h2>
                <!-- Table description. -->
                <p class="markdown" v-if="inserts[`tab-${tab.id}`]" v-html="inserts[`tab-${tab.id}`].content"></p>
                <!-- Table controls -->
                <b-row class="table-controls">
                    <!-- Search -->
                    <b-col cols="2">
                        <b-form-input
                            :id="`${tab.id}-filter-input`"
                            v-model="filter"
                            type="search"
                            placeholder="Type to Search"
                        ></b-form-input>
                    </b-col>
                    <!-- Items per page selector -->
                    <b-col cols="2">
                        <b-form-group
                            label="Per page"
                            :label-for="`${tab.id}-per-page-select`"
                            label-size="md"
                            label-cols="auto"
                        >
                            <b-form-select
                                :id="`${tab.id}-per-page-select`"
                                v-model="perPage"
                                :options="[10,20,40,80,{value:1000,text:'All'}]"
                                size="sm"
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <!-- Page selector -->
                    <b-col cols="5">
                        <b-form-group
                            label="Page"
                            :label-for="`${tab.id}-page-select`"
                            label-size="md"
                            label-cols="auto"
                        >
                            <b-pagination
                                :id="`${tab.id}-page-select`"
                                v-model="currentPage"
                                :total-rows="tab.displayed"
                                :per-page="perPage"
                                limit="5"
                                first-number
                                last-number
                                :aria-controls="`${tab.id}-table`"
                            ></b-pagination>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <p>
                            Showing {{ currentStart }} to {{ currentEnd }} of {{ tab.displayed }}
                            <template v-if="filter">
                                results
                            </template>
                            <template v-else>
                                total
                            </template>
                        </p>
                    </b-col>
                </b-row>
                <!-- The table itself. -->
                <b-table
                    striped
                    hover
                    :id="`${tab.id}-table`"
                    :items="tab.platforms"
                    :fields="tab.columns"
                    primary-key="id"
                    sort-by="title"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :filter="filter"
                    :filter-included-fields="['filterKey']"
                    @filtered="(items,total) => updateDisplayed(tab.id,total)"
                >
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
                <!-- Post-table text (optional). -->
                <p
                    class="markdown"
                    v-if="inserts[`tab-${tab.id}-footer`]"
                    v-html="inserts[`tab-${tab.id}-footer`].content"
                ></p>
            </div>
        </div>
        <hr />
        <!-- Footer. -->
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
const KEYWORDS = {
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
};
function platformContainsGroup(platform, group) {
    let filteredPlatforms = platform.platforms.filter((p) => p.platform_group === group);
    return filteredPlatforms.length > 0;
}
function makeFilterKey(platform) {
    let key = [];
    for (let field of ["title", "path", "url"]) {
        if (platform[field]) {
            key.push(platform[field]);
        }
    }
    if (platform.summary) {
        //TODO: Remove Markdown syntax so that "**F**inge**R**printing **O**ntology of **G**enomic variations"
        //      becomes "FingeRprinting Ontology of Genomic variations".
        key.push(platform.summary);
    }
    if (KEYWORDS[platform.scope]) {
        key.push(KEYWORDS[platform.scope].shortText);
    }
    for (let platformData of platform.platforms) {
        for (let pkey of ["platform_url","platform_text"]) {
            if (platformData[pkey]) {
                key.push(platformData[pkey]);
            }
        }
        if (platformData.platform_group) {
            key.push(LINK_DISP_NAMES[platformData.platform_group]);
        }
    }
    return String(key);
}
export default {
    metaInfo() {
        return {
            title: this.inserts.main.title,
        };
    },
    methods: {
        mdToHtml,
        platformsByGroup(group) {
            return this.platforms.filter((platform) => platformContainsGroup(platform, group));
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
        switchPaneWrapper(tabId, paneGroup) {
            switchPane(tabId, paneGroup);
            this.activeTab = tabId;
            let activeTabData = this.getActiveTabData();
            if (! activeTabData) {
                return;
            }
            while (this.currentStart > activeTabData.displayed && this.currentPage > 1) {
                this.currentPage--;
            }
        },
        getActiveTabData() {
            let activeTabData = this.tabsById[this.activeTab];
            if (activeTabData) {
                return activeTabData;
            } else {
                console.error(`Could not find tab with id ${this.activeTab}.`);
            }
        },
        updateDisplayed(tabId, total) {
            let tab = this.tabsById[tabId];
            if (tab) {
                tab.displayed = total;
            } else {
                console.error(`Could not find tab with id ${tabId}.`);
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            perPage: 20,
            filter: "",
            keywords: KEYWORDS,
            activeTab: 'usegalaxy',
            tabs: [
                {
                    id: "usegalaxy",
                    label: "UseGalaxy",
                    anchor: "usegalaxy-dir",
                    linkGroup: "public-server",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", { key:"link", label:"Server" }, "summary", "keywords"],
                },
                {
                    id: "all-resources",
                    label: "All",
                    linkGroup: "public-server",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", { key:"link", label:"Server" }, "cloud", "deployable", "summary", "keywords"],
                },
                {
                    id: "public-server",
                    label: "Public Servers",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", "link", "summary", "keywords"],
                },
                {
                    id: "academic-cloud",
                    label: "Academic Clouds",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", "link", "summary", "purview", "keywords"],
                },
                {
                    id: "commercial-cloud",
                    label: "Commercial Clouds",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", "link", "summary", "keywords"],
                },
                {
                    id: "containers",
                    label: "Containers",
                    anchor: "container",
                    linkGroup: "container",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", "link", "summary", "keywords"],
                },
                {
                    id: "vms",
                    label: "VMs",
                    anchor: "vm",
                    linkGroup: "vm",
                    platforms: [],
                    displayed: 0,
                    columns: ["resource", "link", "summary", "keywords"],
                },
            ]
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
        platforms() {
            let platforms = this.$page.platforms.edges.map(edge => edge.node);
            platforms.forEach(platform => platform.filterKey = makeFilterKey(platform));
            return platforms;
        },
        currentStart() {
            let activeTabData = this.getActiveTabData();
            if (activeTabData && activeTabData.displayed === 0) {
                return 0;
            } else {
                return (this.currentPage-1)*this.perPage + 1;
            }
        },
        currentEnd() {
            let pageEnd = this.currentPage*this.perPage;
            let activeTabData = this.getActiveTabData();
            if (activeTabData && pageEnd > activeTabData.displayed) {
                return activeTabData.displayed;
            } else {
                return pageEnd;
            }
        },
        tabsById() {
            let tabsById = {};
            for (let tab of this.tabs) {
                tabsById[tab.id] = tab;
            }
            return tabsById;
        },
    },
    created() {
        // Fill in the `platforms` array for each tab (and derived attributes).
        // The source of this data is `this.$page.platforms`, which isn't available to `data()`.
        // But we need to declare the `tabs` in `data()` in order for the page to be responsive to updates.
        for (let tab of this.tabs) {
            if (tab.id === this.activeTab) {
                tab.active = true;
            }
            if (tab.id === 'usegalaxy') {
                tab.platforms = this.platforms.filter(platform => platform.scope === "usegalaxy");
            } else if (tab.id === 'all-resources') {
                tab.platforms = this.platforms;
            } else {
                tab.platforms = this.platformsByGroup(tab.anchor || tab.id);
            }
            tab.displayed = tab.platforms.length;
        }
    }
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
.table-controls {
    height: 2.5em;
}
footer.page-footer {
    font-size: 100%;
}
</style>
