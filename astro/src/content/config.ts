import { z, defineCollection, reference } from 'astro:content';

// Define the schema for article collections
const articleSchema = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  subsites: z.array(z.string()).optional(),
  main_subsite: z.string().optional(),
  draft: z.boolean().default(false),
  components: z.boolean().default(false),
  autotoc: z.boolean().default(true),
  // Career-specific fields
  closes: z.coerce.date().optional(),
  // Event-specific fields
  continent: z.string().optional(),
  online: z.boolean().optional(),
  // Shared fields
  contact: z.string().optional(),
  location: z.string().optional(),
  // News-specific fields
  brief: z.string().optional(),
  // Platform-specific fields
  user_support: z.string().optional(),
  quotas: z.string().optional(),
  citations: z.string().optional(),
  sponsors: z.string().optional(),
  summary: z.string().optional(),
  // Added by preprocessing
  slug: z.string()
});

// Define the schema for insert components
const insertSchema = z.object({
  title: z.string().optional(),
  components: z.boolean().default(true),
  slug: z.string()
});

// Define the schema for datasets (YAML files)
const datasetSchema = z.any(); // YAML data can be any structure

// Define the schema for bare articles
const bareArticleSchema = articleSchema.extend({
  layout: z.string().optional()
});

// Define the schema for platform pages
const platformSchema = articleSchema.extend({
  url: z.string().optional(),
  user_support: z.string().optional(),
  quotas: z.string().optional(),
  citations: z.string().optional(),
  sponsors: z.string().optional(),
  summary: z.string().optional()
});

// Export the collections
export const collections = {
  'articles': defineCollection({
    type: 'content',
    schema: articleSchema
  }),
  'vue-articles': defineCollection({
    type: 'content',
    schema: articleSchema
  }),
  'bare-articles': defineCollection({
    type: 'content',
    schema: bareArticleSchema
  }),
  'platforms': defineCollection({
    type: 'content',
    schema: platformSchema
  }),
  'inserts': defineCollection({
    type: 'content',
    schema: insertSchema
  }),
  'datasets': defineCollection({
    type: 'data',
    schema: datasetSchema
  })
};