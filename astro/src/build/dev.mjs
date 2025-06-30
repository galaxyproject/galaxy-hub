#!/usr/bin/env node
/**
 * Development script that runs preprocessing with watching and Astro dev server
 */

import { spawn } from 'child_process';
import { preprocessContent } from './astro-preprocess.mjs';
import { startWatcher } from './watch.mjs';

async function main() {
  console.log('Galaxy Hub Astro Development Server\n');
  
  const args = process.argv.slice(2);
  const watchMode = args.includes('--watch') || args.includes('-w');
  
  if (watchMode) {
    console.log('Starting in watch mode...\n');
    
    // Start the watcher in parallel with Astro
    const watcherPromise = startWatcher();
    
    // Start Astro dev server
    console.log('Starting Astro dev server...');
    const astro = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    
    astro.on('error', (error) => {
      console.error('Failed to start Astro:', error);
      process.exit(1);
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\nShutting down...');
      astro.kill();
      process.exit(0);
    });
    
    await watcherPromise;
  } else {
    // Original behavior - one-time preprocessing
    console.log('Step 1: Preprocessing content...');
    try {
      await preprocessContent({ verbose: false });
      console.log('✓ Preprocessing complete\n');
    } catch (error) {
      console.error('✗ Preprocessing failed:', error);
      process.exit(1);
    }
    
    // Start Astro dev server
    console.log('Step 2: Starting Astro dev server...');
    const astro = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    
    astro.on('error', (error) => {
      console.error('Failed to start Astro:', error);
      process.exit(1);
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\nShutting down...');
      astro.kill();
      process.exit(0);
    });
  }
}

main().catch(console.error);