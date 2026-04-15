import z from 'zod';
import { ctaButtonSchema } from '../buttons/ctaButtonSchema';
import { COMPONENT_TYPES } from '../../../constants/components-types';
import { textBlockSchema, sectionColoursSchema } from '../shared/primitives';

const textItemSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('textItem'),
  body: z.array(textBlockSchema).default([]),
});

export const textSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal(COMPONENT_TYPES.TEXT_SECTION),
  ctaButtons: ctaButtonSchema.array().default([]),
  items: textItemSchema.array().default([]),
  backgroundColour: sectionColoursSchema,
});

export type TextSection = z.infer<typeof textSectionSchema>;
