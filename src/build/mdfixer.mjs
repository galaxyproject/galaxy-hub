#!/usr/bin/env node
import fs from "fs";
import nodePath from "path";
import process from "process";
import { fileURLToPath } from "url";
import { unified } from "unified";
import * as unifiedEngine from "unified-engine";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";
import { Command } from "commander";
import keepNewlineBeforeHtml from "./keep-newline-before-html.mjs";
import htmlImgToMd from "./html-img-to-md.mjs";
import fixLinks from "./fix-links.mjs";
import tocAdd from "./toc-add.mjs";
import { unescapeLink } from "./unescape-links.mjs";
import { repr, rmPrefix } from "../lib/utils.js";
import { PathInfo } from "../lib/paths.mjs";

const MD_EXT = "md";
const REMARK_STRINGIFY_OPTIONS = {
    fences: true,
    rule: "-",
    listItemIndent: "one",
    setext: true,
    handlers: { break: () => "  \n", link: unescapeLink },
};

const program = new Command();
program
    .arguments("<input>")
    .option("-o, --output <path>", "Specify output location.")
    .option("-O, --overwrite", "Edit the input files in-place. The input path must be a directory.")
    .option(
        "-w, --watch",
        "Watch the given directory for changes in Markdown files and update the output. Only works if " +
            "an --output is given which is different from the <input>.",
    )
    .option("-e, --ext <ext>", "Markdown file extension to recognize.", MD_EXT)
    .option(
        "-b, --base <path>",
        "The root content directory for this input file. Only needed when working on a single input " +
            "file, not a directory.",
    )
    .option("-q, --quiet", "Output only warnings and errors.")
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
    // Validate arguments.
    if (opts.overwrite && PathInfo.type(inputPath) !== "dir") {
        throw repr`--overwrite given but input path is not a directory: ${inputPath}`;
    }
    if (opts.output && opts.overwrite) {
        throw "Must give --output OR --overwrite, not both.";
    }
    // Get the base path to pass to fix-links.mjs.
    let bases;
    if (opts.base) {
        bases = [opts.base];
    } else if (opts.overwrite) {
        bases = [inputPath];
    } else if (opts.output && PathInfo.type(opts.output) === "dir") {
        bases = [opts.output];
    } else if (opts.quiet !== true) {
        console.error(`No base identified. Can't fix relative img src paths unless a --base is given.`);
    }
    if (opts.debug && bases) {
        console.log(`Base(s) identified: ${bases}`);
    }
    // Get the value to pass to the `output` option of unified-engine.
    let output = false;
    if (opts.output) {
        output = opts.output;
    } else if (opts.overwrite) {
        output = true;
    }
    // Parse Markdown with remark-parse, parse the frontmatter, modify it with our plugins, then
    // serialize it right back to Markdown with remark-stringify.
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

    unifiedEngine.engine(
        {
            processor: processor,
            files: [inputPath],
            output: output,
            extensions: [opts.ext],
            quiet: opts.quiet,
        },
        handleExit,
    );
}

function handleExit(error, code) {
    if (error) {
        throw error;
    }
    if (code) {
        console.error(repr`unified-engine in mdfixer.mjs returned exit code ${code}.`);
        process.exitCode = code;
    }
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
