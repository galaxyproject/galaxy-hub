<template>
    <section class="bundle" v-if="inserts.length > 0">
        <div
            :class="['markdown', ...subclasses]"
            v-for="insert of inserts"
            :key="insert.name"
            v-html="insert.content"
        />
    </section>
</template>

<script>
import { hasContent } from "~/lib/pages.mjs";
export default {
    props: {
        bundle: { type: Array, required: false, default: () => [] },
        subclasses: { type: Array, required: false, default: () => [] },
    },
    computed: {
        inserts() {
            let inserts = [];
            if (!this.bundle) {
                return inserts;
            }
            for (let insert of this.bundle) {
                if (hasContent(insert)) {
                    inserts.push(insert);
                }
            }
            return inserts;
        },
    },
};
</script>
