import { COMPONENT_TYPES } from '../../constants/components-types';
import { type Section } from '../../lib/schemas/content/section';
import ImageSection from './ImageSection/ImageSection.astro';
import ProductsSection from './productsSection/ProductsSection.astro';

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
    default:
      return null;
  }
};
