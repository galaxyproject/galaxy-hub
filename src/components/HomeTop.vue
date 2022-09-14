<template>
    <div id="top-content" class="row" v-if="hasContent(jumbotron) || bundleHasContent(lead)">
        <Bundle id="lead" :class="`col-sm-${topWidth}`" :bundle="lead" :subclasses="['lead']" />
        <section id="jumbotron" v-if="hasContent(jumbotron)" :class="`col-sm-${topWidth}`">
            <h3 v-if="jumbotron.title" class="title text-center">{{ jumbotron.title }}</h3>
            <div class="text-center markdown" v-html="jumbotron.content" />
        </section>
    </div>
</template>

<script>
import Bundle from "@/components/Bundle";
import { hasContent, bundleHasContent } from "~/lib/pages.mjs";
export default {
    props: {
        lead: { type: Array, required: false, default: () => [] },
        jumbotron: { type: Object, required: false, default: null },
    },
    components: {
        Bundle,
    },
    methods: {
        hasContent,
        bundleHasContent,
    },
    computed: {
        topWidth() {
            if (this.lead && this.lead.length > 0 && hasContent(this.jumbotron)) {
                return 6;
            } else {
                return 12;
            }
        },
    },
};
</script>

<style scoped>
#top-content {
    margin-bottom: 40px;
}
#jumbotron .title {
    font-weight: bold;
}
</style>
