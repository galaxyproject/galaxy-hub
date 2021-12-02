<template>
    <div>
        <div ref="hotlinkedNotebookDock"></div>
        <p>
            Source notebook: <a :href="getNotebookSource">{{ getNotebookSource }}</a>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        notebookSource: {
            type: String,
            required: true
        }
    },
    computed: {
        getNotebookSource() {
            return `https://observablehq.com/${this.notebookSource}`;
        }
    },
    mounted() {
        let notebookScript = document.createElement("script");
        this.$refs.hotlinkedNotebookDock.id = this._uid;
        notebookScript.type = "module";
        notebookScript.async = true;
        notebookScript.innerHTML = `
        import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";

        // Your notebook, compiled as an ES module.
        import notebook from "https://api.observablehq.com/${this.notebookSource}.js?v=3";

        // Load the notebook, observing its cells with a default Inspector
        // that simply renders the value of each cell into the provided DOM node.
        new Runtime().module(notebook, Inspector.into(document.getElementById('${this._uid}')));
    `;
        document.head.appendChild(notebookScript);
    }
};
</script>
<style>
/* Default notebook styles, from https://raw.githubusercontent.com/observablehq/inspector/master/src/style.css */
:root {
    --syntax_normal: #1b1e23;
    --syntax_comment: #a9b0bc;
    --syntax_number: #20a5ba;
    --syntax_keyword: #c30771;
    --syntax_atom: #10a778;
    --syntax_string: #008ec4;
    --syntax_error: #ffbedc;
    --syntax_unknown_variable: #838383;
    --syntax_known_variable: #005f87;
    --syntax_matchbracket: #20bbfc;
    --syntax_key: #6636b4;
    --mono_fonts: 82%/1.5 Menlo, Consolas, monospace;
}

.observablehq--expanded,
.observablehq--collapsed,
.observablehq--function,
.observablehq--import,
.observablehq--string:before,
.observablehq--string:after,
.observablehq--gray {
    color: var(--syntax_normal);
}

.observablehq--collapsed,
.observablehq--inspect a {
    cursor: pointer;
}

.observablehq--field {
    text-indent: -1em;
    margin-left: 1em;
}

.observablehq--empty {
    color: var(--syntax_comment);
}

.observablehq--keyword,
.observablehq--blue {
    color: #3182bd;
}

.observablehq--forbidden,
.observablehq--pink {
    color: #e377c2;
}

.observablehq--orange {
    color: #e6550d;
}

.observablehq--null,
.observablehq--undefined,
.observablehq--boolean {
    color: var(--syntax_atom);
}

.observablehq--number,
.observablehq--bigint,
.observablehq--date,
.observablehq--regexp,
.observablehq--symbol,
.observablehq--green {
    color: var(--syntax_number);
}

.observablehq--index,
.observablehq--key {
    color: var(--syntax_key);
}

.observablehq--prototype-key {
    color: #aaa;
}

.observablehq--empty {
    font-style: oblique;
}

.observablehq--string,
.observablehq--purple {
    color: var(--syntax_string);
}

.observablehq--error,
.observablehq--red {
    color: #e7040f;
}

.observablehq--inspect {
    font: var(--mono_fonts);
    overflow-x: auto;
    display: block;
    white-space: pre;
}

.observablehq--error .observablehq--inspect {
    word-break: break-all;
    white-space: pre-wrap;
}
</style>
