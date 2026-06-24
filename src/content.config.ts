import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lecciones = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/lecciones" }),
  schema: z.object({
    title: z.string(),
    moduleTitle: z.string().optional(),
    topicTitle: z.string().optional(),
    subtopicTitle: z.string().optional(),
    fecha: z.string().optional(),
  }),
});

export const collections = { lecciones };
