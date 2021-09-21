#!/usr/bin/env node
import fs from "fs";
import nodePath from "path";
import process from "process";
import { fileURLToPath } from "url";
import { unified } from "unified";
//TODO: Move away from unified-args. Merely importing it causes preprocess.mjs' exit code to be masked.
import * as unifiedArgs from "unified-args";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";
import { Command } from "commander";
import keepNewlineBeforeHtml from "./keep-newline-before-html.mjs";
import htmlImgToMd from "./html-img-to-md.mjs";
import fixLinks from "./fix-links.mjs";
import tocAdd from "./toc-add.mjs";
import { repr, rmPrefix } from "../utils.js";
import { PathInfo } from "../paths.js";

const MD_EXT = "md";
const REMARK_STRINGIFY_OPTIONS = {
    fences: true,
    rule: "-",
    listItemIndent: "one",
    setext: true,
    handlers: { break: () => "  \n" },
};

const program = new Command();
program
    .arguments("<input>")
    .option("-q, --quiet", "Output only warnings and errors.")
    .option("-o, --output [path]", "Specify output location. Give without a path to overwrite the original file(s).")
    .option(
        "-w, --watch",
        "Watch the given directory for changes in Markdown files and update the output. Only works if " +
            "an --output is given which is different from the <input>."
    )
    .option("-e, --ext <ext>", "Markdown file extension to recognize.", MD_EXT)
    .option(
        "-b, --base <path>",
        "The root content directory for this input file. Only needed when working on a single input " +
            "file, not a directory."
    )
    .option("--inspect", "Output formatted syntax tree.")
    .option("-l, --limit <limit>", "Only process this many html nodes in the <img> replacer.", (l) => parseInt(l))
    .option("--debug")
    .action(main);

// If the current script is being executed as a command, parse the arguments and run.
// Otherwise, we're being imported as a module.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    program.parse(process.argv);
}

export function main(inputPath, opts) {
    // Set options in `opts` to defaults, in case they were missing.
    // Can occur if this is executed as a module, not as a script from the command line.
    let defaults = getDefaults(program.options);
    for (let [key, value] of Object.entries(defaults)) {
        if (!Object.prototype.hasOwnProperty.call(opts, key)) {
            opts[key] = value;
        }
    }
    let bases;
    if (opts.base) {
        bases = [opts.base];
    } else if (opts.output === true) {
        bases = [inputPath];
    } else if (opts.output && PathInfo.type(opts.output) === "dir") {
        bases = [opts.output];
    } else if (opts.quiet !== true) {
        console.error(`No base identified. Can't fix relative img src paths unless a --base is given.`);
    }
    // Fix up process.argv so `unified-args` will be happy.
    let originalArgv = process.argv.slice();
    process.argv = fixArgv(process.argv, [inputPath], opts);

    // Parse Markdown with remark-parse, parse the frontmatter, modify it with our plugins, then
    // serialize it right back to Markdown with remark-stringify.
    //TODO: Use unified-engine directly. Could avoid the argv munging.
    //TODO: Both htmlImgToMd and fixLinks parse the HTML of each `html` node. If it's a performance
    //      issue, we could cache the parsed `hast` tree in a property on the node. Then maybe a
    //      separate plugin at the end could handle stringifying it back into HTML.
    const processor = unified()
        .use(remarkParse)
        .use(keepNewlineBeforeHtml)
        .use(htmlImgToMd, { limit: opts.limit })
        .use(fixLinks, { bases: bases, debug: opts.debug })
        .use(tocAdd, { position: "start", onlyIfHeadings: true, includeFilename: "index.md" })
        .use(remarkFrontmatter, { type: "yaml", marker: "-" })
        .use(remarkStringify, REMARK_STRINGIFY_OPTIONS);

    unifiedArgs.args({
        processor: processor,
        name: "mdfixer",
        description: "Fix Markdown.",
        version: 0.1,
        extensions: [opts.ext],
        ignoreName: ".mdfixer.ignore",
        rcName: ".mdfixerc",
        packageField: "none",
        pluginPrefix: "none",
    });

    // Restore original argv to avoid affecting other modules/scripts.
    process.argv = originalArgv;
}

/** Fix all Markdown files that are direct children of `dirPath`, but do not recurse into
 *  subdirectories.
 *  @param {string} dirPath The directory containing the Markdown files to be fixed.
 *  @param {Object} [opts]  Options to pass directly to `main()`.
 */
export function shallowPass(dirPath, opts = {}) {
    let ext = MD_EXT;
    if (opts && opts.ext) {
        ext = opts.ext;
    }
    // Find every Markdown file and fix it.
    // Set both the input and output paths to the same file to overwrite it.
    // The caller has to worry about the `base` and other options.
    for (let filename of fs.readdirSync(dirPath)) {
        if (nodePath.extname(filename) === "." + ext) {
            let mdPath = nodePath.join(dirPath, filename);
            main(mdPath, { ...opts, output: mdPath });
        }
    }
}

// `unified-args` does its own inspection of `process.argv`.
// We need to make sure those arguments are how it likes it, otherwise it'll throw a fit.
function fixArgv(currentArgv, positionals, opts) {
    if (process.argv[1] === fileURLToPath(import.meta.url)) {
        // If this is being executed directly as a script, all we have to do is remove arguments that
        // `unified-args` doesn't recognize.
        return removeExtraArgs(currentArgv.slice());
    } else {
        // If this is being used as a module, the current process.argv is irrelevant: it's the arguments
        // to the calling executable, not this script. We have to construct an artificial argv.
        return constructArgv(positionals, opts);
    }
}

function removeExtraArgs(argv) {
    // Options that take arguments.
    for (let arg of ["-b", "--base", "-l", "--limit"]) {
        let i = argv.indexOf(arg);
        if (i >= 0) {
            argv.splice(i, 2);
        }
    }
    // Flags.
    for (let arg of ["--debug"]) {
        let i = argv.indexOf(arg);
        if (i >= 0) {
            argv.splice(i, 1);
        }
    }
    return argv;
}

function constructArgv(positionals, opts) {
    let argv = [process.argv[0], process.argv[1]];
    // Flags.
    for (let arg of ["quiet", "inspect"]) {
        if (opts[arg]) {
            argv.push(`--${arg}`);
        }
    }
    // Positionals.
    if (positionals.length !== 1) {
        throw repr`Invalid arguments: Must give one positional; instead found ${positionals}`;
    }
    let inputPath = positionals[0];
    argv.push(inputPath);
    // Special cases.
    if (opts.output) {
        argv.push("--output");
        if (opts.output !== true) {
            argv.push(opts.output);
        }
    }
    return argv;
}

function getDefaults(options) {
    let defaults = {};
    for (let option of options) {
        let varName;
        if (option.long) {
            varName = rmPrefix(option.long, "--").replace(/-/g, "_");
        } else {
            varName = rmPrefix(option.short, "-");
        }
        if (option.defaultValue !== undefined) {
            defaults[varName] = option.defaultValue;
        }
    }
    return defaults;
}
