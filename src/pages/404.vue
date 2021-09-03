<template>
    <Layout>
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="markdown" v-html="$page.main.content" />
    </Layout>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: this.$page.main.title,
        };
    },
}
</script>

<page-query>
query {
  main: insert(path: "/insert:/404/") {
    id
    title
    content
  }
}
</page-query>
