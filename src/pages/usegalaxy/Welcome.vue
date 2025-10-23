<template>
    <main id="maincontainer" class="container">
        <div class="markdown" v-html="$page.top.content" />

        <div class="row">
            <div class="col-md-6">
                <Carousel />
            </div>
            <div class="col-md-6">
                <div class="youtube-container">
                    <iframe
                        width="400"
                        height="277"
                        src="https://www.youtube.com/embed/k6fTVIR4GME?mute=1&cc_load_policy=1&autoplay=1&loop=1&playlist=k6fTVIR4GME"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
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

.youtube-container {
    padding-top: 2rem;
    max-width: 400px;
    margin: 0 auto;
}
</style>
