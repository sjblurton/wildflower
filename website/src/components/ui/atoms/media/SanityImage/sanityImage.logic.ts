import { urlFor } from '../../../../../lib/cms/sanity';
import type { SanityImage } from '../../../../../lib/schemas/shared/primitives';

export interface SanityImageRenderOptions {
  image?: SanityImage;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
}

export interface SanityImageRenderResult {
  src: string | null;
  srcSet?: string;
  sizes?: string;
  altText: string;
}

export function buildUrl(
  image: SanityImage,
  width?: number,
  height?: number,
  quality?: number,
): string {
  let builder = urlFor(image).auto('format');

  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);
  if (typeof quality === 'number') builder = builder.quality(quality);

  return builder.url();
}

export function buildSanityImageRenderData({
  image,
  alt,
  width = 1200,
  height,
  sizes,
  quality,
}: SanityImageRenderOptions): SanityImageRenderResult {
  const hasImage = Boolean(image?.asset?._ref);

  if (!hasImage || !image) {
    return {
      src: null,
      altText: '',
    };
  }

  const src = buildUrl(image, width, height, quality);

  const srcSet = width
    ? (() => {
        const widthCandidates = [Math.round(width / 2), width, Math.min(width * 2, 2400)];
        const uniqueWidths = [...new Set(widthCandidates)]
          .filter((value) => value >= 64)
          .sort((a, b) => a - b);

        return uniqueWidths
          .map((candidateWidth) => {
            const scaledHeight =
              height && width
                ? Math.max(1, Math.round((height / width) * candidateWidth))
                : undefined;

            return `${buildUrl(image, candidateWidth, scaledHeight, quality)} ${candidateWidth}w`;
          })
          .join(', ');
      })()
    : undefined;

  return {
    src,
    srcSet,
    sizes: sizes ?? (width <= 80 ? `${width}px` : `(min-width: 1024px) ${width}px, 100vw`),
    altText: alt ?? image.alt ?? '',
  };
}
