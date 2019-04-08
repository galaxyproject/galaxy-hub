/* global require */
/* global __dirname */
/* global process */
/* global global */

// Build with Metalsmith
const metalsmith = require("metalsmith");
const fs = require("fs");
const path = require("path");
const hb_partials = require("handlebars");
const slug = require("slug");
const moment = require("moment");
const _ = require("lodash");
const timer = require("metalsmith-timer");
const marked = require("marked");

let argv = require("minimist")(process.argv.slice(2));

/* PULLED FROM MARKED */

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
    if (str.length === 0) {
        return "";
    }

    // Length of suffix matching the invert condition.
    var suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < str.length) {
        var currChar = str.charAt(str.length - suffLen - 1);
        if (currChar === c && !invert) {
            suffLen++;
        } else if (currChar !== c && invert) {
            suffLen++;
        } else {
            break;
        }
    }

    return str.substr(0, str.length - suffLen);
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function resolveUrl(base, href) {
    if (!baseUrls[" " + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (/^[^:]+:\/*[^/]*$/.test(base)) {
            baseUrls[" " + base] = base + "/";
        } else {
            baseUrls[" " + base] = rtrim(base, "/", true);
        }
    }
    base = baseUrls[" " + base];

    if (href.slice(0, 2) === "//") {
        return base.replace(/:[\s\S]*/, ":") + href;
    } else if (href.charAt(0) === "/") {
        return base.replace(/(:\/*[^/]*)[\s\S]*/, "$1") + href;
    } else {
        return base + href;
    }
}

/* EXTENSION FOR MARKED RENDERER */
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
        let out = `<img class="img-fluid" src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += "/>";
        return out;
    }
    link(href, title, text) {
        if (href.startsWith("/src/")) {
            href = href.substring(4);
        }
        if (href.includes("/index.md")) {
            href = href.substring(0, href.indexOf("/index.md")) + href.substring(href.indexOf("/index.md") + 9);
        }
        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href))
                    .replace(/[^\w:]/g, "")
                    .toLowerCase();
            } catch (e) {
                return text;
            }
            if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
                return text;
            }
        }
        if (this.options.baseUrl && !originIndependentUrl.test(href)) {
            href = resolveUrl(this.options.baseUrl, href);
        }
        try {
            href = encodeURI(href).replace(/%25/g, "%");
        } catch (e) {
            return text;
        }
        //var out = '<a href="' + escape(href) + '"';
        //TODO: That should be escaped?
        var out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
    }
}

// Cache renderer between marked invocations.
function getMarkedWithRenderer(stuff) {
    return marked(stuff, { renderer: new Renderer() });
}

global.marked = getMarkedWithRenderer;
global.moment = moment;
global._ = _;
global.localdev = argv.serve !== undefined;

process.env.DEBUG = "metalsmith-timer";

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
            } else if (Array.from(v.collection).includes("use")) {
                if (files[k].layout === undefined) {
                    files[k].layout = "use.pug";
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

let ms = metalsmith(__dirname)
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
            use: {
                pattern: "use/*/*.md",
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
    .use(
        require("metalsmith-filepath")({
            absolute: true,
            permalinks: true
        })
    )
    .use(timer("metalsmith-filepath"))
    .use(
        require("metalsmith-layouts")({
            default: "default.pug",
            pattern: "**/*.html",
            engineOptions: {
                cache: true,
                globals: ["moment", "marked", "_", "localdev"]
            }
        })
    )
    .use(timer("metalsmith-layouts"))
    .use(file_staging)
    .use(timer("file staging"));

if (argv.serve) {
    ms.use(require("metalsmith-serve")({ port: 8080 }));
}

if (argv.check) {
    ms.use(
        require("metalsmith-broken-link-checker")({
            allowRedirects: true,
            warn: true
        })
    );
}

if (argv.watch) {
    ms.use(
        require("metalsmith-watch")({
            paths: {
                "${source}/**/*": true,
                "layouts/**/*": "**/*.md"
            }
        })
    );
    ms.use(
        require("metalsmith-serve")({
            port: 8080,
            host: "0.0.0.0"
        })
    );
}

ms.build(function(e) {
    if (e) {
        throw e;
    } else {
        return console.log("Done");
    }
});
