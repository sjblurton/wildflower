import z from 'zod';
import { sanityImageSchema } from '../shared/primitives';

export const imageSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('imageSection'),
  image: sanityImageSchema,
  overlayTitle: z.string().optional(),
  overlayOpacity: z.number().min(0).int().max(8),
});
