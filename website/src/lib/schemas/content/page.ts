import { z } from 'zod';
import { pageSeoSchema } from './seo';
import { contentSchema } from './section';

export const pageSchema = z.object({
  _id: z.string(),
  _type: z.literal('page'),
  title: z.string(),
  slug: z.string(),
  seo: pageSeoSchema,
  content: contentSchema.nullable().optional().default([]),
});

export const pageSlugListItemSchema = z.object({
  slug: z.string(),
});

export type Page = z.infer<typeof pageSchema>;
