import z from 'zod';
import { COMPONENT_TYPES } from '../../../constants/components-types';
import { productCardSchema } from '../cards/productCard';

export const productSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal(COMPONENT_TYPES.PRODUCT_SECTION),
  title: z.string().optional(),
  products: productCardSchema.array().optional(),
});

export type ProductSection = z.infer<typeof productSectionSchema>;
