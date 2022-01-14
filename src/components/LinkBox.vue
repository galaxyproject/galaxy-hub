<template>
    <div :class="rootClasses">
        <span class="item" v-for="(link, i) in data.links" :key="link.id || i">
            <g-link :class="link.bold ? 'bold' : ''" :to="link.url">
                {{ link.title }}
            </g-link>
            <template v-if="data.horizontal && i < data.links.length - 1">|</template>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true },
        /* `data` properties:
         *   `horizontal` (Boolean): Use a horizontal orientation rather than vertical (default).
         *   `style` (String): Which visual style to use for the linkbox. Options:
         *     `"alert"`: The Bootstrap `alert-info` class.
         *     `"default"`: Our `linkbox` class.
         */
    },
    data() {
        let rootClasses = ["text-center"];
        // Horizontal or vertical orientation?
        if (this.data.horizontal) {
            rootClasses.push("horizontal");
        } else {
            rootClasses.push("vertical");
            rootClasses.push("float-right");
        }
        // Visual style
        if (this.data.style === "alert") {
            rootClasses.push("alert");
            rootClasses.push("alert-info");
        } else {
            rootClasses.push("linkbox");
        }
        return {
            rootClasses,
        };
    },
};
</script>

<style scoped>
.item {
    margin-bottom: 0;
}
.vertical .item {
    display: block;
}
.bold {
    font-weight: bold;
}
</style>
