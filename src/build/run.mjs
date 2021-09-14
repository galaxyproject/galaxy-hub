#!/usr/bin/env node
import nodePath from "path";
import process from "process";
import childProcess from "child_process";
import { fileURLToPath } from "url";
import which from "which";
import { repr, PathInfo } from "../utils.js";

const SCRIPT_DIR = nodePath.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = nodePath.dirname(nodePath.dirname(SCRIPT_DIR));
const PREPROCESSOR_PATH = nodePath.join(SCRIPT_DIR, "preprocess.mjs");
const PREPROCESSOR_RELPATH = nodePath.relative(process.cwd(), PREPROCESSOR_PATH);

let command = process.argv[2];

if (command !== "develop" && command !== "build") {
    console.error(repr`Invalid command ${command}. Must give 'develop' or 'build'.`);
    process.exit(1);
}

// Preprocess content.
let argv = process.argv.slice();
argv[2] = "preprocess";
console.log(`$ ${PREPROCESSOR_RELPATH} ` + argv.slice(2).join(" "));
childProcess.spawnSync(PREPROCESSOR_RELPATH, argv.slice(2), { stdio: "inherit" });

// Start hot reloader, if running developer server.
if (command === "develop") {
    let args = ["watch", ...process.argv.slice(3)];
    console.log(`$ ${PREPROCESSOR_RELPATH} ` + args.join(" ") + " &");
    //TODO: Use the returned ChildProcess to kill the child process when the parent is killed.
    childProcess.spawn(PREPROCESSOR_PATH, args, { stdio: "inherit" });
}

// Start Gridsome.
let gridsomeExe = findGridsome();
console.log(`$ ${gridsomeExe} ${command}`);
childProcess.spawn(gridsomeExe, [command], { stdio: "inherit" });
//TODO: Get Gridsome's colors working in stdout again.

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
