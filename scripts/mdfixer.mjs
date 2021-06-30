#!/usr/bin/env node
import process from 'process';
import unified from 'unified';
import unifiedArgs from 'unified-args';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import { Command } from 'commander';
import keepNewlineBeforeHtml from './keep-newline-before-html.mjs';
import htmlImgToMd from './html-img-to-md.mjs';
import fixLinks from './fix-links.mjs';

const REMARK_STRINGIFY_OPTIONS = {
  fences:true, rule:'-', listItemIndent:'one', setext:true,
  handlers: {break: _ => '  \n'}
};

const program = new Command();
program
  .arguments('<input>')
  .option('-q, --quiet', 'Output only warnings and errors.')
  .option('-o, --output [path]', 'Specify output location')
  .option('-b, --base <path>', 'The root content directory for this input file. Only needed when '
    +'working on a single input file, not a directory.'
  )
  .option('--inspect', 'Output formatted syntax tree.')
  .option('-l, --limit <limit>', 'Only process this many html nodes in the <img> replacer.',
    l => parseInt(l)
  )
  .option('--debug')
  .action(main);
program.parse(process.argv);

function main(inputPath, opts) {
  let base;
  if (opts.base) {
    base = opts.base;
  } else if (opts.output === true) {
    base = inputPath;
  } else if (opts.quiet !== true) {
    console.error(`No base identified. Can't fix relative img src paths unless a --base is given.`);
  }
  removeExtraArgs(process.argv);

  // Note: unified-engine is made to make filesystem traversal easy:
  //       https://github.com/unifiedjs/unified-engine
  // Parse Markdown with remark-parse, parse the frontmatter, modify it with our plugins, then
  // serialize it right back to Markdown with remark-stringify.
  //TODO: Both htmlImgToMd and fixLinks parse the HTML of each `html` node. If it's a performance
  //      issue, we could cache the parsed `hast` tree in a property on the node. Then maybe a
  //      separate plugin at the end could handle stringifying it back into HTML.
  const processor = unified()
    .use(remarkParse)
    .use(keepNewlineBeforeHtml)
    .use(htmlImgToMd, {limit:opts.limit})
    .use(fixLinks, {base:base, debug:opts.debug})
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
}

function removeExtraArgs(argv) {
  // Options that take arguments.
  for (let arg of ['-b', '--base', '-l', '--limit']) {
    let i = argv.indexOf(arg);
    if (i >= 0) {
      argv.splice(i, 2)
    }
  }
  // Flags
  for (let arg of ['--debug']) {
    let i = argv.indexOf(arg);
    if (i >= 0) {
      argv.splice(i, 1);
    }
  }
}
