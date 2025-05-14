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
const { cloneDeep } = require("lodash");
const { imageType } = require("gridsome/lib/graphql/types/image");
const { repr, rmPrefix, rmSuffix, getType, matchesPrefixes } = require("./src/lib/utils.js");
const { subsiteFromPath, getPathPrefix } = require("./src/lib/site.js");
const CONFIG = require("./config.json");
// All normal article types which should be grouped into ParentArticles.
const ARTICLE_TYPES = ["ParentArticle", "Article", "VueArticle"];
const COLLECTION_TYPES = {
    Article: "md",
    VueArticle: "vue",
};
Object.entries(CONFIG.collections).forEach(([name, meta]) => {
    COLLECTION_TYPES[name] = meta.type;
});

const COMPILE_DATE = dayjs();
const IMAGE_REGISTRY = new Set();
const IMAGE_PREFIX_WHITELIST = ["images/", "https://", "http://"];
const JSONFEED_DAYS_AGO_LIMIT = 30;

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
    let collectionType = COLLECTION_TYPES[node.internal.typeName];
    let buildDir = path.join(__dirname, CONFIG.build.dirs[collectionType]);
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
        console.error(node.path + repr`: Image not found: ${node.image}`);
        return {};
    }
    let relImgPathFromContent = path.relative(buildDir, imgPath);
    if (IMAGE_REGISTRY.has(relImgPathFromContent)) {
        console.log(node.path + repr`: Image ${relImgPathFromContent} already in asset store.`);
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

function getMainSubsite(rawMainSubsite, pagePath) {
    let mainSubsite = undefined;
    // Use any (valid) user-defined `main_subsite`.
    if (rawMainSubsite) {
        if (CONFIG.subsites.all[rawMainSubsite]) {
            mainSubsite = rawMainSubsite;
        } else {
            console.error(pagePath + repr`: main_subsite ${rawMainSubsite} not recognized.`);
        }
    }
    // Otherwise, use any path-derived subsite.
    if (!mainSubsite) {
        mainSubsite = subsiteFromPath(pagePath);
    }
    return mainSubsite;
}

function getSubsites(rawSubsites, mainSubsite, pagePath) {
    let type = getType(rawSubsites);
    let subsites;
    if (type === "Array") {
        subsites = rawSubsites;
    } else if (type === "String") {
        // If there's a single subsite, allow authors to forget the enclosing braces (leaving it a String).
        console.warn(`${pagePath}: Subsite \`${rawSubsites}\` better written as \`["${rawSubsites}"]\``);
        subsites = [rawSubsites];
    } else if (rawSubsites) {
        console.error(`${pagePath}: Invalid type (${type}) for "subsites" key "${repr(rawSubsites)}"`);
        return [];
    } else {
        // For files with no "subsites" key, `node.subsites` will be `undefined`. Translate this to an empty list.
        subsites = [];
    }
    let subsitesSet = new Set();
    if (mainSubsite) {
        subsitesSet.add(mainSubsite);
    }
    // Add any subsites from the author-written `subsites` yaml key. Translate any shorthands first.
    for (let subsite of subsites) {
        let shorthandSubsites = CONFIG.subsites.shorthands[subsite];
        if (shorthandSubsites) {
            // It's a shorthand. Add all the subsites it stands for.
            shorthandSubsites.forEach((translated) => subsitesSet.add(translated));
        } else if (CONFIG.subsites.all[subsite]) {
            // It's an actual subsite. Just add it to the list.
            subsitesSet.add(subsite);
        } else {
            console.error(pagePath + repr`: Subsite ${subsite} in subsites list not recognized.`);
        }
    }
    // Store the Set of unique subsites to the `subsites` field as an Array.
    return Array.from(subsitesSet);
}

class nodeModifier {
    static processNewNode(node, collection, api) {
        let typeName = node.internal.typeName;
        node.filename = node.fileInfo.name;
        if (this.collectionProcessors[typeName]) {
            node = this.collectionProcessors[typeName](node);
        }
        if (node === null) {
            return node;
        }
        // Process all regular, Markdown-based collections except Inserts.
        // Ones with no entry in COLLECTION_TYPES aren't regular, Markdown-based collections.
        if (typeName !== "Insert" && COLLECTION_TYPES[typeName]) {
            node = this.processNonInsert(node);
        }
        if (COLLECTION_TYPES[typeName] === "vue") {
            node = this.processVueType(node, collection);
        }
        // Create a ParentArticle and copy all data for this article into it.
        // This should go last or it won't get the final versions of all the metadata values.
        if (ARTICLE_TYPES.includes(typeName) && typeName !== "ParentArticle") {
            node = this.processArticleType(node, typeName, api);
        }
        return node;
    }
    static processNonInsert(node) {
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
        // Assign a main subsite (if any).
        node.main_subsite = getMainSubsite(node.main_subsite, node.path);
        // Assign subsites.
        node.subsites = getSubsites(node.subsites, node.main_subsite, node.path);
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
        // Patch old location metadata fields into new, structured fields.
        if (node.location_url) {
            node.location = node.location || {};
            node.location.url = node.location_url;
        }
        return node;
    }
    static processArticleType(node, typeName, api) {
        api.loadSource((actions) => {
            let parentArticles = actions.getCollection("ParentArticle");
            let newNode = {
                source_type: typeName,
                internal: {
                    origin: node.internal.origin,
                    mimeType: node.internal.mimeType,
                    // If you include the `content` too, the node appears to get re-parsed and ends up
                    // with the original metadata values (before the edits done by `processNonInsert()`).
                },
            };
            for (let [key, value] of Object.entries(node)) {
                if (!(key.startsWith("$") || key === "id" || key === "internal")) {
                    newNode[key] = cloneDeep(value);
                }
            }
            parentArticles.addNode(newNode);
        });
        return node;
    }
    static processVueType(node, collection) {
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
                console.error(node.path + repr`: Failed to find Insert ${path}`);
            }
        }
        return node;
    }
    static collectionProcessors = {
        // Actions to take for specific collections.
        Insert: function (node) {
            node.name = rmSuffix(rmPrefix(node.path, "/insert:"), "/");
            return node;
        },
        Dataset: function (node) {
            let pathParts = node.path.split("/");
            if (!node.path.startsWith("/dataset:")) {
                console.error(`Dataset path doesn't start with /dataset: (${node.path})`);
            }
            node.subsites = [];
            // Special handling for different types of Datasets.
            // Navbar definitions:
            if (node.filename === "navbar") {
                if (pathParts.length === 4) {
                    // In the root directory (e.g. `content/navbar.yml` -> `/dataset:/navbar/`).
                    node.main_subsite = CONFIG.subsites.default;
                } else if (pathParts.length === 5 && CONFIG.subsites.all[pathParts[2]]) {
                    // In a top-level directory (e.g. `content/eu/navbar.yml` -> `/dataset:/eu/navbar/`).
                    node.main_subsite = pathParts[2];
                }
                let pathPrefix = getPathPrefix(node.main_subsite);
                let parsedContent = parseNavbarContent(node, pathPrefix);
                Object.assign(node, parsedContent);
            }
            if (node.main_subsite && !node.subsites.includes(node.main_subsite)) {
                node.subsites.push(node.main_subsite);
            }
            return node;
        },
    };
}

/** Turn the raw, human-friendly navbar definition into a structure more easily used in the template. */
function parseNavbarContent(rawContent, pathPrefix) {
    let content = { customized: [] };
    for (let part of ["left", "right"]) {
        content[part] = [];
        if (rawContent[part]) {
            // We need to explictly declare whether each part is customized, or if we should just use the defaults.
            // If we instead took an empty array as being default/uncustomized, authors wouldn't be able to delete all
            // the items in a section.
            // And we can't use null/undefined values because that won't work in the GraphQL schema.
            content.customized.push(part);
            for (let rawItem of rawContent[part]) {
                let item = parseNavbarItem(rawItem, pathPrefix);
                content[part].push(item);
            }
        }
    }
    if (rawContent.style) {
        content.customized.push("style");
        content.style = rawContent.style;
    } else {
        content.style = {};
    }
    return content;
}

function parseNavbarItem(rawItem, pathPrefix) {
    let item = {};
    if (rawItem.target) {
        item.type = "link";
        item.label = rawItem.label;
        if (rawItem.relativeTo === "subsite" && pathPrefix !== undefined) {
            item.to = `${pathPrefix}/${rawItem.target}`;
        } else if (matchesPrefixes(rawItem.target, ["https://", "http://", "mailto:", "ftp:"])) {
            item.href = rawItem.target;
        } else {
            item.to = rawItem.target;
        }
        item.key = `${item.type}:${rawItem.relativeTo}:${rawItem.target}`;
    } else if (rawItem.contents) {
        item.type = "dropdown";
        item.label = rawItem.label;
        item.contents = rawItem.contents.map((subitem) => parseNavbarItem(subitem, pathPrefix));
        item.key = `${item.type}:` + item.contents.map((subitem) => subitem.key).join(":");
    }
    return item;
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
        actions.addCollection({
            typeName: "ParentArticle",
        });
        for (let type of ARTICLE_TYPES) {
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
                }),
            );
        }
        let collections = ARTICLE_TYPES.concat(Object.keys(CONFIG.collections));
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
        actions.addSchemaTypes(
            actions.schema.createObjectType({
                name: "Dataset",
                interfaces: ["Node"],
                extensions: { infer: true },
                fields: {
                    subsites: "[String]",
                    main_subsite: "String",
                },
            }),
        );
    });

    // Populate the derived fields.
    api.onCreateNode((node, collection) => {
        return nodeModifier.processNewNode(node, collection, api);
    });

    // Programmatically generate repetitive pages.
    api.createPages(({ createPage }) => {
        // Using the Pages API: https://gridsome.org/docs/pages-api/
        // Tagged subsets of events.
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
        // Pages repeated across every subsite.
        for (let subsite of Object.keys(CONFIG.subsites.all)) {
            // subsite provides it's own pages/routes
            if (CONFIG.subsites.all[subsite].custom) {
                continue;
            }

            let prefix;
            if (subsite === CONFIG.subsites.default) {
                prefix = "";
            } else {
                prefix = `/${subsite}`;
            }
            for (let [vueName, path] of [
                ["SubsiteHome", "/"],
                ["News", "/news/"],
                ["Events", "/events/"],
                ["EventsArchive", "/events/archive/"],
            ]) {
                if (
                    // The site-wide homepage is manually written, not auto-generated.
                    (subsite === CONFIG.subsites.default && path === "/") ||
                    // Don't generate pages for externally hosted sites.
                    CONFIG.subsites.all[subsite].external
                ) {
                    continue;
                }
                createPage({
                    path: `${prefix}${path}`,
                    component: `./src/components/pages/${vueName}.vue`,
                    context: {
                        subsite: subsite,
                        insertRegex: `^/insert:${prefix}${path}[^/]+/$`,
                        cardsPath: `/insert:${prefix}${path}cards/`,
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
    let eventsData;
    let newsData;
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

        eventsData = await graphql(`
            query {
                allParentArticle(filter: { category: { eq: "events" } }) {
                    totalCount
                    edges {
                        node {
                            id
                            title
                            tease
                            subsites
                            location {
                                name
                            }
                            continent
                            contact
                            external_url
                            gtn
                            links {
                                text
                                url
                            }
                            date(format: "D MMMM YYYY")
                            draft
                            days
                            days_ago
                            path
                        }
                    }
                }
            }
        `);

        newsData = await graphql(`
            query {
                allParentArticle(filter: { category: { eq: "news" } }) {
                    totalCount
                    edges {
                        node {
                            id
                            title
                            tease
                            days_ago
                            date(format: "D MMMM YYYY")
                            subsites
                            main_subsite
                            tags
                            contact
                            image
                            authors
                            authors_structured {
                                github
                            }
                            external_url
                            path
                        }
                    }
                }
            }
        `);
    });

    api.configureServer(async (app) => {
        // Serve JSON feeds from develop server
        app.get("/use/feed.json", (request, response) => {
            response.set("Content-Type", "application/json");
            response.send(makePlatformsJson(platformsData));
        });

        app.get("/events/feed.json", (request, response) => {
            response.set("Content-Type", "application/json");
            response.send(makeEventsJson(eventsData));
        });

        app.get("/news/feed.json", (request, response) => {
            response.set("Content-Type", "application/json");
            response.send(makeNewsJson(newsData));
        });
    });

    api.afterBuild(async () => {
        // Write all Platforms to /use/feed.json.
        const useOutDir = path.join(__dirname, "dist", "use");
        fs.mkdirSync(useOutDir, { recursive: true });
        const useFeedPath = path.join(useOutDir, "feed.json");
        fs.writeFile(useFeedPath, makePlatformsJson(platformsData), (error) => {
            if (error) throw error;
        });

        // Write all events to /events/calendar.ics
        const eventsOutDir = path.join(__dirname, "dist", "events");
        fs.mkdirSync(eventsOutDir, { recursive: true });
        const calPath = path.join(eventsOutDir, "calendar.ics");
        const cal = makeCalendar(eventsData);
        fs.writeFile(calPath, cal, (error) => {
            if (error) throw error;
        });

        // Write out events JSON to /events/feed.json
        const eventFeedPath = path.join(eventsOutDir, "feed.json");
        fs.writeFile(eventFeedPath, makeEventsJson(eventsData), (error) => {
            if (error) throw error;
        });

        // Write out events JSON to /events/feed.json
        const newsOutDir = path.join(__dirname, "dist", "news");
        fs.mkdirSync(newsOutDir, { recursive: true });
        const newsFeedPath = path.join(newsOutDir, "feed.json");
        fs.writeFile(newsFeedPath, makeNewsJson(newsData), (error) => {
            if (error) throw error;
        });
    });
};

function makeCalendar(eventsData) {
    let events = [];
    for (let event of eventsData.data.allParentArticle.edges) {
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
            if (event.location?.name) {
                evt.location = event.location.name;
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

function makeEventsJson(eventsData) {
    const events = eventsData.data.allParentArticle.edges
        .filter((article) => article.node.days_ago && article.node.days_ago < JSONFEED_DAYS_AGO_LIMIT)
        .map((edge) => edge.node);
    const data = {
        count: events.length,
        events: events,
    };
    return JSON.stringify(data, null, "  ");
}

function makeNewsJson(newsData) {
    const news = newsData.data.allParentArticle.edges
        .filter((article) => article.node.days_ago && article.node.days_ago < JSONFEED_DAYS_AGO_LIMIT)
        .map((edge) => edge.node);
    const data = {
        count: news.length,
        news: news,
    };
    return JSON.stringify(data, null, "  ");
}
