<template>
    <Layout>
        <ClientOnly>
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
                            <span @click="sortBy('status.location')" style="cursor:pointer">Location&#160;⬍ </span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span>Keywords</span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span @click="sortBy('status.tools_available')" style="cursor:pointer">Tools&#160;⬍ </span>
                        </th>
                        <th aria-colindex="6" class="" role="columnheader" scope="col">
                            <span @click="sortBy('status.version')" style="cursor:pointer">Version&#160;⬍ </span>
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
                            {{ instance.status && instance.status.location ? instance.status.location : "" }}
                            {{ /* TODO Next Steps: change to geography object with long/lat*/ }}
                        </td>
                        <td role="cell" aria-colindex="6">
                            {{ instance.keywords ? instance.keywords.join(", ") : "None" }}
                        </td>
                        <td role="cell" aria-colindex="7">
                            {{ instance.status && instance.status.tools_available ? instance.status.tools_available : "--" }}
                        </td>
                        <td role="cell" aria-colindex="8">
                            {{ instance.status && instance.status.version ? instance.status.version : "--" }}
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
        combineServerDataWithLodash(servers, statuses) {
            const statusMap = {};
            Object.entries(statuses).forEach(([url, data]) => {
                const domain = new URL(url).hostname;
                statusMap[domain] = _.omit(data, ['brand']);
            });

            return _.mapValues(servers, server => {
                try {
                    const serverDomain = new URL(server.url).hostname;
                    return statusMap[serverDomain] 
                        ? { ...server, status: statusMap[serverDomain] } 
                        : server;
                } catch {
                    return server; /* Fallback if URL parsing fails */
                }
            });
        },
        sortBy(key) {
            const nestedKeyChar = ".";
            const sortKey = key.includes(nestedKeyChar) ? key.split(nestedKeyChar) : key;
            
            this.sortedBy = key;
            this.sortedAsc = !this.sortedAsc;
            
            this.instances = _.orderBy(
                Object.values(this.instances),
                [item => {
                    if (Array.isArray(sortKey)) {
                        return sortKey.reduce((obj, k) => (obj || {})[k], item);
                    }
                    return item[sortKey];
                }],
                [this.sortedAsc ? 'asc' : 'desc']
            );
        },
        async getPlatforms() { /* replace with db, single yaml, etc */
            const res = await fetch("/use/feed.json");
            const servers = await res.json();
            const status = Object.fromEntries(
                serverStatus.galaxy_instances.map(row => [row.url, row])
            );
            console.log('servers (existing)', servers);
            console.log('typeof servers', typeof servers);
            console.log('status (new)', status);
            console.log('typeof status', typeof status);
            let tempOutput = this.combineServerDataWithLodash(servers, status);
            console.log('typeof tempOutput', typeof tempOutput);
            console.log('tempOutput (combined)', tempOutput);
            return tempOutput;
        },
    },
    computed: {
        inserts() {
            return this.pageInserts || {};
        },
    },
    async created() {
        this.instances = await this.getPlatforms();

        // Object.freeze(this.pageInserts);
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
