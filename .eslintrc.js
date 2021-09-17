module.exports = {
    plugins: ["cypress"],
    extends: ["eslint:recommended", "plugin:vue/strongly-recommended", "plugin:cypress/recommended"],
    env: {
        node: true,
        "cypress/globals": true,
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
