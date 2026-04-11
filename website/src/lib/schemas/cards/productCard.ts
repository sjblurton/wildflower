import z from 'zod';
import { ctaButtonSchema } from '../buttons/ctaButtonSchema';
import { sanityImageSchema } from '../shared/primitives';

export const productCardSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('productCard'),
  description: z.string().min(1),
  title: z.string().min(1),
  ctaButton: ctaButtonSchema.array().nullish().optional().default([]),
  image: sanityImageSchema.nullish().optional(),
});

export type ProductCard = z.infer<typeof productCardSchema>;
