// Functions specific to the structure of the Hub.
const { filterKeys } = require("./utils.js");
const CONFIG = require("../../config.json");

function getRootSubsite() {
    let defaults = filterKeys(CONFIG.subsites.all, (subsite) => subsite.default);
    if (defaults.length === 1) {
        return defaults[0];
    } else {
        console.error(
            `Error: subsites.list in config.json must have a single root subsite. Found ${defaults.length} instead.`
        );
    }
}
module.exports.getRootSubsite = getRootSubsite;

function subsiteFromPath(path) {
    let pathParts = path.split("/");
    for (let candidate of Object.keys(CONFIG.subsites.all)) {
        if (pathParts[0] === candidate || (pathParts[0] === "" && pathParts[1] === candidate)) {
            return candidate;
        }
    }
}
module.exports.subsiteFromPath = subsiteFromPath;
