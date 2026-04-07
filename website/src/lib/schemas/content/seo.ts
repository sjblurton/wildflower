import z from 'zod';
import { sanityImageSchema } from '../shared/primitives';

export const pageSeoSchema = z
  .object({
    metaTitle: z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
    ogImage: sanityImageSchema.nullable().optional(),
  })
  .nullable()
  .optional();
