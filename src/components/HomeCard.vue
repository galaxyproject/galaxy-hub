<template>
    <div :class="['pseudo-card', `col-sm-${attrs.width}`]">
        <h2>
            <a :href="attrs.link">
                <span :class="`icon ${attrs.icon}`"></span>{{ attrs.title }}
            </a>
        </h2>
        <ItemListBrief v-for="(item, i) in attrs.items" :key="item.id || i" :item="item" />
        <div class="markdown content" v-if="attrs.content" v-html="attrs.content" />
    </div>
</template>

<script>
import ItemListBrief from "@/components/ItemListBrief";
const PROPS = {
    insert: { type: Object, required: false },
    title: { type: String, required: false },
    link: { type: String, required: false },
    icon: { type: String, required: false },
    width: { type: Number, required: false },
    content: { type: String, required: false },
    items: { type: Array, required: false },
};
// Can't store these in PROPS, or they will always override any value in the insert.
const DEFAULTS = {
    width: 4, items: [],
}
export default {
    props: PROPS,
    components: {
        ItemListBrief,
    },
    computed: {
        attrs() {
            let attrs = {};
            for (let name of Object.keys(PROPS)) {
                if (name === "insert") {
                    continue;
                }
                let value = DEFAULTS[name];
                if (this[name]) {
                    value = this[name];
                } else if (this.insert?.[name]) {
                    value = this.insert[name];
                }
                attrs[name] = value;
            }
            return attrs;
        }
    }
};
</script>

<style scoped>
.pseudo-card {
    background-color: #e0eaf2;
    border: 3px solid white;
    border-radius: 10px;
}
h2 .icon {
    margin-right: 0.7em;
}
.content.markdown::v-deep p {
    font-size: 80%;
}
.content.markdown::v-deep a {
    font-size: 125%;
}
</style>
