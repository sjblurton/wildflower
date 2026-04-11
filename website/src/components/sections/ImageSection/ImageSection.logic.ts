export type ImageSectionAsset = { _ref: string; _type: 'reference' } | string; // test

type TailwindOpacity = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80;

export interface ImageSectionImage {
  _type: 'image';
  alt: string;
  asset: ImageSectionAsset;
}

export interface ImageSectionLogicInput {
  image: ImageSectionImage;
  overlayTitle?: string;
  overlayOpacity: number;
}

export interface ImageSectionLogicOutput {
  isTestImage: boolean;
  tailwindOpacity: TailwindOpacity;
}

export function getImageSectionLogic({
  image,
  overlayOpacity,
}: ImageSectionLogicInput): ImageSectionLogicOutput {
  const isTestImage = image && typeof image.asset === 'string';
  const tailwindOpacity = (overlayOpacity * 10) as TailwindOpacity;

  return {
    isTestImage,
    tailwindOpacity,
  };
}
