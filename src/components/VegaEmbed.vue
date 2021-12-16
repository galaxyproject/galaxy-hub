<template>
    <div></div>
</template>

<script>
import embed from "vega-embed";

export default {
    props: {
        spec: {
            type: String,
            required: true,
        },
    },
    mounted() {
        embed(this.$el, this.spec, {
            actions: false,
            renderer: "svg",
            theme: "none",
        });
    },
};
</script>

<style lang="scss" scoped></style>
