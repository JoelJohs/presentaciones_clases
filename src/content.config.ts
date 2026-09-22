import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lecciones = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/lecciones" }),
  schema: z.object({
    title: z.string(),
    moduleTitle: z.string().optional(),
    topicTitle: z.string().optional(),
    subtopicTitle: z.string().optional(),
    semana: z.number().optional(),
    fecha: z.string().optional(),
    published: z.boolean().optional(),
    description: z.string().optional(),
    duration: z.number().optional(),
    kind: z.enum(['lesson', 'activity', 'assessment', 'project']).optional(),
    objectives: z.array(z.string()).optional(),
  }),
});

const mensajes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/mensajes" }),
  schema: z.object({
    fecha: z.string(),
    autor: z.string(),
    title: z.string().optional(),
  }),
});

export const collections = { lecciones, mensajes };
