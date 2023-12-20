<template>
    <div class="container">
        <div class="row">
            <div class="notification bgBrighter w-50 text-center mt-2 mb-2">
                Galaxy Community Conference is coming up.
                <a href="/events/gcc2024/" class="ml-2">Read on.</a>
            </div>
        </div>
        <div class="row">
            <div class="text-section col-md-7">
                <h1 class="mb-3">
                    Meet Galaxy - <br />
                    your companion <br />
                    in data analysis
                </h1>
                <p>
                    Galaxy is a free, open-source system for analyzing data,
                    authoring workflows, training and education, publishing
                    tools, managing infrastructure, and more.
                </p>
                <a href="https://usegalaxy.org/" class="btn h-btn mr-3 bgBright">Use Galaxy now</a>
                <a href="/learn-more/" class="btn h-btn bgBright">Learn more</a>
            </div>
            <div class="col-md-5">
                <video-player :src="videoSrc" style="border-radius: 10px;"/>
            </div>
        </div>
    </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
    name: 'Hero',
    components: {
        VideoPlayer,
    },
    data() {
        return {
            videoSrc: '',
        };
    },
};
</script>

<style scoped>
.notification {
    padding: 10px;
    margin-left: 15px;
    font-size: 1.2rem;
    border-radius: 5px;
}

.container {
    background-color: #2C3143;
    padding: 20px;
}

.text-section h1 {
    font-size: 3.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 20px;
    line-height: 1.4;
}

.text-section p {
    font-size: 1.5rem;
    color: #A5A5A5;
    margin-bottom: 20px;
}

.h-btn {
    font-size: 1.3rem;
    font-weight: 500;
}

</style>
