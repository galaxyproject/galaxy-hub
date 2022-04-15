<template>
    <div :class="rootClasses">
        <header id="masthead">
            <NavBar :subsite="subsite" />
        </header>
        <main id="maincontainer" class="container">
            <slot />
        </main>
        <footer class="static-footer" v-if="$static.footer">
            <div class="markdown container" v-html="$static.footer.content" />
        </footer>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
    components: {
        NavBar,
    },
    props: {
        subsite: { type: String, required: false, default: "root" },
    },
    computed: {
        rootClasses() {
            let classes = ["layout"];
            if (this.subsite) {
                classes.push(this.subsite);
            }
            return classes;
        },
    },
    mounted() {
        // Google Analytics tag.
        addGATag();
    },
};
function addGATag() {
    //TODO: Replace with vue-gtag.
    (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
            i[r] ||
            function () {
                (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
    /* global ga */
    ga("create", "UA-45719423-4", "auto");
    ga("send", "pageview");
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

<style lang="scss">
@import "~/assets/styles.scss";

#maincontainer {
    padding-top: 1rem;
    padding-bottom: 1rem;
    a:not(.btn) {
        color: $brand-primary;
    }
    a:hover {
        text-decoration: underline;
    }
}

/***** Generally useful styles *****/
.text-nowrap {
    white-space: nowrap !important;
}
/***** Table of Contents *****/
.markdown.notoc .toc-wrapper {
    display: none;
}
.markdown.notoc .body-wrapper {
    max-width: 100%;
}
.toc-wrapper {
    float: right;
}
.toc-wrapper ul {
    list-style: none;
    line-height: 170%;
}
.toc-wrapper > ul > li > p,
.toc-wrapper > ul > li > a {
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
    width: 100%;
    bottom: 0;
    padding-bottom: 0.5rem;
}
/***** Markdown image sizing *****/
.markdown img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
.img-sizer p {
    height: 100%;
}
/***** Markdown styling helpers *****/
.autowidth img {
    width: auto;
}
.trim-p p,
p.trim-p,
.markdown ul li p,
.markdown ol li p,
.markdown .btn p {
    padding: 0 !important;
    margin: 0;
}
.inline-p p,
.inline-div div {
    display: inline-block;
}
.expand-img img {
    width: 100%;
}
.no-header thead {
    display: none;
}
.markdown .compact th,
.markdown .compact td {
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
.markdown th,
.markdown td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #bfbfbf;
}
/* A .table-striped specific one: */
.markdown tbody tr:nth-of-type(2n + 1) {
    background-color: rgba(0, 0, 0, 0.05);
}
/***** Anchor link icons next to headings *****/
.markdown h1 > a[aria-hidden="true"],
.markdown h2 > a[aria-hidden="true"],
.markdown h3 > a[aria-hidden="true"],
.markdown h4 > a[aria-hidden="true"],
.markdown h5 > a[aria-hidden="true"],
.markdown h6 > a[aria-hidden="true"] {
    display: none;
}
/* Anchor link icons by headings */
h1:hover > a[aria-hidden="true"],
h2:hover > a[aria-hidden="true"],
h3:hover > a[aria-hidden="true"],
h4:hover > a[aria-hidden="true"],
h5:hover > a[aria-hidden="true"],
h6:hover > a[aria-hidden="true"] {
    display: block;
    padding-right: 6px;
    padding-left: 20px;
    margin-left: -20px;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    bottom: 0;
    left: 0;
    text-decoration: none;
    height: 100%;
    background: transparent;
}
h1:hover > a > span.icon.icon-link::before,
h2:hover > a > span.icon.icon-link::before,
h3:hover > a > span.icon.icon-link::before,
h4:hover > a > span.icon.icon-link::before,
h5:hover > a > span.icon.icon-link::before,
h6:hover > a > span.icon.icon-link::before {
    /* link icon from FontAwesome */
    font-family: "Font Awesome 5 Free";
    content: "\f0c1";
    font-weight: 900;
    position: absolute;
    font-size: 70%;
    right: 0.75em;
    top: -2px;
    bottom: 0;
}
</style>
