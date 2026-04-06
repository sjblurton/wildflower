import { z } from 'zod';
import { sanityImageSchema } from '../../lib/schemas/shared/primitives';

export const pageSeoSchema = z
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
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

export const siteSeoSchema = z.object({
  siteTitle: z.string(),
  siteUrl: z.string(),
  defaultMetaTitle: z.string().nullable().default(null),
  defaultMetaDescription: z.string().nullable().default(null),
  defaultOgImage: sanityImageSchema.nullable().default(null),
  noIndexByDefault: z.boolean().default(false),
});

export const pageSeoDocumentSchema = z
  .object({
    title: z.string(),
    slug: z.string(),
    seo: pageSeoSchema,
  })
  .nullable();

export type SiteSeoSettings = z.infer<typeof siteSeoSchema>;
export type PageSeoDocument = z.infer<typeof pageSeoDocumentSchema>;
