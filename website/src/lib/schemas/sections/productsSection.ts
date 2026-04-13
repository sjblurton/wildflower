import z from 'zod';
import { COMPONENT_TYPES } from '../../../constants/components-types';
import { productCardSchema } from '../cards/productCard';
import { DIRECTIONS } from '../../../constants/directions';
import { sectionColoursSchema } from './sectionColours';

export const productSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal(COMPONENT_TYPES.PRODUCT_SECTION),
  title: z.string().optional(),
  alignTitle: z
    .enum([DIRECTIONS.LEFT, DIRECTIONS.RIGHT, DIRECTIONS.CENTER])
    .optional()
    .default(DIRECTIONS.CENTER),
  products: productCardSchema.array().optional(),
  backgroundColour: sectionColoursSchema,
});

export type ProductSection = z.infer<typeof productSectionSchema>;
