// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodePath = require('path');
const fs = require('fs');
const { rmPrefix, rmSuffix, rmPathPrefix } = require('./src/utils.js');

const CONFIG = JSON.parse(fs.readFileSync('config.json','utf8'));
const MD_CONTENT_DIR = CONFIG.build.dirs.md;
const VUE_CONTENT_DIR = CONFIG.build.dirs.vue;
const CONTENT_DIR_DEPTH = rmSuffix(MD_CONTENT_DIR,'/').split('/').length

function mkTemplates(collections) {
  let templates = {
    Article: node => logAndReturn("Article", rmPathPrefix(node.path, CONTENT_DIR_DEPTH)),
    Insert: node => logAndReturn("Insert", makeFilenamePath("insert", node)),
  };
  for (let name of Object.keys(collections)) {
    templates[name] = node => logAndReturn(name, rmPathPrefix(node.path, CONTENT_DIR_DEPTH));
  }
  return templates;
}

function mkPlugins(collections) {
  // Path globbing rules: https://www.npmjs.com/package/globby#user-content-globbing-patterns
  let plugins = [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: [MD_CONTENT_DIR+'/**/index.md'],
        typeName: 'Article',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: [MD_CONTENT_DIR+'/**/*.md', '!'+MD_CONTENT_DIR+'/**/index.md'],
        typeName: 'Insert',
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'VueArticle',
        baseDir: VUE_CONTENT_DIR,
        pathPrefix: '/',
        ignore: [],
        template: 'src/templates/VueArticle.vue'
      }
    },
  ];
  for (let [name, urlPath] of Object.entries(collections)) {
    let dirPath = nodePath.join(MD_CONTENT_DIR, urlPath);
    let globPath = nodePath.join(dirPath, '*/index.md');
    let articlePlugin = getPlugin(plugins, 'Article');
    articlePlugin.options.path.push('!'+globPath);
    let bareUrlPath = rmPrefix(rmSuffix(urlPath,'/'),'/')
    let vueArticlePlugin = getPlugin(plugins, 'VueArticle');
    vueArticlePlugin.options.ignore.push(bareUrlPath);
    //TODO: Allow custom collections to use vue-remark.
    let plugin = {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: name,
        path: globPath,
      }
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
  let directory = rmPathPrefix(node.fileInfo.directory, CONTENT_DIR_DEPTH, absolute=false);
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
  return values[values.length-1];
}

module.exports = {
  siteName: 'Galaxy Community Hub: The Squeakquel',
  siteDescription: 'All about Galaxy and its community',
  templates: mkTemplates(CONFIG['collections']),
  plugins: mkPlugins(CONFIG['collections']),
  transformers: {
    // Add markdown support to all filesystem sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['noopener', 'noreferrer'],
      slug: true,
      autolinkHeadings: true,
      plugins: ['remark-attr'],
    }
  },
  // This was required to solve an error thrown by importing `fs` into `src/util.js`.
  // https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-619958699
  configureWebpack: {
    node: {
      fs: "empty"
    }
  },
}
