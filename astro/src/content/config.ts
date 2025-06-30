import { defineCollection, z } from 'astro:content';

// Base schema for common fields
const baseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  subsites: z.array(z.string()).optional(),
  tease: z.string().optional(),
  authors: z.union([z.string(), z.array(z.string())]).optional(),
  authors_structured: z.array(z.object({
    github: z.string().optional(),
    name: z.string().optional(),
  })).optional(),
});

// Collection for regular articles
const articles = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    autotoc: z.boolean().optional(),
    contact: z.string().optional(),
    location: z.object({
      name: z.string()
    }).optional(),
    supporters: z.array(z.string()).optional(),
  }),
});

// Collection for Vue-component articles
const vueArticles = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    components: z.boolean().optional(),
    autotoc: z.boolean().optional(),
    contact: z.string().optional(),
    location: z.object({
      name: z.string()
    }).optional(),
    supporters: z.array(z.string()).optional(),
  }),
});

// Collection for platform pages
const platforms = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    platform_group: z.string().optional(),
    platform_purview: z.string().optional(),
    platform_url: z.string().optional(),
    platform_text: z.string().optional(),
    platform_location: z.string().optional(),
    platform_status: z.string().optional(),
  }),
});

// Collection for bare articles
const bareArticles = defineCollection({
  type: 'content',
  schema: baseSchema,
});

// Collection for inserts
const inserts = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    components: z.boolean().optional(),
  }),
});

// Collection for datasets
const datasets = defineCollection({
  type: 'data',
  schema: z.any(), // YAML files with varying structure
});

export const collections = {
  'articles': articles,
  'vue-articles': vueArticles,
  'platforms': platforms,
  'bare-articles': bareArticles,
  'inserts': inserts,
  'datasets': datasets,
};