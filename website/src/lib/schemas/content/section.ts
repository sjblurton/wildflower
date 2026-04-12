import { z } from 'zod';
import { imageSectionSchema } from '../sections/imageSection';
import { logger } from '../../logging/logger';
import { productSectionSchema } from '../sections/productsSection';
import { textSectionSchema } from '../sections/textSection';

export const sectionSchema = z.discriminatedUnion('_type', [
  imageSectionSchema,
  productSectionSchema,
  textSectionSchema,
]);

export type Section = z.infer<typeof sectionSchema>;

type ValidationError = {
  index: number;
  issues: string;
  type: string;
};

export const contentSchema = z.array(z.unknown()).transform((arr) => {
  const numberOfSections = Array.isArray(arr) ? arr.length : 0;
  const errors: ValidationError[] = [];

  const cleanSections = arr
    .map((item, idx) => {
      const result = sectionSchema.safeParse(item);
      const itemType: string =
        typeof item === 'object' &&
        item !== null &&
        '_type' in item &&
        typeof item._type === 'string'
          ? item._type
          : 'unknown';

      if (!result.success) {
        errors.push({
          index: idx,
          issues: z.prettifyError(result.error),
          type: itemType,
        });
        return undefined;
      }
      return item;
    })
    .filter(Boolean);

  if (cleanSections.length < numberOfSections) {
    logger.error({
      area: 'page',
      event: 'page.validation_failed',
      message: `Some sections failed validation and were skipped. ${cleanSections.length} out of ${numberOfSections} sections will be rendered.`,
      meta: { errors },
    });
  }
  return cleanSections as Section[];
});
