import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const devlog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/devlog', generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '') }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(), updated: z.coerce.date().optional(),
    author: z.literal('Mechureal').default('Mechureal'),
    game: z.literal('broke-rider-simulator').optional(),
    tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
    cover: z.string().default('/images/city-grid.svg'),
    draft: z.boolean().default(true), lang: z.enum(['ko', 'en']),
    translationKey: z.string(), slug: z.string().regex(/^[a-z0-9-]+$/),
  }),
});
export const collections = { devlog };
