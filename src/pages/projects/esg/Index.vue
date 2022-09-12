<template>
    <Layout>
        <p v-html="$page.main.content"></p>
    </Layout>
</template>

<script>
import Layout from "~/layouts/Default.vue";

export default {
    components: {
        Layout,
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
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/projects/esg/main/") {
        title,
        description,
        content
    }
}
</page-query>
