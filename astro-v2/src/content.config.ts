import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared schema for contact information
const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  url: z.string().url().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
}).passthrough();

// Shared schema for location
const locationSchema = z.object({
  name: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postal: z.union([z.string(), z.number()]).optional(),
  country: z.string().optional(),
  geo: z.object({
    lat: z.number(),
    lon: z.number(),
  }).optional(),
}).passthrough();

// Base article schema (shared across most collections)
const baseArticleSchema = z.object({
  title: z.string().optional(),
  slug: z.string(),
  date: z.coerce.date().optional(),
  tease: z.string().optional(),
  authors: z.array(z.string()).optional(),
  contacts: z.array(contactSchema).optional(),
  tags: z.array(z.string()).optional(),
  subsites: z.array(z.string()).optional(),
  main_subsite: z.string().optional(),
  redirect: z.string().optional(),
  autotoc: z.boolean().optional(),
  skip_title_render: z.boolean().optional(),
  image: z.string().optional(),
  components: z.boolean().optional(),
}).passthrough();

// Articles collection
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: baseArticleSchema,
});

// Vue articles (articles with embedded Vue components)
const vueArticles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vue-articles' }),
  schema: baseArticleSchema.extend({
    inserts: z.array(z.string()).optional(),
  }),
});

// Events collection
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: baseArticleSchema.extend({
    end: z.coerce.date().optional(),
    location: locationSchema.optional(),
    external_url: z.string().url().optional(),
    gtn: z.boolean().optional(),
    days: z.number().optional(),
    continent: z.enum(['AF', 'AS', 'EU', 'NA', 'OC', 'SA', 'GL']).optional(),
    supporters: z.array(z.string()).optional(),
  }),
});

// Platform schema for Galaxy servers
const platformInstanceSchema = z.object({
  platform_group: z.string().optional(),
  platform_url: z.string().url().optional(),
  platform_text: z.string().optional(),
  platform_location: z.string().optional(),
  platform_purview: z.string().optional(),
}).passthrough();

// Platforms collection (Galaxy servers/instances)
const platforms = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/platforms' }),
  schema: baseArticleSchema.extend({
    url: z.string().url().optional(),
    scope: z.string().optional(),
    platforms: z.array(platformInstanceSchema).optional(),
    summary: z.string().optional(),
    comments: z.array(z.string()).optional(),
    user_support: z.array(z.string()).optional(),
    quotas: z.array(z.string()).optional(),
    citations: z.array(z.string()).optional(),
    pub_libraries: z.array(z.string()).optional(),
    sponsors: z.array(z.string()).optional(),
  }),
});

// Bare articles (minimal layout)
const bareArticles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bare-articles' }),
  schema: baseArticleSchema,
});

// Inserts (content snippets for embedding)
const inserts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/inserts' }),
  schema: z.object({
    slug: z.string(),
    title: z.string().optional(),
  }).passthrough(),
});

// Datasets (YAML data files)
const datasets = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/datasets' }),
  schema: z.any(),
});

export const collections = {
  articles,
  'vue-articles': vueArticles,
  events,
  platforms,
  'bare-articles': bareArticles,
  inserts,
  datasets,
};
