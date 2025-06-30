#!/usr/bin/env node
/**
 * Watch script for development
 * Monitors content directory for changes and re-processes files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';
import { preprocessContent } from './astro-preprocess.mjs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

// Debounce function to avoid multiple rapid rebuilds
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Process a single file change
async function processFileChange(filePath, changeType) {
  console.log(`\n[${new Date().toLocaleTimeString()}] File ${changeType}: ${path.relative(PROJECT_ROOT, filePath)}`);
  
  // For now, we'll do a full preprocessing
  // In the future, we could optimize to only process the changed file
  try {
    console.log('Running preprocessing...');
    await preprocessContent({ clear: false, verbose: false });
    console.log('✓ Preprocessing complete');
  } catch (error) {
    console.error('✗ Preprocessing failed:', error);
  }
}

// Debounced version to handle multiple rapid changes
const processFileChangeDebounced = debounce(processFileChange, 1000);

async function startWatcher() {
  console.log('Galaxy Hub Content Watcher');
  console.log('==========================\n');
  console.log(`Watching content directory: ${path.relative(process.cwd(), CONTENT_DIR)}`);
  console.log('Press Ctrl+C to stop\n');
  
  // Initial preprocessing
  console.log('Running initial preprocessing...');
  try {
    await preprocessContent({ clear: true, verbose: false });
    console.log('✓ Initial preprocessing complete\n');
  } catch (error) {
    console.error('✗ Initial preprocessing failed:', error);
    process.exit(1);
  }
  
  // Set up watcher
  const watcher = chokidar.watch(CONTENT_DIR, {
    ignored: [
      /(^|[\/\\])\../, // Ignore dotfiles
      /node_modules/,
      /\.git/,
      /\.temp/,
      /~$/  // Ignore temp files
    ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100
    }
  });
  
  // Watch events
  watcher
    .on('add', (filePath) => {
      if (filePath.endsWith('.md') || filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
        processFileChangeDebounced(filePath, 'added');
      }
    })
    .on('change', (filePath) => {
      if (filePath.endsWith('.md') || filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
        processFileChangeDebounced(filePath, 'changed');
      }
    })
    .on('unlink', (filePath) => {
      if (filePath.endsWith('.md') || filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
        processFileChangeDebounced(filePath, 'deleted');
      }
    })
    .on('error', error => {
      console.error('Watcher error:', error);
    })
    .on('ready', () => {
      console.log('Watching for changes...\n');
    });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\nStopping watcher...');
    watcher.close();
    process.exit(0);
  });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startWatcher().catch(console.error);
}

export { startWatcher };