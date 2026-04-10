export type ImageSectionAsset = { _ref: string; _type: 'reference' } | string; // test

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
  tailwindOpacity: number;
}

export function getImageSectionLogic({
  image,
  overlayOpacity,
}: ImageSectionLogicInput): ImageSectionLogicOutput {
  const isTestImage = image && typeof image.asset === 'string';
  const tailwindOpacity = overlayOpacity * 10;

  return {
    isTestImage,
    tailwindOpacity,
  };
}
