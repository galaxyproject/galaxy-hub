<template>
    <main id="maincontainer" class="container">
        <div class="markdown" v-html="$page.top.content" />
        <Carousel />

        <div class="text-center mt-5">
            <a href="/news/2024-05-29-galaxy-training-academy-call-contribution">
                <img src="/images/call_for_trainers.png" alt="Galaxy Training Academy" />
            </a>
        </div>

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
