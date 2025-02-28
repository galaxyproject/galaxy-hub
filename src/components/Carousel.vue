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
            <a href="https://gxy.io/GTA2025-trainer" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/carousel_gta_2025_call_for_trainer.png"
                    img-alt="Galaxy Training Academy 2025 call for trainers"
                ></b-carousel-slide>
            </a>
            <a href="https://GBCC2025.org/" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/GBCC_abstract_splash_screen.png"
                    img-alt="GBCC2025 abstract submission and registration are now open"
                ></b-carousel-slide>
            </a>
            <a href="https://jxtxfoundation.org" target="_blank">
                <b-carousel-slide
                    img-src="/images/jxtx/jxtx-jumbotron.png"
                    img-alt="Donate to the James P. Taylor Foundation for Open Science"
                ></b-carousel-slide>
            </a>
            <a href="https://GBCC2025.org/" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/GBCC_abstract_splash_screen.png"
                    img-alt="GBCC2025 abstract submission and registration are now open"
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
