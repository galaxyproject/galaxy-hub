<template>
    <component :is="currentLayout">
        <p v-html="$page.main.content" class="mb-4"></p>
    </component>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import EsgLayout from "~/layouts/ESG.vue";

export default {
    components: {
        Layout,
        EsgLayout,
    },
    metaInfo() {
        return {
            title: this.$page.main.title,
            meta: [
                {
                    name: "description",
                    content: this.$page.main.description,
                },
            ],
        };
    },
    data() {
        return {
            currentLayout: Layout,
        };
    },
    created() {
        if (this.$route.query.solo) {
            this.currentLayout = EsgLayout;
        }
    },
};
</script>

<page-query>
    query {
        main: insert(path: "/insert:/projects/esg/events/") {
            title,
            description,
            content
        }
    }
</page-query>
