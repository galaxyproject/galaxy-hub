<template>
    <div class="nb-notebook" v-html="notebookHTML"></div>
</template>
<script>
import "!!script-loader!notebookjs";
import "./ipython-style.styl";
import Prism from "prismjs/prism";
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-markdown'
import "prismjs/themes/prism.css";
import axios from "axios";
import ansi_up from "ansi_up";
import markdown from "marked";

export default {
    data: function() {
        return {
            notebookData: null
        };
    },
    props: {
        notebookURL: {
            type: String,
            required: true
        }
    },
    computed: {
        notebookHTML() {
            return this.notebookData === null ? "" : nb.parse(this.notebookData).render().innerHTML;
        }
    },
    mounted() {
        const defineHighlighter = (code, lang) => {
            if (typeof lang === "undefined") lang = "markup";

            if (!Prism.languages.hasOwnProperty(lang)) {
                console.warn("Prism highlighter needs additional language for:" + lang);
                Prism.languages[lang] = false;
            }

            return Prism.languages[lang] ? Prism.highlight(code, Prism.languages[lang]) : code;
        };

        /* configure global 'nb' */
        nb.ansi_up = ansi_up;
        nb.markdown = markdown;

        nb.highlighter = (text, pre, code, lang) => {
            var language = lang || "markup";
            pre.className = "language-" + language;
            if (typeof code != "undefined") {
                code.className = "language-" + language;
            }
            return defineHighlighter(text, language);
        };
        axios.get(this.notebookURL).then(r => {
            this.notebookData = r.data;
        });
    }
};
</script>
