<template>
    <Layout>
        <ClientOnly>
            <!-- Page name and description. -->
            <h1 class="page-title">{{ inserts.main.title }}</h1>
            <div class="markdown" v-html="inserts.main.content"></div>

            <b-tabs nav-class="font-weight-bold" v-model="tabState.activeTabIndex" @activate-tab="tabState.onTabChange">
                <b-tab v-for="tab in tabs" :data-tab="tab.id" :key="tab.id" :title="tab.label">
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
                        <!-- Search with Autocomplete -->
                        <b-col cols="2" class="position-relative">
                            <b-form-input
                                :id="`${tab.id}-filter-input`"
                                v-model="filter"
                                type="search"
                                placeholder="Search, tool:name, or reference:genome"
                                @input="onInputChange"
                                @keydown="onInputKeydown"
                                @blur="closeAutocomplete"
                                autocomplete="off"
                            ></b-form-input>

                            <!-- Autocomplete Dropdown -->
                            <div
                                v-if="showAutocomplete && filteredSuggestions.length > 0"
                                class="autocomplete-dropdown"
                            >
                                <div
                                    v-for="(suggestion, index) in filteredSuggestions"
                                    :key="index"
                                    class="autocomplete-item"
                                    :class="{ selected: index === selectedSuggestionIndex }"
                                    @mousedown.prevent="selectSuggestion(suggestion)"
                                    @mouseenter="selectedSuggestionIndex = index"
                                >
                                    <span class="suggestion-name">{{ suggestion.name }}</span>
                                    <b-badge :variant="suggestion.type === 'tool' ? 'primary' : 'success'" class="ml-2">
                                        {{ suggestion.displayType }}
                                    </b-badge>
                                </div>
                            </div>
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
                            <p class="page-label">
                                Showing {{ tab.pageStart }} to {{ tab.pageEnd }} of {{ tab.displayed }}
                                <template v-if="filter"> results </template>
                                <template v-else> total </template>
                            </p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <div class="query-indicator">
                                <div v-if="filter.length > 0 && filter.length < KEYWORD_LENGTH_MIN">
                                    <small class="font-weight-bold">Search term is too short</small>
                                </div>
                                <div v-else>
                                    <small v-if="isToolSearch"> 🔍 Tool search: "{{ toolSearchQuery }}" </small>
                                    <small v-else-if="isReferenceSearch">
                                        🔍 Reference search: "{{ referenceSearchQuery }}"
                                    </small>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- The table itself. -->
                    <b-table
                        striped
                        hover
                        :id="`${tab.id}-table`"
                        :items="getFilteredPlatforms(tab)"
                        :fields="tab.columns"
                        primary-key="id"
                        sort-by="title"
                        class="mt-0"
                        :per-page="perPage"
                        :current-page="tab.currentPage"
                        :filter="processedFilter"
                        :filter-function="customFilter"
                        :filter-included-fields="['filterKey']"
                        :sort-compare="customSortCompare"
                        @filtered="(items, total) => updateDisplayed(tab, total)"
                    >
                        <template #cell(platform)="data">
                            <a :href="data.item.path">{{ data.item.title || data.item.path }}</a>
                        </template>
                        <template #cell(region)="data">
                            <span v-if="getRegionValue(data.item)">
                                {{ getRegionValue(data.item) }}
                            </span>
                            <span v-else> - </span>
                        </template>
                        <template #cell(tier)="data">
                            <div v-if="getTierValue(data.item)" class="icon-tier">
                                <i
                                    v-if="getTierDefinition(data.item)"
                                    :class="getTierDefinition(data.item).icon"
                                    :title="
                                        'Tier ' +
                                        getTierDefinition(data.item).tier +
                                        ' - ' +
                                        getTierDefinition(data.item).name
                                    "
                                    style="margin-right: 4px"
                                >
                                </i>
                            </div>
                            <span v-else> - </span>
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
                            <template v-if="tab.id === 'all'">
                                <span
                                    v-if="
                                        getLinks(data.item, [
                                            'public-server',
                                            'academic-cloud',
                                            'commercial-cloud',
                                            'container',
                                            'vm',
                                        ]).length > 0
                                    "
                                >
                                    <span> </span>
                                    <a
                                        v-for="link of getLinks(data.item, [
                                            'public-server',
                                            'academic-cloud',
                                            'commercial-cloud',
                                            'container',
                                            'vm',
                                        ])"
                                        :key="link.text"
                                        :href="link.url"
                                        target="_blank"
                                        class="mr-2"
                                    >
                                        {{ link.text }}
                                    </a>
                                </span>
                            </template>
                        </template>
                        <template #cell(purview)="data">
                            {{ getPlatformValueByGroup(data.item, tab.id, "platform_purview") }}
                        </template>
                        <template #cell(keywords)="data">
                            <g-link :to="keywords[data.item.scope].link">
                                {{ keywords[data.item.scope].text }}
                            </g-link>
                        </template>
                        <template #cell(tools_count)="data">
                            <div v-if="isToolSearch && toolSearchQuery">
                                <!-- Tool search mode: show matching tools with versions -->
                                <div v-if="getMatchingTools(data.item, toolSearchQuery).length > 0">
                                    <div
                                        v-for="(tool, toolIndex) in getMatchingTools(data.item, toolSearchQuery)"
                                        :key="toolIndex"
                                        class="tool-match"
                                    >
                                        <strong>{{ tool.name }}</strong>
                                        <br />
                                        <small class="text-muted">v{{ tool.version }}</small>
                                    </div>
                                </div>
                                <span v-else>-</span>
                            </div>
                            <div v-else>
                                <!-- Normal mode: show total count -->
                                <span v-if="data.item.tools && data.item.tools.length > 0">
                                    <a :href="data.item.url" target="_NEW">{{
                                        formatNumber(data.item.tools.length)
                                    }}</a>
                                </span>
                                <span v-else>-</span>
                            </div>
                        </template>
                        <template #cell(references_count)="data">
                            <div v-if="isReferenceSearch && referenceSearchQuery">
                                <!-- Reference search mode: show matching references -->
                                <div v-if="getMatchingReferences(data.item, referenceSearchQuery).length > 0">
                                    <div
                                        v-for="(reference, idx) in getMatchingReferences(
                                            data.item,
                                            referenceSearchQuery,
                                        ).slice(0, 5)"
                                        :key="idx"
                                        class="reference-match"
                                    >
                                        <small>{{ reference.name }}</small>
                                    </div>
                                    <small
                                        v-if="getMatchingReferences(data.item, referenceSearchQuery).length > 5"
                                        class="text-muted"
                                    >
                                        +{{ getMatchingReferences(data.item, referenceSearchQuery).length - 5 }} more
                                    </small>
                                </div>
                                <span v-else>-</span>
                            </div>
                            <div v-else>
                                <!-- Normal mode: show total count and type -->
                                <span
                                    v-if="
                                        data.item.references &&
                                        data.item.references.items &&
                                        data.item.references.items.length > 0
                                    "
                                >
                                    {{ formatNumber(data.item.references.items.length) }}
                                    {{ data.item.references.type }}
                                </span>
                                <span v-else>-</span>
                            </div>
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
    "public-server": "Server",
};

const KEYWORDS = {
    usegalaxy: { link: "/use/#usegalaxy-dir", text: "UseGalaxy" },
    general: { link: "/use/#genomics", text: "Genomics" },
    domain: { link: "/use/#domain", text: "Domain" },
    "tool-publishing": { link: "/use/#tool-publishing", text: "Tools" },
};

const KEYWORD_LENGTH_MIN = 3;
const SUGGESTIONS_MAX = 15;

const TIER_DEFINITIONS = [
    {
        tier: 1,
        name: "Global instances",
        icon: "fas fa-globe",
        description: "Stable, reliable, and suitable for critical workloads.",
    },
    {
        tier: 2,
        name: "National instances",
        icon: "fas fa-building-columns",
        description:
            "Robust services with geographic / regional focus (e.g. Italy, Canada); suitable for production use.",
    },
    {
        tier: 3,
        name: "Subdomains",
        icon: "fas fa-network-wired",
        description:
            "Instances serving specific specialities or communities; reliability depends on parent domain infrastructure.",
    },
    {
        tier: 4,
        name: "Institutional instances",
        icon: "fas fa-building",
        description: "Instances hosted by institutions; reliability depends on institutional infrastructure.",
    },
    {
        tier: 5,
        name: "Integrated platforms",
        icon: "fas fa-rocket",
        description:
            "Platforms that can launch Galaxy (e.g. AnVIL); variable reliability depends on platform infrastructure.",
    },
    {
        tier: 6,
        name: "Development instances for testing",
        icon: "fas fa-flask",
        description:
            "For development, testing, or experimental purposes; may have limited reliability and not recommended for production use.",
    },
];

const { createSortableField } = useTableSorting();

const tabs = [
    {
        active: true,
        id: "usegalaxy",
        label: "UseGalaxy",
        anchor: "usegalaxy-dir",
        linkGroup: "public-server",
        columns: [
            createSortableField("platform", "Resource"),
            createSortableField("tier", "Tier"),
            { key: "link", label: "Server" },
            { key: "summary", label: "Summary" },
            createSortableField("tools_count", "Tools"),
            createSortableField("references_count", "References"),
            { key: "keywords", label: "Keywords" },
        ],
    },
    {
        id: "all",
        label: "All",
        linkGroup: "public-server",
        columns: [
            createSortableField("platform", "Resource"),
            { key: "link", label: "Server" },
            { key: "cloud", label: "Cloud" },
            { key: "deployable", label: "Deployable" },
            { key: "summary", label: "Summary" },
            createSortableField("tools_count", "Tools"),
            createSortableField("references_count", "References"),
            { key: "keywords", label: "Keywords" },
        ],
    },
    {
        id: "public-server",
        label: "Public Servers",
        columns: [
            createSortableField("platform", "Resource"),
            createSortableField("tier", "Tier"),
            { key: "link", label: "Link" },
            { key: "summary", label: "Summary" },
            createSortableField("tools_count", "Tools"),
            createSortableField("references_count", "References"),
            createSortableField("region", "Region"),
            { key: "keywords", label: "Keywords" },
        ],
    },
    {
        id: "academic-cloud",
        label: "Academic Clouds",
        columns: [
            createSortableField("platform", "Resource"),
            createSortableField("tier", "Tier"),
            { key: "link", label: "Link" },
            { key: "summary", label: "Summary" },
            { key: "purview", label: "Purview" },
            { key: "keywords", label: "Keywords" },
        ],
    },
    {
        id: "commercial-cloud",
        label: "Commercial Clouds",
        columns: [
            createSortableField("platform", "Resource"),
            { key: "summary", label: "Summary" },
            createSortableField("region", "Region"),
            { key: "keywords", label: "Keywords" },
        ],
    },
    {
        id: "containers",
        label: "Containers",
        anchor: "container",
        linkGroup: "container",
        columns: [
            createSortableField("platform", "Resource"),
            { key: "summary", label: "Summary" },
            { key: "keywords", label: "Keywords" },
        ],
    },
    {
        id: "vms",
        label: "VMs",
        anchor: "vm",
        linkGroup: "vm",
        columns: [
            createSortableField("platform", "Resource"),
            { key: "summary", label: "Summary" },
            { key: "keywords", label: "Keywords" },
        ],
    },
];

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
            title: this.inserts.main.title,
        };
    },

    data() {
        return {
            perPage: 20,
            perPageOptions: [10, 20, 40, 80, { value: 1000, text: "All" }],
            items: [],
            filter: "",
            isToolSearch: false,
            toolSearchQuery: "",
            isReferenceSearch: false,
            referenceSearchQuery: "",
            keywords: KEYWORDS,
            tabs: tabs,
            pageInserts: {},
            tabState: null,
            // Autocomplete state
            showAutocomplete: false,
            selectedSuggestionIndex: -1,
            autocompleteInputValue: "",
            KEYWORD_LENGTH_MIN: KEYWORD_LENGTH_MIN,
            SUGGESTIONS_MAX: SUGGESTIONS_MAX,
            // Pre-built suggestions (built once, never changes)
            allSuggestions: [],
            tierDefinitions: TIER_DEFINITIONS,
        };
    },

    computed: {
        inserts() {
            return this.pageInserts || {};
        },

        processedFilter() {
            // Pure computed property - just returns the filter value
            // The watcher on 'filter' handles setting search mode flags
            if (this.filter.toLowerCase().startsWith("tool:")) {
                return ""; // Return empty to trigger custom filter
            } else if (this.filter.toLowerCase().startsWith("reference:")) {
                return ""; // Return empty to trigger custom filter
            } else {
                return this.filter;
            }
        },

        platforms() {
            const platforms = this.$page.platforms.edges.map((edge) => edge.node);
            platforms.forEach((platform) => (platform.filterKey = makeFilterKey(platform)));

            const toolsMap = this.buildToolsMap();
            const referencesMap = this.buildReferencesMap();

            platforms.forEach((platform) => {
                const platformPath = platform.path.replace(/\/$/, ""); // Remove trailing slash
                platform.tools = toolsMap[platformPath] || [];
                platform.references = referencesMap[platformPath] || [];
            });

            return platforms;
        },

        // Filter suggestions based on current input
        filteredSuggestions() {
            const input = this.autocompleteInputValue.toLowerCase().trim();

            // Don't show suggestions if input is empty or already has tool:/reference: prefix
            if (!input || input.startsWith("tool:") || input.startsWith("reference:")) {
                return [];
            }

            // Use pre-computed nameLower instead of calling .toLowerCase() on each iteration
            const matches = this.allSuggestions.filter((suggestion) => suggestion.nameLower.includes(input));

            // Sort by relevance: starts-with matches first, then contains
            matches.sort((a, b) => {
                const aStartsWith = a.nameLower.startsWith(input);
                const bStartsWith = b.nameLower.startsWith(input);

                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return a.nameLower.localeCompare(b.nameLower);
            });

            return matches.slice(0, SUGGESTIONS_MAX);
        },
    },

    methods: {
        mdToHtml,

        formatNumber(num) {
            // Format number with commas (e.g., 1000 -> 1,000)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        getFilteredPlatforms(tab) {
            // Get the base platforms for this tab
            let platforms = tab.platforms;

            // Apply tool search filter
            if (this.isToolSearch && this.toolSearchQuery) {
                platforms = platforms.filter((platform) => this.platformHasTool(platform, this.toolSearchQuery));
            }
            // Apply reference search filter
            else if (this.isReferenceSearch && this.referenceSearchQuery) {
                platforms = platforms.filter((platform) =>
                    this.platformHasReference(platform, this.referenceSearchQuery),
                );
            }
            // Apply regular text search filter
            else if (this.filter && this.filter.trim()) {
                const filterLower = this.filter.toLowerCase();
                platforms = platforms.filter(
                    (platform) => platform.filterKey && platform.filterKey.toLowerCase().includes(filterLower),
                );
            }

            return platforms;
        },

        // Autocomplete methods
        onInputChange(value) {
            if (value.length < KEYWORD_LENGTH_MIN) {
                this.showAutocomplete = false;
                this.selectedSuggestionIndex = -1;
                return;
            }

            this.autocompleteInputValue = value;
            this.selectedSuggestionIndex = -1;
            if (this.filteredSuggestions.length > 0) {
                this.showAutocomplete = true;
            } else {
                this.showAutocomplete = false;
            }
        },

        onInputKeydown(event) {
            // Only handle special keys when autocomplete is showing
            if (!this.showAutocomplete || this.filteredSuggestions.length === 0) {
                return;
            }

            switch (event.key) {
                case "ArrowDown":
                    event.preventDefault();
                    this.selectedSuggestionIndex = Math.min(
                        this.selectedSuggestionIndex + 1,
                        this.filteredSuggestions.length - 1,
                    );
                    break;

                case "ArrowUp":
                    event.preventDefault();
                    this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, -1);
                    break;

                case "Enter":
                    if (this.selectedSuggestionIndex >= 0) {
                        event.preventDefault();
                        this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
                    }
                    this.showAutocomplete = false;
                    break;

                case "Tab":
                    if (this.selectedSuggestionIndex >= 0) {
                        event.preventDefault();
                        this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
                    }
                    break;

                case "ArrowRight":
                    if (this.selectedSuggestionIndex >= 0) {
                        event.preventDefault();
                        this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
                    }
                    break;

                case "Escape":
                    event.preventDefault();
                    this.showAutocomplete = false;
                    this.selectedSuggestionIndex = -1;
                    break;
            }
        },

        selectSuggestion(suggestion) {
            const prefix = suggestion.type === "tool" ? "tool:" : "reference:";
            const newFilterValue = prefix + suggestion.name;

            this.filter = newFilterValue;
            this.autocompleteInputValue = this.filter;
            this.showAutocomplete = false;
            this.selectedSuggestionIndex = -1;
        },

        closeAutocomplete() {
            // Delay closing to allow click events to fire
            setTimeout(() => {
                this.showAutocomplete = false;
                this.selectedSuggestionIndex = -1;
            }, 200);
        },

        buildToolsMap() {
            const toolsMap = {};

            if (this.$page.tools && this.$page.tools.edges) {
                this.$page.tools.edges.forEach((edge) => {
                    const toolsData = edge.node;

                    // Only process datasets that have tools and are named "tools"
                    if (!toolsData.tools || toolsData.fileInfo?.name !== "tools") {
                        return;
                    }

                    // Extract platform path from dataset path
                    let pathMatch = toolsData.path.match(/^\/dataset:(\/use\/[^/]+)\/tools\/?$/);

                    if (pathMatch && toolsData.tools) {
                        const platformPath = pathMatch[1];
                        toolsMap[platformPath] = toolsData.tools;
                    }
                });
            }
            return toolsMap;
        },

        buildReferencesMap() {
            const referencesMap = {};
            if (this.$page.references && this.$page.references.edges) {
                this.$page.references.edges.forEach((edge) => {
                    const referencesData = edge.node;

                    // Only process references that have references array and are named "references"
                    if (!referencesData.references || referencesData.fileInfo?.name !== "references") {
                        return;
                    }

                    // Extract platform path from dataset path
                    let pathMatch = referencesData.path.match(/^\/dataset:(\/use\/[^/]+)\/references\/?$/);

                    if (pathMatch && referencesData.references) {
                        const platformPath = pathMatch[1];
                        // Extract items and type from references array
                        const items = [];
                        let referenceType = "";
                        referencesData.references.forEach((ref) => {
                            if (ref.items) {
                                items.push(...ref.items);
                            }
                            if (ref.type && !referenceType) {
                                referenceType = ref.type;
                            }
                        });
                        referencesMap[platformPath] = {
                            items: items,
                            type: referenceType,
                            length: items.length,
                        };
                    }
                });
            }

            return referencesMap;
        },

        getMatchingTools(platform, toolName) {
            if (!platform.tools || !toolName) {
                return [];
            }

            return platform.tools.filter((tool) => tool.name && tool.name.toLowerCase() === toolName.toLowerCase());
        },

        getMatchingReferences(platform, referenceName) {
            if (!platform.references || !platform.references.items || !referenceName) {
                return [];
            }

            return platform.references.items.filter(
                (reference) => reference.name && reference.name.toLowerCase() === referenceName.toLowerCase(),
            );
        },

        platformHasTool(platform, toolName) {
            return this.getMatchingTools(platform, toolName).length > 0;
        },

        platformHasReference(platform, referenceName) {
            return this.getMatchingReferences(platform, referenceName).length > 0;
        },

        customFilter(item, filter) {
            // Custom filter function for b-table
            // Bootstrap Vue calls this for EACH item individually
            // Return true to include the item, false to exclude it

            if (this.isToolSearch && this.toolSearchQuery) {
                return this.platformHasTool(item, this.toolSearchQuery);
            }
            if (this.isReferenceSearch && this.referenceSearchQuery) {
                return this.platformHasReference(item, this.referenceSearchQuery);
            }
            // Otherwise use default filtering
            if (!filter) {
                return true;
            }
            const filterLower = filter.toLowerCase();
            return item.filterKey && item.filterKey.toLowerCase().includes(filterLower);
        },

        shouldShowPlatform(platform) {
            // Show platforms unless operative explicitly equals "0"
            if (!platform.platforms || platform.platforms.length === 0) {
                return false;
            }
            return platform.platforms.some(
                (p) =>
                    !p.designation ||
                    p.designation.operative === null ||
                    p.designation.operative === undefined ||
                    String(p.designation.operative) !== "0",
            );
        },

        getTierValue(item) {
            const { getTierValue } = useTableSorting();
            const activeTab = this.tabs[this.tabState?.activeTabIndex || 0];
            const platform_group = activeTab?.linkGroup || activeTab?.id;
            return getTierValue(item, platform_group);
        },

        getTierDefinition(item) {
            const tierValue = this.getTierValue(item);
            if (!tierValue) return null;
            return this.tierDefinitions.find((def) => def.tier === parseInt(tierValue, 10)) || null;
        },

        getRegionValue(item, platform_group = null) {
            const { getRegionValue } = useTableSorting();
            return getRegionValue(item, platform_group);
        },

        platformsByGroup(group) {
            return this.platforms.filter((platform) => platformContainsGroup(platform, group));
        },

        getPlatformValueByGroup(platformData, group, key) {
            //TODO refactor
            for (const platform of platformData.platforms) {
                if (platform.platform_group === group) {
                    return platform[key];
                }
            }
            return undefined;
        },

        getLinks(platform, groups) {
            const links = [];
            for (const platformData of platform.platforms) {
                if (groups.includes(platformData.platform_group)) {
                    links.push({
                        url: platformData.platform_url,
                        text: LINK_DISP_NAMES[platformData.platform_group],
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

            const pageEnd = tab.currentPage * this.perPage;
            if (pageEnd > tab.displayed) {
                tab.pageEnd = tab.displayed;
            } else {
                tab.pageEnd = pageEnd;
            }
        },

        customSortCompare(aRow, bRow, key) {
            const { customSortCompare } = useTableSorting();
            const activeTab = this.tabs[this.tabState?.activeTabIndex || 0];
            const context = {
                platform_group: activeTab?.linkGroup || activeTab?.id,
            };

            return customSortCompare(aRow, bRow, key, context);
        },
    },

    created() {
        const { createTabStateManager } = useTableRouting();
        this.tabState = createTabStateManager(this.tabs, this.$route, this.$router);

        const suggestions = [];
        const uniqueTools = new Set();
        const uniqueReferences = new Set();

        // Collect all unique tool names
        if (this.$page.tools && this.$page.tools.edges) {
            this.$page.tools.edges.forEach((edge) => {
                const toolsData = edge.node;
                if (toolsData.tools) {
                    toolsData.tools.forEach((tool) => {
                        if (tool.name && !uniqueTools.has(tool.name)) {
                            uniqueTools.add(tool.name);
                            suggestions.push({
                                name: tool.name,
                                nameLower: tool.name.toLowerCase(),
                                type: "tool",
                                displayType: "tool",
                            });
                        }
                    });
                }
            });
        }

        // Collect all unique reference names
        if (this.$page.references && this.$page.references.edges) {
            this.$page.references.edges.forEach((edge) => {
                const referencesData = edge.node;
                if (referencesData.references && referencesData.references[0]) {
                    const refObj = referencesData.references[0];
                    const refType = refObj.type || "genome";
                    if (refObj.items) {
                        refObj.items.forEach((ref) => {
                            if (ref.name && !uniqueReferences.has(ref.name)) {
                                uniqueReferences.add(ref.name);
                                suggestions.push({
                                    name: ref.name,
                                    nameLower: ref.name.toLowerCase(),
                                    type: "reference",
                                    displayType: refType,
                                });
                            }
                        });
                    }
                }
            });
        }

        // Freeze the array to prevent Vue reactivity overhead
        this.allSuggestions = Object.freeze(suggestions);

        for (const tab of this.tabs) {
            if (tab.id === "usegalaxy") {
                tab.platforms = this.platforms.filter(
                    (platform) => platform.scope === "usegalaxy" && this.shouldShowPlatform(platform),
                );
            } else if (tab.id === "all") {
                tab.platforms = this.platforms.filter((platform) => this.shouldShowPlatform(platform));
            } else {
                tab.platforms = this.platformsByGroup(tab.anchor || tab.id).filter((platform) =>
                    this.shouldShowPlatform(platform),
                );
            }
            tab.displayed = tab.platforms.length;
            this.updatePageData(tab);
        }

        this.pageInserts = {};
        for (const edge of this.$page.allInsert.edges) {
            const name = rmSuffix(rmPrefix(edge.node.path, "/insert:/use/"), "/");
            this.pageInserts[name] = edge.node;
        }
        Object.freeze(this.pageInserts);

        this.tabState.initializeFromUrl();
    },

    watch: {
        filter(newFilter) {
            const filterLower = newFilter.toLowerCase();

            if (filterLower.startsWith("tool:")) {
                this.isToolSearch = true;
                this.toolSearchQuery = newFilter.substring(5).trim().toLowerCase();
                this.isReferenceSearch = false;
                this.referenceSearchQuery = "";
            } else if (filterLower.startsWith("reference:")) {
                this.isReferenceSearch = true;
                this.referenceSearchQuery = newFilter.substring(10).trim().toLowerCase();
                this.isToolSearch = false;
                this.toolSearchQuery = "";
            } else {
                this.isToolSearch = false;
                this.toolSearchQuery = "";
                this.isReferenceSearch = false;
                this.referenceSearchQuery = "";
            }
        },

        "$route.query.platform_group"(newGroup, oldGroup) {
            // Handle direct URL navigation or browser back/forward
            if (newGroup !== oldGroup && this.tabState) {
                this.tabState.handleRouteChange(newGroup, oldGroup);
            }
        },
    },
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
    platforms: allPlatform(
        sortBy: "title", 
        order: ASC
        ) {
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
                    platform_location
                    designation {
                        operative
                        tier
                        url
                    }
                }
            }
        }
    }
    tools: allDataset {
        totalCount
        edges {
            node {
                id
                path
                fileInfo {
                    name
                    directory
                }
                tools {
                    name
                    version
                    link
                    description
                }
            }
        }
    }
    references: allDataset {
        totalCount
        edges {
            node {
                id
                path
                fileInfo {
                    name
                    directory
                }
                references {
                    type
                    items {
                        name
                    }
                }
            }
        }
    }
    tools: allDataset {
        totalCount
        edges {
            node {
                id
                path
                fileInfo {
                    name
                    directory
                }
                tools {
                    name
                    version
                    link
                    description
                }
            }
        }
    }
    references: allDataset {
        totalCount
        edges {
            node {
                id
                path
                fileInfo {
                    name
                    directory
                }
                references {
                    type
                    items {
                        name
                    }
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

.autocomplete-dropdown {
    position: absolute;
    top: 100%;
    left: 15px;
    right: 15px;
    max-height: 300px;
    width: 380px;
    overflow-y: auto;
    background: white;
    border: 1px solid #ced4da;
    border-top: none;
    border-radius: 0 0 0.25rem 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    margin-top: -1px;
}

.autocomplete-item {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.15s ease;
}

.autocomplete-item:last-child {
    border-bottom: none;
}

.autocomplete-item:hover,
.autocomplete-item.selected {
    background-color: #f8f9fa;
}

.autocomplete-item.selected {
    background-color: #e9ecef;
}

.suggestion-name {
    flex: 1;
    margin-right: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.query-indicator {
    height: 20px;
    margin: 1px 0px 4px;
}

.autocomplete-dropdown {
    position: absolute;
    top: 100%;
    left: 15px;
    right: 15px;
    max-height: 300px;
    width: 380px;
    overflow-y: auto;
    background: white;
    border: 1px solid #ced4da;
    border-top: none;
    border-radius: 0 0 0.25rem 0.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    margin-top: -1px;
}

.autocomplete-item {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.15s ease;
}

.autocomplete-item:last-child {
    border-bottom: none;
}

.autocomplete-item:hover,
.autocomplete-item.selected {
    background-color: #f8f9fa;
}

.autocomplete-item.selected {
    background-color: #e9ecef;
}

.suggestion-name {
    flex: 1;
    margin-right: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.query-indicator {
    height: 20px;
    margin: 1px 0px 4px;
}

.icon-tier {
    font-size: 1.2rem;
    color: #25537b;
}

::v-deep .table td:first-child,
::v-deep .table td[data-label="Platform"],
::v-deep .table td[data-label="platform"] {
    white-space: normal !important;
    word-wrap: break-word;
    word-break: break-word;
    min-width: 200px;
    vertical-align: top;
}

::v-deep .table th:first-child {
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

/* Tool match styling */
.tool-match {
    padding: 0.25rem 0;
    border-bottom: 1px solid #e9ecef;
}

.tool-match:last-child {
    border-bottom: none;
}

.tool-match strong {
    color: #495057;
}

/* Reference match styling */
.reference-match {
    padding: 0.15rem 0;
    border-bottom: 1px solid #e9ecef;
}

.reference-match:last-child {
    border-bottom: none;
}

.reference-match small {
    color: #495057;
    line-height: 1.4;
}
</style>
