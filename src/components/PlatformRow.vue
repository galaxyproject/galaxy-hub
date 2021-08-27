<template>
    <tr>
        <td class="title">
            <a :href="platform.path">
                <template v-if="platform.title">{{ platform.title }}</template>
                <template v-else>{{ platform.path }}</template>
            </a>
        </td>
        <td class="link" v-for="columnLinks in links">
            <a v-for="link in columnLinks" :key="link.text" :href="link.url">
                {{ link.text }}
            </a>
        </td>
        <td class="summary markdown" v-html="mdToHtml(platform.summary)" />
        <td class="purview" v-if="purview">
            {{ getPlatformValueByGroup(purview, "platform_purview") }}
        </td>
        <td class="keywords">
            <g-link :to="keywords[platform.scope].link">
                {{ keywords[platform.scope].shortText }}
            </g-link>
        </td>
    </tr>
</template>

<script>
import { contains, getIntersection, mdToHtml } from "~/utils.js";
const LINK_DISP_NAMES = {
    "academic-cloud": "Academic",
    "commercial-cloud": "Commercial",
    container: "Container",
    vm: "VM",
    "public-server": "Server",
};
const LINK_ALIASES = new Map([
    ["all", ["public-server", "academic-cloud", "commercial-cloud", "container", "vm"]],
    ["cloud", ["academic-cloud", "commercial-cloud"]],
    ["deployable", ["container", "vm"]],
]);
const LINK_COLUMNS = [["public-server"], ["academic-cloud", "commercial-cloud"], ["container", "vm"]];
function getLaunchLinks(platform, groups) {
    let links = [];
    for (let platformData of platform.platforms) {
        if (contains(groups, platformData.platform_group)) {
            links.push({ url: platformData.platform_url, text: LINK_DISP_NAMES[platformData.platform_group] });
        }
    }
    return links;
}
export default {
    props: {
        platform: { type: Object, required: true },
        linkType: { type: String, required: true },
        purview: { type: String, required: false },
    },
    methods: {
        mdToHtml,
        getPlatformValueByGroup(group, key) {
            for (let platform of this.platform.platforms) {
                if (platform.platform_group === group) {
                    return platform[key];
                }
            }
        },
    },
    computed: {
        links() {
            let groups = LINK_ALIASES.get(this.linkType) || [this.linkType];
            let linkColumns = [];
            for (let columnGroups of LINK_COLUMNS) {
                let includedGroups = getIntersection(columnGroups, groups);
                if (includedGroups.length > 0) {
                    linkColumns.push(getLaunchLinks(this.platform, includedGroups));
                }
            }
            return linkColumns;
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
        };
    },
};
</script>
