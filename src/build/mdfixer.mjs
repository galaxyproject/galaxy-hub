#!/usr/bin/env node
import process from 'process';
import { fileURLToPath } from 'url';
import unified from 'unified';
import unifiedArgs from 'unified-args';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import { Command } from 'commander';
import keepNewlineBeforeHtml from './keep-newline-before-html.mjs';
import htmlImgToMd from './html-img-to-md.mjs';
import fixLinks from './fix-links.mjs';
import { repr } from '../utils.js';

const REMARK_STRINGIFY_OPTIONS = {
  fences:true, rule:'-', listItemIndent:'one', setext:true,
  handlers: {break: _ => '  \n'}
};

const program = new Command();
program
  .arguments('<input>')
  .option('-q, --quiet', 'Output only warnings and errors.')
  .option(
    '-o, --output [path]',
    'Specify output location. Give without a path to overwrite the original file(s).'
  )
  .option(
    '-b, --base <path>',
    'The root content directory for this input file. Only needed when working on a single input '
    +'file, not a directory.'
  )
  .option('--inspect', 'Output formatted syntax tree.')
  .option('-l, --limit <limit>', 'Only process this many html nodes in the <img> replacer.',
    l => parseInt(l)
  )
  .option('--debug')
  .action(main);

// If the current script is being executed as a command, parse the arguments and run.
// Otherwise, we're being imported as a module.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  program.parse(process.argv);
}

export default function main(inputPath, opts) {
  let base;
  if (opts.base) {
    base = opts.base;
  } else if (opts.output === true) {
    base = inputPath;
  } else if (opts.quiet !== true) {
    console.error(`No base identified. Can't fix relative img src paths unless a --base is given.`);
  }
  // Fix up process.argv so `unified-args` will be happy.
  let originalArgv = process.argv.slice();
  process.argv = fixArgv(process.argv, [inputPath], opts);

  // Parse Markdown with remark-parse, parse the frontmatter, modify it with our plugins, then
  // serialize it right back to Markdown with remark-stringify.
  // Note: unified-engine is made to make filesystem traversal easy:
  //       https://github.com/unifiedjs/unified-engine
  //TODO: Both htmlImgToMd and fixLinks parse the HTML of each `html` node. If it's a performance
  //      issue, we could cache the parsed `hast` tree in a property on the node. Then maybe a
  //      separate plugin at the end could handle stringifying it back into HTML.
  const processor = unified()
    .use(remarkParse)
    .use(keepNewlineBeforeHtml)
    .use(htmlImgToMd, {limit:opts.limit})
    .use(fixLinks, {bases:[base], debug:opts.debug})
    .use(remarkFrontmatter, {type:'yaml', marker:'-'})
    .use(remarkStringify, REMARK_STRINGIFY_OPTIONS);

  unifiedArgs({
    processor: processor,
    name: 'mdfixer',
    description: 'Fix Markdown.',
    version: 0.1,
    extensions: ['md'],
    ignoreName: '.mdfixer.ignore',
    rcName: '.mdfixerc',
    packageField: 'none',
    pluginPrefix: 'none',
  });

  // Restore original argv to avoid affecting other modules/scripts.
  process.argv = originalArgv;
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
  for (let arg of ['-b', '--base', '-l', '--limit']) {
    let i = argv.indexOf(arg);
    if (i >= 0) {
      argv.splice(i, 2)
    }
  }
  // Flags.
  for (let arg of ['--debug']) {
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
  for (let arg of ['quiet', 'inspect']) {
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
    argv.push('--output');
    if (opts.output !== true) {
      argv.push(opts.output);
    }
  }
  return argv;
}
