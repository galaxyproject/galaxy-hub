// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodePath = require("path");
const dayjs = require("dayjs");
const jiti = require("jiti")(__filename);
const remarkToc = jiti("remark-toc").default;
const tocRemodel = jiti("./src/build/toc-remodel.mjs").default;
const { rmToc, HEADING_ENDING } = jiti("./src/build/toc-add.mjs");
const { repr, getType, rmPrefix, rmSuffix, splitlines, rmPathPrefix, mdToHtml } = require("./src/lib/utils.js");
const CONFIG = require("./config.json");
const REMARK_PLUGINS = [
    [remarkToc, { skip: HEADING_ENDING }],
    [tocRemodel, { tocAttrs: { class: "toc-wrapper col-md-3" }, bodyAttrs: { class: "body-wrapper col-md-9" } }],
];
const REMARK_VUE_PLUGINS = REMARK_PLUGINS;
const REMARK_MD_PLUGINS = REMARK_PLUGINS.concat("remark-attr");

const MD_CONTENT_DIR = rmPrefix(rmSuffix(CONFIG.build.dirs.md, "/"), "/");
const VUE_CONTENT_DIR = rmPrefix(rmSuffix(CONFIG.build.dirs.vue, "/"), "/");
const CONTENT_DIR_DEPTH = MD_CONTENT_DIR.split("/").length;

const SITEMAP_PLUGIN = {
    use: "@gridsome/plugin-sitemap",
};

const RSS_PLUGIN = {
    use: "gridsome-plugin-feed",
    options: {
        contentTypes: ["Article", "VueArticle"],
        feedOptions: {
            title: "Galaxy Europe",
            description: "The European Galaxy Instance",
            id: `https://${CONFIG.host}/eu/feed.atom`,
        },
        atom: {
            enabled: true,
            output: "/eu/feed.atom",
        },
        rss: {
            enabled: false,
        },
        maxItems: 25,
        // Just EU news posts.
        filterNodes: (node) => node && node.date && node.category === "news" && node.subsites.includes("eu"),
        nodeToFeedItem(node) {
            if (!node) {
                throw repr`Nonexistent node: ${node}`;
            }
            if (!node.date) {
                throw `No date on ${node.path}`;
            }
            let item = {
                title: node.title,
                content: node.content,
            };
            let dateType = getType(node.date);
            if (dateType === "Date") {
                item.date = node.date;
            } else if (dateType === "String") {
                item.date = dayjs(node.date).$d;
            } else {
                throw repr`Invalid date type ${dateType} for ${node.date} on ${node.path}`;
            }
            item.published = item.date;
            if (node.tease) {
                item.description = node.tease;
            }
            if (node.image && (node.image.startsWith("https") || node.image.startsWith("http"))) {
                item.image = node.image;
            }
            if (node.contact) {
                item.author = [{ name: node.contact }];
            } else if (node.authors) {
                item.author = [{ name: node.authors }];
            }
            if (item.content) {
                let lines = splitlines(item.content);
                let md = rmToc(lines).join("\n");
                item.content = mdToHtml(md, false);
            }
            return item;
        },
    },
};

const PLAUSIBLE_PLUGIN = {
    use: "gridsome-plugin-plausible-analytics",
    options: {
        customDomain: "plausible.galaxyproject.eu",
        dataDomain: "galaxyproject.org",
        outboundLinkTracking: true,
    },
};

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
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: [`${MD_CONTENT_DIR}/**/*.yml`],
                typeName: "Dataset",
            },
        },
    ];
    // Build custom plugins defined in config.json.
    let articlePlugin = getPlugin(plugins, "Article");
    let vueArticlePlugin = getPlugin(plugins, "VueArticle");
    for (let [name, meta] of Object.entries(collections)) {
        // Compose the root path for pages in our custom collection.
        let dirPath = nodePath.join(MD_CONTENT_DIR, meta.path);
        let globPath = nodePath.join(dirPath, "*/index.md");
        // Note: We need to tell Article and VueArticle to ignore pages that are part of other collections.
        // Article and VueArticle both apply to all pages ("/" and under), so they'll step on custom
        // collections otherwise.
        let plugin;
        if (meta.type === "md") {
            articlePlugin.options.path.push("!" + globPath);
            plugin = {
                use: "@gridsome/source-filesystem",
                options: {
                    typeName: name,
                    path: [globPath],
                },
            };
        } else if (meta.type === "vue") {
            let bareUrlPath = rmPrefix(rmSuffix(meta.path, "/"), "/");
            vueArticlePlugin.options.ignore.push(`${VUE_CONTENT_DIR}/${bareUrlPath}`);
            plugin = {
                use: "@gridsome/vue-remark",
                options: {
                    typeName: name,
                    baseDir: `${VUE_CONTENT_DIR}/${bareUrlPath}`,
                    pathPrefix: meta.path,
                    ignore: [],
                    template: `src/templates/${name}.vue`,
                    plugins: REMARK_VUE_PLUGINS,
                },
            };
        } else {
            throw repr`Error: Collection ${name} has invalid type ${meta.type}. Must be "md" or "vue".`;
        }
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

function mkTemplates(collections) {
    let templates = {
        Article: (node) => rmPathPrefix(node.path, CONTENT_DIR_DEPTH),
        Insert: (node) => makeFilenamePath("insert", node),
        Dataset: (node) => makeFilenamePath("dataset", node),
    };
    for (let [name, meta] of Object.entries(collections)) {
        if (meta.type === "md") {
            templates[name] = (node) => rmPathPrefix(node.path, CONTENT_DIR_DEPTH);
        }
    }
    return templates;
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

module.exports = {
    siteName: "Galaxy Community Hub",
    siteDescription: "All about Galaxy and its community.",
    siteUrl: `https://${CONFIG.host}`,
    icon: "./src/favicon.png",
    templates: mkTemplates(CONFIG["collections"]),
    plugins: [SITEMAP_PLUGIN, RSS_PLUGIN, PLAUSIBLE_PLUGIN, ...mkPlugins(CONFIG["collections"])],
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
