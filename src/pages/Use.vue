<template>
    <Layout>
        <ClientOnly>
            <!-- Page name and description. -->
            <h1 class="page-title">{{ inserts.main.title }}</h1>
            <div class="markdown" v-html="inserts.main.content"></div>

            <b-tabs 
                nav-class="font-weight-bold"
                v-model="tabState.activeTabIndex"
                @activate-tab="tabState.onTabChange"
            >
                <b-tab v-for="(tab, index) in tabs" :data-tab="tab.id" :key="tab.id" :title="tab.label">
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
                    <div
                        class="markdown"
                        v-if="inserts[`tab-${tab.id}`]"
                        v-html="inserts[`tab-${tab.id}`].content"
                    ></div>
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
                                    :options="perPageOptions"
                                    size="sm"
                                    @input="updatePageData(tab)"
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
                                    v-model="tab.currentPage"
                                    :total-rows="tab.displayed"
                                    :per-page="perPage"
                                    limit="5"
                                    first-number
                                    last-number
                                    :aria-controls="`${tab.id}-table`"
                                    @input="updatePageData(tab)"
                                ></b-pagination>
                            </b-form-group>
                        </b-col>
                        <b-col cols="3">
                            <p>
                                Showing {{ tab.pageStart }} to {{ tab.pageEnd }} of {{ tab.displayed }}
                                <template v-if="filter"> results </template>
                                <template v-else> total </template>
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
                        :current-page="tab.currentPage"
                        :filter="filter"
                        :filter-included-fields="['filterKey']"
                        :sort-compare="customSortCompare"
                        @filtered="(items, total) => updateDisplayed(tab, total)"
                    >
                        <template #cell(resource)="data">
                            <a :href="data.item.path">
                                {{ data.item.title || data.item.path }}
                            </a><br>
                            <a
                                v-for="link of getLinks(data.item, [tab.linkGroup || tab.id])"
                                :key="link.url"
                                :href="link.url"
                                target="_blank"
                                class="small text-muted"
                            >
                                {{ short(link.url) }}
                            </a>
                        </template>
                        <template #cell(tier)="data">
                            <span v-if="getTierValue(data.item)" class="badge badge-primary">
                                Tier {{ getTierValue(data.item) }}
                            </span>
                            <span v-else class="text-muted">
                                -
                            </span>
                        </template>
                        <template #cell(link)="data">
                            <a
                                v-for="link of getLinks(data.item, [tab.linkGroup || tab.id])"
                                :key="link.text"
                                :href="link.url"
                                target="_blank"
                            >
                                {{ link.text }}
                            </a>
                        </template>
                        <template #cell(cloud)="data">
                            <a
                                v-for="link of getLinks(data.item, ['academic-cloud', 'commercial-cloud'])"
                                :key="link.text"
                                :href="link.url"
                                target="_blank"
                            >
                                {{ link.text }}
                            </a>
                        </template>
                        <template #cell(deployable)="data">
                            <a
                                v-for="link of getLinks(data.item, ['container', 'vm'])"
                                :key="link.text"
                                :href="link.url"
                                target="_blank"
                            >
                                {{ link.text }}
                            </a>
                        </template>
                        <template #cell(summary)="data">
                            <span class="markdown" v-html="mdToHtml(data.item.summary)"></span>
                        </template>
                        <template #cell(purview)="data">
                            {{ getPlatformValueByGroup(data.item, tab.id, "platform_purview") }}
                        </template>
                        <template #cell(keywords)="data">
                            <g-link :to="keywords[data.item.scope].link">
                                {{ keywords[data.item.scope].text }}
                            </g-link>
                        </template>
                    </b-table>
                    <!-- Post-table text (optional). -->
                    <div
                        class="markdown"
                        v-if="inserts[`tab-${tab.id}-footer`]"
                        v-html="inserts[`tab-${tab.id}-footer`].content"
                    ></div>
                </b-tab>
            </b-tabs>

            <hr />
            <!-- Footer. -->
            <footer class="page-footer markdown" v-if="inserts.footer" v-html="inserts.footer.content"></footer>
        </ClientOnly>
    </Layout>
</template>

<script>
import { rmPrefix, rmSuffix, mdToHtml } from "~/lib/utils.js";
import { useTableRouting } from "~/composables/useTableRouting.js";
import { useTableSorting } from "~/composables/useTableSorting.js";

const LINK_DISP_NAMES = {
    "academic-cloud": "Academic",
    "commercial-cloud": "Commercial",
    container: "Container",
    vm: "VM",
    "public-server": "Server"
};

const KEYWORDS = {
    usegalaxy: { link: "/use/#usegalaxy-dir", text: "UseGalaxy" },
    general: { link: "/use/#genomics", text: "Genomics" },
    domain: { link: "/use/#domain", text: "Domain" },
    "tool-publishing": { link: "/use/#tool-publishing", text: "Tools" }
};

const { createSortableField } = useTableSorting();

const tabs = [
    {
        active: true,
        id: "usegalaxy",
        label: "UseGalaxy",
        anchor: "usegalaxy-dir",
        linkGroup: "public-server",
        columns: [
            createSortableField("resource", "Resource"),
            { key: "link", label: "Server" }, 
            { key: "summary", label: "Summary" }, 
            { key: "keywords", label: "Keywords" }
        ]
    },
    {
        id: "all",
        label: "All",
        linkGroup: "public-server",
        columns: [
            createSortableField("resource", "Resource"),
            { key: "link", label: "Server" }, 
            { key: "cloud", label: "Cloud" }, 
            { key: "deployable", label: "Deployable" }, 
            { key: "summary", label: "Summary" }, 
            { key: "keywords", label: "Keywords" }
        ]
    },
    {
        id: "public-server",
        label: "Public Servers",
        columns: [
            createSortableField("resource", "Resource"),
            createSortableField("tier", "Tier"),
            { key: "summary", label: "Summary" }, 
            { key: "keywords", label: "Keywords" }
        ]
    },
    {
        id: "academic-cloud",
        label: "Academic Clouds",
        columns: [
            createSortableField("resource", "Resource"),
            { key: "link", label: "Link" }, 
            { key: "summary", label: "Summary" }, 
            { key: "purview", label: "Purview" }, 
            { key: "keywords", label: "Keywords" }
        ]
    },
    {
        id: "commercial-cloud",
        label: "Commercial Clouds",
        columns: [
            createSortableField("resource", "Resource"),
            { key: "link", label: "Link" }, 
            { key: "summary", label: "Summary" }, 
            { key: "keywords", label: "Keywords" }
        ]
    },
    {
        id: "containers",
        label: "Containers",
        anchor: "container",
        linkGroup: "container",
        columns: [
            createSortableField("resource", "Resource"),
            { key: "link", label: "Link" }, 
            { key: "summary", label: "Summary" }, 
            { key: "keywords", label: "Keywords" }
        ]
    },
    {
        id: "vms",
        label: "VMs",
        anchor: "vm",
        linkGroup: "vm",
        columns: [
            createSortableField("resource", "Resource"),
            { key: "link", label: "Link" }, 
            { key: "summary", label: "Summary" }, 
            { key: "keywords", label: "Keywords" }
        ]
    }
];

// Initialize tab properties
for (const tab of tabs) {
    tab.platforms = [];
    tab.displayed = 0;
    tab.currentPage = 1;
    tab.pageStart = 0;
    tab.pageEnd = 0;
}

function platformContainsGroup(platform, group) {
    const filteredPlatforms = platform.platforms.filter((p) => p.platform_group === group);
    return filteredPlatforms.length > 0;
}

function makeFilterKey(platform) {
    const key = [];
    
    for (const field of ["title", "path", "url"]) {
        if (platform[field]) {
            key.push(platform[field]);
        }
    }
    
    if (platform.summary) {
        // TODO: Remove Markdown syntax so that "**F**inge**R**printing **O**ntology of **G**enomic variations"
        // becomes "FingeRprinting Ontology of Genomic variations".
        key.push(platform.summary);
    }
    
    if (KEYWORDS[platform.scope]) {
        key.push(KEYWORDS[platform.scope].text);
    }
    
    for (const platformData of platform.platforms) {
        for (const pkey of ["platform_url", "platform_text"]) {
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
            title: this.inserts.main.title
        };
    },
    
    data() {
        return {
            perPage: 20,
            perPageOptions: [10, 20, 40, 80, { value: 1000, text: "All" }],
            filter: "",
            keywords: KEYWORDS,
            tabs: tabs,
            pageInserts: {},
            tabState: null  // Will be initialized in created()
        };
    },
    
    computed: {
        inserts() {
            return this.pageInserts || {};
        },
        platforms() {
            const platforms = this.$page.platforms.edges.map((edge) => edge.node); // Use 'const'
            platforms.forEach((platform) => (platform.filterKey = makeFilterKey(platform)));
            return platforms;
        }
    },
    
    methods: {
        mdToHtml,
        
        getTierValue(item) {
            // Handle array format: designation = [{ tier: 1 }]
            if (item.designation && Array.isArray(item.designation) && item.designation.length > 0) {
                return item.designation[0].tier;
            }
            // Handle object format: designation = { tier: 1 }
            if (item.designation && item.designation.tier) {
                return item.designation.tier;
            }
            return null;
        },
        
        platformsByGroup(group) {
            return this.platforms.filter((platform) => platformContainsGroup(platform, group));
        },
        
        getPlatformValueByGroup(platformData, group, key) {
            for (const platform of platformData.platforms) { // Use 'const' instead of 'let'
                if (platform.platform_group === group) {
                    return platform[key];
                }
            }
            return undefined; // Explicit return for no match
        },
        
        getLinks(platform, groups) {
            const links = []; // Use 'const'
            for (const platformData of platform.platforms) { // Use 'const'
                if (groups.includes(platformData.platform_group)) {
                    links.push({ 
                        url: platformData.platform_url, 
                        text: LINK_DISP_NAMES[platformData.platform_group] 
                    });
                }
            }
            return links;
        },
        
        updateDisplayed(tab, total) {
            tab.displayed = total;
            this.updatePageData(tab);
        },
        
        updatePageData(tab) {
            if (tab.displayed === 0) {
                tab.pageStart = 0;
            } else {
                tab.pageStart = (tab.currentPage - 1) * this.perPage + 1;
            }
            
            const pageEnd = tab.currentPage * this.perPage; // Use 'const'
            if (pageEnd > tab.displayed) {
                tab.pageEnd = tab.displayed;
            } else {
                tab.pageEnd = pageEnd;
            }
        },
        
        short(url) {
            // Remove (1) http(s):// and www. prefixes and (2) hanging "/" and (3) numeric 4-digit port suffix for display purposes
            return url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "").replace(/:\d{4}$/, "");
        },
        
        customSortCompare(aRow, bRow, key) {
            const { customSortCompare } = useTableSorting();
            return customSortCompare(aRow, bRow, key);
        }
    },
    
    created() {
        const { createTabStateManager } = useTableRouting();
        this.tabState = createTabStateManager(this.tabs, this.$route, this.$router);
        
        for (const tab of this.tabs) { // Use 'const' instead of 'let'
            if (tab.id === "usegalaxy") {
                tab.platforms = this.platforms.filter((platform) => platform.scope === "usegalaxy");
            } else if (tab.id === "all") {
                tab.platforms = this.platforms;
            } else {
                tab.platforms = this.platformsByGroup(tab.anchor || tab.id);
            }
            tab.displayed = tab.platforms.length;
            this.updatePageData(tab);
        }

        this.pageInserts = {};
        for (const edge of this.$page.allInsert.edges) { // Use 'const' instead of 'let'
            const name = rmSuffix(rmPrefix(edge.node.path, "/insert:/use/"), "/");
            this.pageInserts[name] = edge.node;
        }
        Object.freeze(this.pageInserts);

        this.tabState.initializeFromUrl();
    },

    watch: {
        '$route.query.resource_type'(newType, oldType) {
            // Handle direct URL navigation or browser back/forward
            if (newType !== oldType && this.tabState) {
                this.tabState.handleRouteChange(newType, oldType);
            }
        }
    }
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/use/main/") {
        fileInfo {
            path
        }
    }
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
                designation {
                    tier
                }
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

/* Tier badge styling */
.badge-primary {
    background-color: #007bff;
    color: white;
    padding: 0.25em 0.6em;
    border-radius: 0.25rem;
    font-size: 0.75em;
    font-weight: 600;
}

/* Center align tier column */
::v-deep .table td[aria-describedby$="-tier"],
::v-deep .table th[aria-describedby$="-tier"] {
    text-align: center;
}

::v-deep .table td:first-child,
::v-deep .table td[aria-describedby$="-resource"],
::v-deep .table td[data-label="Resource"],
::v-deep .table td[data-label="resource"] {
    white-space: normal !important;
    word-wrap: break-word;
    word-break: break-word;
    min-width: 200px;
    vertical-align: top;
}

::v-deep .table th:first-child,
::v-deep .table th[aria-describedby$="-resource"] {
    white-space: normal !important;
    word-wrap: break-word;
    word-break: break-word;
    min-width: 200px;
    vertical-align: top;
}

::v-deep .table th[aria-sort="none"] div::after {
    content: "\2195";
    padding-left: 15px;
}

::v-deep .table th[aria-sort="ascending"] div::after {
    content: "\2191";
    padding-left: 15px;
}

::v-deep .table th[aria-sort="descending"] div::after {
    content: "\2193";
    padding-left: 15px;
}
</style>
