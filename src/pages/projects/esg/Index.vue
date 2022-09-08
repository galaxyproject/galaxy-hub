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
    }
}
</script>

<static-query>
query {
    main: insert(path: "/insert:/projects/esg/main/") {
        content
    }
}
</static-query>
