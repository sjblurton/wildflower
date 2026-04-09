import { z } from 'zod';
import { imageSectionSchema } from '../sections/imageSection';
import { logger } from '../../logging/logger';

export const sectionSchema = z.discriminatedUnion('_type', [imageSectionSchema]);

export type Section = z.infer<typeof sectionSchema>;

export const contentSchema = z.array(z.unknown()).transform((arr) =>
  arr
    .map((item, idx) => {
      const result = sectionSchema.safeParse(item);
      if (!result.success) {
        logger?.error?.({
          area: 'section',
          event: 'section.validation_failed',
          message: `Section at index ${idx} failed validation and will be skipped.`,
          meta: { error: z.prettifyError(result.error), item },
        });
        return undefined;
      }
      return item;
    })
    .filter(Boolean),
);
export type Content = z.infer<typeof contentSchema>;
