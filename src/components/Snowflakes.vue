<template>
    <div>
        <!--
            snowflake container -- if desired we could scope this to a particualr or use a slot ehre size instead of using the entire body
        -->
    </div>
</template>

<script>
import Snowflakes from "magic-snowflakes";

export default {
    name: "Snowflakes",
    props: {
        color: { type: String, required: false, default: "#5ECDEF" },
        count: { type: Number, required: false, default: 100 },
        speed: { type: Number, required: false, default: 1 },
        wind: { type: Boolean, required: false, default: true },
        duration: { type: Number, required: false, default: 60 },
        minSize: { type: Number, required: false, default: 15 },
        maxSize: { type: Number, required: false, default: 35 },
    },
    mounted() {
        const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!prefersReducedMotionQuery.matches) {
            // If the user has not set a preference for reduced motion, then we can safely run the snowflakes
            const snow = new Snowflakes({
                ...this.$props,
            });
            if (this.duration) {
                setTimeout(() => {
                    snow.destroy();
                }, this.duration * 1000);
            }
        }
    },
};
</script>
