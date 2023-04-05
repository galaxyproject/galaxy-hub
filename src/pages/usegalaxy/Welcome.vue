<template>
    <main id="maincontainer" class="container">
        <div class="markdown" v-html="$page.top.content" />
        <Carousel />
        <div class="markdown" v-html="$page.main.content" />
    </main>
</template>
<script>
export default {
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
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
    top: insert(path: "/insert:/usegalaxy/welcome/top/") {
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
