// Functions used in dynamic pages (`src/pages/*.vue` and `src/components/pages/*.vue`).

import utils from "./utils.js";
// Kludge for an issue (probably) with webpack.
const { repr, rmSuffix, shrinkWrap } = utils;

export function getImage(imagePath, images) {
    if (!imagePath) {
        return imagePath;
    }
    if (imagePath.startsWith("/src/images/")) {
        return imagePath.substring(4);
    } else if (imagePath.startsWith("/images/")) {
        return imagePath;
    }
    let fields = imagePath.split("/");
    let filename = fields[fields.length - 1];
    let assetPath = images[filename];
    if (!assetPath) {
        console.error(repr`Image ${filename} not found in asset store.`);
        return imagePath;
    }
    return assetPath;
}

export function hasContent(item) {
    return Boolean(item && item.content && item.content.trim());
}

export function addTocClass(classes, article) {
    if (article.autotoc === true) {
        classes.push("toc");
    } else if (article.autotoc === false) {
        classes.push("notoc");
    }
}

export function gatherInserts(allInsert) {
    let inserts = {};
    for (let insert of allInsert.edges.map((edge) => edge.node)) {
        let parts = insert.path.split("/");
        if (parts.length < 4 || parts[0] !== "" || parts[1] !== "insert:" || parts[parts.length - 1] !== "") {
            throw repr`Error: Insert has invalid path ${insert.path}`;
        }
        let name = parts[parts.length - 2];
        inserts[name] = insert;
    }
    return inserts;
}

/** Find the values returned from the GraphQL query which are collections of multiple objects
 * (anything with an `edges` property), and bundle them into Arrays of nodes.
 */
export function gatherCollections(page) {
    let collections = {};
    for (let [category, value] of Object.entries(page)) {
        if (value && value.edges) {
            collections[category] = value.edges.map((edge) => edge.node);
        }
    }
    return collections;
}

/** Look through the Inserts and find "bundles" of related ones.
 * A "bundle" is a group of Inserts whose name has the same prefix, followed by an integer.
 * The integer is optional, but only if the name matches one given with the `bundleNames` parameter.
 * Bundles will be grouped into arrays in the order of their ending integers.
 * @param {Object} inserts An object holding the insert objects, keyed by their names.
 * @param {Array} [bundleNames=[]]
 * @returns {Object} An object whose keys are the bundle names (the prefixes), and whose values are arrays.
 *     Each array holds a list of Insert objects, ordered by the integers at the ends of their names.
 *     Inserts without an ending integer will be placed at the start of its array.
 *     Also, empty slots will be removed from the arrays. All of this means the index of an insert in the array will not
 *     necessarily be the same as its ending integer. E.g. if you have `main.md`, `main1.md`, and `main4.md`, you will
 *     end up with an array with those 3 inserts at indices 0, 1, and 2, respectively.
 *     Empty Inserts (judged by `hasContent()`) will be ignored and not included in the bundles.
 */
export function bundleInserts(inserts, bundleNames = []) {
    let bundles = {};
    for (let [name, value] of Object.entries(inserts)) {
        if (!hasContent(value)) {
            continue;
        }
        let bundleName, index;
        if (bundleNames.includes(name)) {
            bundleName = name;
        } else {
            // Look for a name that ends in an integer.
            let match = name.match(/^(.*[^\d])(\d+)$/);
            if (match) {
                bundleName = match[1];
                let indexStr = match[2];
                index = parseInt(indexStr);
            }
        }
        if (bundleName) {
            let bundle = bundles[bundleName];
            if (!bundle) {
                bundle = [];
                bundles[bundleName] = bundle;
            }
            if (index === undefined) {
                // We allow insert names without an index, like `main.md`.
                bundle.noIndex = value;
            } else {
                bundle[index] = value;
            }
        }
    }
    // Push the index-less inserts onto the front of each bundle array.
    // We do this at the end to not mess up the indexing.
    for (let bundle of Object.values(bundles)) {
        if (bundle.noIndex) {
            bundle.unshift(bundle.noIndex);
        }
        shrinkWrap(bundle);
    }
    return bundles;
}

// Managing homepage cards

export function gatherCards(inserts) {
    let cards = {};
    if (!inserts) {
        return cards;
    }
    for (let [name, insert] of Object.entries(inserts)) {
        if (name.endsWith("-card")) {
            let cardName = rmSuffix(name, "-card");
            cards[cardName] = insert;
        }
    }
    return cards;
}

export function makeCardRows(cardsMetadata, latest, cardsData, prefix = "", rowWidth = 3) {
    let rows = [];
    if (!cardsMetadata) {
        return rows;
    }
    let row = [];
    let remaining = rowWidth;
    for (let card of cardsMetadata.list) {
        let cardData;
        if (card.type === "dynamic") {
            let items = latest[card.name];
            if (items) {
                cardData = { items: items };
                Object.assign(cardData, card);
                if (!cardData.link && card.path) {
                    cardData.link = prefix + card.path;
                }
            } else {
                console.error(repr`Dynamic card ${card.name} listed but no data found in GraphQL query.`);
            }
        } else if (card.type === "static") {
            cardData = cardsData[card.name];
            // The card may not exist, which is okay. The user should be able to list the order of all possible cards,
            // and whichever ones are present (have a Markdown file) will show up.
        }
        if (!cardData) {
            continue;
        }
        let width = card.width || 1;
        // Standard Bootstrap row width is 12.
        cardData.width = Math.round((width * 12) / rowWidth);
        row.push(cardData);
        remaining -= width;
        if (remaining <= 0) {
            rows.push(row);
            row = [];
            remaining = rowWidth;
        }
    }
    if (row.length > 0) {
        rows.push(row);
    }
    return rows;
}
