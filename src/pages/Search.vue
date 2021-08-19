<template>
  <Layout>
    <div class="col-md-12">
      <section class="section-content">
        <h1 class="page-title">{{ $page.main.title }}</h1>
        <div class="blurb markdown" v-html="$page.main.content" />
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a id="google-tab" class="nav-link active" href="#google-pane" data-toggle="tab" role="tab" aria-controls="google-pane" aria-selected="true">
              Pan-Galactic Google Search
            </a>
          </li>
          <li class="nav-item">
            <a id="zotero-tab" class="nav-link active" href="#zotero-pane" data-toggle="tab" role="tab" aria-controls="zotero-pane" aria-selected="false">
              Galaxy Publication Search
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="google-pane" class="tab-pane active" role="tabpanel" aria-labelledby="home-tab">
            <gcse:searchresults-only></gcse:searchresults-only>
          </div>
          <div id="zotero-pane" class="tab-pane" role="tabpanel" aria-labelledby="zotero-tab">
            <p>
              Loading Zotero Results
              <i class="fa fa-spinner fa-spin"></i>
            </p>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
function createGoogleSearch() {
  var cx = '007594916903876912968:w0nrox8rzzy';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
}
export default {
  mounted() {
    createGoogleSearch();
  }
}
</script>

<page-query>
query {
  main: insert(path: "/insert:/search/main/") {
    id
    title
    content
  }
  footer: insert(path: "/insert:/search/footer/") {
    id
    title
    content
  }
}
</page-query>
