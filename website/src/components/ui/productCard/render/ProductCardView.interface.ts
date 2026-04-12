import type { SanityImage as SanityImageType } from '../../../../lib/schemas/shared/primitives';
import type { CtaProps } from '../logic/ProductCard.logic';

export type ProductCardViewProps = {
  description: string;
  title: string;
  image?: SanityImageType | null;
  cta: CtaProps[] | null;
};
