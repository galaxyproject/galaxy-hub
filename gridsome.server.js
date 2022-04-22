// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
var toArray = require("dayjs/plugin/toArray");
dayjs.extend(toArray);
const ics = require("ics");
const { imageType } = require("gridsome/lib/graphql/types/image");
const {
    repr,
    rmPrefix,
    rmSuffix,
    getType,
    matchesPrefixes,
    subsiteFromPath,
    flattenSubsites,
} = require("./src/utils.js");
const CONFIG = require("./config.json");
const SUBSITES_LIST = flattenSubsites(CONFIG.subsites.hierarchy);

const COMPILE_DATE = dayjs();
const IMAGE_REGISTRY = new Set();
const IMAGE_PREFIX_WHITELIST = ["images/", "https://", "http://"];

function categorize(pathParts) {
    /** Take a `pathParts` made by splitting the path on `"/"` and return a category:
     *  ```
     *  let path = "/events/2017-02-globus/"
     *  let pathParts = path.split("/")        // [ "", "events", "2017-02-globus", "" ]
     *  let category = categorize(pathParts)   // "events"
     *  ```
     */
    //TODO: Allow trailing slashes in category paths.
    let keyParts = pathParts.slice(0, pathParts.length - 2);
    let key = keyParts.join("/");
    let category = CONFIG.categories[key];
    if (category === undefined) {
        return null;
    } else {
        return category;
    }
}

function findInsertsInMarkdown(content) {
    /** Parse Markdown content and extract the names of all inserts in `<slot>`s. */
    //TODO: Replace this monstrosity with actual Markdown parsing.
    //      Or do this in the preprocessing steps where we parse it all anyway.
    //      Could just add an "inserts" key to the yaml header.
    let matches = Array.from(content.matchAll(/<slot\s*name=["']?([^"']+)["']?\s*\/?>/gi));
    return matches.map((match) => match[1]);
}

// Based on https://github.com/gridsome/gridsome/issues/292#issuecomment-483347365
async function resolveImages(node, args, context, info) {
    /** Add any image found in the `image` metadata key to the asset store. */
    if (!node.image) {
        return {};
    }
    let buildDir;
    if (node.internal.typeName === "VueArticle") {
        buildDir = path.join(__dirname, CONFIG.build.dirs.vue);
    } else {
        buildDir = path.join(__dirname, CONFIG.build.dirs.md);
    }
    let dirPath = path.join(buildDir, node.path);
    if (!fs.existsSync(dirPath)) {
        console.error(`Directory not found: ${dirPath}`);
        return {};
    }
    let relImgPath = rmPrefix(rmPrefix(node.image, "/src"), "/");
    // Images in the static directory are already available by default.
    // They don't need to be added to the asset store.
    // Also, external images obviously don't need to be added.
    if (matchesPrefixes(relImgPath, IMAGE_PREFIX_WHITELIST)) {
        return {};
    }
    let candidates = [path.join(dirPath, relImgPath), path.join(buildDir, relImgPath)];
    let imgPath;
    for (let candidate of candidates) {
        if (fs.existsSync(candidate)) {
            imgPath = candidate;
        }
    }
    if (!imgPath) {
        console.error(repr`Image not found: ${node.image}`);
        return {};
    }
    let relImgPathFromContent = path.relative(buildDir, imgPath);
    if (IMAGE_REGISTRY.has(relImgPathFromContent)) {
        console.log(repr`Image ${relImgPathFromContent} already in asset store.`);
    }
    let images = addImage(imgPath, args, context);
    if (images) {
        IMAGE_REGISTRY.add(relImgPathFromContent);
        return images;
    } else {
        return {};
    }
}

async function addImage(imgPath, args, context) {
    let images = {};
    let filename = path.basename(imgPath);
    let result;
    try {
        result = await context.assets.add(imgPath, args);
    } catch (error) {
        console.error(error);
        return null;
    }
    let imgData = {};
    for (let attr of ["type", "mimeType", "src", "size", "sizes", "srcset", "dataUri"]) {
        imgData[attr] = result[attr];
    }
    if (result.type !== "image") {
        let fileType = result.mimeType || "non-image";
        console.log(`Saw ${fileType} ${repr(filename)}`);
        if (result.type !== "file") {
            console.error(repr`  result.type for ${filename} is ${result.type}`);
        }
        return null;
    }
    if (filename !== result.name + result.ext) {
        console.error(repr`Error: ${filename} !== ${result.name + result.ext}`);
        return null;
    }
    images[filename] = imgData;
    return images;
}

class nodeModifier {
    static processNewNode(node, collection, typeName) {
        if (this.collectionProcessors[typeName]) {
            node = this.collectionProcessors[typeName](node, collection);
        }
        if (node === null) {
            return node;
        }
        if (typeName !== "Insert") {
            node = this.processNonInsert(node, collection, typeName);
        }
        return node;
    }
    static processNonInsert(node, collection, typeName) {
        if (node.filename !== "index") {
            // All Markdown files should be named `index.md`, unless it's an `Insert`.
            // `vue-remark` doesn't offer enough filtering to exclude non-index.md files from collection
            // configurations, so we have to exclude them here.
            return null;
        }
        // Categorize by path.
        let pathParts = node.path.split("/");
        node.category = categorize(pathParts);
        if (node.category === "careers") {
            if (node.closes && COMPILE_DATE.diff(node.closes, "day") > 0) {
                node.closed = true;
            } else {
                node.closed = false;
            }
        }
        // Assign subsites.
        let type = getType(node.subsites);
        let subsitesRaw = node.subsites;
        if (type === "Array") {
            subsitesRaw = node.subsites;
        } else if (type === "String") {
            subsitesRaw = [node.subsites];
        } else if (node.subsites) {
            console.error(repr`Invalid type for "subsites" key in ${node.path}: ${node.subsites}`);
        } else {
            // For files with no "subsites" key, `node.subsites` will be `undefined`. Translate this to an empty list.
            subsitesRaw = [];
        }
        let subsitesSet = new Set();
        // Add any path-derived subsite.
        node.main_subsite = subsiteFromPath(node.path);
        if (node.main_subsite) {
            subsitesSet.add(node.main_subsite);
        }
        // Add any subsites from the author-written `subsites` yaml key. Translate any shorthands first.
        for (let subsite of subsitesRaw) {
            let shorthandSubsites = CONFIG.subsites.shorthands[subsite];
            if (shorthandSubsites) {
                // It's a shorthand. Add all the subsites it stands for.
                for (let shorthandSubsite of shorthandSubsites) {
                    subsitesSet.add(shorthandSubsite);
                }
            } else {
                // It's an actual subsite. Just add it to the list.
                subsitesSet.add(subsite);
            }
        }
        // Store the Set of unique subsites to the `subsites` field as an Array.
        node.subsites = Array.from(subsitesSet);
        // Label ones with dates.
        // This gets around the inability of the GraphQL schema to query on null/empty dates.
        if (node.date) {
            node.has_date = true;
            // Set the end date: `date + days - 1`, or just the `date` if there's no `days`.
            if (node.days) {
                let startDate = dayjs(node.date);
                let endDate = startDate.add(node.days - 1, "day");
                node.end = new Date(endDate);
            } else {
                node.end = node.date;
            }
            // days_ago
            node.days_ago = COMPILE_DATE.diff(node.end, "day");
            if (node.end > COMPILE_DATE) {
                node.days_ago -= 1;
            }
        } else {
            node.has_date = false;
        }
        return node;
    }
    static collectionProcessors = {
        Article: function (node) {
            // Currently nothing Article-specific.
            return node;
        },
        VueArticle: function (node, collection) {
            // Find and link Inserts.
            // Note: `._store` is technically not a stable API, but it's unlikely to go away and there's
            // almost no other way to do this.
            const store = collection._store;
            const insertCollection = store.getCollection("Insert");
            node.inserts = [];
            for (let insertName of findInsertsInMarkdown(node.content)) {
                let path = `/insert:${insertName}/`;
                let insert = insertCollection.findNode({ path: path });
                if (insert) {
                    node.inserts.push(store.createReference(insert));
                } else {
                    console.error(repr`Failed to find Insert for path ${path} in ${node.path}`);
                }
            }
            return node;
        },
        Insert: function (node) {
            node.name = rmSuffix(rmPrefix(node.path, "/insert:"), "/");
            return node;
        },
    };
}

module.exports = function (api) {
    api.loadSource((actions) => {
        // Using the Data Store API: https://gridsome.org/docs/data-store-api/
        // Add derived fields like `category`.
        /*TODO: Replace this and the later api.onCreateNode() call with this technique instead:
         *      https://gridsome.org/docs/schema-api/#add-a-new-field-with-a-custom-resolver
         *      This currently causes problems because a bug prevents you from filtering based on fields
         *      added this way: https://github.com/gridsome/gridsome/issues/1196
         *      This is supposed to be fixed by Gridsome 1.0.
         */
        const articleTypes = ["Article", "VueArticle"];
        for (let type of articleTypes) {
            actions.addSchemaTypes(
                actions.schema.createObjectType({
                    name: type,
                    interfaces: ["Node"],
                    extensions: { infer: true },
                    fields: {
                        subsites: "[String]",
                        main_subsite: "String",
                        category: "String",
                        has_date: "Boolean",
                        end: "Date",
                        days_ago: "Int",
                        closed: "Boolean",
                    },
                })
            );
        }
        let collections = articleTypes.concat(Object.keys(CONFIG.collections));
        let schemas = {};
        for (let collection of collections) {
            schemas[collection] = {
                images: {
                    type: imageType.type,
                    args: imageType.args,
                    resolve: resolveImages,
                },
            };
        }
        actions.addSchemaResolvers(schemas);
    });

    // Populate the derived fields.
    api.onCreateNode((node, collection) => {
        let typeName = node.internal.typeName;
        node.filename = node.fileInfo.name;
        return nodeModifier.processNewNode(node, collection, typeName);
    });

    // Programmatically generate repetitive pages.
    // Tagged subsets of events.
    api.createPages(({ createPage }) => {
        for (let page of CONFIG.taggedEventsPages) {
            createPage({
                path: page.path,
                component: "./src/components/pages/TaggedEvents.vue",
                context: {
                    tag: page.tag,
                    mainPath: `/insert:${page.path}main/`,
                    footerPath: `/insert:${page.path}footer/`,
                },
            });
        }
    });
    // Pages repeated across every subsite.
    api.createPages(({ createPage }) => {
        // Using the Pages API: https://gridsome.org/docs/pages-api/
        for (let [vueName, path] of [
            ["Events", "/events/"],
            ["News", "/news/"],
        ]) {
            for (let subsite of SUBSITES_LIST) {
                let prefix;
                if (subsite === "global") {
                    prefix = "";
                } else {
                    prefix = `/${subsite}`;
                }
                createPage({
                    path: `${prefix}${path}`,
                    component: `./src/components/pages/${vueName}.vue`,
                    context: {
                        subsite: subsite,
                        mainPath: `/insert:${prefix}${path}main/`,
                        footerPath: `/insert:${prefix}${path}footer/`,
                    },
                });
            }
        }
    });

    // Workaround for lack of access to GraphQL in `afterBuild()` hook.
    // Taken from https://github.com/gridsome/gridsome/issues/1390#issuecomment-748792934
    let platformsData;
    api.createPages(async ({ graphql }) => {
        platformsData = await graphql(`
            query {
                platforms: allPlatform(sortBy: "title", order: ASC) {
                    totalCount
                    edges {
                        node {
                            id
                            url
                            path
                            title
                            image
                            scope
                            summary
                            comments
                            user_support
                            quotas
                            citations
                            pub_libraries
                            sponsors
                            platforms {
                                platform_group
                                platform_url
                                platform_text
                                platform_location
                                platform_purview
                            }
                        }
                    }
                }
            }
        `);
    });

    let eventsData;
    api.createPages(async ({ graphql }) => {
        eventsData = await graphql(`
            query {
                allArticle(filter: { category: { eq: "events" } }) {
                    totalCount
                    edges {
                        node {
                            id
                            title
                            tease
                            location
                            location_url
                            continent
                            contact
                            external_url
                            gtn
                            links {
                                text
                                url
                            }
                            date(format: "D MMMM YYYY")
                            days
                            path
                        }
                    }
                }
            }
        `);
    });

    api.configureServer(async (app) => {
        // Serve /use/feed.json from develop server.
        app.get("/use/feed.json", (request, response) => {
            response.set("Content-Type", "application/json");
            response.send(makePlatformsJson(platformsData));
        });
    });

    api.afterBuild(async () => {
        // Write all Platforms to /use/feed.json.
        let outDir = path.join(__dirname, "dist", "use");
        fs.mkdirSync(outDir, { recursive: true });
        let feedPath = path.join(outDir, "feed.json");
        fs.writeFile(feedPath, makePlatformsJson(platformsData), (error) => {
            if (error) throw error;
        });

        // Write all events to /events/calendar.ics
        let eventsOutDir = path.join(__dirname, "dist", "events");
        fs.mkdirSync(eventsOutDir, { recursive: true });
        let calPath = path.join(eventsOutDir, "calendar.ics");
        let cal = makeCalendar(eventsData);
        fs.writeFile(calPath, cal, (error) => {
            if (error) throw error;
        });
    });
};

function makeCalendar(eventsData) {
    let events = [];
    for (let event of eventsData.data.allArticle.edges) {
        event = event.node;
        if (event.date) {
            const evt = {};
            const start = dayjs(event.date);
            const end = start.add(event.days || 1, "day");
            // This is so dumb, but month is 0-based in dayjs
            evt.start = start.toArray().slice(0, 3);
            evt.start[1] += 1;
            evt.end = end.toArray().slice(0, 3);
            evt.end[1] += 1;
            evt.title = event.title;
            if (event.location) {
                evt.location = event.location;
            }
            if (event.external_url) {
                if (event.external_url.startsWith("/")) {
                    // event's external_url isn't actually external, it's just somewhere else on the site
                    evt.url = `https://${CONFIG.host}${event.external_url}`;
                } else {
                    evt.url = event.external_url;
                }
            } else {
                evt.url = `https://${CONFIG.host}${event.path}`;
            }
            evt.description = event.tease ? `${event.tease}\n\n` : "";
            // Google calendar handles event links poorly; embed in description as well
            evt.description += `Event Link:\n${evt.url}`;

            events.push(evt);
        }
    }
    const { error, value } = ics.createEvents(events);
    if (error) {
        console.error("Error creating calendar:", error);
    }
    return value;
}

function makePlatformsJson(platformsData) {
    let platforms = platformsData.data.platforms.edges.map((edge) => {
        // Massage fields a little for backward compatibility.
        let node = edge.node;
        node.link = rmSuffix(node.path, "/");
        node.path = path.join(rmPrefix(node.path, "/"), "index.md");
        return node;
    });
    return JSON.stringify(platforms, null, "  ");
}
