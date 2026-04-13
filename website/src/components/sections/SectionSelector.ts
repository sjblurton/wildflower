import { COMPONENT_TYPES } from '../../constants/components-types';
import { LOG_EVENTS } from '../../lib/logging/events';
import { logger } from '../../lib/logging/logger';
import { type Section } from '../../lib/schemas/content/section';
import ImageSection from './ImageSection/ImageSection.astro';
import ProductHeroSection from './ProductHeroSection/ProductHeroSection.astro';
import ProductsSection from './productsSection/ProductsSection.astro';
import TextSection from './TextSection/TextSection.astro';

export const getSectionComponent = (section: Section) => {
  switch (section._type) {
    case COMPONENT_TYPES.IMAGE_SECTION:
      return {
        Component: ImageSection,
        props: section,
      };
    case COMPONENT_TYPES.PRODUCT_SECTION:
      return {
        Component: ProductsSection,
        props: section,
      };
    case COMPONENT_TYPES.TEXT_SECTION:
      return {
        Component: TextSection,
        props: section,
      };
    case COMPONENT_TYPES.PRODUCT_HERO_SECTION:
      return {
        Component: ProductHeroSection,
        props: section,
      };
    default:
      return logger.error({
        message: `Unknown section type`,
        area: 'SectionSelector',
        event: LOG_EVENTS.section.unknownSectionType,
        meta: { sectionType: section },
      });
  }
};
