/* global require */

// Build with Metalsmith
let metalsmith = require("metalsmith");
let fs = require("fs");
let path = require("path");
let hb_partials = require("handlebars");
let marked = require("marked");
let slug = require("slug");

// Plugin for Bower support
let bower = function(files, metalsmith, done) {
    let bower_files = require("bower-files")();
    let { readFileSync } = require("fs");
    let { basename } = require("path");
    let include = (root, included) =>
        (() => {
            let result = [];
            for (let file of Array.from(included)) {
                let contents = readFileSync(file);
                result.push((files[`${root}/${basename(file)}`] = { contents }));
            }
            return result;
        })();
    include("css", bower_files.self().ext("css").files);
    include("js", bower_files.self().ext("js").files);
    include("fonts", bower_files.self().ext(["eot", "otf", "ttf", "woff", "woff2"]).files);
    return done();
};

let set_metadata_defaults = function(files, metalsmith, done) {
    // Simple way to apply metadata defaults
    for (let k in files) {
        let v = files[k];
        if (k.endsWith(".md")) {
            // Link to original path
            files[k].orig_path = k;
            // Autotoc defaults to true
            // Set domain templates
            if (Array.from(v.collection).includes("events")) {
                if (files[k].layout === undefined) {
                    files[k].layout = "events.pug";
                }
                if (files[k].autotoc === undefined) {
                    files[k].autotoc = false;
                }
            } else if (Array.from(v.collection).includes("news")) {
                if (files[k].layout === undefined) {
                    files[k].layout = "news.pug";
                }
                if (files[k].autotoc === undefined) {
                    files[k].autotoc = false;
                }
            } else if (Array.from(v.collection).includes("blog")) {
                if (files[k].layout === undefined) {
                    files[k].layout = "blog.pug";
                }
                if (files[k].autotoc === undefined) {
                    files[k].autotoc = true;
                }
            } else if (Array.from(v.collection).includes("servers")) {
                if (files[k].layout === undefined) {
                    files[k].layout = "server.pug";
                }
                if (files[k].autotoc === undefined) {
                    files[k].autotoc = false;
                }
            } else {
                if (files[k].autotoc === undefined) {
                    files[k].autotoc = true;
                }
            }
        }
    }
    return done();
};

var partials_from_dir = (source, dir) =>
    (() => {
        let result = [];
        let object = fs.readdirSync(source);
        for (let i in object) {
            let p_f = object[i];
            let p_path = path.join(source, p_f);
            let stats = fs.statSync(p_path);
            if (stats.isDirectory()) {
                result.push(partials_from_dir(p_path, dir));
            } else {
                let contents = fs.readFileSync(p_path, "utf8");
                p_path = p_path.replace("partials/", "").replace(".html", "");
                dir[p_path] = contents;
                result.push(hb_partials.registerPartial(p_path, contents));
            }
        }
        return result;
    })();
let partials = {};
partials_from_dir("partials", partials);

let md_link_pattern = /\[([^\]]*)\]\(([^\)]*)\)/g;
let html_link_pattern = /href=[\'"]?([^\'" >]+)[\'"]/g;
let html_img_pattern = /src=[\'"]\/src?([^\'" >]+)[\'"]/g;

let handlebars_partial_handling = function(files, metalsmith, done) {
    for (let file in files) {
        let c = files[file];
        (function(file, c) {
            if (file.endsWith(".md")) {
                let contents = files[file].contents.toString();
                let template = hb_partials.compile(contents);
                contents = template({});
                return (files[file].contents = contents);
            }
        })(file, c);
    }
    return done();
};

let subs = function(files, metalsmith, done) {
    // Quick hack to temporarily handle INCLUDE migration
    // Followed by another set of hacks to strip /src and index.md out of
    // source.  We have these full references in the source to make GitHub
    // render correctly in the preview and web editor.  TODO:  Come up with a
    // better long term solution that renders both in github, and correctly for
    // publishing, that isn't a big nest of regexes and special cases.
    for (let file in files) {
        let c = files[file];
        (function(file, c) {
            if (file.endsWith(".md")) {
                let match, rep;
                let contents = files[file].contents.toString();
                let matches = [];
                while ((match = md_link_pattern.exec(contents))) {
                    matches.push(match);
                }
                for (match of Array.from(matches)) {
                    rep = match[2];
                    //TODO: Do this with a regex too
                    if (rep.startsWith("/src")) {
                        // Drop leading /src
                        rep = rep.substr(4);
                    }
                    if (rep.startsWith("/")) {
                        // If it's a local URL, drop index.md's when they exist.
                        // Replace is simpler here because we have to consider
                        // in-page anchors.
                        rep = rep.replace("index.md", "");
                    }
                    contents = contents.split(match[0]).join(`[${match[1]}](${rep})`);
                }
                matches = [];
                while ((match = html_link_pattern.exec(contents))) {
                    matches.push(match);
                }
                for (match of Array.from(matches)) {
                    rep = match[1];
                    if (rep.startsWith("/src")) {
                        rep = rep.substr(4);
                    }
                    if (rep.startsWith("/")) {
                        rep = rep.replace("index.md", "");
                    }
                    contents = contents.split(match[0]).join(`href="${rep}"`);
                }
                matches = [];
                while ((match = html_img_pattern.exec(contents))) {
                    matches.push(match);
                }
                for (match of Array.from(matches)) {
                    // Simply match and drop leading /src/ from images.
                    contents = contents.split(match[0]).join(`src="${match[1]}"`);
                }
                return (files[file].contents = contents);
            }
        })(file, c);
    }
    return done();
};

let file_staging = function(files, metalsmith, done) {
    // We will sometimes need to stage files post rendering as other file
    // types.  Currently this is just json feeds, but can be expanded.
    for (let k in files) {
        let v = files[k];
        if (Array.from(v.collection).includes("json_feed")) {
            files[k.replace(".html", ".json")] = files[k];
            delete files[k];
        }
    }
    return done();
};

// Extend `marked.Renderer` to increase all heading levels by 1 since we reserve
// h1 for the page title. Will be passed to `metalsmith-markdown` plugin.
class Renderer extends marked.Renderer {
    heading(text, level, raw) {
        var h_slug = this.options.headerPrefix + slug(raw.toLowerCase());
        return `<h${level + 1} id="${h_slug}">
            <a class="heading-anchor" href="#${h_slug}"><span></span></a>
            ${text}
            </h${level + 1}>
`;
    }
    table(header, body) {
        return `<table class="table table-striped">
<thead>
${header}
</thead>
<tbody>
${body}
</tbody>
</table>`;
    }
    image(href, title, text) {
        let out = `<img class="img-responsive" src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += "/>";
        return out;
    }
}

let timer = require("metalsmith-timer");

let ms = metalsmith(__dirname)
    .use(
        require("metalsmith-metadata")({
            menu: "config/menu.yaml"
        })
    )
    .use(timer("metalsmith-metadata"))
    .use(
        require("metalsmith-collections")({
            news: {
                pattern: "news/*/*.md",
                sortBy: "date",
                reverse: true
            },
            devnewsbrief: {
                pattern: "archive/dev-news-briefs/*/*.md",
                sortBy: "date",
                reverse: true
            },
            events: {
                pattern: "events/*/*.md",
                sortBy: "date",
                reverse: true
            },
            blog: {
                pattern: "blog/*/*.md",
                sortBy: "date",
                reverse: true
            },
            servers: {
                pattern: "public-galaxy-servers/*/*.md",
                sortBy: "title",
                reverse: false
            },
            publications: {
                pattern: "publications/*/*.md",
                sortBy: "date",
                reverse: true
            },
            splash: {
                pattern: "splash/*/*.md",
                sortBy: function randomSort(a, b) {
                    return parseInt(Math.random() * 10) % 2;
                },
                reverse: true
            }
        })
    )
    .use(timer("metalsmith-collections"))
    .use(set_metadata_defaults)
    .use(timer("set_metadata_defaults"))
    .use(handlebars_partial_handling)
    .use(timer("handlebars_partial_handling"))
    .use(subs)
    .use(timer("subs"))
    .use(
        require("metalsmith-markdown")({
            gfm: true,
            renderer: new Renderer()
        })
    )
    .use(timer("metalsmith-markdown"))
    .use(
        require("metalsmith-autotoc")({
            selector: "h2, h3, h4"
        })
    )
    .use(timer("metalsmith-autotoc"))
    .use(require("metalsmith-alias")())
    .use(timer("metalsmith-alias"))
    .use(
        require("metalsmith-filepath")({
            absolute: true,
            permalinks: true
        })
    )
    .use(timer("metalsmith-filepath"))
    .use(
        require("metalsmith-layouts")({
            engine: "pug",
            cache: true,
            default: "default.pug",
            pattern: "**/*.html",
            helpers: {
                moment: require("moment"),
                marked: require("marked"),
                _: require("lodash")
            }
        })
    )
    .use(timer("metalsmith-layouts"))
    .use(file_staging)
    .use(timer("file staging"))
    .use(require("metalsmith-less")())
    .use(timer("metalsmith-less"))
    .use(bower)
    .use(timer("bower"))
    .use(require("metalsmith-uglify")())
    .use(timer("metalsmith-uglify"));

let argv = require("minimist")(process.argv.slice(2));

if (argv["serve"]) {
    ms.use(require("metalsmith-serve")({ port: 8080 }));
}

if (argv["check"]) {
    ms.use(
        require("metalsmith-broken-link-checker")({
            allowRedirects: true,
            warn: true
        })
    );
}

if (argv['watch']) {
    ms.use(
        require('metalsmith-watch')({
            paths: {
                "${source}/**/*": true,
                "${source}/config/menu.yaml": true,
                "layouts/**/*": "**/*.md"
            },
        livereload: true
        })
    )
    ms.use(
        require('metalsmith-serve')({
        port: 8080,
        host: "0.0.0.0"
        }))
}

ms.build(function(e) {
    if (e) {
        throw e;
    } else {
        return console.log("Done");
    }
});
