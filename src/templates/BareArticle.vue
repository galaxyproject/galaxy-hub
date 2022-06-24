<template>
    <div>
        <main id="maincontainer" :class="['container', 'markdown', ...mdClasses]">
            <VueRemarkContent>
                <!--
                    Insert the content for each `<slot>` in the Markdown.
                    `#[insert.name]` (shorthand for `v-slot:[insert.name]`) identifies which slot each `<template>`
                    replaces. `[insert.name]` allows the slot name to be dynamic, based on the value of the
                    `insert.name` variable: https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names
                -->
                <template v-for="insert of $page.article.inserts" #[insert.name]>
                    <div class="insert" :data-name="insert.name" :key="insert.name + ':md'" v-html="insert.content">
                        &nbsp;
                    </div>
                </template>
            </VueRemarkContent>
        </main>
    </div>
</template>

<script>
import { resizeIFrames } from "~/lib/client.mjs";
import { addTocClass } from "~/lib/pages.mjs";
export default {
    metaInfo() {
        return {
            title: this.$page.article.title,
        };
    },
    computed: {
        mdClasses() {
            let classes = [];
            addTocClass(classes, this.$page.article);
            return classes;
        },
    },
    mounted() {
        resizeIFrames(document);
    },
};
</script>

<page-query>
query BareArticle($path: String!) {
    article: bareArticle(path: $path) {
        id
        title
        content
        autotoc
        inserts {
            name
            content
        }
        path
    }
}
</page-query>
