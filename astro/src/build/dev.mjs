#!/usr/bin/env node
/**
 * Development script that runs preprocessing then starts Astro dev server
 */

import { spawn } from 'child_process';
import { preprocessContent } from './astro-preprocess.mjs';

async function main() {
  console.log('Galaxy Hub Astro Development Server\n');
  
  // Run preprocessing
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

main().catch(console.error);