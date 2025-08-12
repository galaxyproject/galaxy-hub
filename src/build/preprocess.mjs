#!/usr/bin/env node
const SCRIPT_START = Date.now();
import fs from "fs";
import nodePath from "path";
import process from "process";
import { fileURLToPath } from "url";
import nodeWatch from "node-watch";
import { Command } from "commander";
import { Partitioner, CONTENT_TYPES } from "./partition-content.mjs";
import * as mdfixer from "./mdfixer.mjs";
import { repr } from "../lib/utils.js";
import { PathInfo } from "../lib/paths.mjs";

// Without additional context or instructions, default to copy for everything, which is the safest.
const DEFAULT_PLACERS = { md: "copy", vue: "copy", insert: "copy", resource: "copy" };

// Define command line arguments.
export const program = new Command();
program
    .description(
        "Process the files in the content directory and set up the build directories so they're ready\n" +
            "for Gridsome.",
    )
    .argument(
        "[command]",
        "Action to take:\n" +
            "'preprocess': Just do a one-time setup of the build directories, then exit.\n" +
            "'watch': Watch the content directory and keep it in sync with the build directories. " +
            "This does not do any preprocessing! You must make sure the content and build" +
            "directories are already synced!",
    )
    .option(
        "-C, --no-clear",
        "Don't empty the build directories first. By default, this deletes everything in the build " +
            "directories before preprocessing. This has no effect if only watching, as no clearing is " +
            "ever done in that case.",
    )
    .option(
        "-p, --placer <name>",
        `Method of placing Markdown files into the build directories:
                     'link': Link to the original file from the build directory.
                     'copy': Place a copy of the original file in the build directory.`,
    )
    .option("-F, --no-fix-markdown")
    .option("-v, --verbose", "Output only warnings and errors.")
    .option("-n, --simulate", "Do not make any actual changes to the filesystem.")
    .option("--debug", "Print debug output.")
    .action(main);

for (let contentType of CONTENT_TYPES) {
    program.option(
        `--${contentType} <name>`,
        repr`Set the method of placing ${contentType} files. Overrides default --placer.`,
    );
}

// If the current script is being executed as a command, parse the arguments and run.
// Otherwise, we're being imported as a module.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    program.parse(process.argv);
}

function main(command, opts) {
    // Check if command is valid.
    if (!(command === "preprocess" || command === "watch")) {
        let preamble;
        if (command) {
            preamble = repr`Invalid command ${command}. `;
        } else {
            preamble = "No command given. ";
        }
        console.error(preamble + "Must choose 'preprocess' or 'watch'.");
        process.exit(1);
    }
    // Assign placers.
    let placers = {};
    Object.assign(placers, DEFAULT_PLACERS);
    for (let contentType of CONTENT_TYPES) {
        if (opts[contentType]) {
            placers[contentType] = opts[contentType];
        }
    }
    // Create Partitioner.
    let partitioner = new Partitioner({
        simulate: opts.simulate,
        verbose: opts.verbose,
        placer: opts.placer,
        placers: placers,
    });
    // Execute command.
    let start;
    if (command === "watch") {
        //TODO: If `opts.fixMarkdown`, first walk the build dir to make sure there are no links to
        //      Markdown files. That'd dangerous, since running `mdfixer` could overwrite the sources.
        // Returns a fs.FSWatcher, which can be used to watch for events or close the watcher.
        nodeWatch(partitioner.contentDir, { recursive: true }, (eventType, path) => {
            partitioner.handleEvent(eventType, path);
            if (opts.fixMarkdown) {
                /* The delay is to avoid a race condition with Gridsome's development server. The partitioner will copy
                 * over the new Markdown file, which prompts the development server to start reloading. Often, this will
                 * happen before mdfixer gets to the newly copied file to fix it, so the un-fixed Markdown is loaded by
                 * the development server. And then if mdfixer edits the file too quickly, the development server can
                 * miss the edit event from fixing the Markdown, leaving it serving the un-fixed Markdown.
                 */
                //TODO: Instead, combine the copying and fixing by creating a placer where mdfixer reads
                //      input from the content dir and writes output directly to the build dir.
                setTimeout(fixMdOnEvent, 250, eventType, path, partitioner, partitioner.verbose, partitioner.simulate);
            }
        });
    } else if (command === "preprocess") {
        process.stdout.write("Placing files into build directories.. ");
        start = Date.now();
        doPrePartitioning(partitioner, opts.clear, partitioner.simulate, partitioner.verbose);
        partitioner.placeDirFiles(partitioner.contentDir, true);
        let elapsed = Date.now() - start;
        console.log(`${elapsed / 1000} sec`);
        if (opts.fixMarkdown) {
            process.stdout.write("Fixing Markdown files..                ");
            start = Date.now();
            for (let buildDir of Object.values(partitioner.buildDirs)) {
                mdfixer.main(buildDir, { quiet: !partitioner.verbose, overwrite: true, debug: opts.debug });
            }
        }
    }
    // Log how long the last step and the overall script took.
    // This must be done in an event handler right before exit because mdfixer runs async and returns
    // immediately, before it's actually done.
    process.on("beforeExit", () => {
        let end = Date.now();
        if (opts.fixMarkdown) {
            console.log(`${(end - start) / 1000} sec`);
        }
        console.log(`Total preprocessing time:              ${(end - SCRIPT_START) / 1000} sec`);
    });
}

function fixMdOnEvent(eventType, path, partitioner, verbose, simulate) {
    // Check if the path looks like a Markdown file. Exit if not (no Markdown to correct).
    if (nodePath.extname(path).toLowerCase() !== ".md" || PathInfo.type(path) === "dir") {
        if (verbose) {
            console.log(repr`Path ${path} not a Markdown file. No fixing necessary.`);
        }
        return;
    }
    // Find the path in the build directory,
    let buildPathData = partitioner.findBuildPath(path, true);
    // Check for unexpected states, exit if no action needed.
    if (buildPathData) {
        if (eventType === "remove") {
            console.error(
                repr`Warning: Received a ${eventType} event on ${path}, but build path ${buildPathData.path}` +
                    " exists.",
            );
        }
    } else {
        // Path does not exist anymore. Nothing to be done with it.
        if (eventType !== "remove" && PathInfo.type(path) !== "dir") {
            console.error(
                repr`Warning: received a ${eventType} event on ${path}, but it was not found in the build ` +
                    "directory.",
            );
        }
        return;
    }
    let buildPathDir = nodePath.dirname(buildPathData.path);
    // Log action.
    if (verbose) {
        console.log(repr`Fixing Markdown in ${buildPathDir}`);
    }
    // Take action: Fix all Markdown in `path`'s directory (but not subdirectories).
    // Why touch files other than `path` itself? The partitioner operates on a per-directory basis.
    // So it's already replaced the other Markdown files that might exist in this directory with fresh
    // copies from the content dir. They need to be fixed again.
    if (!simulate) {
        mdfixer.shallowPass(buildPathDir, { base: buildPathData.root, quiet: !partitioner.verbose });
    }
}

function doPrePartitioning(config, clear, simulate, verbose) {
    setupBuildDirs(config.buildDirs, clear, simulate, verbose);
}

function setupBuildDirs(buildDirs, clear, simulate, verbose) {
    for (let dirPath of Object.values(buildDirs)) {
        if (clear && PathInfo.exists(dirPath)) {
            if (verbose) {
                console.log(repr`Clearing out existing files in build directory ${dirPath}`);
            }
            if (!simulate) {
                fs.rmSync(dirPath, { recursive: true });
            }
        }
        if (!simulate) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
}
