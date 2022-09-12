<template>
    <Layout>
        <p v-html="$static.main.content"></p>
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
            title: this.$static.main.title,
            meta: [
                {
                    name: "description",
                    content: this.$static.main.description,
                },
            ],
        };
    },
};
</script>

<static-query>
query {
    main: insert(path: "/insert:/projects/esg/main/") {
        title,
        description,
        content
    }
}
</static-query>
