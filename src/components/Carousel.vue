<template>
    <div class="carousel-container">
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="5000"
            controls
            indicators
            background="#ababab"
            img-width="650"
            img-height="450"
            style="text-shadow: 1px 1px 2px #333"
        >
            <!--
            It's important that the images here are 13x9 aspect ratio,
            otherwise the page will jump around when the carousel changes.
            -->
            <a
                href="https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html#empower-users-to-build-more-kinds-of-collections-more-intelligently"
                target="_blank"
            >
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/r25_Slide1.PNG"
                    img-alt="Improved collection creation in release 25.0"
                ></b-carousel-slide>
            </a>
            <a
                href="https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html#add-zip-explorer-to-import-individual-files-from-local-or-remote-zip-archives"
                target="_blank"
            >
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/r25_Slide2.PNG"
                    img-alt="New ZIP explorer in release 25.0"
                ></b-carousel-slide>
            </a>
            <a
                href="https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html#a-new-unified-view-for-datasets"
                target="_blank"
            >
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/r25_Slide3.PNG"
                    img-alt="New unified dataset view in release 25.0"
                ></b-carousel-slide>
            </a>
            <a
                href="https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html#an-enhanced-workflow-run-form-interface"
                target="_blank"
            >
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/r25_Slide4.PNG"
                    img-alt="Improved workflow run in release 25.0"
                ></b-carousel-slide>
            </a>
            <a href="https://docs.galaxyproject.org/en/master/releases/25.0_announce_user.html" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/r25_Slide5.PNG"
                    img-alt="More highlights in release 25.0"
                ></b-carousel-slide>
            </a>
            <a href="https://jxtxfoundation.org" target="_blank">
                <b-carousel-slide
                    img-src="/images/jxtx/jxtx-jumbotron.png"
                    img-alt="Donate to the James P. Taylor Foundation for Open Science"
                ></b-carousel-slide>
            </a>
        </b-carousel>
    </div>
</template>

<script>
export default {
    name: "Carousel",
    data() {
        return {
            slide: 0,
        };
    },
};
</script>
<style lang="scss" scoped>
.carousel-container {
    padding-top: 2rem;
    max-width: 650px;
    margin: 0 auto;
}
</style>
