import z from 'zod';
import { sanityImageSchema } from '../shared/primitives';
import { COMPONENT_TYPES } from '../../../constants/components-types';

export const imageSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal(COMPONENT_TYPES.IMAGE_SECTION),
  image: sanityImageSchema,
  overlayTitle: z.string().optional(),
  overlayOpacity: z.number().min(0).int().max(8),
});

export type ImageSection = z.infer<typeof imageSectionSchema>;
