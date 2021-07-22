import fs from 'fs';
import nodePath from 'path';
import grayMatter from 'gray-matter';
import { rmPrefix, splitlines, PathInfo } from '../utils.js';

const SCRIPT_DIR = nodePath.dirname(rmPrefix(import.meta.url, 'file://'));
const PROJECT_ROOT = nodePath.dirname(nodePath.dirname(SCRIPT_DIR));

export function preprocess(options) {
  let {simulate, clear} = updateValues({simulate:true, clear:false}, options || {});
  let partitioner = new Partitioner(options);
  // Make sure the build directories exist.
  for (let dirPath of Object.values(partitioner.buildDirs)) {
    if (! simulate) {
      if (clear) {
        fs.rmSync(dirPath, {recursive:true});
      }
      fs.mkdirSync(dirPath, {recursive:true});
    }
  }
  // Arrange the content in the build directories.
  partitioner.placeDirFiles(partitioner.contentDir, true);
}

export class Partitioner {
  constructor(options) {
    let {
      configPath, projectRoot, simulate, placers, verbose
    } = updateValues({projectRoot:PROJECT_ROOT, simulate:true, verbose:false}, options || {});
    if (! configPath) {
      configPath = nodePath.join(PROJECT_ROOT, 'config.json');
    }
    const config = JSON.parse(fs.readFileSync(configPath,'utf8'));
    this.simulate = simulate;
    this.contentDir = nodePath.join(projectRoot, config.contentDir);
    this.buildDirs = {};
    for (let [key, relPath] of Object.entries(config.build.dirs)) {
      this.buildDirs[key] = nodePath.join(projectRoot, relPath);
    }
    this.placers = {'md':link, 'vue':link, 'insert':link, 'resource':link};
    if (placers) {
      updateValues(this.placers, placers);
    }
  }

  placeDirFiles(dirPath, recursive=false) {
    if (! nodePath.isAbsolute(dirPath)) {
      throw `dirPath must be absolute. Received: ${dirPath}`;
    }
    let [dirs, indexPath, inserts, resources] = getChildrenByType(dirPath);
    if (recursive) {
      // Execute depth-first - take care of bottom-most directories before their parents.
      for (let childDir of dirs) {
        this.placeDirFiles(childDir, recursive=recursive);
      }
    }
    let plan = makeDirPlan(indexPath, inserts, resources, this.placers);
    this.executeDirPlan(dirPath, plan);
    if (recursive) {
      // Delete empty directories.
      // Because we've taken care of the child directories already (recursively), everything below
      // should already be in the intended final state.
      deleteEmptyDirs(dirPath);
    }
  }

  executeDirPlan(dirPath, plan) {
    /** Create the state described in the `plan` in the directory given with `dirPath`.
     *  Delete files not present in the final state.
     *  Directories are not touched.
     */
    let childPaths = {vue:new Set(), md:new Set()};
    for (let action of plan) {
      let childPath = nodePath.relative(this.contentDir, action.path);
      childPaths[action.dest].add(childPath);
      this.placeContentFile(action.placer, action.path, this.buildDirs[action.dest]);
    }
    let relDir = nodePath.relative(this.contentDir, dirPath);
    for (let [contentType, buildDirRoot] of Object.entries(this.buildDirs)) {
      let buildDir = nodePath.join(buildDirRoot, relDir);
      let dirInfo = new PathInfo(buildDir);
      let buildDirContents;
      if (dirInfo.type() === 'dir') {
        buildDirContents = fs.readdirSync(buildDir).map(name => nodePath.join(buildDir, name));
      } else if (dirInfo.exists()) {
        throw `Path ${buildDir} exists but is not a directory.`;
      } else {
        buildDirContents = [];
      }
      for (let buildChildPath of buildDirContents) {
        if (new PathInfo(buildChildPath).type() === 'dir') {
          // Directories are handled outside this function.
          continue;
        }
        let relPath = nodePath.relative(buildDirRoot, buildChildPath);
        if (! childPaths[contentType].has(relPath)) {
          fs.unlinkSync(buildChildPath);
        }
      }
    }
  }

  handleEvent(eventType, path) {
    // The `path` is the full path of the target in the content directory.
    let dirsToCheck = {shallow:[], deep: []};
    if (eventType === 'update') {
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
      if (pathInfo.type() === 'file') {
        dirsToCheck.shallow.push(nodePath.dirname(path));
      } else if (pathInfo.type() === 'dir') {
        dirsToCheck.deep.push(path);
      } else if (pathInfo.exists()) {
        throw `Encountered unexpected special file ${path}`;
      } else {
        throw `Received an ${eventType} event on nonexistent path ${path}`;
      }
    } else if (eventType === 'remove') {
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
      let buildPath = this.getBuildPath(path);
      let buildInfo = new PathInfo(buildPath);
      this.deleteFromBuild(path);
      if (buildInfo.type() === 'file' || buildInfo.type() === 'brokenlink') {
        if (nodePath.extname(path).toLowerCase() === '.md') {
          // It's a Markdown file, so removing it could affect where its directory should be in the
          // build.
          dirsToCheck.shallow.push(nodePath.dirname(path));
        }
      } else if (buildInfo.type() === 'dir') {
        // Don't need to do anything extra.
      } else if (buildInfo.exists()) {
        throw `Encountered unexpected special file ${path}`;
      } else {
        throw `Received a ${eventType} event on a path which doesn't exist in the build directory: 
          ${path}`;
      }
    }
    for (let dirPath of dirsToCheck.shallow) {
      this.placeDirFiles(dirPath)
    }
    for (let dirPath of dirsToCheck.deep) {
      this.placeDirFiles(dirPath, recursive=true)
    }
  }

  placeContentFile(placer, srcFilePath, dstContentDir) {
    let relFilePath = nodePath.relative(this.contentDir, srcFilePath);
    let dstFilePath = nodePath.join(dstContentDir, relFilePath);
    let dstFileDir = nodePath.dirname(dstFilePath);
    fs.mkdirSync(dstFileDir, {recursive:true});
    let dstFileInfo = new PathInfo(dstFilePath);
    if (dstFileInfo.exists() && dstFileInfo.type() !== 'file' && dstFileInfo.type() !== 'brokenlink') {
      console.error(`Path already exists but is not a file: ${dstFilePath}`);
      return
    }
    placer(srcFilePath, dstFilePath, this.simulate);
  }

  deleteFromBuild(path) {
    let relPath = nodePath.relative(this.contentDir, path);
    for (let buildDir of Object.values(this.buildDirs)) {
      let buildPath = nodePath.join(buildDir, relPath);
      let buildPathInfo = new PathInfo(buildPath);
      let buildPathType = buildPathInfo.type();
      if (buildPathType === 'file' || buildPathType === 'brokenlink') {
        if (! this.simulate) {
          fs.unlinkSync(buildPath);
        }
      } else if (buildPathType === 'dir') {
        if (! this.simulate) {
          fs.rmSync(buildPath, {recursive:true});
        }
      } else if (buildPathType !== 'nonexistent') {
        throw `Cannot remove special file ${buildPath}`;
      }
      if (buildPathType !== 'nonexistent') {
        if (this.verbose) {
          console.log(`rm ${buildPath}`);
        }
        // Now that we deleted it, is its parent directory empty? If so, delete that.
        if (! this.simulate) {
          deleteEmptyDirs(nodePath.dirname(buildPath));
        }
      }
    }
  }

  getBuildPath(path) {
    /** Find the equivalent path in the build directory.
     * `path` should be an absolute path in the content directory.
     */
    let relPath = nodePath.relative(this.contentDir, path);
    for (let buildDir of Object.values(this.buildDirs)) {
      let buildPath = nodePath.join(buildDir, relPath);
      if (new PathInfo(buildPath).exists()) {
        return buildPath;
      }
    }
  }
}


function makeDirPlan(indexPath, inserts, resources, placers) {
  /** Determine what the final state of the files in this directory should be.
   *  What files should be present in which destination directories, and should they be links or
   *  copies?
   */
  let plan = [];
  let vue = indexPath && fileRequiresVue(indexPath);
  // index.md
  if (! indexPath) {
    // pass
  } else if (vue) {
    plan.push({path:indexPath, dest:'vue', placer:placers.vue});
  } else {
    plan.push({path:indexPath, dest:'md', placer:placers.md});
  }
  // Insert .md files
  for (let insertPath of inserts) {
    plan.push({path:insertPath, dest:'md', placer:placers.insert});
  }
  // Resource files (mainly images)
  for (let resourcePath of resources) {
    // Check if the file is used by a Vue-requiring Markdown file.
    //TODO: It's possible a file could be referenced by multiple Markdowns in the same directory.
    //TODO: This is a very loose check for whether the Markdown file references the resource file.
    //      The Markdown file could technically include the name of the resource file without
    //      actually including it in, say, an image element.
    let destination;
    let resourceFileName = nodePath.basename(resourcePath);
    if (vue && fileContainsSubstr(indexPath, resourceFileName)) {
      destination = 'vue';
    } else {
      destination = 'md';
    }
    plan.push({path:resourcePath, dest:destination, placer:placers.resource});
  }
  return plan;
}


function getChildrenByType(dirPath) {
  let dirs = [];
  let indexPath;
  let inserts = [];
  let resources = [];
  for (let childName of fs.readdirSync(dirPath)) {
    let childPath = nodePath.join(dirPath, childName);
    let fileInfo = new PathInfo(childPath);
    if (! fileInfo.exists()) {
      console.error(`Warning: File ${childPath} not found.`);
      continue;
    }
    if (fileInfo.type() === 'dir') {
      dirs.push(childPath);
    } else if (fileInfo.type() === 'file') {
      if (childName.toLowerCase() == 'index.md') {
        indexPath = childPath;
      } else if (nodePath.extname(childName).toLowerCase() == '.md') {
        inserts.push(childPath);
      } else {
        resources.push(childPath);
      }
    } else {
      console.error(`Warning: Special file found: ${childPath}`);
    }
  }
  return [dirs, indexPath, inserts, resources];
}


function fileRequiresVue(filePath) {
  /** Read the file to see if it requires `vue-remark`.
   *  Returns `True` if there's a `components` key in the graymatter (whose value is truthy)
   *  or if it finds `<slot ` or `<g-image ` in the file contents.
   */
  let fileContents = fs.readFileSync(filePath, {encoding:'utf8'});
  let {data:metadata, content} = grayMatter(fileContents);
  if (metadata.components) {
    return true;
  }
  if (fileContainsTags(content, ['slot','g-image'])) {
    return true;
  }
  return false;
}

function fileContainsTags(fileContents, tags) {
  let queryStrings = tags.map(tag => `<${tag} `);
  for (let line of splitlines(fileContents)) {
    for (let query of queryStrings) {
      if (line.indexOf(query) >= 0) {
        return true;
      }
    }
  }
  return false;
}

function fileContainsSubstr(filePath, substr) {
  let fileContents = fs.readFileSync(filePath, {encoding:'utf8'});
  return fileContents.indexOf(substr) >= 0;
}

function deleteEmptyDirs(dirPath) {
  /** Delete any empty directories in the tree rooted at `dirPath`, including `dirPath`. */
  for (let childName of fs.readdirSync(dirPath)) {
    let childPath = nodePath.join(dirPath, childName);
    let childInfo = new PathInfo(childPath);
    if (childInfo.type() === 'dir') {
      deleteEmptyDirs(childPath);
    }
  }
  // readdirSync again because the above loop might've deleted some.
  if (fs.readdirSync(dirPath).length === 0) {
    fs.rmdirSync(dirPath);
  }
}

function updateValues(existing, newValues) {
  for (let [key, value] of Object.entries(newValues)) {
    existing[key] = value;
  }
  return existing;
}

// Placers //
// Each must take 3 arguments: source path, destination path, and `simulate`.

export function copy(srcFilePath, dstFilePath, simulate=true) {
  // If the file already exists, only overwrite if the source file was last modified later than
  // the existing file.
  //TODO: Check if this makes a big speed difference.
  let dstFileInfo = new PathInfo(dstFilePath);
  if (! dstFileInfo.exists() || dstFileInfo.isLink() ||
      new PathInfo(srcFilePath).mtime() > dstFileInfo.mtime) {
    // if (verbose) {
    //   console.log(`copy ${srcFilePath} -> ${dstFilePath}`);
    // }
    if (! simulate) {
      fs.copyFileSync(srcFilePath, dstFilePath);
    }
  }
}

export function link(srcFilePath, dstFilePath, simulate=true) {
  let linkPath = nodePath.relative(nodePath.dirname(dstFilePath), srcFilePath);
  // if (verbose) {
  //   console.log(`link ${dstFilePath} -> ${linkPath}`);
  // }
  if (! simulate) {
    // If it already exists, overwrite it, to make sure the link points to the right file.
    if (new PathInfo(dstFilePath).exists()) {
      fs.unlinkSync(dstFilePath);
    }
    fs.symlinkSync(linkPath, dstFilePath);
  }
}
