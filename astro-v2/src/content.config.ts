import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared schema for contact information (very permissive to handle legacy content)
const contactSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
}).passthrough();

// Shared schema for location (very permissive)
const locationSchema = z.object({
  name: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  postal: z.union([z.string(), z.number()]).optional().nullable(),
  country: z.string().optional().nullable(),
  geo: z.object({
    lat: z.coerce.number(),
    lon: z.coerce.number(),
  }).optional().nullable(),
}).passthrough();

// Helper for array or single value
const arrayOrString = z.union([z.array(z.string()), z.string()]).optional().nullable();

// Base article schema (shared across most collections - very permissive for legacy content)
const baseArticleSchema = z.object({
  title: z.string().optional().nullable(),
  slug: z.string(),
  date: z.coerce.date().optional().nullable(),
  tease: z.string().optional().nullable(),
  authors: arrayOrString,
  contacts: z.union([z.array(contactSchema), contactSchema]).optional().nullable(),
  tags: arrayOrString,
  subsites: arrayOrString,
  main_subsite: z.string().optional().nullable(),
  redirect: z.string().optional().nullable(),
  autotoc: z.boolean().optional().nullable(),
  skip_title_render: z.boolean().optional().nullable(),
  image: z.string().optional().nullable(),
  components: z.boolean().optional().nullable(),
  hasComponents: z.boolean().optional().nullable(),
}).passthrough();

// Articles collection (supports both .md and .mdx for component embedding)
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: baseArticleSchema,
});

// Events collection (very permissive for legacy content)
const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: baseArticleSchema.extend({
    end: z.coerce.date().optional().nullable(),
    location: z.union([z.string(), locationSchema]).optional().nullable(),
    external_url: z.string().optional().nullable(),
    gtn: z.boolean().optional().nullable(),
    days: z.number().optional().nullable(),
    continent: z.string().optional().nullable(),
    supporters: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  }),
});

// Platform schema for Galaxy servers (permissive)
const platformInstanceSchema = z.object({
  platform_group: z.string().optional().nullable(),
  platform_url: z.string().optional().nullable(),
  platform_text: z.string().optional().nullable(),
  platform_location: z.string().optional().nullable(),
  platform_purview: z.string().optional().nullable(),
}).passthrough();

// Platforms collection (Galaxy servers/instances)
const platforms = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/platforms' }),
  schema: baseArticleSchema.extend({
    url: z.string().url().optional().nullable(),
    scope: z.string().optional().nullable(),
    platforms: z.array(platformInstanceSchema).optional().nullable(),
    summary: z.string().optional().nullable(),
    comments: z.array(z.string()).optional().nullable(),
    user_support: z.array(z.string()).optional().nullable(),
    quotas: z.array(z.string()).optional().nullable(),
    citations: z.array(z.string()).optional().nullable(),
    pub_libraries: z.array(z.string()).optional().nullable(),
    sponsors: z.array(z.string()).optional().nullable(),
  }),
});

// Bare articles (minimal layout)
const bareArticles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bare-articles' }),
  schema: baseArticleSchema,
});

// Inserts (content snippets for embedding)
const inserts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/inserts' }),
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
  events,
  platforms,
  'bare-articles': bareArticles,
  inserts,
  datasets,
};
