// Functions specific to the structure of the Hub.
const { repr, getType } = require("./utils.js");
const CONFIG = require("../../config.json");

const SUBSITES_LIST = flattenSubsites(CONFIG.subsites.hierarchy);

/** Take the value of the `subsites` key in config.json and flatten it into an array.
 * @param {Object} subsitesTree The value of the `subsites` key. Must be a tree of objects where
 *   the value for each key is another object.
 * @returns {Array} An array containing a list of all keys found in the tree.
 */
function flattenSubsites(subsitesTree) {
    let subsites = [];
    for (let [subsite, subtree] of Object.entries(subsitesTree)) {
        if (getType(subtree) !== "Object") {
            throw repr`Value in subsites config tree not an object: ${subtree}`;
        }
        subsites.push(subsite);
        let subsubsites = flattenSubsites(subtree);
        subsites = subsites.concat(subsubsites);
    }
    return subsites;
}
module.exports.flattenSubsites = flattenSubsites;

function subsiteFromPath(path) {
    let pathParts = path.split("/");
    for (let candidate of SUBSITES_LIST) {
        if (pathParts[0] === candidate || (pathParts[0] === "" && pathParts[1] === candidate)) {
            return candidate;
        }
    }
}
module.exports.subsiteFromPath = subsiteFromPath;
