import { z } from 'zod';

const pageSeoSchema = z
  .object({
    metaTitle: z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
    ogImage: z
      .object({
        _type: z.literal('image'),
        alt: z.string().optional(),
        asset: z
          .object({
            _ref: z.string().min(1),
            _type: z.literal('reference'),
          })
          .optional(),
      })
      .optional()
      .nullable(),
  })
  .optional()
  .nullable();

export const pageSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  seo: pageSeoSchema,
});

export const pageSlugListItemSchema = z.object({
  slug: z.string(),
});

export type Page = z.infer<typeof pageSchema>;
