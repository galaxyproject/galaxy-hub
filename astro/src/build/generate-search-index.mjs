#!/usr/bin/env node
/**
 * Generate search index for static search functionality
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';
import lunr from 'lunr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.join(ASTRO_ROOT, 'src/content');
const PUBLIC_DIR = path.join(ASTRO_ROOT, 'public');

/**
 * Extract text content from markdown, removing HTML and special syntax
 */
function extractTextContent(markdown) {
  // Remove HTML tags
  let text = markdown.replace(/<[^>]*>/g, ' ');
  
  // Remove markdown links but keep text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove markdown formatting
  text = text.replace(/[*_~`#]/g, ' ');
  
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Generate search documents from content files
 */
async function generateSearchDocuments() {
  const documents = [];
  
  // Get all markdown files
  const files = await glob('**/*.md', {
    cwd: CONTENT_DIR,
    absolute: true
  });
  
  for (const filePath of files) {
    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      const { data: frontmatter, content: body } = matter(content);
      
      // Skip if no title
      if (!frontmatter.title) continue;
      
      // Extract text content
      const textContent = extractTextContent(body);
      
      // Create document
      const doc = {
        id: frontmatter.slug || path.relative(CONTENT_DIR, filePath),
        title: frontmatter.title,
        content: textContent.substring(0, 500), // First 500 chars for preview
        fullContent: textContent,
        url: `/${frontmatter.slug || ''}`,
        date: frontmatter.date,
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        authors: Array.isArray(frontmatter.authors) ? frontmatter.authors : 
                 typeof frontmatter.authors === 'string' ? [frontmatter.authors] : [],
        type: path.dirname(path.relative(CONTENT_DIR, filePath)).split('/')[0]
      };
      
      documents.push(doc);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }
  
  return documents;
}

/**
 * Build Lunr search index
 */
function buildSearchIndex(documents) {
  const idx = lunr(function() {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('content', { boost: 5 });
    this.field('fullContent');
    this.field('tags', { boost: 3 });
    this.field('authors', { boost: 2 });
    
    documents.forEach(doc => {
      this.add({
        id: doc.id,
        title: doc.title,
        content: doc.content,
        fullContent: doc.fullContent,
        tags: doc.tags.join(' '),
        authors: doc.authors.join(' ')
      });
    });
  });
  
  return idx;
}

/**
 * Main function
 */
async function main() {
  console.log('Generating search index...');
  
  try {
    // Generate documents
    const documents = await generateSearchDocuments();
    console.log(`Processed ${documents.length} documents`);
    
    // Build search index
    const searchIndex = buildSearchIndex(documents);
    
    // Prepare data for client
    const searchData = {
      index: searchIndex.toJSON(),
      documents: documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        content: doc.content,
        url: doc.url,
        date: doc.date,
        tags: doc.tags,
        authors: doc.authors,
        type: doc.type
      }))
    };
    
    // Write to public directory
    const outputPath = path.join(PUBLIC_DIR, 'search-index.json');
    await fs.promises.writeFile(
      outputPath,
      JSON.stringify(searchData),
      'utf-8'
    );
    
    console.log(`Search index written to ${outputPath}`);
    console.log(`Index size: ${(JSON.stringify(searchData).length / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSearchDocuments, buildSearchIndex };