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
                <!--
                    The following <p> is a workaround for a bug where the previous Markdown element ends up getting
                    repeated (but only in the first pane). This occurs if the Markdown element is followed by certain
                    kinds of elements. So far I've identified two types: empty elements and deeply nested elements. An
                    example of the latter is a <div> inside a <div> inside a <div> (3 levels). 3 seems to be sufficient
                    to cause the issue, while 2 seems to be too few. The table below is has enough levels to trigger it.
                    There is a (vague) error that appears in the console, though. Usually it's a DOMException:
                        "Node.appendChild: Cannot add children to a Text".
                    It appears to be coming from Vue itself.
                    NOTE: This only happens after a build, not in the development server!
                -->
                <p class="d-none">dummy text</p>
                <table class="table table-striped">
                    <thead>
                        <tr v-if="tab.columns">
                            <th v-for="column in tab.columns" :key="column">
                                {{ column }}
                            </th>
                        </tr>
                        <tr v-else>
                            <th>Resource</th>
                            <th>Link</th>
                            <th>Summary</th>
                            <th>Keywords</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PlatformRow
                            v-for="platform in tab.platforms"
                            :key="platform.id"
                            :platform="platform"
                            :linkType="tab.linkType || tab.id"
                        />
                    </tbody>
                </table>
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
import PlatformRow from "@/components/PlatformRow";
import { rmPrefix, rmSuffix, switchPane } from "~/utils.js";
function platformContainsGroup(platform, group) {
    let filteredPlatforms = platform.platforms.filter((p) => p.platform_group === group);
    return filteredPlatforms.length > 0;
}
export default {
    components: {
        PlatformRow,
    },
    metaInfo() {
        return {
            title: this.inserts.main.title,
        };
    },
    methods: {
        switchPane,
        platformsByGroup(group) {
            return this.sortedPlatforms.filter((platform) => platformContainsGroup(platform, group));
        },
    },
    computed: {
        sortedPlatforms() {
            return this.$page.platforms.edges
                .map((edge) => edge.node)
                .sort((n1, n2) => n1.title.toLowerCase().localeCompare(n2.title.toLowerCase()));
        },
        platformsUsegalaxy() {
            return this.sortedPlatforms.filter((platform) => platform.scope === "usegalaxy");
        },
        inserts() {
            let inserts = {};
            for (let edge of this.$page.allInsert.edges) {
                let name = rmSuffix(rmPrefix(edge.node.path, "/insert:/use/"), "/");
                inserts[name] = edge.node;
            }
            return inserts;
        },
        tabs() {
            return [
                {
                    id: "usegalaxy",
                    label: "UseGalaxy",
                    anchor: "usegalaxy-dir",
                    platforms: this.platformsUsegalaxy,
                    active: true,
                    linkType: "public-server",
                    columns: ["Resource", "Server", "Summary", "Keywords"],
                },
                {
                    id: "all-resources",
                    label: "All",
                    platforms: this.sortedPlatforms,
                    linkType: "all",
                    columns: ["Resource", "Server", "Cloud", "Deployable", "Summary", "Keywords"],
                },
                {
                    id: "public-server",
                    label: "Public Servers",
                    platforms: this.platformsByGroup("public-server"),
                },
                {
                    id: "academic-cloud",
                    label: "Academic Clouds",
                    platforms: this.platformsByGroup("academic-cloud"),
                },
                {
                    id: "commercial-cloud",
                    label: "Commercial Clouds",
                    platforms: this.platformsByGroup("commercial-cloud"),
                },
                {
                    id: "containers",
                    label: "Containers",
                    anchor: "container",
                    linkType: "container",
                    platforms: this.platformsByGroup("container"),
                },
                {
                    id: "vms",
                    label: "VMs",
                    anchor: "vm",
                    linkType: "vm",
                    platforms: this.platformsByGroup("vm"),
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
