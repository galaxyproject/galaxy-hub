<template>
    <Layout>
        <h1 class="page-title">{{ $page.main ? $page.main.title : $context.group }}</h1>
        <div v-if="hasContent($page.main)">
            <div class="content markdown" v-html="$page.main.content" />
        </div>
        <p>{{ $page.allPerson.totalCount }} members:</p>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Member</th>
                    <th>GitHub</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="edge in $page.allPerson.edges" :key="edge.node.id">
                    <td>
                        <g-link :to="edge.node.path">{{ edge.node.name }}</g-link>
                    </td>
                    <td>
                        <a v-if="edge.node.github" :href="`https://github.com/${edge.node.github}`">
                            @{{ edge.node.github }}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </Layout>
</template>

<script>
import { hasContent } from "~/lib/pages.mjs";
export default {
    methods: {
        hasContent,
    },
    metaInfo() {
        return {
            title: this.$page.main ? this.$page.main.title : this.$context.group,
        };
    },
};
</script>

<page-query>
query($group: String, $mainPath: String) {
    main: insert(path: $mainPath) {
        id
        title
        content
        fileInfo {
            path
        }
    }
    allPerson(
        filter: { groups: {contains: [$group]}, draft: {ne: true} }
    ) {
        totalCount
        edges {
            node {
                id
                path
                name
                image
                images
                groups
                subsites
                main_subsite
                github
                location {
                    city
                    country
                    geo {
                        lat
                        lon
                    }
                }
                affiliations {
                    id
                    name
                }
            }
        }
    }
}
</page-query>
