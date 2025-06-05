import fs from "fs";
import nodePath from "path";
import { fileURLToPath } from "url";
import grayMatter from "gray-matter";
import { splitlines, repr, ensurePrefix, ensureSuffix } from "../lib/utils.js";
import { PathInfo } from "../lib/paths.mjs";

/** Types of files recognized by this module. */
export const CONTENT_TYPES = ["md", "vue", "insert", "resource"];
const SCRIPT_DIR = nodePath.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = nodePath.dirname(nodePath.dirname(SCRIPT_DIR));
const AUTODETECT_COMPONENTS = [
    "slot",
    "g-image",
    "link-box",
    "vega-embed",
    "calendar-embed",
    "markdown-embed",
    "twitter",
    "video-player",
    "carousel",
];

export class Partitioner {
    /** Create a `Partitioner`.
     * @param {Object}  [options]               Optional parameters.
     * @param {string}  [options.configPath]    Path to the `config.json` file.
     * @param {string}  [options.projectRoot]   Path to the site root directory (where files like
     *   `config.json`, `gridsome.config.js`, and `package.json` live).
     * @param {boolean} [options.simulate=true] If `true`, do not make any actual changes to the
     *   filesystem.
     * @param {boolean} [options.verbose=false] Whether to print extra messages to the console.
     * @param {string}  [options.placer='copy'] The name of a placer function to use for every
     *   content type. Must be one of: `'copy'`, `'link'`.
     * @param {Object}  [options.placers]       A map of content types to placer functions to use.
     *   The keys must be one of the `CONTENT_TYPES` defined here. Values can be either a function
     *   or a string - see the `placer` parameter for valid string values.
     *   These will override the function given in the `placer` option, allowing you to give a
     *   default `placer` then use `placers` to specify an alternate function for specific types.
     */
    constructor(options = {}) {
        let { configPath, projectRoot, simulate, verbose, placer, placers } = updateValues(
            { projectRoot: PROJECT_ROOT, simulate: true, verbose: false, placer: "copy" },
            options
        );
        this.simulate = !!simulate;
        this.verbose = !!verbose;
        this.projectRoot = projectRoot;
        if (!configPath) {
            configPath = nodePath.join(PROJECT_ROOT, "config.json");
        }
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        this.collections = [];
        for (let rawCollection of Object.values(config.collections || {})) {
            // Normalize path to start and end with /
            let path = ensurePrefix(ensureSuffix(rawCollection.path, "/"), "/");
            this.collections.push({ path: path, dest: rawCollection.type });
        }
        this.contentDir = nodePath.join(projectRoot, config.contentDir);
        this.buildDirs = {};
        for (let [key, relPath] of Object.entries(config.build.dirs)) {
            this.buildDirs[key] = nodePath.join(projectRoot, relPath);
        }
        this.placers = assignPlacers(placer, placers, CONTENT_TYPES);
    }

    // The main entry point to the partitioning process.
    placeDirFiles(dirPath, recursive = false) {
        if (!nodePath.isAbsolute(dirPath)) {
            throw repr`dirPath must be absolute. Received: ${dirPath}`;
        }
        let [dirs, indexPath, inserts, resources] = getChildrenByType(dirPath);
        if (recursive) {
            // Execute depth-first - take care of bottom-most directories before their parents.
            for (let childDir of dirs) {
                this.placeDirFiles(childDir, recursive);
            }
        }
        let plan = this.makeDirPlan(indexPath, inserts, resources);
        this.executeDirPlan(dirPath, plan);
        // Delete empty directories.
        // At this point all contents of this directory (all the way down) should already be in the
        // intended final state. So we can delete any directory that doesn't contain any files.
        for (let buildPath of this.getBuildPaths(dirPath)) {
            if (PathInfo.exists(buildPath)) {
                deleteEmptyDirs(buildPath);
            }
        }
    }

    /** Create the state described in the `plan` in the directory given with `dirPath`.
     *  Delete files not present in the final state.
     *  Directories are not touched.
     */
    executeDirPlan(dirPath, plan) {
        // The full set of child paths which should exist in each build directory.
        let childPaths = {};
        for (let contentType of Object.keys(this.buildDirs)) {
            childPaths[contentType] = new Set();
        }
        // Place the files that should exist in the build directory.
        for (let action of plan) {
            let childPath = nodePath.relative(this.contentDir, action.path);
            childPaths[action.dest].add(childPath);
            this.placeContentFile(action.placer, action.path, this.buildDirs[action.dest]);
        }
        // Remove any files which should no longer exist in a given build directory.
        for (let buildPathData of this.getBuildPaths(dirPath, true)) {
            let buildPath = buildPathData.path;
            let dirInfo = new PathInfo(buildPath);
            let buildPathContents;
            if (dirInfo.type() === "dir") {
                buildPathContents = fs.readdirSync(buildPath).map((name) => nodePath.join(buildPath, name));
            } else if (dirInfo.exists()) {
                throw repr`Path ${buildPath} exists but is not a directory.`;
            } else {
                buildPathContents = [];
            }
            for (let buildChildPath of buildPathContents) {
                if (PathInfo.type(buildChildPath) === "dir") {
                    // Directories are handled outside this function.
                    continue;
                }
                let relPath = nodePath.relative(buildPathData.root, buildChildPath);
                if (!childPaths[buildPathData.type].has(relPath)) {
                    if (this.verbose) {
                        console.log(
                            repr`Removing file no longer needed in ${buildPathData.type} directory:\n` +
                                repr`  ${buildChildPath}`
                        );
                    }
                    fs.unlinkSync(buildChildPath);
                }
            }
        }
    }

    handleEvent(eventType, path) {
        if (this.verbose) {
            console.log(repr`Received ${eventType} on ${path}`);
        }
        // The `path` is the full path of the target in the content directory.
        let dirsToCheck = { shallow: [], deep: [] };
        if (eventType === "update") {
            /* An `update` could be:
             * - a new file/dir being created
             * - an existing file being edited
             *   - directories do not emit an `update`, even when their contents are changed
             *   - includes clobbering on the command line (e.g. `>` operator)
             * - a moved file/dir (`path` will be its new location)
             *   - includes a file/dir moved into the watched directory from outside it
             * - a renamed file/dir (`path` will be its new name)
             */
            let pathInfo = new PathInfo(path);
            if (pathInfo.type() === "file") {
                dirsToCheck.shallow.push(nodePath.dirname(path));
            } else if (pathInfo.type() === "dir") {
                dirsToCheck.deep.push(path);
            } else if (pathInfo.exists()) {
                throw repr`Encountered unexpected special file ${path}`;
            } else {
                throw repr`Received an ${eventType} event on nonexistent path ${path}`;
            }
        } else if (eventType === "remove") {
            /* A `remove` could be:
             * - a deleted file/dir
             * - a moved file/dir (`path` will be its old location)
             *   - includes a file/dir moved from the watched directory to outside it
             * - a renamed file/dir (`path` will be its old name)
             */
            // Since `path` no longer exists, we'll have to look at its equivalent in the build directory
            // to get info about what it was. If it was a file, then the build directory will contain
            // either a file or a (broken) link, depending on the placer. If it was a directory, then
            // it should always be directory, not a link.
            let buildPath = this.findBuildPath(path);
            let buildInfo = new PathInfo(buildPath);
            if (buildInfo.type() === "file" || buildInfo.type() === "brokenlink") {
                if (nodePath.extname(path).toLowerCase() === ".md") {
                    // It's a Markdown file, so removing it could affect where its directory should be in the
                    // build.
                    dirsToCheck.shallow.push(nodePath.dirname(path));
                }
            } else if (buildInfo.type() === "dir") {
                // Don't need to do anything extra.
            } else if (buildInfo.exists()) {
                throw repr`Encountered unexpected special file ${path}`;
            } else {
                // Don't throw an error because it could have been a directory which doesn't contain any
                // files. These can legitimately exist in the content directory with no equivalent in the
                // build directories. If one is removed or renamed, we'll end up here.
                console.error(
                    repr`Received a ${eventType} event on a path which doesn't exist in the build directory:
  ${path}`
                );
            }
            this.deleteFromBuild(path);
        }
        for (let dirPath of dirsToCheck.shallow) {
            this.placeDirFiles(dirPath);
        }
        for (let dirPath of dirsToCheck.deep) {
            this.placeDirFiles(dirPath, true);
        }
    }

    placeContentFile(placer, srcFilePath, dstContentDir) {
        let relFilePath = nodePath.relative(this.contentDir, srcFilePath);
        let dstFilePath = nodePath.join(dstContentDir, relFilePath);
        let dstFileDir = nodePath.dirname(dstFilePath);
        fs.mkdirSync(dstFileDir, { recursive: true });
        let dstFileInfo = new PathInfo(dstFilePath);
        if (dstFileInfo.exists() && dstFileInfo.type() !== "file" && dstFileInfo.type() !== "brokenlink") {
            console.error(repr`Path already exists but is not a file: ${dstFilePath}`);
            return;
        }
        placer(srcFilePath, dstFilePath, this.simulate, this.verbose);
    }

    deleteFromBuild(path) {
        for (let buildPath of this.getBuildPaths(path)) {
            let buildPathType = PathInfo.type(buildPath);
            if (buildPathType === "file" || buildPathType === "brokenlink") {
                if (!this.simulate) {
                    fs.unlinkSync(buildPath);
                }
            } else if (buildPathType === "dir") {
                if (!this.simulate) {
                    fs.rmSync(buildPath, { recursive: true });
                }
            } else if (buildPathType !== "nonexistent") {
                throw repr`Cannot remove special file ${buildPath}`;
            }
            if (buildPathType !== "nonexistent") {
                if (this.verbose) {
                    console.log(repr`rm ${buildPath}`);
                }
                // Now that we deleted it, is its parent directory empty? If so, delete that.
                if (!this.simulate) {
                    deleteEmptyDirs(nodePath.dirname(buildPath));
                }
            }
        }
    }

    /** Find the equivalent path in the build directory.
     *  `path` should be an absolute path in the content directory.
     *  Tries the equivalent path in each build directory until it finds one that exists.
     *  Returns `undefined` if none exist.
     */
    findBuildPath(path, extraData = false) {
        for (let buildPathData of this.getBuildPaths(path, extraData)) {
            let buildPath;
            if (extraData) {
                buildPath = buildPathData.path;
            } else {
                buildPath = buildPathData;
            }
            if (PathInfo.exists(buildPath)) {
                return buildPathData;
            }
        }
    }

    /** Translate a path in the content directory into its equivalents in the build directories. */
    getBuildPaths(path, extraData = false) {
        let buildPaths = [];
        let relPath = nodePath.relative(this.contentDir, path);
        for (let [contentType, buildDir] of Object.entries(this.buildDirs)) {
            let buildPath = nodePath.join(buildDir, relPath);
            if (extraData) {
                let pathData = { path: buildPath, type: contentType, root: buildDir };
                buildPaths.push(pathData);
            } else {
                buildPaths.push(buildPath);
            }
        }
        return buildPaths;
    }

    /** Determine what the final state of the files in this directory should be.
     *  What files should be present in which destination directories, and should they be links or
     *  copies?
     *  All paths given must be absolute.
     */
    makeDirPlan(indexPath, inserts, resources) {
        let plan = [];
        let vue = this.indexRequiresVue(indexPath);
        // index.md
        if (!indexPath) {
            // pass
        } else if (vue) {
            plan.push({ path: indexPath, dest: "vue", placer: this.placers.vue });
        } else {
            plan.push({ path: indexPath, dest: "md", placer: this.placers.md });
        }
        // Insert .md files
        for (let insertPath of inserts) {
            plan.push({ path: insertPath, dest: "md", placer: this.placers.insert });
        }
        // Resource files (mainly images)
        // But also 'links.json', etc.
        for (let resourcePath of resources) {
            // Check if the file is used by a Vue-requiring Markdown file.
            //TODO: It's possible a file could be referenced by multiple Markdowns in the same directory.
            //TODO: This is a very loose check for whether the Markdown file references the resource file.
            //      The Markdown file could technically include the name of the resource file without
            //      actually including it in, say, an image element.
            let destination;
            let resourceFileName = nodePath.basename(resourcePath);
            if (vue && fileContainsSubstr(indexPath, resourceFileName)) {
                destination = "vue";
            } else {
                destination = "md";
            }
            plan.push({ path: resourcePath, dest: destination, placer: this.placers.resource });
        }
        return plan;
    }

    indexRequiresVue(indexPath) {
        // If there is no index.md, it probably doesn't require vue!
        if (!indexPath) {
            return false;
        }
        // Check if it's in a top-level directory the user has defined as belonging to a custom collection.
        // These have across-the-board vue or md designations.
        let relIndexPath = nodePath.relative(this.contentDir, indexPath);
        for (let collection of this.collections) {
            if (collection.dest === "vue" && `/${relIndexPath}`.startsWith(collection.path)) {
                return true;
            }
        }
        // Otherwise, read the file to see.
        return fileRequiresVue(indexPath);
    }
}

function getChildrenByType(dirPath) {
    let dirs = [];
    let indexPath;
    let inserts = [];
    let resources = [];
    for (let childName of fs.readdirSync(dirPath)) {
        let childPath = nodePath.join(dirPath, childName);
        let fileInfo = new PathInfo(childPath);
        if (!fileInfo.exists()) {
            console.error(repr`Warning: File ${childPath} not found.`);
            continue;
        }
        if (fileInfo.type() === "dir") {
            dirs.push(childPath);
        } else if (fileInfo.type() === "file") {
            if (childName.toLowerCase() == "index.md") {
                indexPath = childPath;
            } else if (nodePath.extname(childName).toLowerCase() == ".md") {
                inserts.push(childPath);
            } else {
                resources.push(childPath);
            }
        } else {
            console.error(repr`Warning: Special file found: ${childPath}`);
        }
    }
    return [dirs, indexPath, inserts, resources];
}

/** Read the file to see if it requires `vue-remark`.
 *  @returns {boolean} If there's a `components` key in the graymatter, it will return its value (converted to boolean).
 *    Otherwise, it will look in the file contents for the start tags of elements in `AUTODETECT_COMPONENTS`, e.g.
 *    `'<slot'`. If any is found, it will return `true`. Otherwise it returns `false`.
 */
function fileRequiresVue(filePath) {
    let fileContents = fs.readFileSync(filePath, { encoding: "utf8" });
    let { data: metadata, content } = grayMatter(fileContents);
    if (Object.prototype.hasOwnProperty.call(metadata, "components")) {
        return !!metadata.components;
    }
    if (fileContainsTags(content, AUTODETECT_COMPONENTS)) {
        return true;
    }
    return false;
}

function fileContainsTags(fileContents, tags) {
    let queryStrings = tags.map((tag) => `<${tag}`);
    for (let line of splitlines(fileContents)) {
        for (let query of queryStrings) {
            if (line.includes(query)) {
                return true;
            }
        }
    }
    return false;
}

function fileContainsSubstr(filePath, substr) {
    let fileContents = fs.readFileSync(filePath, { encoding: "utf8" });
    return fileContents.includes(substr);
}

/** Delete any empty directories in the tree rooted at `dirPath`, including `dirPath`. */
function deleteEmptyDirs(dirPath) {
    /*TODO: If `dirPath` is empty and gets deleted, check its parent, recursively.
     *      Currently, this could be called on a directory who's the last anchor holding down the
     *      existence of a tall chain of otherwise empty directories. If it gets deleted, now that
     *      whole chain contains no files. They should be cleaned up.
     *      But you don't want to just call `deleteEmptyDirs()` on the parent, because that could
     *      cause it to recursively go into all its sibling directories and that's wasteful and
     *      unnecessary.
     *      Should just use a simpler algorithm that just does a shallow check: "Is this directory
     *      empty? If yes, delete it and check its parent. If not, stop. (Don't check its children.)"
     *      But we should also set an ancestor directory to stop at. Otherwise it could go on, above
     *      the root build directory, deleting all the way until it encounters a non-empty one.
     */
    for (let childName of fs.readdirSync(dirPath)) {
        let childPath = nodePath.join(dirPath, childName);
        if (PathInfo.type(childPath) === "dir") {
            deleteEmptyDirs(childPath);
        }
    }
    // readdirSync again because the above loop might've deleted some.
    if (fs.readdirSync(dirPath).length === 0) {
        fs.rmSync(dirPath, { recursive: true });
    }
}

function updateValues(existing, newValues) {
    for (let [key, value] of Object.entries(newValues)) {
        existing[key] = value;
    }
    return existing;
}

function assignPlacers(placerOpt, placersOpt, contentTypes) {
    let placers = {};
    let defaultPlacer = link;
    if (placerOpt) {
        defaultPlacer = lookupPlacer(placerOpt);
    }
    for (let contentType of contentTypes) {
        placers[contentType] = defaultPlacer;
    }
    if (placersOpt) {
        for (let [name, value] of Object.entries(placersOpt)) {
            if (!contentTypes.includes(name)) {
                let typesList = contentTypes.join("', '");
                throw repr`Invalid content type ${name}. Must be one of '` + typesList + "'";
            }
            let placer;
            if (typeof value === "string") {
                placer = lookupPlacer(value);
            } else {
                placer = value;
            }
            placers[name] = placer;
        }
    }
    return placers;
}

function lookupPlacer(placerName) {
    let placer = PLACERS[placerName];
    if (placer) {
        return placer;
    } else {
        let namesList = Object.keys(PLACERS).join("', '");
        throw repr`Invalid 'placer' value ${placerName}. Must be one of '` + namesList + "'";
    }
}

// Placers //
// Each must take at least 2 arguments: source path and destination path.
// It may also take up to two optional arguments: `simulate` and `verbose`.

export function copy(srcFilePath, dstFilePath, simulate = true, verbose = false) {
    // If the file already exists, only overwrite if the source file was last modified later than
    // the existing file.
    //TODO: Check if this makes a big speed difference.
    let dstFileInfo = new PathInfo(dstFilePath);
    if (dstFileInfo.exists() && !dstFileInfo.isLink() && dstFileInfo.mtime() >= PathInfo.mtime(srcFilePath)) {
        if (verbose) {
            console.log(getCopyDebugMsg(srcFilePath, dstFilePath));
        }
    } else {
        if (dstFileInfo.isLink()) {
            // If the destination exists and is a symlink, `fs.copyFileSync()` will overwrite the target
            // file, not replace the link. So we need to manually remove it first.
            fs.unlinkSync(dstFilePath);
        }
        if (verbose) {
            console.log(repr`copy ${srcFilePath} -> ${dstFilePath}`);
        }
        if (!simulate) {
            fs.copyFileSync(srcFilePath, dstFilePath);
        }
    }
}

export function link(srcFilePath, dstFilePath, simulate = true, verbose = false) {
    let linkPath = nodePath.relative(nodePath.dirname(dstFilePath), srcFilePath);
    if (verbose) {
        console.log(repr`link ${dstFilePath} -> ${linkPath}`);
    }
    if (!simulate) {
        // If it already exists, overwrite it, to make sure the link points to the right file.
        if (PathInfo.exists(dstFilePath)) {
            fs.unlinkSync(dstFilePath);
        }
        fs.symlinkSync(linkPath, dstFilePath);
    }
}

const PLACERS = { copy: copy, link: link };

function getCopyDebugMsg(srcFilePath, dstFilePath) {
    let dstFileInfo = new PathInfo(dstFilePath);
    let srcMTime = PathInfo.mtime(srcFilePath);
    let dstMTime = dstFileInfo.mtime();
    let relation;
    if (dstMTime === srcMTime) {
        relation = "equal to";
    } else if (dstMTime > srcMTime) {
        relation = "later than";
    } else {
        relation = "earlier than";
    }
    return (
        repr`Skipping copy() because ${dstFilePath} already exists (${dstFileInfo.exists()}), it's` +
        repr` not a link (${!dstFileInfo.isLink()}), and its mtime (${dstMTime}) is ` +
        relation +
        repr` the srcFilePath's mtime (${srcMTime}).`
    );
}
