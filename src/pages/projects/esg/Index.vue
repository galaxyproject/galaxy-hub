<template>
    <Layout>
        <p v-html="$page.main.content"></p>

        <Partners title="Project Partners" pathPrefix="/projects/esg/partner-logos/" :partners="$page.dataset.partners"/>
    </Layout>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import Partners from "~/components/Partners.vue";

export default {
    components: {
        Layout,
        Partners,
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

    dataset(path: "/dataset:/projects/esg/partners/") {
        partners {
            name,
            image (width: 160),
            website
        }
    }
}
</page-query>
