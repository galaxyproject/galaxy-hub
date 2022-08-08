<template>
    <section class="bundle" v-if="inserts.length > 0">
        <div
            :class="['markdown', 'insert', ...subclasses]"
            v-for="insert of inserts"
            :key="insert.path"
            v-html="insert.content"
            :data-name="insertNameFromPath(insert.path)"
        />
    </section>
</template>

<script>
import { rmPrefix, rmSuffix } from "~/lib/utils.js";
import { hasContent } from "~/lib/pages.mjs";
export default {
    props: {
        bundle: { type: Array, required: false, default: () => [] },
        subclasses: { type: Array, required: false, default: () => [] },
    },
    methods: {
        insertNameFromPath(path) {
            return rmPrefix(rmSuffix(path, "/"), "/insert:");
        },
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
