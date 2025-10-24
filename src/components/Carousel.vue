<template>
    <div class="carousel-container">
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="5000"
            controls
            indicators
            background="#ababab"
            img-width="400"
            img-height="277"
            style="text-shadow: 1px 1px 2px #333"
        >
            <!--
            It's important that the images here are 13x9 aspect ratio,
            otherwise the page will jump around when the carousel changes.
            -->
            <a href="https://jxtxfoundation.org" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/jxtx_carousel.svg"
                    img-alt="Donate to the James P. Taylor Foundation for Open Science"
                ></b-carousel-slide>
            </a>
            <a href="https://galaxyproject.org/news/2025-10-21-whycollections/" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/theguy.svg"
                    img-alt="Use collections!"
                ></b-carousel-slide>
            </a>
            <a href="https://training.galaxyproject.org/" target="_blank">
                <b-carousel-slide img-src="/images/usegalaxy-welcome/gtn.svg" img-alt="Try GTN"></b-carousel-slide>
            </a>
            <a href="https://galaxyproject.org/usegalaxy/" target="_blank">
                <b-carousel-slide
                    img-src="/images/usegalaxy-welcome/dotstar.svg"
                    img-alt="Usegalaxy.*"
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
    max-width: 400px;
    margin: 0 auto;
}
</style>
