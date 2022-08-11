// Functions specific to the structure of the Hub.
const CONFIG = require("../../config.json");

function subsiteFromPath(path) {
    let pathParts = path.split("/");
    for (let candidate of Object.keys(CONFIG.subsites.all)) {
        if (pathParts[0] === candidate || (pathParts[0] === "" && pathParts[1] === candidate)) {
            return candidate;
        }
    }
}
module.exports.subsiteFromPath = subsiteFromPath;
