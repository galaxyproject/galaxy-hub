import fs from "fs";

export class PathInfo {
    constructor(path) {
        //TODO: `cache` option to tell it to cache results of system calls.
        //      This will prevent it from updating as the filesystem state changes, though.
        this.path = path;
    }
    /** Does the path exist?
     *  Note: This returns `true` for broken symlinks (the link exists, but its targets does not).
     */
    exists() {
        if (fs.existsSync(this.path)) {
            return true;
        } else {
            try {
                fs.lstatSync(this.path);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
    static exists(path) {
        let pathInfo = new this(path);
        return pathInfo.exists();
    }
    /** Get the type of filesystem object this path points to.
     *  If the path does not exist, return `'nonexistent'`.
     *  If the path is a symbolic link, return the type of its target. If the target is missing,
     *  return `'brokenlink'`.
     */
    type() {
        if (!this.exists()) {
            return "nonexistent";
        }
        let stats;
        try {
            stats = fs.statSync(this.path);
        } catch (error) {
            if (error.code === "ENOENT") {
                // fs.statSync() will throw an error on a broken link.
                // We defined those as "existing" in this.exists(), but fs.statSync() does not agree.
                if (this.isLink()) {
                    return "brokenlink";
                } else {
                    console.error(`Unexpected filesystem entry ${this.path}`);
                    throw error;
                }
            } else {
                throw error;
            }
        }
        if (stats.isFile()) {
            return "file";
        } else if (stats.isDirectory()) {
            return "dir";
        } else if (stats.isSocket()) {
            return "socket";
        } else if (stats.isBlockDevice()) {
            return "block";
        } else if (stats.isCharacterDevice()) {
            return "char";
        } else if (stats.isFIFO()) {
            return "fifo";
        } else {
            throw `Unexpected path type: ${this.path}`;
        }
    }
    static type(path) {
        let pathInfo = new this(path);
        return pathInfo.type();
    }
    isLink() {
        if (this.exists()) {
            let stats = fs.lstatSync(this.path);
            if (stats.isSymbolicLink()) {
                return true;
            }
        }
        return false;
    }
    static isLink(path) {
        let pathInfo = new this(path);
        return pathInfo.isLink();
    }
    mtime() {
        if (this.exists()) {
            let stats = fs.lstatSync(this.path);
            return stats.mtimeMs;
        } else {
            return null;
        }
    }
    static mtime(path) {
        let pathInfo = new this(path);
        return pathInfo.mtime();
    }
    size() {
        if (this.exists()) {
            let stats = fs.lstatSync(this.path);
            return stats.size;
        } else {
            return null;
        }
    }
    static size(path) {
        let pathInfo = new this(path);
        return pathInfo.size();
    }
}
