<template>
    <Layout>
        <ClientOnly>
            <!-- Page name and description. -->
            <!-- <h1 class="page-title">{{ inserts.main.title }}</h1> -->
            <!-- <div class="markdown" v-html="inserts.main.content"></div> -->
            <!-- <pre>{{ this.instances }}</pre> -->
            <table aria-rowcount="167" id="all-resources-table" role="table" aria-busy="false" aria-colcount="6" class="table b-table table-striped table-hover">
                <thead role="rowgroup" class="">
                    <tr class="" role="row">
                        <th aria-colindex="1" class="" role="columnheader" scope="col">
                            <span @click="sortBy('title')" style="cursor:pointer">Resource&#160;⬍ </span>
                        </th>
                        <th aria-colindex="2" class="" role="columnheader" scope="col">
                            <span @click="sortBy('url')" style="cursor:pointer">Server&#160;⬍ </span>
                        </th>
                        <th aria-colindex="3" class="" role="columnheader" scope="col">
                            <span @click="sortBy('cloud')" style="cursor:pointer">Cloud&#160;⬍ </span>
                        </th>
                        <th aria-colindex="4" class="" role="columnheader" scope="col">
                            <span @click="sortBy('deployable')" style="cursor:pointer">Deployable&#160;⬍ </span>
                        </th>
                        <th aria-colindex="5" class="" role="columnheader" scope="col">
                            <span>Summary</span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span @click="sortBy('location')" style="cursor:pointer">Location&#160;⬍ </span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span>Keywords</span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span @click="sortBy('tools_available')" style="cursor:pointer">Tools&#160;⬍ </span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span @click="sortBy('version')" style="cursor:pointer">Version&#160;⬍ </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="instance in instances" :key="instance.id" role="row" class="">
                        <td role="cell" aria-colindex="1">
                            <a :href="instance.url" target="_blank">{{ instance.title }}</a>
                        </td>
                        <td role="cell" aria-colindex="2">
                            {{ instance.url }}
                        </td>
                        <td role="cell" aria-colindex="3">
                            {{ instance.cloud || "N/A" }}
                        </td>
                        <td role="cell" aria-colindex="4">
                            {{ instance.deployable ? "Yes" : "No" }}
                        </td>
                        <td role="cell" aria-colindex="5">
                            {{ instance.summary || "No summary available." }}
                        </td>
                        <td role="cell" aria-colindex="6">
                            {{ instance.location }}
                            {{ /* TODO Next Steps: change to geography object with long/lat*/ }}
                        </td>
                        <td role="cell" aria-colindex="6">
                            {{ instance.keywords ? instance.keywords.join(", ") : "None" }}
                        </td>
                        <td role="cell" aria-colindex="7">
                            {{ instance.tools_available || 0 }}
                        </td>
                        <td role="cell" aria-colindex="8">
                            {{ instance.version || "Unknown" }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <!-- Footer. -->
            <footer class="page-footer markdown" v-if="inserts.footer" v-html="inserts.footer.content"></footer>
        </ClientOnly>
    </Layout>
</template>

<script>
import { rmPrefix, rmSuffix, mdToHtml } from "~/lib/utils.js";
import serverStatus from '../../content/use/server_status.yml'; //TODO updates daily

const LINK_DISP_NAMES = { //TODO merge process for: (1) data owner assigns [Server object] (2) data from owner's server [Status object] (3) data Galaxy assigns [...like this object, Tiers, etc]
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
let tabs = [
    {
        active: true,
        id: "usegalaxy",
        label: "UseGalaxy",
        anchor: "usegalaxy-dir",
        linkGroup: "public-server",
        columns: ["resource", { key: "link", label: "Server" }, "summary", "keywords"],
    },
    {
        id: "all-resources",
        label: "All",
        linkGroup: "public-server",
        columns: ["resource", { key: "link", label: "Server" }, "cloud", "deployable", "summary", "keywords"],
    },
    {
        id: "public-server",
        label: "Public Servers",
        columns: ["resource", "link", "summary", "keywords"],
    },
    {
        id: "academic-cloud",
        label: "Academic Clouds",
        columns: ["resource", "link", "summary", "purview", "keywords"],
    },
    {
        id: "commercial-cloud",
        label: "Commercial Clouds",
        columns: ["resource", "link", "summary", "keywords"],
    },
    {
        id: "containers",
        label: "Containers",
        anchor: "container",
        linkGroup: "container",
        columns: ["resource", "link", "summary", "keywords"],
    },
    {
        id: "vms",
        label: "VMs",
        anchor: "vm",
        linkGroup: "vm",
        columns: ["resource", "link", "summary", "keywords"],
    },
];
for (let tab of tabs) {
    tab.platforms = [];
    tab.displayed = 0;
    tab.currentPage = 1;
    tab.pageStart = 0;
    tab.pageEnd = 0;
}
export default {
    data() {
        return {
            sortKey: '',
            sortAsc: true,
            instances: [],
            //TODO filter-by specific Tools
            //TODO pagination + tabs + filter-search
        };
    },
    methods: {
        mdToHtml,
        mergeLists(servers, statuses) {
            // Build statusMap keyed by url
            const statusMap = {};
            for (const status of Object.values(statuses)) {
                if (status.url && !(status.url in statusMap)) {
                    statusMap[status.url] = status;
                }
            }

            // Build serverMap keyed by url
            const serverMap = {};
            for (const [key, server] of Object.entries(servers)) {
                if (server.url && !(server.url in serverMap)) {
                    serverMap[server.url] = server;
                }
            }

            // Get all unique urls
            const uniques = new Set([
                ...Object.keys(statusMap),
                ...Object.keys(serverMap)
            ]);

            // Merge by url
            const merged = Array.from(uniques).map(url => {
                return {
                    ...statusMap[url],
                    ...serverMap[url]
                };
            });

            return merged;
        },
        sortBy(column) {
        if (this.sortKey === column) {
            this.sortAsc = !this.sortAsc;
        } else {
            this.sortKey = column;
            this.sortAsc = true;
        }
        this.instances.sort((a, b) => {
                const aVal = a[column] || '';
                const bVal = b[column] || '';
                if (aVal < bVal) return this.sortAsc ? -1 : 1;
                if (aVal > bVal) return this.sortAsc ? 1 : -1;
                return 0;
            });
        },
    },
    computed: {
        inserts() {
            return this.pageInserts || {};
        },
    },
    async created() {
        const res = await fetch("/use/feed.json");
        const servers = await res.json();
        const status = Object.fromEntries(
            serverStatus.galaxy_instances.map(row => [row.url, row])
        );
        this.instances = this.mergeLists(servers, status); //TODO fix ABiMS dup
        console.log('instances (merged)', this.instances);

        Object.freeze(this.pageInserts);
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
