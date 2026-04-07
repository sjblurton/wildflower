import { z } from 'zod';
import { sanityImageSchema } from '../../../lib/schemas/shared/primitives';
import { pageSeoSchema } from '../../../lib/schemas/content/seo';

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
