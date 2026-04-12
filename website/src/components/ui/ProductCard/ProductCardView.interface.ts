import type { SanityImage as SanityImageType } from '../../../lib/schemas/shared/primitives';

export type ProductCardViewProps = {
  description: string;
  title: string;
  image?: SanityImageType | null;
};
