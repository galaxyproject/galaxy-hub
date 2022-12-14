<template>
    <main id="maincontainer" class="container">
        <Snowflakes />
        <div class="markdown" v-html="$page.main.content" />
    </main>
</template>
<script>
import Snowflakes from "@/components/Snowflakes";
export default {
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
    components: { Snowflakes }
};
</script>

<page-query>
query {
    main: insert(path: "/insert:/usegalaxy/welcome/main/") {
        id
        title
        content
        fileInfo {
            path
        }
    }
}
</page-query>

<style lang="scss">
@import "~/assets/styles.scss";

#maincontainer {
    padding-top: 1rem;
    padding-bottom: 1rem;
    a:not(.btn) {
        color: $brand-primary;
    }
    a:hover {
        text-decoration: underline;
    }
}
</style>
