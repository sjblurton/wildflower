import z from 'zod';
import { sanityImageSchema, textBlockSchema } from '../shared/primitives';
import { ctaButtonSchema } from '../buttons/ctaButtonSchema';
import { DIRECTIONS } from '../../../constants/directions';
import { COMPONENT_TYPES } from '../../../constants/components-types';
import { sectionColoursSchema } from '../shared/primitives';

export const productHeroSectionSchema = z.object({
  title: z.string().optional().nullable(),
  body: textBlockSchema.array().min(1),
  _type: z.literal(COMPONENT_TYPES.PRODUCT_HERO_SECTION),
  _key: z.string().min(1),
  ctaButtons: ctaButtonSchema.array().default([]).optional().nullable(),
  imagePositionDesktop: z.enum([DIRECTIONS.LEFT, DIRECTIONS.RIGHT]).default(DIRECTIONS.LEFT),
  images: z.array(sanityImageSchema).min(1),
  backgroundColour: sectionColoursSchema,
});

export type ProductHeroSection = z.infer<typeof productHeroSectionSchema>;
