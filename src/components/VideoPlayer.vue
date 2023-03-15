<template>
    <div>
        <video :src="src" ref="videoPlayer" controls></video>
    </div>
</template>

<script>
export default {
    props: {
        src: { type: String, required: true },
    },
    mounted() {
        this.$refs.videoPlayer.load();
    },
};
</script>
