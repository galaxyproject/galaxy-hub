<template>
    <Layout>
        <ArticleHeader :article="$page.main" />
        <article :class="['content', 'markdown', ...mdClasses]">
            <VueRemarkContent>
                <!--
                    Insert the content for each `<slot>` in the Markdown.
                    `#[insert.name]` (shorthand for `v-slot:[insert.name]`) identifies which slot each `<template>`
                    replaces. `[insert.name]` allows the slot name to be dynamic, based on the value of the
                    `insert.name` variable: https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names
                -->
                <template v-for="insert of $page.main.inserts" #[insert.name]>
                    <p class="markdown" :key="insert.name + ':md'" v-html="insert.content" />
                    <p class="d-none" :key="insert.name + ':p'">Issue #758 workaround</p>
                </template>
            </VueRemarkContent>
        </article>
        <ArticleFooter :article="$page.main" />
    </Layout>
</template>

<page-query>
query VueArticle($path: String!) {
   main: vueArticle(path: $path) {
    id
    title
    tease
    category
    date (format: "YYYY-MM-DD")
    days
    contact
    contact_url
    authors
    location
    location_url
    source_blog
    source_blog_url
    skip_title_render
    redirect
    autotoc
    links {
      url
      text
    }
    external_url
    image
    images
    fileInfo {
        path
    }
    inserts {
      name
      content
    }
    content
  }
}
</page-query>

<script>
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
export default {
    components: {
        ArticleHeader,
        ArticleFooter,
    },
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
    computed: {
        mdClasses() {
            let classes = [];
            if (this.$page.main.autotoc === true) {
                classes.push("toc");
            } else if (this.$page.main.autotoc === false) {
                classes.push("notoc");
            }
            return classes;
        },
    },
};
</script>

<style scoped>
.content {
    font-size: 14px;
    margin-top: 20px;
}
</style>
