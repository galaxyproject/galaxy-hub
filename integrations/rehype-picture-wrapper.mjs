import { visit } from 'unist-util-visit';
import path from 'path';

/**
 * Rehype plugin that wraps <img> tags with <picture> elements for progressive enhancement.
 * Assumes .webp versions of images exist alongside originals.
 */
export default function rehypePictureWrapper(options = {}) {
  const {
    formats = ['webp'], // Additional formats to include
    verbose = false
  } = options;

  return (tree, file) => {
    let transformCount = 0;

    visit(tree, 'element', (node, index, parent) => {
      // Only process <img> elements
      if (node.tagName !== 'img') return;

      const src = node.properties?.src;
      
      // Skip external URLs, data URIs, and already-optimized assets
      if (!src || 
          src.startsWith('http://') || 
          src.startsWith('https://') || 
          src.startsWith('//') ||
          src.startsWith('data:') ||
          src.includes('/src/assets/')) {
        return;
      }

      // Parse the image path
      const ext = path.extname(src).toLowerCase();
      const isOptimizable = ['.jpg', '.jpeg', '.png'].includes(ext);
      
      if (!isOptimizable) return;

      // Generate WebP path
      const basePath = src.substring(0, src.lastIndexOf('.'));
      const webpSrc = `${basePath}.webp`;

      // Create <picture> element
      const pictureNode = {
        type: 'element',
        tagName: 'picture',
        properties: {},
        children: [
          // WebP source
          {
            type: 'element',
            tagName: 'source',
            properties: {
              srcset: webpSrc,
              type: 'image/webp'
            },
            children: []
          },
          // Original <img> as fallback
          {
            ...node,
            properties: {
              ...node.properties,
              loading: node.properties.loading || 'lazy',
              decoding: node.properties.decoding || 'async'
            }
          }
        ]
      };

      // Replace the <img> with <picture>
      if (parent && typeof index === 'number') {
        parent.children[index] = pictureNode;
        transformCount++;

        if (verbose) {
          console.log(`  ✓ Wrapped: ${src} → <picture>`);
        }
      }
    });

    if (verbose && transformCount > 0) {
      const filename = file.history[0] ? path.basename(file.history[0]) : 'unknown';
      console.log(`  📄 ${filename}: ${transformCount} images wrapped`);
    }
  };
}
