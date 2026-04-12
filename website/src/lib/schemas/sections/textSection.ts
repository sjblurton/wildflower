import z from 'zod';
import { ctaButtonSchema } from '../buttons/ctaButtonSchema';
import { COMPONENT_TYPES } from '../../../constants/components-types';

const textBlockSchema = z.looseObject({
  _type: z.literal('block'),
  _key: z.string().min(1),
  children: z.array(
    z.looseObject({
      _type: z.string(),
      _key: z.string().min(1),
      text: z.string().optional().nullable(),
    }),
  ),
});

const textItemSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('textItem'),
  body: z.array(textBlockSchema).default([]),
});

export const textSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal(COMPONENT_TYPES.TEXT_SECTION),
  ctaButtons: ctaButtonSchema.array().default([]),
  header: z.string().nullable().default(null),
  items: textItemSchema.array().default([]),
});

export type TextSection = z.infer<typeof textSectionSchema>;
