// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodePath = require("path");
const jiti = require("jiti")(__filename);
const remarkToc = jiti("remark-toc").default;
const tocRemodel = jiti("./src/build/toc-remodel.mjs").default;
const { rmPrefix, rmSuffix, rmPathPrefix } = require("./src/utils.js");
const CONFIG = require("./config.json");
const REMARK_PLUGINS = [
    [remarkToc, { skip: "end-table-of-contents" }],
    [tocRemodel, { tocAttrs: { class: "toc-wrapper col-md-3" }, bodyAttrs: { class: "body-wrapper col-md-9" } }],
];
const REMARK_VUE_PLUGINS = REMARK_PLUGINS;
const REMARK_MD_PLUGINS = REMARK_PLUGINS.concat("remark-attr");

const MD_CONTENT_DIR = CONFIG.build.dirs.md;
const VUE_CONTENT_DIR = CONFIG.build.dirs.vue;
const CONTENT_DIR_DEPTH = rmSuffix(MD_CONTENT_DIR, "/").split("/").length;

function mkTemplates(collections) {
    let templates = {
        Article: (node) => logAndReturn("Article", rmPathPrefix(node.path, CONTENT_DIR_DEPTH)),
        Insert: (node) => logAndReturn("Insert", makeFilenamePath("insert", node)),
    };
    for (let name of Object.keys(collections)) {
        templates[name] = (node) => logAndReturn(name, rmPathPrefix(node.path, CONTENT_DIR_DEPTH));
    }
    return templates;
}

function mkPlugins(collections) {
    // Path globbing rules: https://www.npmjs.com/package/globby#user-content-globbing-patterns
    let plugins = [
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: [`${MD_CONTENT_DIR}/**/index.md`],
                typeName: "Article",
            },
        },
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: [`${MD_CONTENT_DIR}/**/*.md`, `!${MD_CONTENT_DIR}/**/index.md`],
                typeName: "Insert",
            },
        },
        {
            use: "@gridsome/vue-remark",
            options: {
                typeName: "VueArticle",
                baseDir: VUE_CONTENT_DIR,
                pathPrefix: "/",
                ignore: [],
                template: "src/templates/VueArticle.vue",
                plugins: REMARK_VUE_PLUGINS,
            },
        },
    ];
    let articlePlugin = getPlugin(plugins, "Article");
    let vueArticlePlugin = getPlugin(plugins, "VueArticle");
    for (let [name, urlPath] of Object.entries(collections)) {
        let dirPath = nodePath.join(MD_CONTENT_DIR, urlPath);
        let globPath = nodePath.join(dirPath, "*/index.md");
        articlePlugin.options.path.push("!" + globPath);
        let bareUrlPath = rmPrefix(rmSuffix(urlPath, "/"), "/");
        vueArticlePlugin.options.ignore.push(bareUrlPath);
        //TODO: Allow custom collections to use vue-remark.
        let plugin = {
            use: "@gridsome/source-filesystem",
            options: {
                typeName: name,
                path: globPath,
            },
        };
        plugins.push(plugin);
    }
    return plugins;
}

function getPlugin(plugins, typeName) {
    for (let plugin of plugins) {
        if (plugin.options && plugin.options.typeName === typeName) {
            return plugin;
        }
    }
}

function makeFilenamePath(prefix, node) {
    // Note: `node.fileInfo` is not available from nodes made by `vue-remark`. This is fine as long as
    // this is only used for collections sourced by `source-filesystem` (e.g. `Insert`s).
    let directory = rmPathPrefix(node.fileInfo.directory, CONTENT_DIR_DEPTH, false);
    let path;
    if (directory === "") {
        path = node.fileInfo.name;
    } else {
        path = [directory, node.fileInfo.name].join("/");
    }
    return `/${prefix}:/${path}`;
}

function logAndReturn(...values) {
    // console.log(values.join("\t"));
    return values[values.length - 1];
}

module.exports = {
    siteName: "Galaxy Community Hub",
    siteDescription: "All about Galaxy and its community.",
    icon: "./src/favicon.png",
    templates: mkTemplates(CONFIG["collections"]),
    plugins: mkPlugins(CONFIG["collections"]),
    css: {
        loaderOptions: {
            scss: {
                // options here will be passed to sass-loader
                sassOptions: {
                    quietDeps: true,
                },
            },
        },
    },
    transformers: {
        // Add markdown support to all filesystem sources
        remark: {
            externalLinksTarget: "_blank",
            externalLinksRel: ["noopener", "noreferrer"],
            slug: true,
            autolinkHeadings: true,
            plugins: REMARK_MD_PLUGINS,
        },
    },
    images: {
        // Disable image compression. This greatly reduces build time, but not memory usage.
        compress: false,
        defaultQuality: 100,
    },
    // This was required to solve an error thrown by importing `fs` into `src/util.js`.
    // https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-619958699
    configureWebpack: {
        node: {
            fs: "empty",
        },
    },
    // Fix bug in vue-remark that breaks it if a Markdown file is a symlink to one outside the content
    // directory: https://github.com/gridsome/gridsome/issues/1251#issuecomment-652931137
    chainWebpack(config) {
        config.resolve.set("symlinks", false);
    },
};
