#!/usr/bin/env node
import nodePath from "path";
import fs from "fs-extra";
import { globSync } from "glob";
import path from "path";
import process from "process";
import childProcess from "child_process";
import { fileURLToPath } from "url";
import which from "which";
import { repr } from "../lib/utils.js";
import { PathInfo } from "../lib/paths.mjs";
import { CONTENT_TYPES } from "./partition-content.mjs";
// Direct importing of JSON files isn't supported yet in ES modules. This is a workaround.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const CONFIG = require("../../config.json");

const SCRIPT_DIR = nodePath.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = nodePath.dirname(nodePath.dirname(SCRIPT_DIR));
const PREPROCESSOR_PATH = nodePath.join(SCRIPT_DIR, "preprocess.mjs");
const PREPROCESSOR_RELPATH = nodePath.relative(process.cwd(), PREPROCESSOR_PATH);

const DEFAULT_PLACERS = {
    /* If we're just running `gridsome build`, resources (non-Markdown files) can be symlinks.
     * But things `vue-remark` will touch can't be symlinks because it can't handle them.
     * And even regular Markdown files that `vue-remark` doesn't see should be hard copies just in
     * case we run an mdfixer.mjs step. If we run that on symlinks, the targets of the links get
     * overwritten. That is, your original Markdown files in the content directory could get screwed
     * up. So just to be safe, never default to symlinks for Markdown files.
     */
    build: { md: "copy", vue: "copy", insert: "copy", resource: "link" },
    /* The development server's hot reloader doesn't deal well with links. When the target of a link
     * has been edited, it notices and does some work, but ultimately doesn't recompile the page.
     * Even worse, if a link is ever broken, it crashes. Copying everything takes a lot more disk
     * space but avoids issues like #748 and #1207.
     */
    develop: { md: "copy", vue: "copy", insert: "copy", resource: "copy" },
};

let code = main(process.argv);
if (code) {
    process.exitCode = code;
}

// Stage static files, standardizing to lowercase paths and filenames
function stageStaticContent(srcDir, destDir) {
    // Build glob pattern from defined copyFileExts (image, mov, etc. extensions)
    const pattern = path.join(srcDir, `**/*.{${CONFIG.build.copyFileExts.join(",")}}`);

    // use glob to iterate and print matches
    const files = globSync(pattern, { dot: true, nodir: true });
    files.forEach((file) => {
        // Compute the new destination path
        const relativePath = path.relative(srcDir, file);
        const destPath = path.join(destDir, relativePath.toLowerCase());

        // Ensure the directory structure exists
        fs.ensureDir(path.dirname(destPath))
            .then(() => {
                // Copy the file to the new destination
                fs.copy(file, destPath, { overwrite: false }).catch((err) =>
                    console.error(`Error copying file ${file}:`, err)
                );
            })
            .catch((err) => console.error(`Error creating directory for ${destPath}:`, err));
    });
}

function main(rawArgv) {
    let argv = rawArgv.slice();
    // argv[0] is the node binary and argv[1] is run.mjs, so argv[2] should be the command.
    let command = argv[2];
    if (command !== "develop" && command !== "build") {
        console.error(`Invalid command ${command}. Must give 'develop' or 'build'.`);
        return 1;
    }

    // Preprocess content.
    let exe = PREPROCESSOR_RELPATH;
    let rawArgs = ["preprocess", ...argv.slice(3)];
    let args = setPlacerArgs(rawArgs, DEFAULT_PLACERS[command]);
    let cmd1 = exe + " " + args.join(" ");
    console.log(`$ ${cmd1}`);
    let { status: code, signal } = childProcess.spawnSync(exe, args, { stdio: "inherit" });
    if (code) {
        console.error(`${cmd1} exited with code ${code}`);
    }
    if (signal) {
        console.error(`${cmd1} exited due to signal ${signal}`);
    }
    if (code !== 0) {
        return code;
    }

    // Configure node subprocess arguments;
    // Gridsome still uses webpack4, which on node 17+ requires the legacy
    // openssl provider flag.
    const spawnArgs = {
        stdio: "inherit",
    };
    if (process.versions.node.split(".")[0] > "16") {
        spawnArgs.env = { ...process.env, NODE_OPTIONS: "--openssl-legacy-provider" };
    }

    // Start hot reloader, if running developer server.
    let watcher, cmd2;
    if (command === "develop") {
        exe = PREPROCESSOR_RELPATH;
        let rawArgs = ["watch", ...argv.slice(3)];
        let args = setPlacerArgs(rawArgs, DEFAULT_PLACERS[command]);
        cmd2 = exe + " " + args.join(" ");
        console.log(`$ ${cmd2} &`);
        watcher = childProcess.spawn(exe, args, spawnArgs);
    }

    // Start Gridsome.
    let gridsomeExe = findGridsome();
    let cmd3 = `${gridsomeExe} ${command}`;
    console.log(`$ ${cmd3}`);
    let gridsome = childProcess.spawn(gridsomeExe, [command], spawnArgs);
    gridsome.on("exit", (code, signal) => {
        // Copy static images for direct reference to dist -- only when doing a full build.
        // We hook into the exit this way to let Gridsome do its thing first.
        if (command === "build") {
            stageStaticContent("./content", "./dist");
        }

        if (signal) {
            console.error(`${cmd3} exited due to signal ${signal}`);
        }
        if (code) {
            process.exitCode = code;
        }
    });

    // Die if there is a watcher and it dies.
    if (watcher) {
        watcher.on("exit", (code, signal) => {
            if (code) {
                console.error(`${cmd2} exited with code ${code}`);
            }
            if (signal) {
                console.error(`${cmd2} exited due to signal ${signal}`);
            }
            gridsome.kill();
            process.exitCode = code;
        });
    }
}

function setPlacerArgs(args, defaultPlacers) {
    let newArgs = [];
    let argPlacers = {};
    // Parse the arguments for placer options.
    let contentType;
    for (let arg of args) {
        if (arg.slice(0, 2) === "--" && CONTENT_TYPES.includes(arg.slice(2))) {
            // It's a placer argument like --resource or --md.
            contentType = arg.slice(2);
        } else if (contentType) {
            // The previous argument was a placer one. This is the value for it.
            argPlacers[contentType] = arg;
            contentType = null;
        } else {
            // Any other type of argument. Just pass it through unmodified.
            newArgs.push(arg);
            contentType = null;
        }
    }
    // Compute what the placers should be, based on the inputs.
    // Any placers defined in the `args` should take precedence, with `defaultPlacers` as fallbacks.
    let finalPlacers = {};
    Object.assign(finalPlacers, defaultPlacers);
    Object.assign(finalPlacers, argPlacers);
    // Add the final, computed placers to the arguments list.
    for (let [contentType, placer] of Object.entries(finalPlacers)) {
        newArgs.push(`--${contentType}`);
        newArgs.push(placer);
    }
    return newArgs;
}

/** Find the correct command to execute Gridsome. */
function findGridsome() {
    if (which.sync("gridsome", { nothrow: true })) {
        return "gridsome";
    }
    let modulesDir = nodePath.join(PROJECT_ROOT, "node_modules");
    if (new PathInfo(modulesDir).type() === "dir") {
        for (let moduleName of ["gridsome", "@gridsome"]) {
            for (let relScriptPath of ["bin/gridsome.js", "cli/bin/gridsome.js"]) {
                let scriptPath = nodePath.join(modulesDir, moduleName, relScriptPath);
                if (new PathInfo(scriptPath).type() === "file") {
                    return scriptPath;
                }
            }
        }
    }
}
