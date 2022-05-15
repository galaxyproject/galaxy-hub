<template>
    <div :class="['pseudo-card', `col-sm-${width}`]">
        <h2 class="title">
            <g-link :to="link">
                <span :class="`icon ${icon}`"></span>
                {{ title }}
            </g-link>
        </h2>
        <ItemListBrief v-for="(item, i) in items" :key="item.id || i" :item="item" />
        <div class="markdown content" v-if="content" v-html="content" />
    </div>
</template>

<script>
import ItemListBrief from "@/components/ItemListBrief";

export default {
    components: {
        ItemListBrief,
    },
    props: {
        title: { type: String, required: false, default: "" },
        link: { type: String, required: false, default: "" },
        icon: { type: String, required: false, default: "" },
        width: { type: Number, required: false, default: 4 },
        content: { type: String, required: false, default: "" },
        items: { type: Array, required: false, default: () => [] },
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles.scss";

.pseudo-card {
    background-color: $gray-200;
    border: 4px solid white;
    border-radius: 8px;
}
.title .icon {
    margin-right: 0.4em;
}
.title {
    font-weight: normal;
}
.content.markdown::v-deep p {
    font-size: 80%;
}
.content.markdown::v-deep a {
    font-size: 120%;
}
</style>
