<template>
    <div id="top-content" class="row">
        <section id="lead" v-if="hasContent(lead)" :class="`col-sm-${topWidth}`">
            <div class="lead markdown" v-html="lead.content" />
        </section>
        <section id="jumbotron" v-if="hasContent(jumbotron)" :class="`col-sm-${topWidth}`">
            <h3 v-if="jumbotron.title" class="title text-center">{{ jumbotron.title }}</h3>
            <div class="text-center markdown" v-html="jumbotron.content" />
        </section>
    </div>
</template>

<script>
import { hasContent } from "~/utils.js";
export default {
    props: {
        lead: { type: Object, required: false, default: null },
        jumbotron: { type: Object, required: false, default: null },
    },
    methods: {
        hasContent,
    },
    computed: {
        topWidth() {
            if (hasContent(this.lead) && hasContent(this.jumbotron)) {
                return 6;
            } else {
                return 12;
            }
        },
    }
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
