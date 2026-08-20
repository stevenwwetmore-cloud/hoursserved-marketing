import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    metaDescription: z.string().optional(),
    author: z.string(),
    published_at: z.string(),
    tags: z.string().optional(),
    cover_image_url: z.string().optional(),
  }),
});

export const collections = { blog };
