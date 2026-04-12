import z from 'zod';
import { ctaButtonSchema } from '../buttons/ctaButtonSchema';
import { COMPONENT_TYPES } from '../../../constants/components-types';

export const textSectionSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal(COMPONENT_TYPES.TEXT_SECTION),
  ctaButtons: ctaButtonSchema.array().default([]),
  header: z.string().nullable().default(null),
  items: z
    .object({
      _key: z.string().min(1),
      _type: z.literal('textItem'),
      body: z.array(
        z.looseObject({
          _type: z.literal('block'),
          _key: z.string().min(1),
        }),
      ),
    })
    .array()
    .default([]),
});

export type TextSection = z.infer<typeof textSectionSchema>;
