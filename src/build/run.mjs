#!/usr/bin/env node
import nodePath from 'path';
import process from 'process';
import childProcess from 'child_process';
import { fileURLToPath } from 'url';
import which from 'which';
import * as preprocess from './preprocess.mjs';
import { repr, PathInfo } from '../utils.js';

const SCRIPT_DIR = nodePath.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = nodePath.dirname(nodePath.dirname(SCRIPT_DIR));
const PREPROCESSOR_PATH = nodePath.join(SCRIPT_DIR, 'preprocess.mjs');
const PREPROCESSOR_RELPATH = nodePath.relative(process.cwd(), PREPROCESSOR_PATH);

let command = process.argv[2];

if (command !== 'develop' && command !== 'build') {
  console.error(repr`Invalid command ${command}. Must give 'develop' or 'build'.`);
  process.exit(1);
}

// Preprocess content.
let argv = process.argv.slice();
argv[2] = 'preprocess';
console.log(`$ ${PREPROCESSOR_RELPATH} `+argv.slice(2).join(' '));
preprocess.program.parse(argv);

// Start hot reloader, if running developer server.
if (command === 'develop') {
  let args = ['watch', ...process.argv.slice(3)];
  console.log(`$ ${PREPROCESSOR_RELPATH} `+args.join(' ')+' &');
  let watcher = childProcess.spawn(PREPROCESSOR_PATH, args);
  watcher.stdout.on('readable', function() { logStdout(this); });
  watcher.stderr.on('readable', function() { logStderr(this); });
}

// Start Gridsome.
let gridsomeExe = findGridsome();
console.log(`$ ${gridsomeExe} ${command}`);
let gridsome = childProcess.spawn(gridsomeExe, [command]);
//TODO: Connect straight to our stdout/err, allow colors and curses interface.
gridsome.stdout.on('readable', function() { logStdout(this); });
gridsome.stderr.on('readable', function() { logStderr(this); });

/** Find the correct command to execute Gridsome. */
function findGridsome() {
  if (which.sync('gridsome', {nothrow:true})) {
    return 'gridsome';
  }
  let modulesDir = nodePath.join(PROJECT_ROOT, 'node_modules');
  if (new PathInfo(modulesDir).type() === 'dir') {
    for (let moduleName of ['gridsome', '@gridsome']) {
      for (let relScriptPath of ['bin/gridsome.js', 'cli/bin/gridsome.js']) {
        let scriptPath = nodePath.join(modulesDir, moduleName, relScriptPath);
        if (new PathInfo(scriptPath).type() === 'file') {
          return scriptPath;
        }
      }
    }
  }
}

function logStdout(stream) {
  logOutput(stream, string => process.stdout.write(string));
}

function logStderr(stream) {
  logOutput(stream, string => process.stderr.write(string));
}

function logOutput(stream, logger) {
  let data;
  while (data = stream.read()) {
    logger(data.toString());
  }
}