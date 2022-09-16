<template>
    <component :is="currentLayout"> </component>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import EsgLayout from "~/layouts/ESG.vue";

export default {
    components: {
        Layout,
        EsgLayout,
    },
    data() {
        return {
            currentLayout: Layout,
        };
    },
    created() {
        if (this.$route.query.solo) {
            this.currentLayout = EsgLayout;
        }
    },
};
</script>
