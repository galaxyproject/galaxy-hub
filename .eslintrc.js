module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        "eslint:recommended",
        "plugin:vue/strongly-recommended", // Use this if you are using Vue.js 2.x.
    ],
    env: {
        node: true,
    },
    rules: {
        // Prettier compromises/workarounds -- mostly #wontfix?
        "vue/html-indent": "off",
        "vue/max-attributes-per-line": "off",
        "vue/html-self-closing": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-closing-bracket-spacing": "off",
    },
};
