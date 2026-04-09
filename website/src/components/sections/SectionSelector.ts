import { sectionSchema, type Section } from '../../lib/schemas/content/section';
import ImageSection from './ImageSection/ImageSection.astro';
import { logger } from '../../lib/logging/logger';

export const getSectionComponent = (section: Section) => {
  switch (section._type) {
    case 'imageSection':
      return {
        Component: ImageSection,
        props: {
          image: section.image ?? { asset: '', alt: 'reference' as const },
          overlayTitle: section.overlayTitle ?? '',
          overlayOpacity: typeof section.overlayOpacity === 'number' ? section.overlayOpacity : 0,
        },
      };
    default:
      return null;
  }
};

export const parseSections = (sections: unknown[]): Section[] => {
  return sections
    .map((block, idx) => {
      const result = sectionSchema.safeParse(block);
      if (!result.success) {
        logger.error({
          area: 'section',
          event: 'section.validation_failed',
          message: `Section at index ${idx} failed validation and will be skipped.`,
          meta: {
            error: result.error.issues,
            block,
          },
        });
        return null;
      }
      return result.data;
    })
    .filter(Boolean) as Section[];
};
