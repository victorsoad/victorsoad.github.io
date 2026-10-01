import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Os campos seguem o 05-blog.md gerado pelo fluxo editorial.
// O campo `slug` do arquivo vira o endereço do post: /posts/<slug>/
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    titulo: z.string(),
    titulo_seo: z.string(),
    meta_description: z.string(),
    slug: z.string(),
    data: z.coerce.date(),
    categoria: z.enum(['ia', 'desenvolvimento', 'fintech', 'carreira', 'regulatorio']),
    resumo: z.string(),
    palavra_chave: z.string(),
    palavras_secundarias: z.array(z.string()).default([]),
    linkedin: z.string().url().optional(),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { posts };
