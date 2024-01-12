<template>
    <div class="container p-2">
        <div class="row">
            <div class="col-lg-7">
                <div class="text-center notification bgBrighter">
                    Galaxy Community Conference is coming up.
                    <strong><a href="/events/gcc2024/" class="ml-2">Read on.</a></strong>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-7 mb-4">
                <h1 class="mb-3">
                    Meet Galaxy - <br />
                    your companion <br />
                    in data analysis
                </h1>
                <p class="hero">
                    Galaxy is a free, open-source system for analyzing data, authoring workflows, training and
                    education, publishing tools, managing infrastructure, and more.
                </p>
                <a href="https://usegalaxy.org/" class="btn hero mr-3 bgBright">Use Galaxy now</a>
                <a href="/learn-more/" class="btn hero bgBright">Learn more</a>
            </div>
            <div class="col-lg-5">
                <a href="/events/gcc2024/">
                    <img src="/images/events/gcc2024/gcc2024-banner-4.png" alt="GCC2024" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
    name: "Hero",
    components: {
        VideoPlayer,
    },
    data() {
        return {
            videoSrc: "",
        };
    },
};
</script>
