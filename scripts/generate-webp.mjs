#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

/**
 * Generate WebP versions of JPG/PNG images for bandwidth optimization.
 * Runs before build to create .webp files alongside originals.
 */

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const testDirArg = args.find(arg => arg.startsWith('--dir='));
const testDir = testDirArg ? testDirArg.split('=')[1] : null;

const config = {
  contentDir: testDir ? `./content/${testDir}` : './content',
  extensions: ['jpg', 'jpeg', 'png'],
  quality: 85, // WebP quality (0-100)
  skipExisting: true, // Skip if WebP exists and is newer than source
  verbose: true,
  dryRun: isDryRun
};

async function generateWebP() {
  console.log('🖼️  WebP Generation Starting...\n');
  
  const startTime = Date.now();
  const pattern = `${config.contentDir}/**/*.{${config.extensions.join(',')}}`;
  
  console.log(`📂 Scanning: ${pattern}`);
  const images = await glob(pattern, { nodir: true });
  
  console.log(`📊 Found ${images.length} images\n`);
  
  let generated = 0;
  let skipped = 0;
  let errors = 0;
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  
  for (const imagePath of images) {
    const webpPath = imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
    
    try {
      // Check if we should skip because WebP already exists and is up to date
      if (config.skipExisting && await shouldSkip(imagePath, webpPath)) {
        skipped++;
        if (config.verbose) {
          console.log(`⏭️  Skip: ${path.basename(imagePath)} (WebP exists)`);
        }
        continue;
      }
      
      if (config.dryRun) {
        console.log(`🔍 Would generate: ${webpPath}`);
        generated++;
        continue;
      }
      
      // Generate WebP
      await sharp(imagePath)
        .webp({ quality: config.quality })
        .toFile(webpPath);
      
      generated++;

      if (config.verbose) {
        const originalStat = await fs.stat(imagePath);
        const webpStat = await fs.stat(webpPath);
        const savings = ((1 - webpStat.size / originalStat.size) * 100).toFixed(1);
        totalOriginalSize += originalStat.size;
        totalWebPSize += webpStat.size;
        console.log(
          `✅ ${path.basename(imagePath)} → ${path.basename(webpPath)} ` +
          `(${formatBytes(originalStat.size)} → ${formatBytes(webpStat.size)}, ${savings}% smaller)`
        );
      }
      
    } catch (error) {
      errors++;
      console.error(`❌ Error processing ${imagePath}:`, error.message);
    }
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('\n📈 Summary:');
  console.log(`   Total images: ${images.length}`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Duration: ${duration}s`);
  if (totalOriginalSize > 0) {
    const totalSavings = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);
    const bytesSaved = totalOriginalSize - totalWebPSize;
    console.log(`   Total size reduction: ${totalSavings}% (${formatBytes(bytesSaved)} saved)`);
  }
  
  if (config.dryRun) {
    console.log('\n⚠️  DRY RUN - No files were created');
  }
}

async function shouldSkip(sourcePath, webpPath) {
  if (!await fs.pathExists(webpPath)) {
    return false;
  }
  
  const sourceStat = await fs.stat(sourcePath);
  const webpStat = await fs.stat(webpPath);
  
  // Skip if WebP is newer than source
  return webpStat.mtime >= sourceStat.mtime;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

// Run
generateWebP().catch(console.error);
