// Functions used in dynamic pages (`src/pages/*.vue` and `src/components/pages/*.vue`).

import utils from "./utils.js";
// Kludge for an issue (probably) with webpack.
const { repr, rmSuffix } = utils;

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

export function gatherCollections(page) {
    let collections = {};
    for (let [category, value] of Object.entries(page)) {
        if (value && value.edges) {
            collections[category] = value.edges.map((edge) => edge.node);
        }
    }
    return collections;
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
        cardData.width = (width * 12) / rowWidth;
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
