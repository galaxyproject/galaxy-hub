import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import crypto from 'crypto';

export default function galaxyHubImageMigration(options = {}) {
  const {
    imageDirs = ['content/news', 'content/events'],
    destDir = 'src/assets/hub-images',
    imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'],
    verbose = false,
    useCache = true,
    cacheFile = '.astro/image-migration-cache.json'
  } = options;

  let imageMap = new Map();
  let cache = { files: {} };

  return {
    name: 'galaxy-hub-image-migration',
    hooks: {
      'astro:config:setup': ({ updateConfig, command }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [
              [remarkRewriteImagePaths, { imageMap, verbose }]
            ]
          }
        });
      },

      'astro:build:start': async ({ logger }) => {
        const startTime = Date.now();
        logger.info('🖼️  Galaxy Hub: Migrating images to src/assets...');
        
        if (useCache) {
          cache = await loadCache(cacheFile);
        }
        
        let copiedCount = 0;
        let skippedCount = 0;
        
        for (const dir of imageDirs) {
          const pattern = `${dir}/**/*.{${imageExtensions.join(',')}}`;
          const images = await glob(pattern, { nodir: true });
          
          for (const imagePath of images) {
            const fileHash = useCache ? getFileHash(imagePath) : null;
            const cachedHash = cache.files[imagePath]?.hash;
            
            const relativePath = path.relative(dir, imagePath);
            const dirBasename = path.basename(dir);
            const destPath = path.join(destDir, dirBasename, relativePath);
            
            if (useCache && fileHash === cachedHash && await fs.pathExists(destPath)) {
              skippedCount++;
              imageMap.set(imagePath, destPath);
              continue;
            }
            
            await fs.ensureDir(path.dirname(destPath));
            await fs.copy(imagePath, destPath);
            
            imageMap.set(imagePath, destPath);
            
            if (useCache) {
              cache.files[imagePath] = {
                hash: fileHash,
                destination: destPath,
                copiedAt: new Date().toISOString()
              };
            }
            
            copiedCount++;
            
            if (verbose) {
              logger.info(`  ✓ ${imagePath} → ${destPath}`);
            }
          }
        }
        
        if (useCache) {
          await saveCache(cacheFile, cache);
        }
        
        globalThis.__galaxyHubImageMap = imageMap;
        
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        logger.info(
          `✨ Processed ${imageMap.size} images (${copiedCount} copied, ${skippedCount} cached) in ${duration}s`
        );
      },
      
      'astro:server:start': async ({ logger }) => {
        const startTime = Date.now();
        logger.info('🖼️  Galaxy Hub: Migrating images for dev server...');
        
        if (useCache) {
          cache = await loadCache(cacheFile);
        }
        
        let processedCount = 0;
        
        for (const dir of imageDirs) {
          const pattern = `${dir}/**/*.{${imageExtensions.join(',')}}`;
          const images = await glob(pattern, { nodir: true });
          
          for (const imagePath of images) {
            const relativePath = path.relative(dir, imagePath);
            const dirBasename = path.basename(dir); // Use just the directory name, not the full path
            const destPath = path.join(destDir, dirBasename, relativePath);
            
            const fileHash = useCache ? getFileHash(imagePath) : null;
            const cachedHash = cache.files[imagePath]?.hash;
            
            if (!(useCache && fileHash === cachedHash && await fs.pathExists(destPath))) {
              await fs.ensureDir(path.dirname(destPath));
              await fs.copy(imagePath, destPath);
              
              if (useCache) {
                cache.files[imagePath] = {
                  hash: fileHash,
                  destination: destPath,
                  copiedAt: new Date().toISOString()
                };
              }
              processedCount++;
            }
            
            imageMap.set(imagePath, destPath);
          }
        }
        
        if (useCache) {
          await saveCache(cacheFile, cache);
        }
        
        globalThis.__galaxyHubImageMap = imageMap;
        
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        logger.info(`✨ Processed ${processedCount} images in ${duration}s`);
      }
    }
  };
}

function remarkRewriteImagePaths(options) {
  const { imageMap, verbose } = options;
  
  return async (tree, file) => {
    const { visit } = await import('unist-util-visit');
    
    const markdownFilePath = file.history[0];
    const markdownDir = path.dirname(markdownFilePath);
    
    let markdownImagesProcessed = 0;
    let htmlImagesProcessed = 0;
    let htmlImagesSkipped = 0;
    
    visit(tree, ['image', 'html'], (node) => {
      let imagePath = null;
      let isHtml = false;
      
      if (node.type === 'image') {
        imagePath = node.url;
      } else if (node.type === 'html' && /<img\s/i.test(node.value)) {
        // Check for complex HTML images
        if (isComplexHtmlImage(node.value)) {
          htmlImagesSkipped++;
          if (verbose) {
            console.log(`  ⏭️  Skipping complex HTML img: ${node.value.substring(0, 60)}...`);
          }
          return;
        }
        
        const match = node.value.match(/src=["']([^"']+)["']/);
        if (match) {
          imagePath = match[1];
          isHtml = true;
        }
      }
      
      if (!imagePath || 
          imagePath.startsWith('http://') || 
          imagePath.startsWith('https://') || 
          imagePath.startsWith('//') ||
          imagePath.startsWith('/')) {
        return;
      }
      
      const absoluteImagePath = path.resolve(markdownDir, imagePath);
      
      const map = globalThis.__galaxyHubImageMap || imageMap;
      if (map && map.has(absoluteImagePath)) {
        const newPath = map.get(absoluteImagePath);
        const relativeToSrc = path.relative('src', newPath);
        const optimizedPath = `/${relativeToSrc}`;
        
        if (isHtml) {
          node.value = node.value.replace(
            /src=["']([^"']+)["']/,
            `src="${optimizedPath}"`
          );
          htmlImagesProcessed++;
        } else {
          node.url = optimizedPath;
          markdownImagesProcessed++;
        }
        
        if (verbose) {
          const type = isHtml ? 'HTML' : 'Markdown';
          console.log(`  ✓ [${type}] ${imagePath} → ${optimizedPath}`);
        }
      } else {
        console.warn(`⚠️  Image not found in migration map: ${absoluteImagePath}`);
      }
    });
    
    if (verbose && (markdownImagesProcessed > 0 || htmlImagesProcessed > 0 || htmlImagesSkipped > 0)) {
      console.log(
        `  📄 ${path.basename(markdownFilePath)}: ` +
        `${markdownImagesProcessed} markdown, ` +
        `${htmlImagesProcessed} HTML, ` +
        `${htmlImagesSkipped} skipped`
      );
    }
  };
}

function isComplexHtmlImage(htmlString) {  
  // JavaScript event handlers
  if (/\son[a-z]+=/i.test(htmlString)) {
    return true;
  }
  
  // Data attributes
  if (/\sdata-[a-z-]+=/i.test(htmlString)) {
    return true;
  }
  
  // Inline styles
  if (/\sstyle=/i.test(htmlString)) {
    return true;
  }
  
  // Already has srcset
  if (/\ssrcset=/i.test(htmlString)) {
    return true;
  }
  
  // Already has loading/decoding
  if (/\s(loading|decoding)=/i.test(htmlString)) {
    return true;
  }
  
  return false;
}

// ============================================
// Cache Helpers
// ============================================
async function loadCache(cacheFile) {
  try {
    const data = await fs.readFile(cacheFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { files: {} };
  }
}

async function saveCache(cacheFile, cache) {
  await fs.ensureDir(path.dirname(cacheFile));
  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2));
}

function getFileHash(filepath) {
  try {
    const content = fs.readFileSync(filepath);
    return crypto.createHash('md5').update(content).digest('hex');
  } catch {
    return null;
  }
}
