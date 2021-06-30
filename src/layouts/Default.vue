<template>
  <div class="layout">
    <header id="masthead">
      <NavBar/>
    </header>
    <section id="maincontainer" class="container">
      <slot/>
      <footer class="static-footer markdown" v-if="$static.footer" v-html="$static.footer.content" />
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
export default {
  components: {
    NavBar,
  },
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
  footer: insert(path: "/insert:/site-footer/") {
    id
    title
    content
  }
}
</static-query>

<style>
.text-nowrap {
  white-space: nowrap !important;
}
.markdown img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.markdown .autowidth img {
  width: auto;
}
.markdown .img-sizer p {
  height: 100%;
}
.markdown .trim-p p, .markdown ul li p, .markdown ol li p, .markdown .btn p {
  padding: 0;
  margin: 0;
}
/* Replacement for .table and .table-striped on Markdown tables.
 * Until we can get those classes inserted into the table elements themselves.
 */
.markdown table {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  width: 100%;
  color: #212529;
  border-collapse: collapse;
}
.markdown thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #bfbfbf;
  text-align: inherit;
}
.markdown th, .markdown td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #bfbfbf;
}
/* A .table-striped specific one: */
.markdown tbody tr:nth-of-type(2n+1) {
  background-color: rgba(0,0,0,0.05);
}
</style>