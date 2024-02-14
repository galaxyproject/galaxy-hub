<template>
    <div>
        <ClientOnly>
            <div v-html="processedContents"></div>
        </ClientOnly>
    </div>
</template>

<script>
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export default {
    data() {
        return {
            markdownContents: "",
        };
    },
    props: {
        href: {
            type: String,
            required: true,
        },
    },
    computed: {
        processedContents() {
            return unified().use(remarkParse).use(remarkHtml).processSync(this.markdownContents).toString();
        },
    },
    mounted() {
        /* Load remote markdown, parse it, and inject in $el. */
        fetch(this.href)
            .then((response) => response.text())
            .then((markdownText) => {
                this.markdownContents = markdownText;
            })
            .catch((error) => {
                console.error("MarkdownEmbed vue component failed:", error);
                this.error = error;
            });
        // TODO: Add a loading spinner.
        // TODO: Add a fallback for when the markdown is not available.
    },
};
</script>

<style lang="scss" scoped></style>
