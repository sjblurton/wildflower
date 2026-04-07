import { z } from 'zod';
import { pageSeoSchema } from './seo';

export const pageSchema = z.object({
  _id: z.string(),
  _type: z.literal('page'),
  title: z.string(),
  slug: z.string(),
  seo: pageSeoSchema,
});

export const pageSlugListItemSchema = z.object({
  slug: z.string(),
});

export type Page = z.infer<typeof pageSchema>;
