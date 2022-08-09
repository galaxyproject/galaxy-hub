<template>
    <div :class="['pseudo-card', `col-sm-${width}`]">
        <div class="inner-container">
            <h2 class="title">
                <g-link :to="link" :target="target">
                    <span :class="`icon ${icon}`"></span>
                    {{ title }}
                </g-link>
            </h2>
            <div class="body">
                <div class="markdown content" v-if="content && content.trim()" v-html="content" />
                <ItemListBrief v-for="(item, i) in items" :key="item.id || i" :item="item" :target="target" />
            </div>
        </div>
    </div>
</template>

<script>
import ItemListBrief from "@/components/ItemListBrief";
import { hasContent } from "~/lib/pages.mjs";
export default {
    components: {
        ItemListBrief,
    },
    methods: {
        hasContent,
    },
    props: {
        title: { type: String, required: false, default: "" },
        link: { type: String, required: false, default: "" },
        icon: { type: String, required: false, default: "" },
        width: { type: Number, required: false, default: 4 },
        content: { type: String, required: false, default: "" },
        items: { type: Array, required: false, default: () => [] },
        target: { type: String, required: false, default: "" },
    },
};
</script>

<style scoped>
.pseudo-card {
    padding: 8px;
}
.inner-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0;
}
.title {
    font-weight: normal;
    padding-left: 15px;
    padding-right: 15px;
}
.title .icon {
    margin-right: 0.4em;
}
.content {
    padding: 12px;
}
.content.markdown::v-deep > *:last-child {
    margin-bottom: 0;
}
</style>
