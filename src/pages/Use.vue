<template>
  <Layout>
    <h1 class="page-title">{{ $page.main.title }}</h1>
    <div class="markdown" v-html="$page.main.content" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Resource</th>
          <th>Server</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        <PlatformRow v-for="edge in $page.platforms.edges" :key="edge.node.id" :platform="edge.node" />
      </tbody>
    </table>
    <footer class="page-footer markdown" v-if="$page.footer" v-html="$page.footer.content" />
  </Layout>
</template>

<script>
import PlatformRow from '@/components/PlatformRow';
export default {
  components: {
    PlatformRow,
  },
  metaInfo() {
    return {
      title: this.$page.main.title
    }
  }
}
</script>

<page-query>
query {
  main: insert(path: "/insert:/use/main/") {
    id
    title
    content
  }
  footer: insert(path: "/insert:/use/footer/") {
    id
    title
    content
  }
  platforms: allPlatform(sortBy: "title", order: ASC) {
    totalCount
    edges {
      node {
        id
        title
        summary
        url
        path
      }
    }
  }
}
</page-query>
