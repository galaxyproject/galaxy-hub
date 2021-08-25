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
  mounted() {
    // [Tab panes](https://getbootstrap.com/docs/4.0/components/navs/#javascript-behavior) aren't
    // working right now for some reason. This is a temporary workaround.
    let toggles = document.querySelectorAll('[data-toggle]');
    toggles.forEach(toggle => {
      if (! toggle.href) {
        console.error(`Found an element with "data-toggle" attribute no "href".`);
        return;
      }
      let href = new URL(toggle.href);
      let targetId = href.hash.slice(1);
      if (! targetId) {
        console.error(`Found an element with "data-toggle" attribute but malformed href hash "${href.hash}".`);
        return;
      }
      let target = document.getElementById(targetId);
      if (! target) {
        console.error(`No element with the id "${targetId}".`);
        return;
      }
      let toggleGroup = toggle.dataset.toggleGroup;
      let togglesInGroup;
      if (toggleGroup) {
        togglesInGroup = document.querySelectorAll(`[data-toggle-group="${toggleGroup}"]`);
      } else {
        console.error(`Toggle element for "#${targetId}" has no data-toggle-group.`);
      }
      toggle.addEventListener('click', event => {
        event.preventDefault();
        if (togglesInGroup) {
          togglesInGroup.forEach(toggle => {
            toggle.classList.remove('active');
            toggle.classList.remove('show');
          });
        }
        target.classList.add('show');
        target.classList.add('active');
      });
    });
  }
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
/***** Generally useful styles *****/
.text-nowrap {
  white-space: nowrap !important;
}
/***** Table of Contents *****/
.toc-wrapper {
  float: right;
}
.toc-wrapper ul {
  list-style: none;
  line-height: 170%;
}
.toc-wrapper > ul > li > p, .toc-wrapper > ul > li > a {
  font-weight: bold;
}
.toc-wrapper > ul ul {
  padding-left: 15px;
}
/***** Page sections *****/
.body-wrapper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.static-footer {
  position: absolute;
  bottom: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
/***** Markdown styling helpers *****/
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
.markdown .inline-p p {
  display: inline-block;
}
.markdown .expand-img img {
  width: 100%;
}
.markdown .no-header thead {
  display: none;
}
.markdown .compact th, .markdown .compact td {
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  line-height: 1.3em;
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