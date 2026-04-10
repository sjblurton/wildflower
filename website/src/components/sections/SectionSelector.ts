import { type Section } from '../../lib/schemas/content/section';
import ImageSection from './ImageSection/ImageSection.astro';

export const getSectionComponent = (section: Section) => {
  switch (section._type) {
    case 'imageSection':
      return {
        Component: ImageSection,
        props: {
          image: section.image,
          overlayTitle: section.overlayTitle ?? '',
          overlayOpacity: section.overlayOpacity,
        },
      };
    default:
      return null;
  }
};
